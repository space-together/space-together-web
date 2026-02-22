import CommonEmpty from "@/components/common/common-empty";
import MaterialCard from "@/components/materials/material-card";
import MaterialDialog from "@/components/materials/material-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { LearningMaterial } from "@/lib/schema/learning-material/learning-material-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Learning Materials",
    description: "Manage learning materials for your subject",
  };
};

const TeacherMaterialsPage = async (props: {
  params: Promise<{ lang: Locale; classId: string; subjectId: string }>;
}) => {
  const params = await props.params;
  const { lang, subjectId } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const [materials_res] = await Promise.all([
    apiRequest<void, Paginated<LearningMaterial>>(
      "get",
      `/learning-materials?subject_id=${subjectId}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "learning_material",
      },
    ),
  ]);

  const materials = materials_res?.data?.data ?? [];

  const filterByType = (type: string) =>
    materials.filter((m) => m.type === type);

  return (
    <RealtimeProvider<LearningMaterial>
      channels={[
        {
          name: "learning_material",
          initialData: materials,
        },
      ]}
      context="school"
      authToken={auth.token}
      schoolToken={auth.schoolToken}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Learning Materials</h1>
            <p className="text-muted-foreground">
              Upload and manage learning materials for your students
            </p>
          </div>
          <MaterialDialog auth={auth} subjectId={subjectId} />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All ({materials.length})</TabsTrigger>
            <TabsTrigger value="lesson-notes">
              Lesson Notes ({filterByType("Lesson Note").length})
            </TabsTrigger>
            <TabsTrigger value="resources">
              Resources ({filterByType("Resource").length})
            </TabsTrigger>
            <TabsTrigger value="videos">
              Videos ({filterByType("Video").length})
            </TabsTrigger>
            <TabsTrigger value="files">
              Files ({filterByType("File").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {materials.length === 0 ? (
              <CommonEmpty
                title="No materials yet"
                description="Upload your first learning material to get started"
                icon="/icons/book.png"
              >
                <MaterialDialog auth={auth} subjectId={subjectId} />
              </CommonEmpty>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {materials.map((material) => (
                  <MaterialCard
                    key={material.id || material._id}
                    material={material}
                    role="teacher"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="lesson-notes" className="space-y-4">
            {filterByType("Lesson Note").length === 0 ? (
              <CommonEmpty
                title="No lesson notes"
                description="Upload lesson notes for your students"
                icon="/icons/book.png"
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterByType("Lesson Note").map((material) => (
                  <MaterialCard
                    key={material.id || material._id}
                    material={material}
                    role="teacher"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            {filterByType("Resource").length === 0 ? (
              <CommonEmpty
                title="No resources"
                description="Upload resources for your students"
                icon="/icons/book-stack.png"
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterByType("Resource").map((material) => (
                  <MaterialCard
                    key={material.id || material._id}
                    material={material}
                    role="teacher"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            {filterByType("Video").length === 0 ? (
              <CommonEmpty
                title="No videos"
                description="Add video links for your students"
                icon="/icons/video.png"
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterByType("Video").map((material) => (
                  <MaterialCard
                    key={material.id || material._id}
                    material={material}
                    role="teacher"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            {filterByType("File").length === 0 ? (
              <CommonEmpty
                title="No files"
                description="Upload files for your students"
                icon="/icons/clipboard.png"
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterByType("File").map((material) => (
                  <MaterialCard
                    key={material.id || material._id}
                    material={material}
                    role="teacher"
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </RealtimeProvider>
  );
};

export default TeacherMaterialsPage;
