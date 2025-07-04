import { useState, useEffect } from "react";

export const useMarkdownEditor = (initialContent: string = "") => {
  const [content, setContent] = useState(initialContent);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"split" | "tabs">("split");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setViewMode(isMobile ? "tabs" : "split");
  }, [isMobile]);

  const preprocessContent = (text: string): string => {
    return text
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\\*/g, "*")
      .replace(/\\_/g, "_");
  };

  const renderMarkdown = (text: string): React.ReactNode => {
    return preprocessContent(text);
  };

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);

    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      const newPosition =
        start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return {
    content,
    setContent,
    isMobile,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    renderMarkdown,
    insertMarkdown,
  };
};
