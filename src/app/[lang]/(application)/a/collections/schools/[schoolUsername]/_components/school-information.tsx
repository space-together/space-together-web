import AddressCard from "@/components/cards/address-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface SchoolInformationProps {
  auth: AuthContext;
  lang: Locale;
  school: School;
}

const SchoolInformation = ({ auth, lang, school }: SchoolInformationProps) => {
  return (
    <div className=" flex flex-col md:flex-row gap-4 w-full">
      <Card className=" w-full md:w-1/2 ">
        <CardHeader>
          <CardTitle>Other information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>hee</li>
          </ul>
        </CardContent>
      </Card>

      <div className="w-full md:w-1/2">
        {school.address && <AddressCard address={school.address} />}
      </div>
    </div>
  );
};

export default SchoolInformation;
