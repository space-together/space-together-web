import ParentDialog from "@/components/page/parent/dialogs/parent-dialog";
import Empty from "@/components/ui/empty";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  isSchool?: boolean;
  auth: AuthContext;
}

const EmptyParents = ({ isSchool, auth }: Props) => {
  return (
    <Empty
      title="No parents found"
      description="Get started by adding your first parent."
      icon="/png/no-items.png"
      action={isSchool ? <ParentDialog auth={auth} isSchool /> : undefined}
    />
  );
};

export default EmptyParents;
