"use client";

import MyImage from "@/components/common/myImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearningMaterial } from "@/lib/schema/learning-material/learning-material-schema";
import { formatDistanceToNow } from "date-fns";
import { Download, FileText, Play } from "lucide-react";

interface Props {
  material: LearningMaterial & {
    teacher?: { name: string; image?: string };
  };
  role: "teacher" | "student" | "parent";
  onEdit?: () => void;
  onDelete?: () => void;
}

const MaterialCard = ({ material, role, onEdit, onDelete }: Props) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lesson Note":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200";
      case "Resource":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
      case "Video":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200";
      case "File":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200";
    }
  };

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop()
        : new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return null;
  };

  const handleDownload = () => {
    if (material.file_url) {
      window.open(material.file_url, "_blank");
    }
  };

  const handleVideoOpen = () => {
    if (material.video_url) {
      window.open(material.video_url, "_blank");
    }
  };

  const embedUrl = material.video_url ? getVideoEmbedUrl(material.video_url) : null;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {material.type === "Video" ? (
                <Play className="h-4 w-4" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              {material.title}
            </CardTitle>
          </div>
          <Badge className={getTypeColor(material.type)}>{material.type}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {material.description && (
          <p className="text-sm line-clamp-2">{material.description}</p>
        )}

        {material.type === "Video" && embedUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={material.title}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          {material.teacher && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {material.teacher.image && (
                <MyImage
                  src={material.teacher.image}
                  alt={material.teacher.name}
                  sizes="8"
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span>{material.teacher.name}</span>
            </div>
          )}
        </div>

        {material.created_at && (
          <p className="text-xs text-muted-foreground">
            Uploaded {formatDistanceToNow(new Date(material.created_at), { addSuffix: true })}
          </p>
        )}

        {!material.is_published && (
          <Badge variant="outline" className="text-xs">
            Draft
          </Badge>
        )}

        <div className="flex gap-2 pt-2">
          {role === "student" || role === "parent" ? (
            <>
              {material.file_url && (
                <Button
                  size="sm"
                  variant="outline"
                  library="daisy"
                  onClick={handleDownload}
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
              {material.video_url && !embedUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  library="daisy"
                  onClick={handleVideoOpen}
                  className="flex-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Video
                </Button>
              )}
            </>
          ) : (
            <>
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  library="daisy"
                  onClick={onEdit}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  size="sm"
                  variant="outline"
                  library="daisy"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
