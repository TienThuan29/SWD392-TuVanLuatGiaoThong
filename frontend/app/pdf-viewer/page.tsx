'use client'

import { useSearchParams } from 'next/navigation';

export default function PDFViewer() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  console.log("url : ", url);

  if (!url) {
    return <div className="p-4 text-red-500">Không tìm thấy file PDF.</div>;
  }

  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div className="w-full h-screen p-4">
      <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
        <iframe
          src={googleViewerUrl}
          className="w-full h-full"
          title="PDF Viewer"
        />
      </div>
    </div>
  );
}