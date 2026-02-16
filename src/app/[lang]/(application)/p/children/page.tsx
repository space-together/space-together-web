
import MyAvatar from "@/components/common/image/my-avatar";
import NotFoundPage from "@/components/page/not-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Parent } from "@/lib/schema/parent/parent-schema";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { BookOpen, Calendar, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "My Children",
    description: "View your children's information",
  };
};

const ParentChildrenPage = async (props: PageProps<"/[lang]/p/children">) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (auth.user.role !== "PARENT") {
    return (
      <NotFoundPage message="This page is only accessible to parents" />
    );
  }

  // Fetch parent data
  const parent_res = await apiRequest<void, Parent>(
    "get",
    "/parents/me",
    undefined,
    {
      token: auth.token,
      schoolToken: auth.schoolToken,
    },
  );

  if (!parent_res.data) {
    return <NotFoundPage message="Parent profile not found" />;
  }

  const parent = parent_res.data;

  // Fetch children data
  const children_res = await apiRequest<void, StudentWithRelations[]>(
    "get",
    `/school/students?ids=${parent.student_ids.join(",")}`,
    undefined,
    {
      token: auth.token,
      schoolToken: auth.schoolToken,
    },
  );

  const children = children_res.data ?? [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">My Children</h1>
        <p className="text-muted-foreground">
          View and manage your children's information
        </p>
      </div>

      {children.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-[400px] flex-col items-center justify-center space-y-4 p-8">
            <div className="bg-muted rounded-full p-4">
              <BookOpen className="text-muted-foreground h-12 w-12" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-semibold">No Children Found</h3>
              <p className="text-muted-foreground max-w-md">
                No children are currently linked to your account. Please contact
                the school administration.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <Card key={child.id ?? child._id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-4">
                <div className="flex items-center space-x-4">
                  <MyAvatar
                    src={child.image}
                    alt={child.name}
                    size="lg"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {child.class?.name || "No class assigned"}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Gender</p>
                    <p className="font-medium">
                      {child.gender === "MALE"
                        ? "Male"
                        : child.gender === "FEMALE"
                          ? "Female"
                          : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge
                      variant={child.status === "Active" ? "success" : "default"}
                    >
                      {child.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/${lang}/p/children/${child.id ?? child._id}`}
                  >
                    <Button
                      variant="outline"
                      library="daisy"
                      className="w-full"
                      size="sm"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>

                  <Link
                    href={`/${lang}/p/children/${child.id ?? child._id}/attendance`}
                  >
                    <Button
                      variant="outline"
                      library="daisy"
                      className="w-full"
                      size="sm"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Attendance
                    </Button>
                  </Link>

                  <Link
                    href={`/${lang}/p/children/${child.id ?? child._id}/assignments`}
                  >
                    <Button
                      variant="outline"
                      library="daisy"
                      className="w-full"
                      size="sm"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Assignments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParentChildrenPage;
