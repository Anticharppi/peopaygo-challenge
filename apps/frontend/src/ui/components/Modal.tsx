'use client';

import { Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type Props = PropsWithChildren<{
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export default function Modal({ title, children, isOpen, setIsOpen }: Props) {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="mx-auto p-5 w-11/12 rounded bg-white">
              <Dialog.Title className="font-semibold text-left flex justify-between">
                <div>{title}</div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-gray-200 text-gray-600 w-8 h-8 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </Dialog.Title>

              {children}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
