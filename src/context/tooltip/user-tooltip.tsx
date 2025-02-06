import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import Link from "next/link";

interface props {
  trigger: string | React.ReactNode;
  lang: Locale;
}

export default function UserTooltip({ trigger , lang}: props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent className=" w-72">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className=" size-12">
              <AvatarImage src="/images/2.jpg"
             onError={(e) => (e.currentTarget.src = "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg?t=st=1738836062~exp=1738839662~hmac=510ea2f9b13ba3cc58ae199263d0d0d9b1955c59aa634454b0c142d278ab7845&w=996")} />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <div>
              <div className="space-y-0.5 flex space-x-2">
                <h5 className="text-sm font-medium">Keith Kennedy</h5>
                <p className="text-xs text-muted-foreground">@k.kennedy</p>
              </div>
              <strong className=" text-xs text-myGray ">STUDENT</strong>
            </div>
          </div>
          <div className=" flex space-x-2">
            <div className=" flex -space-x-2 text-myGray items-center text-sm">
              <Dot size={32} />
              <span>SOSTHCS</span>
            </div>
            <div className=" flex -space-x-2 text-myGray items-center text-sm">
              <Dot size={32} />
              <span>L5SOD</span>
            </div>
          </div>
          <Link href={`/${lang}/messages/student`}>
          <Button variant="info" size="sm" className=" w-full">Message</Button>
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
