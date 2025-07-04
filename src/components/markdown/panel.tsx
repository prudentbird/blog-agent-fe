import { Toolbar } from "./toolbar";
import { Textarea } from "~/components/ui/textarea";

export const EditorPanel = ({
  content,
  onContentChange,
  onInsertMarkdown,
  viewMode,
  onViewModeChange,
  isMobile,
}: {
  content: string;
  onContentChange: (content: string) => void;
  onInsertMarkdown: (before: string, after?: string) => void;
  viewMode: "split" | "tabs";
  onViewModeChange: (mode: "split" | "tabs") => void;
  isMobile: boolean;
}) => (
  <div className="flex flex-col h-full">
    <Toolbar
      onInsertMarkdown={onInsertMarkdown}
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
      isMobile={isMobile}
    />
    <Textarea
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      placeholder="Start writing your blog post in Markdown..."
      className="flex-1 resize-none border-0 rounded-none focus:ring-0 font-mono text-sm leading-relaxed p-4"
    />
  </div>
);
