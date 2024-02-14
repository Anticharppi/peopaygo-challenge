'use client';

import Table from '@ocmi/frontend/ui/components/Table';
import { ProtectedRoute } from '../ProtectedRoute';
import { DashboardMenu } from '@ocmi/frontend/ui/components/Menu';
import Modal from '@ocmi/frontend/ui/components/Modal';
import EmployeesForm from '@ocmi/frontend/ui/components/employees/EmployeesForm';
import { useEmployees } from '@ocmi/frontend/lib/hooks';
import { useEffect, useState } from 'react';
import Button from '@ocmi/frontend/ui/components/Button';

const headers = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'rate', title: 'Rate' },
  { key: 'paymentType', title: 'Payment Type' },
];

const itemsPerPage = 10;

const initialState = {
  name: '',
  rate: 12,
  paymentType: 'Hourly',
  id: 0,
};

export default function Employees() {
  const { employees, getEmployees } = useEmployees();
  const [showModal, setShowModal] = useState(false);
  const [employee, setEmployee] = useState(initialState);

  const openModal = () => {
    setShowModal(true);
  };

  const onUpdate = (id: number) => {
    const employee = employees.find((e) => e.id === id)!;
    setEmployee(employee);
    setShowModal(true);
  };

  const onDelete = (id: number) => {
    console.log('Delete employee with id:', id);
  };

  const fetchEmployees = () => {
    getEmployees({ offset: 0, limit: itemsPerPage });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchEmployees, []);

  return (
    <ProtectedRoute>
      <DashboardMenu>
        <div className="text-right mb-2">
          <Button onClick={() => openModal()} type="button">
            Create Employee
          </Button>
        </div>
        <Modal isOpen={showModal} setIsOpen={setShowModal} title="Empleados">
          <EmployeesForm employee={employee} />
        </Modal>
        <hr />
        <Table
          data={employees}
          headers={headers}
          onDelete={onDelete}
          onUpdate={onUpdate}
          itemsPerPage={itemsPerPage}
        />
      </DashboardMenu>
    </ProtectedRoute>
  );
}
