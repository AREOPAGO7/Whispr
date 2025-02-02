import React from 'react';

const MainContentSkeleton = () => {
  return (
    <div className="mx-auto md:ml-64 sm:ml-10 grid grid-cols-1 gap-6 mt-20">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white/5 rounded-lg p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
          
          {/* Image placeholder */}
          <div className="aspect-square w-full bg-white/10 rounded-lg animate-pulse" />
          
          {/* Actions */}
          <div className="flex space-x-4">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="w-8 h-8 rounded bg-white/10 animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContentSkeleton;