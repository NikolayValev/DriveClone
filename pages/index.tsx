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

export default function Home({ drive }: { drive: DriveProps }) {
  return <Mount drive={drive} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const results_ = await getAllDrives();
  const totalDrives_ = await getDriveCount();
  const firstDrive_ = await getFirstDrive();

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
