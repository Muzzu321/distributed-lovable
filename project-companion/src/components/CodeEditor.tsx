import Editor from "@monaco-editor/react";
import { FileCode, Loader2 } from "lucide-react";

interface CodeEditorProps {
  content: string;
  filePath: string | null;
  isLoading?: boolean;
}

export function CodeEditor({
  content,
  filePath,
  isLoading,
}: CodeEditorProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!filePath) {
    return (
      <div className="flex items-center justify-center h-full">
        <FileCode />
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      path={filePath}
      value={content}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
}