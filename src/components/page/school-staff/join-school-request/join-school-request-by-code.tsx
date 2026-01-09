import NoItemsPage from "@/components/common/pages/no-items-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import CopySchoolCodeButton from "./copy-school-code-button";

interface JoinSchoolRequestByCodeProps {
  auth: AuthContext;
}

const JoinSchoolRequestByCode = async ({
  auth,
}: JoinSchoolRequestByCodeProps) => {
  const school = await apiRequest<{ fields: string[] }, School>(
    "get",
    `/schools/${auth.school?.id}`,
    { fields: ["name", "username", "code"] },
    { token: auth.token },
  );

  if (!school.data) {
    return (
      <NoItemsPage
        title="It look no school found! 😥"
        details={school.message}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join school by code & username</CardTitle>
        <CardDescription>
          Join school by code help people join the school easily.
        </CardDescription>
      </CardHeader>
      <CardContent className=" flex flex-col gap-4">
        <h4 className=" h6">School Code</h4>
        <div className=" flex gap-2 items-center">
          <span className=" h4">{school.data.code}</span>
          {school.data.code && (
            <CopySchoolCodeButton value={school.data.code} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinSchoolRequestByCode;
