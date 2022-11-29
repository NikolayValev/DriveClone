import Link from 'next/link';
import BlurImage from '../blur-image';
import { DriveProps } from '@/lib/api/drive';
/**/
/*
components::DirectoryResults() componets::DirectoryResults()

NAME

        DirectoryResults({ drive: DriveProps;})
          - Encapsulates the high order component DirectoryResults.

SYNOPSIS

        DirectoryResults({ drive }: { drive: DriveProps; })
            drive             --> an object with the properties of the directory.

DESCRIPTION

        This function will display the card for a directory result. It has the
        properties of a directory and would be quite easy to change it and add
        more information. The picture that is used is a random picture
        generated to make it easier to the eyes to see multiple one after another.

RETURNS

        Returns markup of precompiled HTML elements and the bootstrapped
        logic associated with the element.

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
