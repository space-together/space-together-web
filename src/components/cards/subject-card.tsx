import MyImage from "../my-components/myImage";

const SubjectCard = () => {
  return (
    <div className=" happy-card space-y-2">
      <div className=" flex space-x-2">
        <MyImage src="/images/3.jpg" className=" size-10" classname=" card" />
        <div className=" flex flex-col">
          <strong className=" text-lg">React js</strong>
          <span className=" font-medium text-sm">SPJJEN</span>
        </div>
      </div>
      <div>
        <div className="">
          Class room : <span className=" font-medium">L5SOD</span>
        </div>
        <div>
          Topics : <span className=" font-medium">3</span>
        </div>
        <div>
          Type : <span className=" font-medium">General</span>
        </div>
      </div>
      <div>
        <span className=" font-medium">Purpose:</span>
        <p className=" line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolores dolorem, quas veniam qui vel nihil incidunt tempora non rem facere earum voluptatibus animi quaerat in doloribus ipsam, expedita voluptates?</p>
      </div>
    </div>
  );
};

export default SubjectCard;
