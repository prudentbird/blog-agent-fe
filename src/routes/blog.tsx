import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { z } from "zod/v4";
import { Eye, Edit3 } from "lucide-react";
import { Card } from "~/components/ui/card";
import { zodValidator } from "@tanstack/zod-adapter";
import { createFileRoute } from "@tanstack/react-router";
import { useMarkdownEditor } from "~/hooks/use-markdown";
import { EditorPanel } from "~/components/markdown/panel";
import { EditorHeader } from "~/components/markdown/header";
import { PreviewPanel } from "~/components/markdown/preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const blogParamsSchema = z.object({
  content: z.string(),
});

export const Route = createFileRoute("/blog")({
  component: RouteComponent,
  validateSearch: zodValidator(blogParamsSchema),
});

function RouteComponent() {
  const { content: contentParam } = Route.useSearch();
  const blogContent =
    contentParam ??
    `# Welcome to the Markdown Editor

## Features

This editor supports:

- **Bold text**
- *Italic text*
- \`Inline code\`
- [Links](https://example.com)
- Lists and more!

### Code Blocks

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Blockquotes

> This is a blockquote with some **bold** text.

Enjoy writing! ✨`;

  const {
    content,
    setContent,
    isMobile,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    renderMarkdown,
    insertMarkdown,
  } = useMarkdownEditor(blogContent);

  return (
    <div className="min-h-screen bg-slate-50">
      <EditorHeader contentLength={content.length} />

      <div className="h-[calc(100vh-80px)]">
        {viewMode === "split" ? (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full rounded-none border-r p-0">
                <EditorPanel
                  content={content}
                  onContentChange={setContent}
                  onInsertMarkdown={insertMarkdown}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  isMobile={isMobile}
                />
              </Card>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full rounded-none p-0">
                <PreviewPanel
                  content={content}
                  renderMarkdown={renderMarkdown}
                  showHeader={true}
                />
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "write" | "preview")
            }
            className="h-full"
          >
            <TabsList className="w-full rounded-none bg-white border-b">
              <TabsTrigger value="write" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Write
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="h-[calc(100%-40px)] mt-0">
              <Card className="h-full rounded-none border-0 p-0">
                <EditorPanel
                  content={content}
                  onContentChange={setContent}
                  onInsertMarkdown={insertMarkdown}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  isMobile={isMobile}
                />
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="h-[calc(100%-40px)] mt-0">
              <Card className="h-full rounded-none border-0 p-0">
                <PreviewPanel
                  content={content}
                  renderMarkdown={renderMarkdown}
                />
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
