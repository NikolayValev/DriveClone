import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import { getDrive, getAllDrives, getDriveCount } from '@/lib/api/drive';
export { default } from '.';

interface Params extends ParsedUrlQuery {
  machine_friendly_name: string;
}

export const getStaticPaths = async () => {
  const results = Object.values(await getAllDrives());
  //TODO
  console.log("[machine_friendly_name].js: ", results);
  /*
  const paths = results.flatMap(({ drives }) =>
    drives.map((drive) => ({ params: { machine_friendly_name: drive.machine_friendly_name } }))
  );
  */
  const paths = results.map(getMachineNames)
  function getMachineNames(item) {
    return { params: { machine_friendly_name: item.machine_friendly_name } }
  }
  //const paths = results.map(({drive}) => (params: { machine_friendly_name: drive.machine_friendly_name }));

  return {
    paths,
    fallback: true
  };
};

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
