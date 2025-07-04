import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Bold,
  Italic,
  Link,
  Code,
  ListOrdered,
  Underline,
  type LucideIcon,
} from "lucide-react";

export const Toolbar = ({
  onInsertMarkdown,
  viewMode,
  onViewModeChange,
  isMobile,
}: {
  onInsertMarkdown: (before: string, after?: string) => void;
  viewMode: "split" | "tabs";
  onViewModeChange: (mode: "split" | "tabs") => void;
  isMobile: boolean;
}) => (
  <div className="flex items-center gap-1 p-2 border-b bg-slate-50/50">
    <ToolbarButton
      onClick={() => onInsertMarkdown("**", "**")}
      icon={Bold}
      tooltip="Bold"
    />
    <ToolbarButton
      onClick={() => onInsertMarkdown("_", "_")}
      icon={Italic}
      tooltip="Italic"
    />
    <ToolbarButton
      onClick={() => onInsertMarkdown("~", "~")}
      icon={Underline}
      tooltip="Strikethrough"
    />
    <Separator orientation="vertical" className="h-6 mx-1" />
    <ToolbarButton
      onClick={() => onInsertMarkdown("`", "`")}
      icon={Code}
      tooltip="Inline Code"
    />
    <ToolbarButton
      onClick={() => onInsertMarkdown("[", "](url)")}
      icon={Link}
      tooltip="Link"
    />
    <Separator orientation="vertical" className="h-6 mx-1" />
    <ToolbarButton
      onClick={() => onInsertMarkdown("1. ")}
      icon={ListOrdered}
      tooltip="Ordered List"
    />

    <div className="ml-auto flex items-center gap-2">
      <Button
        variant={viewMode === "split" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("split")}
        className="text-xs"
        disabled={isMobile}
      >
        Split View
      </Button>
      <Button
        variant={viewMode === "tabs" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("tabs")}
        className="text-xs"
      >
        Tabs
      </Button>
    </div>
  </div>
);

const ToolbarButton = ({
  onClick,
  icon: Icon,
  tooltip,
}: {
  onClick: () => void;
  icon: LucideIcon;
  tooltip: string;
}) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    className="h-8 w-8 p-0 hover:bg-slate-100"
    title={tooltip}
  >
    <Icon className="h-4 w-4" />
  </Button>
);
