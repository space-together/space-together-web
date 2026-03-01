interface props {
  children: React.ReactNode;
}
const MainAuthLayout = ({ children }: props) => {
  return (
    <main className="">
        {children}
    </main>
  );
};

export default MainAuthLayout;
