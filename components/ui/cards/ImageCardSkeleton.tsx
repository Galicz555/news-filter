// news-filter/app/components/ui/cards/ImageCardSkeleton.tsx
import React from 'react';

export default function ImageCardSkeleton() {
  return (
    <div className="flex-grow w-full sm:w-[300px] overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="p-0">
        <div className="relative h-[200px] w-full bg-gray-300" />
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-6 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
}
