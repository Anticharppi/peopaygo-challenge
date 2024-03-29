import React, { useEffect, useState } from 'react';
import Pagination from './Pagination'; // Importa el componente de paginación
import Button from './Button';
import { useAuth } from '@ocmi/frontend/lib/hooks';
import { Pagination as _Pagination } from '@ocmi/frontend/types';
type DataItem = Record<string, string | number | boolean> & {
  id: number;
};

interface TableProps<T> {
  data: DataItem[]; // Array de objetos con propiedades definidas por T
  onUpdate: (id: number) => void; // Función para manejar la actualización de registros
  onDelete: (id: number) => void; // Función para manejar la eliminación de registros
  headers: { key: keyof T; title: string }[]; // Los encabezados de la tabla
  itemsPerPage: number; // Número de elementos por página
  totalItems: number;
  getMoreData: (pagination: _Pagination) => void; // Función para obtener más datos de la API
}

const Table = <T,>({
  data,
  onUpdate,
  onDelete,
  headers,
  itemsPerPage,
  totalItems,
  getMoreData,
}: TableProps<T>) => {
  const { user } = useAuth();
  const [currentItems, setCurrentItems] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexedPages, setIndexedPages] = useState<Record<number, DataItem[]>>(
    {},
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (indexedPages[pageNumber]) {
      setCurrentItems(indexedPages[pageNumber]);
      return;
    }
    getMoreData({
      limit: itemsPerPage,
      offset: pageNumber * itemsPerPage - itemsPerPage,
    });
  };

  useEffect(() => {
    const indexPage = () => {
      if (!data.length) return;
      if (!indexedPages[currentPage]) {
        const firstItemIndex = data.length - itemsPerPage;
        const lastItemIndex = data.length;
        const currentData = data.slice(firstItemIndex, lastItemIndex);
        const existingIds: number[] = [];
        for (const key in indexedPages) {
          existingIds.push(...indexedPages[key].map((item) => item.id));
        }

        setIndexedPages({
          ...indexedPages,
          [currentPage]: currentData.filter(
            (data) => !existingIds.includes(data.id),
          ),
        });
      }
    };
    indexPage();
  }, [data]);

  useEffect(() => {
    const updateCurrentItems = () => {
      if (!indexedPages[currentPage]) return;
      setCurrentItems(indexedPages[currentPage]);
    };
    updateCurrentItems();
  }, [currentPage, indexedPages]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={paginate}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.title}
                </th>
              ))}
              <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item, index) => (
              <tr key={index}>
                {headers.map((header, index) => {
                  return (
                    <td
                      key={index}
                      className="py-4 px-6 text-center whitespace-nowrap"
                    >
                      {item[header.key]}
                    </td>
                  );
                })}
                <td className="py-2 px-4 text-center whitespace-nowrap">
                  <Button
                    onClick={() => onUpdate(item.id as number)}
                    type="button"
                  >
                    Update
                  </Button>
                  {user && user.isAdmin && (
                    <button
                      onClick={() => onDelete(item.id as number)}
                      className="ml-2 bg-red-600 hover:bg-red-400 text-white font-semibold py-1 px-2 rounded-sm"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
