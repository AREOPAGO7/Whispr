import React from 'react';

const LeftSidebarSkeleton = () => {
  return (
    <div className="hidden md:block lg:w-80 w-64 fixed left-0 top-0 h-screen p-6 border-r border-white/10">
      {/* Profile skeleton */}
      <div className="mt-16 p-2 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
            <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Navigation skeleton */}
      <div className="mt-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-3">
            <div className="w-5 h-5 rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebarSkeleton;