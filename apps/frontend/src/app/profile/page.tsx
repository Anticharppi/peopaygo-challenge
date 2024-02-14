'use client';

import { DashboardMenu } from '@ocmi/frontend/ui/components/Menu';
import { ProtectedRoute } from '../ProtectedRoute';
import { useRouter } from 'next/navigation';
import {
  useAppSelector,
  useForm,
  useMessage,
  useUser,
} from '@ocmi/frontend/lib/hooks';
import { z } from 'zod';
import { useEffect } from 'react';
import { AggregatedUpdateUserInfo } from '@ocmi/frontend/types';

const userInfoSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

const passwordInfoSchema = z.object({
  newPassword: z.string().min(8).optional(),
  confirmPassword: z.string().min(8).optional(),
  currentPassword: z.string().min(8).optional(),
});

const initialUserFormState = {
  email: '',
  name: '',
};

const initialPasswordFormState = {
  confirmPassword: '',
  currentPassword: '',
  newPassword: '',
};

export default function Profile() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { updateUser } = useUser();
  const { showErrorMessage } = useMessage();
  const { setValues: setUserInfoFormValues, ...userInfoForm } = useForm(
    initialUserFormState,
    userInfoSchema,
  );

  const passwordForm = useForm(initialPasswordFormState, passwordInfoSchema);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: AggregatedUpdateUserInfo = {
      email: userInfoForm.values.email,
      name: userInfoForm.values.name,
      id: user!.id,
    };

    if (passwordForm.values.newPassword) {
      if (
        passwordForm.values.newPassword !== passwordForm.values.confirmPassword
      ) {
        return showErrorMessage('Passwords do not match');
      }
      payload.newPassword = passwordForm.values.newPassword;
      payload.currentPassword = passwordForm.values.currentPassword;
    }

    updateUser(payload);
  };

  const onInit = () => {
    if (user) {
      setUserInfoFormValues({
        email: user.email,
        name: user.name,
      });
    }
  };

  useEffect(onInit, [user, setUserInfoFormValues]);

  return (
    <ProtectedRoute>
      <DashboardMenu>
        <form onSubmit={onSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      onChange={userInfoForm.onChange}
                      value={userInfoForm.values.name}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {userInfoForm.formErrors.name && (
                      <p>{userInfoForm.formErrors.name}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      onChange={userInfoForm.onChange}
                      name="email"
                      value={userInfoForm.values.email}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {userInfoForm.formErrors.email && (
                      <p>{userInfoForm.formErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>
              <h2 className="text-base font-semibold leading-7 text-gray-900 mt-10">
                Account password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Here you can update your current password.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Current password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      onChange={passwordForm.onChange}
                      value={passwordForm.values.currentPassword}
                      name="currentPassword"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {passwordForm.formErrors.currentPassword && (
                      <p>{passwordForm.formErrors.currentPassword}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    New password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      onChange={passwordForm.onChange}
                      value={passwordForm.values.newPassword}
                      name="newPassword"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {passwordForm.formErrors.newPassword && (
                      <p>{passwordForm.formErrors.newPassword}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      onChange={passwordForm.onChange}
                      name="confirmPassword"
                      value={passwordForm.values.confirmPassword}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {passwordForm.formErrors.confirmPassword && (
                      <p>{passwordForm.formErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </DashboardMenu>
    </ProtectedRoute>
  );
}
