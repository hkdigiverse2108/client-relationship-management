import PageHeader from "@/components/common/PageHeader/PageHeader";
import UserManagement from "@/components/users/UserManagement";

export default function UserManagementPage() {
  return (
    <>
      <PageHeader 
        title="Super Admin Console" 
        description="System-wide administration & configuration" 
      />
      <div className="card p-4 mt-3">
        <UserManagement />
      </div>
    </>
  );
}
