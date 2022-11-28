import { GetStaticProps } from 'next';
import Profile from '@/components/profile';
import Mount from '@/components/mount';
import {
  getAllDrives,
  DriveProps,
  getDriveCount,
  getFirstDrive
} from '@/lib/api/drive';
import { defaultMetaProps } from '@/components/layout/meta';
import clientPromise from '@/lib/mongodb';


// Default export function for the home page.
export default function Home({ drive }: { drive: DriveProps }) {
  return <Mount drive={drive} />;
}
/**/
/*
[machine_friendly_name]::getStaticProps() [machine_friendly_name]::getStaticProps()

NAME

        getStaticProps(context)
          - Hydrates the View on the home page which is the mount component.

SYNOPSIS

        getStaticProps()

DESCRIPTION

        The function would call the API to get the data to hydrate the page.
        This all happens server side so any call to the DB or API are fine,
        but for sanity sake they are abstracted away so aggrigations from
        multiple datapoints are kept independent.

RETURNS

        Returns the properties needed to load the page and some of the side
        functionality of the webapp.
*/
/**/
export const getStaticProps: GetStaticProps = async () => {

  // Get a list of all available drives
  const results_ = await getAllDrives();
  const totalDrives_ = await getDriveCount();
  const firstDrive_ = await getFirstDrive();

  // Parse the results of the get commands.
  const results = JSON.parse(JSON.stringify(results_));
  const totalDrives = JSON.parse(JSON.stringify(totalDrives_));
  const firstDrive = JSON.parse(JSON.stringify(firstDrive_));
  return {
    props: {
      meta: defaultMetaProps,
      results,
      totalDrives,
      drive: firstDrive
    },
    revalidate: 10
  };
};
