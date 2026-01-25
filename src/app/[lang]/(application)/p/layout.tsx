const ProfileLayout = (props: LayoutProps<"/[lang]/p">) => {
  const { children } = props;

  return <div className="p-4 pt-6">{children}</div>;
};

export default ProfileLayout;
