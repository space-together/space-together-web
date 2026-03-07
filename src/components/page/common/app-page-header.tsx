interface props {
  title: string;
  description?: string;
  total?: number;
  action?: React.ReactNode
}

const AppPageHeader = ({ title, description, total, action }: props) => {
  return (
    <header className="flex flex-row justify-between items-center"> 
    <div>
      <div className=" flex flex-row gap-1">
        <h2 className="h3">
          {total && total <= 0 ? "" : total} {title}
        </h2>
      </div>
      {description && <p>{description}</p>}
    </div>
    <div> {action}</div>
    </header>
  );
};

export default AppPageHeader;
