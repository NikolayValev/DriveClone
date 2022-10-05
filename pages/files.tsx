import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';
import Mount from '@/components/mount';
export default function Files({ user }: { user: UserProps }) {

  return(
    <Mount user={user} settings={false} />
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