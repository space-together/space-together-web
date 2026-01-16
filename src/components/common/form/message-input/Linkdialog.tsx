import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkText: string;
  linkUrl: string;
  onLinkTextChange: (text: string) => void;
  onLinkUrlChange: (url: string) => void;
  onConfirm: () => void;
}

export const LinkDialog = ({
  open,
  onOpenChange,
  linkText,
  linkUrl,
  onLinkTextChange,
  onLinkUrlChange,
  onConfirm,
}: LinkDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Link</DialogTitle>
        <DialogDescription>
          Create a link to a web page or file.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="link-text" className="text-xs">
            Text (Optional)
          </Label>
          <Input
            id="link-text"
            value={linkText}
            onChange={(e) => onLinkTextChange(e.target.value)}
            className="h-8 text-sm"
            placeholder="Clickable text"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="link-url" className="text-xs">
            URL
          </Label>
          <Input
            id="link-url"
            value={linkUrl}
            onChange={(e) => onLinkUrlChange(e.target.value)}
            className="h-8 text-sm"
            placeholder="https://example.com"
            autoFocus
          />
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose>
            <Button
              type="button"
              library="daisy"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" library="daisy" size="sm" onClick={onConfirm}>
            Insert
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
);
