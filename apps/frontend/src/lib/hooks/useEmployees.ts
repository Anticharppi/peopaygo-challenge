import {
  addEmployeeReducer,
  mergeEmployeesReducer,
  removeEmployeeReducer,
  setEmployeesPaginationReducer,
  updateEmployeeReducer,
  useAddEmployeeMutation,
  useLazyGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from '../features/employees';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useDispatch';
import { Employee, Pagination } from '@ocmi/frontend/types';
import { useMessage } from './useMessage';

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const { employees, pagination } = useAppSelector((state) => state.employees);
  const [triggerGetUsers] = useLazyGetEmployeesQuery();
  const [addEmployeeTrigger] = useAddEmployeeMutation();
  const [updateEmployeeTrigger] = useUpdateEmployeeMutation();
  const { showErrorMessage, showSuccessMessage } = useMessage();

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    addEmployeeTrigger(employee)
      .unwrap()
      .then((data) => {
        showSuccessMessage('Employee added successfully');
        dispatch(addEmployeeReducer(data));
      })
      .catch((e) => showErrorMessage(e.data.message));
  };

  const updateEmployee = (employee: Employee) => {
    updateEmployeeTrigger(employee)
      .unwrap()
      .then((data) => {
        showSuccessMessage('Employee updated successfully');
        dispatch(updateEmployeeReducer(data));
      })
      .catch((e) => showErrorMessage(e.data.message));
  };

  const removeEmployee = (id: number) => {
    dispatch(removeEmployeeReducer(id));
  };

  const getEmployees = (pagination: Pagination) => {
    triggerGetUsers(pagination)
      .unwrap()
      .then((data) => {
        dispatch(mergeEmployeesReducer(data.employees));
        dispatch(setEmployeesPaginationReducer(data.pagination));
      })
      .catch((err) => showErrorMessage(err.data.message));
  };

  return {
    employees,
    pagination,
    addEmployee,
    updateEmployee,
    removeEmployee,
    getEmployees,
  };
};
