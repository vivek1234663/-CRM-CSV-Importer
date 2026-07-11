"use client";

import CSVUploader from "./components/CSVUploader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6">
          <CSVUploader />
        </div>
      </div>
    </main>
  );
}