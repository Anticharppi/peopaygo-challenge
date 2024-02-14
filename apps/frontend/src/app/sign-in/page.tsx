'use client';

import { useSignInMutation } from '@ocmi/frontend/lib/features/auth';
import { useAuth, useForm, useMessage } from '@ocmi/frontend/lib/hooks';
import { CustomFetchBaseQueryError } from '@ocmi/frontend/types';
import Link from 'next/link';
import { z } from 'zod';
import { PublicRoute } from '../PublicRoute';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const initialState = {
  email: '',
  password: '',
};

export default function Example() {
  const { values, onChange, formErrors } = useForm(initialState, schema);
  const [trigger] = useSignInMutation();
  const { showErrorMessage, showSuccessMessage } = useMessage();
  const { signIn, storeToken } = useAuth();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trigger({
      email: values.email,
      password: values.password,
    })
      .unwrap()
      .then((data) => {
        console.log({ data });

        storeToken(data.access_token);
        signIn(data.user);
        showSuccessMessage('Welcome.');
      })
      .catch((err: CustomFetchBaseQueryError) => {
        showErrorMessage(err.data.message);
      });
  };

  return (
    <PublicRoute>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in into your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email:
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={onChange}
                  value={values.email}
                  required
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formErrors.email && <p>{formErrors.email}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password:
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  onChange={onChange}
                  value={values.password}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formErrors.password && <p>{formErrors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={Object.keys(formErrors).length > 0}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </form>

          <p className="mt-5 text-center text-sm">
            <Link
              href="/sign-up"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}
