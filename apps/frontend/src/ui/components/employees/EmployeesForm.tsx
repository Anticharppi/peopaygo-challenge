import { useEmployees, useForm } from '@ocmi/frontend/lib/hooks';
import { z } from 'zod';
import { Employee } from '@ocmi/frontend/types';
import Button from '../Button';
import React from 'react';

const schema = z.object({
  name: z.string().min(3),
  rate: z.number().min(12),
  paymentType: z.enum(['Hourly', 'Salary']),
  id: z.number().optional(),
});

type Props = {
  employee: Omit<Employee, 'userId'>;
};

const defaultEmployee = {
  name: '',
  rate: 12,
  paymentType: 'Hourly',
  id: 0,
};

const EmployeesForm: React.FC<Props> = ({ employee }) => {
  const form = useForm(employee, schema);
  const { addEmployee, updateEmployee } = useEmployees();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: form.values.name,
      rate: form.values.rate,
      paymentType: form.values.paymentType,
    } as Employee;

    if (!form.values.id) {
      addEmployee(payload);
    } else {
      payload.id = form.values.id as number;
      updateEmployee(payload);
    }
    form.setValues(defaultEmployee);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  onChange={form.onChange}
                  value={form.values.name}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {form.formErrors.name && <p>{form.formErrors.name}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Rate:
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="rate"
                  min={12}
                  step={0.01}
                  onChange={form.onChange}
                  value={form.values.rate}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {form.formErrors.rate && <p>{form.formErrors.rate}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Payment type:
              </label>
              <div className="mt-2">
                <select
                  name="paymentType"
                  value={form.values.paymentType}
                  onChange={form.onChange}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="Hourly">Hourly</option>
                  <option value="Salary">Salary</option>
                </select>
              </div>
              {form.formErrors.paymentType && (
                <p>{form.formErrors.paymentType}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button type="submit" disabled={form.hasErrors}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default EmployeesForm;
