const ProfileLayout = (props: LayoutProps<"/[lang]/p">) => {
  const { children } = props;

  return <div className="p-4">{children}</div>;
};

export default ProfileLayout;
