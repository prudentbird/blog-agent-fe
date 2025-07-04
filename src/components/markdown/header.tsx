import { Link } from "@tanstack/react-router";
import { ArrowLeft, Edit3 } from "lucide-react";

export const EditorHeader = ({ contentLength }: { contentLength: number }) => (
  <div className="border-b bg-white/80 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-green-600" />
            <h1 className="text-xl font-semibold text-slate-800">
              Markdown Editor
            </h1>
          </div>
        </div>
        <div className="text-sm text-slate-500">{contentLength} characters</div>
      </div>
    </div>
  </div>
);
