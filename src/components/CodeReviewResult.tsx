'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Monaco } from '@monaco-editor/react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

type Feedback = {
  line: number;
  message: string;
};

export default function CodeReviewResult({
  code,
  feedback,
}: {
  code: string;
  feedback: Feedback[];
}) {
  return (
    <MonacoEditor
      height="400px"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      options={{
        readOnly: true,
        minimap: { enabled: false },
      }}
      onMount={(editorInstance, monaco: Monaco) => {
        const decorations = feedback.map((fb) => ({
          range: new monaco.Range(fb.line, 1, fb.line, 1),
          options: {
            isWholeLine: true,
            className: 'bg-yellow-100',
            hoverMessage: { value: `💡 ${fb.message}` },
          },
        }));

        editorInstance.deltaDecorations([], decorations);
      }}
    />
  );
}
