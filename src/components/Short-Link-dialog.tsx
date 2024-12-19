import { Copy } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type ShortLinkDialogProps = {
  isOpen: boolean;
  shortUrl: string;
  onClose: () => void;
};

export default function ShortLinkDialog({
  isOpen,
  shortUrl,
  onClose,
}: ShortLinkDialogProps) {
  function copyAndRedirectToLinksPage() {
    navigator.clipboard.writeText(shortUrl);
    redirect("/dashboard/links");
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your short link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" readOnly value={shortUrl} />
          </div>
          <Button
            variant="ghost"
            type="submit"
            size="sm"
            className="px-3"
            onClick={copyAndRedirectToLinksPage}
          >
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
