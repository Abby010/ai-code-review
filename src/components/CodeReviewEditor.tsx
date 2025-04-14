'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import * as monaco from 'monaco-editor';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

type Feedback = {
  line: number;
  message: string;
};

type Props = {
  code: string;
  feedback: Feedback[];
  language?: string;
};

export default function CodeReviewEditor({ code, feedback, language = 'javascript' }: Props) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [decorations, setDecorations] = useState<string[]>([]);

  const handleEditorMount = (editorInstance: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editorInstance;
  };

  useEffect(() => {
    if (!editorRef.current || !feedback || feedback.length === 0) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const newDecorations = feedback.map((fb) => ({
      range: new monaco.Range(fb.line, 1, fb.line, 1),
      options: {
        isWholeLine: true,
        className: 'bg-yellow-100',
        glyphMarginClassName: 'ai-feedback-glyph',
        hoverMessage: { value: `💡 ${fb.message}` },
      },
    }));

    const newIds = editorRef.current.deltaDecorations(decorations, newDecorations);
    setDecorations(newIds);
  }, [feedback]);

  return (
    <MonacoEditor
      height="500px"
      language={language}
      value={code}
      options={{
        readOnly: true,
        glyphMargin: true,
        minimap: { enabled: false },
      }}
      onMount={handleEditorMount}
    />
  );
}
