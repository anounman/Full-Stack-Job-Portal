import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="m-3">
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
