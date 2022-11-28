import { useState, ReactNode } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Directory from './directory';
import { DriveProps } from '@/lib/api/drive';
import Toast from '@/components/layout/toast';
import Meta, { MetaProps } from '@/components/layout/meta';
import { useRouter } from 'next/router';
import { LoadingDots } from '@/components/icons';
import ClusterProvisioning from '@/components/layout/cluster-provisioning';

export default function Layout({
  meta,
  results,
  totalDrives,
  machine_friendly_name,
  clusterStillProvisioning,
  children
}: {
  meta: MetaProps;
  results: DriveProps[];
  totalDrives: number;
  machine_friendly_name?: string;
  clusterStillProvisioning?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (router.isFallback) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <LoadingDots color="white" />
      </div>
    );
  }

  // You should remove this once your MongoDB Cluster is fully provisioned
  if (clusterStillProvisioning) {
    return <ClusterProvisioning />;
  }

  return (
    <div className="w-full mx-auto h-screen flex overflow-hidden bg-black">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        results={results}
        totalDrives={totalDrives}
      />

      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {/* Navbar */}
            <Navbar setSidebarOpen={setSidebarOpen} />

            {children}
          </main>
          <div className="hidden md:order-first h-screen md:flex md:flex-col">
            <Directory results={results} totalDrives={totalDrives} />
          </div>
        </div>
      </div>
    </div>
  );
}
