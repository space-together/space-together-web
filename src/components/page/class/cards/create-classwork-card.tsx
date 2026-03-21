import ClassWorkForm from "@/components/page/class/form/classwork-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuthContext } from "@/lib/utils/auth-context";

interface CreateClassWorkCardProps {
  auth: AuthContext;
  classUsername?: string;
  subjectCode?: string;
}

function CreateClassWorkCard({
  auth,
  classUsername,
  subjectCode,
}: CreateClassWorkCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject name</CardTitle>
      </CardHeader>
      <CardContent>
        <ClassWorkForm
          auth={auth}
          classUsername={classUsername}
          subjectCode={subjectCode}
        />
      </CardContent>
    </Card>
  );
}

export default CreateClassWorkCard;
