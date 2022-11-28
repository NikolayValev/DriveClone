import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { LoadingDots } from '@/components/icons';
import Image from 'next/image';
import { MenuIcon } from '@heroicons/react/outline';
import Link from 'next/link';
/**/
/*
spmLongShort::ProcessNewOpens() spmLongShort::ProcessNewOpens()

NAME

        Mount({ drive: DriveProps;})
          - Encapsulates the high order component Mount.

SYNOPSIS

        Mount({ drive }: { drive: DriveProps; })
            drive             --> an object with the properties of the directory.

DESCRIPTION

        This function will dispaly the navigation to the profile page when the
        user is logged in. For dev this is would only show the login because
        the session object is dependent on the enviroment and would not
        instantiated the user object correctly. the User colour is randomly
        generated or username specific to make it easy to navigate users
        with no profile picture.

RETURNS

        Returns markup of precompiled HTML elements and the bootstrapped
        logic associated with the element.
*/
/**/
export default function Navbar({
  setSidebarOpen
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  return (
    <nav
      className="absolute right-0 w-full flex items-center justify-between md:justify-end px-4 h-16"
      aria-label="Navbar"
    >
      <button
        type="button"
        className="inline-flex md:hidden items-center justify-center rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-0"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {status !== 'loading' &&
        (session?.user ?
        (
          <Link href={`/${session.username}`}>
            <a className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={
                  session.user.image ||
                  `https://avatar.tobi.sh/${session.user.name}`
                }
                alt={session.user.name || 'User'}
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2PYsGHDfwAHNAMQumvbogAAAABJRU5ErkJggg=="
              />
            </a>
          </Link>
        ) : (
          <button
            disabled={loading}
            onClick={() => {
              setLoading(true);
              signIn();
            }}
            className={`${
              loading
                ? 'bg-gray-200 border-gray-300'
                : 'bg-black hover:bg-white border-black'
            } w-36 h-8 py-1 text-white hover:text-black border rounded-md text-sm transition-all`}
          >
            {loading ? <LoadingDots color="gray" /> : 'Log in'}
          </button>
        ))}
    </nav>
  );
}
