import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  XIcon
} from '@heroicons/react/outline';
import Directory from './directory';
import { DriveProps } from '@/lib/api/drive';
/**/
/*
components::Sidebar() components::Sidebar()

NAME

        Sidebar({ drive: DriveProps;})
          - Encapsulates the high order component Sidebar.

SYNOPSIS

        Sidebar({ sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void;
                  results: DriveProps[]; totalDrives: number;
                  })
            sidebarOpen             --> boolean flag if the sidebar is open.
            setSidebarOpen             --> callback to open the sidebar.
            results             --> an object with the result directories.
            totalDrives             --> an array with all directories to be displayed.

DESCRIPTION

        This function will wrap around the navigation betweeen drives and facilitate
        mobile views. The mobile state closes the sidebar to a hamburger icon that
        when clicked would expand it and make the screen grayed out untill a selection is made.

RETURNS

         Returns markup of precompiled HTML elements and the bootstrapped
        logic associated with the element.
*/
/**/
export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  results,
  totalDrives
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
    results: DriveProps[];
  totalDrives: number;
}) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 bg-black lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex-1 flex flex-col max-w-sm w-full bg-white focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <Directory results={results} totalDrives={totalDrives} />
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
