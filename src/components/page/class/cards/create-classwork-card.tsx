import ClassWorkForm from "@/components/page/class/form/classwork-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuthContext } from "@/lib/utils/auth-context";

interface CreateClassWorkCardProps {
  auth: AuthContext;
}

function CreateClassWorkCard({ auth }: CreateClassWorkCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject name</CardTitle>
      </CardHeader>
      <CardContent>
        <ClassWorkForm />
      </CardContent>
    </Card>
  );
}

export default CreateClassWorkCard;
