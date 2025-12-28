import { MoreVertical, MessageSquare, Share2, Save } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MessageCardProps {
  senderName: string
  senderRole: string
  timestamp: string
  content: string
  commentCount: number
  avatarUrl?: string
}

const MessageCard = ({ senderName, senderRole, timestamp, content, commentCount, avatarUrl }: MessageCardProps) => {
  return (
    <div className="w-full  overflow-hidden ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={senderName} />
            <AvatarFallback>{senderName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold leading-none tracking-tight">{senderName}</h3>
            <p className="text-xs text-muted-foreground mt-1">{senderRole}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <span className="text-xs">{timestamp}</span>
          <div>
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm leading-relaxed text-foreground">{content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm font-medium">{commentCount}</span>
        </div>
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div>
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </div>
          <div>
            <Save className="h-5 w-5" />
            <span className="sr-only">Save</span>
          </div>
        </div>
      </CardFooter>
    </div>
  )
}

export default MessageCard;