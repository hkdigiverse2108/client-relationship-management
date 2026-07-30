import { useCallback } from "react";
// import { FiDownload, FiCalendar } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
// import StatCard from "@/components/common/StatCard/StatCard";
// import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";

import { dashboardService } from "@/api/services/dashboardService";
import { useAsync } from "@/hooks/useAsync";


export default function Dashboard() {
  const load = useCallback(() => dashboardService.summary(), []);
  const { data, loading } = useAsync(load, []);
  if (loading || !data) return <Loader />;
  return (
    <>
      <PageHeader
        title="Sales Dashboard"
        description="Track team performance and revenue targets"
        // actions={
        //   <>
        //    <Button variant="hero" icon={FiCalendar} >Last 30 Days</Button>
        //     <Button icon={FiDownload}>Export Report</Button>
             
        //   </>
        // }
      />
     
    </>
  );
}