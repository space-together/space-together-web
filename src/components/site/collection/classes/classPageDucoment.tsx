import MyImage from "@/components/my-components/myImage";
import { Separator } from "@/components/ui/separator";
import DocumentPageStatic, {
  DocumentPageStaticError,
} from "@/utils/static/page/documentPageStatic";
import { formatDate } from "@/utils/functions/format_date_fn";
import { cn } from "@/lib/utils";
import { getClassById } from "@/services/data/class-data";

interface props {
  collectionName: string;
  documentId: string;
}
const ClassPageDocument = async ({ collectionName, documentId }: props) => {
  const data = await getClassById(documentId);

  if (!data) {
    return (
      <DocumentPageStaticError
        collectionName={collectionName}
        documentName={""}
      />
    );
  }

  return (
    <DocumentPageStatic
      collectionName={collectionName}
      documentName={data.name ? data.name : ""}
    >
      <div className="happy-card p-0">
        <div className=" p-4 w-full flex">
          <div className=" w-1/2">
            <MyImage src={"/profiles/b/17.png"} className="size-60" />
          </div>
          <div className=" w-1/2">
            <div className=" flex flex-col gap-2">
              <h3 className={cn("card-title capitalize", "text-warning")}>
                {data?.name}
              </h3>
              <div className=" flex gap-2 flex-col">
                <div className=" flex gap-2">
                  username: <p>{data?.username}</p>
                </div>
                <p>{data?.class_room_id}</p>
                <p className=" text-sm">{data?.code}</p>
                <div>{data?.user_id} </div>
                <p>{data?.created_at && data.created_at.toString()}</p>
                {data?.updated_at && (
                  <p className=" text-warning">
                    {formatDate(data?.updated_at.toString())}
                  </p>
                )}
              </div>
            </div>
            <div className=" py-2 items-center flex gap-2">
              {/* <DeleteUserDialog user={data} /> */}
              {/* <UserDisableButton id={data.id} disable={data.disable} /> */}
              {/* <UpdateUserDialog user={data} usersRole={userRoles} /> */}
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </DocumentPageStatic>
  );
};

export default ClassPageDocument;
