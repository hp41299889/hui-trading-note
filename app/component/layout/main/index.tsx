import MainHeader from "./header";
import MainSider from "./sider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen p-2">
      <MainHeader />
      <div className="flex">
        <MainSider />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
