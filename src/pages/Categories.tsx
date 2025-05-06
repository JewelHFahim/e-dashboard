import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import RecentOrders from "../components/ecommerce/RecentOrders";

const Categories = () => {
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Products" />

      <div>
        <RecentOrders />
      </div>
    </div>
  );
};

export default Categories;
