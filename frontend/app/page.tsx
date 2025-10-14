'use client';

import { useState } from 'react';
import type { Editor } from 'grapesjs';
import GrapesJsStudio, {
  StudioCommands,
  ToastVariant
} from '@grapesjs/studio-sdk/react';

import '@grapesjs/studio-sdk/style';

export default function Home() {
  const [editor, setEditor] = useState<Editor>();

  const onReady = (editor: Editor) => {
    console.log('Editor loaded', editor);
    setEditor(editor);
  };

  const showToast = (id: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: 'Toast header',
      content: 'Data logged in console',
      variant: ToastVariant.Info
    });

  const getProjetData = () => {
    if (editor) {
      console.log({ projectData: editor?.getProjectData() });
      showToast('log-project-data');
    }
  };

  const getExportData = () => {
    if (editor) {
      console.log({ html: editor?.getHtml(), css: editor?.getCss() });
      showToast('log-html-css');
    }
  };

  return (
    <main className='flex h-screen flex-col justify-between gap-2 p-5'>
      <div className='flex gap-5 p-1'>
        <div className='font-bold'>SDK example Next.js</div>
        <button className='rounded border px-2' onClick={getProjetData}>
          Log Project Data
        </button>
        <button className='rounded border px-2' onClick={getExportData}>
          Log HTML/CSS
        </button>
      </div>
      <div className='h-full w-full flex-1 overflow-hidden'>
        <GrapesJsStudio
          onReady={onReady}
          options={{
            licenseKey: 'YOUR_LICENSE_KEY',
            project: {
              default: {
                pages: [
                  {
                    name: 'Home',
                    component: `<h1 style="padding: 2rem; text-align: center">
                      Hello Studio 👋
                    </h1>`
                  }
                ]
              }
            }
          }}
        />
      </div>
    </main>
  );
}
