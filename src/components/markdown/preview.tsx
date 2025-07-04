import { Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const PreviewPanel = ({
  content,
  renderMarkdown,
  showHeader = false,
}: {
  content: string;
  renderMarkdown: (text: string) => React.ReactNode;
  showHeader?: boolean;
}) => (
  <div className="h-full overflow-auto">
    {showHeader && (
      <div className="border-b p-2 bg-slate-50/50 flex items-center gap-2">
        <Eye className="w-4 h-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">Preview</span>
      </div>
    )}
    <div className="p-6 prose prose-slate max-w-none">
      <ReactMarkdown>{renderMarkdown(content) as string}</ReactMarkdown>
    </div>
  </div>
);
