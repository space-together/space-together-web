import MyImage from "../my-components/myImage";

interface props {
    description : string;
}
const NotFoundItemsPage = ({description} : props) => {
  return (
    <div className="flex w-full justify-center">
      <div className=" flex flex-col">
        <MyImage className=" h-80 w-96" classname=" object-contain" src="/png/not-found.png" />
        <div>
          <div className="text-center">
           <p className=" ">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundItemsPage
