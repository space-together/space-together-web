import CommonEmpty from "@/components/common/common-empty";
import ParentDialog from "@/components/page/parent/dialogs/parent-dialog";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  isSchool?: boolean;
  auth: AuthContext;
}

const EmptyParents = ({ isSchool, auth }: Props) => {
  return (
    <CommonEmpty
      title="No parents found"
      description="Get started by adding your first parent."
    >
      {isSchool ? <ParentDialog auth={auth} isSchool /> : undefined}
    </CommonEmpty>
  );
};

export default EmptyParents;
