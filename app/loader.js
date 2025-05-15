'use client';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/75 z-50">
      <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}