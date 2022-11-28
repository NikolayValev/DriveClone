import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import { getDrive, getAllDrives, DriveProps, getDriveCount } from '@/lib/api/drive';
export { default } from '.';
import Mount from '@/components/mount';

// Returns the machine - friendly URL.
interface Params extends ParsedUrlQuery {
  machine_friendly_name: string;
}
// Drive page.
export function DrivePage({ drive }: { drive: DriveProps }) {
  return <Mount drive={drive} />;
}
/**/
/*
[machine_friendly_name]pages::getStaticPaths() [machine_friendly_name]::getStaticPaths()

NAME

        getStaticPaths()
          - Generates SSRed pages during build and hotlaods new ones on change.

DESCRIPTION

        The function Preloads the descriptors for the fils stored in the bucket.
        It loads the necesarry Information for the Sidebar and the Lazy loaded
        componets on the page that is vissible.

RETURNS

      Promise with contents:
      {
        paths: { params: { machine_friendly_name: string;};}[];
        fallback: boolean;
      }
        Returns a promise object that instantiates the paths accessible to the
        user dynamically. the user can have path available at /quack55 despite
        only seeing the first 10 in the UI.
*/
/**/
export const getStaticPaths = async () => {
  //TODO This is where we laod all the available drives shared on the network.
  const results = Object.values(await getAllDrives());
  //TODO
  console.log("[machine_friendly_name].js: ", results);
  /*
  const paths = results.flatMap(({ drives }) =>
    drives.map((drive) => ({ params: { machine_friendly_name: drive.machine_friendly_name } }))
  );
  */

  const paths = results.map(i => getMachineNames(i))
  function getMachineNames(item: any) {
    return { params: { machine_friendly_name: item.machine_friendly_name } }
  }
  //const paths = results.map(({drive}) => (params: { machine_friendly_name: drive.machine_friendly_name }));

  return {
    paths,
    fallback: true
  };
};
/**/
/*
[machine_friendly_name]::getStaticProps() [machine_friendly_name]::getStaticProps()

NAME

        getStaticProps(context)
          - Hydrates the View on the dynamically generated path.

SYNOPSIS

        getStaticProps(context)
            context             --> the context of the browser.

DESCRIPTION

        The function would call the API to get the data to hydrate the page.
        This all happens server side so any call to the DB or API are fine,
        but for sanity sake they are abstracted away so aggrigations from
        multiple datapoints are kept independent.

RETURNS

        Returns the properties needed to load the page.
*/
/**/
export const getStaticProps: GetStaticProps = async (context) => {
  const { machine_friendly_name } = context.params as Params;
  const drive = await getDrive(machine_friendly_name);
  if (!drive) {
    return {
      notFound: true,
      revalidate: 10
    };
  }

  const results = JSON.parse(JSON.stringify(await getAllDrives()));
  const totalDrives = await getDriveCount();
  const meta = {
    ...defaultMetaProps,
    title: `${drive.name}'s Contents | Storage Squire`
  };

  return {
    props: {
      meta,
      results,
      totalDrives,
      drive
    },
    revalidate: 10
  };
};
