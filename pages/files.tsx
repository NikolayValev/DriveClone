import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';

export default function Files() {

  return(
    <div className =" text-gray-700">KUR</div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const firstUser = await getFirstUser();
  return {
    props: {
      meta: defaultMetaProps,
      results,
      totalUsers,
      user: firstUser
    },
    revalidate: 10
  };
};