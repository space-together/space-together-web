interface props {
  title: string;
  description: string;
  total?: number;
}

const AppPageHeader = ({ title, description, total }: props) => {
  return (
    <div>
      <div className=" flex flex-row gap-1">
        <h2 className="title-page">
          {total && total <= 0 ? "" : total} {title}
        </h2>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default AppPageHeader;
