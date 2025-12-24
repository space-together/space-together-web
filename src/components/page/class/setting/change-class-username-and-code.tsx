import type { Class } from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import ChangeClassUsernameDialog from "../dialog/change-class-username-dialog";
import ChangeClassCode from "./form/change-class-code";

interface ChangeClassUsernameAndCodeProps {
  cls: Class;
  auth: AuthContext;
}

const ChangeClassUsernameAndCode = ({
  cls,
  auth,
}: ChangeClassUsernameAndCodeProps) => {
  return (
    <div className=" flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p>Change class username can have some effects</p>
        <ChangeClassUsernameDialog cls={cls} auth={auth} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Change join class code</p>
        <ChangeClassCode />
      </div>
    </div>
  );
};

export default ChangeClassUsernameAndCode;
