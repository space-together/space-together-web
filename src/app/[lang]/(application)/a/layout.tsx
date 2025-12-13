import type React from "react";

interface props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: props) => {
  return <div className="">{children}</div>;
};

export default AdminLayout;
