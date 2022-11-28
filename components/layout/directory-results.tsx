import Link from 'next/link';
import BlurImage from '../blur-image';
import { DriveProps } from '@/lib/api/drive';
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

        This function will attempt to open the trading object a_obj with the
        specified amount of capital. Before attempting the open, it will
        apply portfolio constraints. If any of the portfolio constraints are
        not met, this object will be opened as a phantom.  The constraint
        may also reduce the amount of capital to be applied.

        The status flags and phantom flag for the object will be set
        appropriately.

RETURNS

        Returns true if the open was successful and false if it was opened
        as a phantom.  One of these two cases will always occur.
*/
/**/
export default function DirectoryResults({ drives }: { drives: DriveProps[] }) {
  return (
    <ul role="list" className="relative z-0 directory-divide-y">
      {drives.map((drive) => (
        <li key={drive.name}>
          <Link href={`/${drive.machine_friendly_name}`}>
            <a>
              <div className="relative px-6 py-4 flex items-center space-x-3 focus-within:ring-0">
                <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                  <BlurImage
                    src={drive.image}
                    alt={drive.name}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <div className="flex items-center space-x-1">
                    <p className="text-sm font-medium text-white truncate">
                      {drive.name}
                    </p>
                  </div>
                  <p className="text-sm text-dark-accent-5 truncate">
                    {drive.user}@{drive.ip_address}:{drive.port}
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
