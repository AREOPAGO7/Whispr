import React from 'react';

const RightSidebarSkeleton = () => {
  return (
    <div className="xl:w-72 fixed hidden 2xl:block right-20 top-16 h-screen p-6 border-l border-white/10">
      {/* Suggested users skeleton */}
      <div className="mb-8 mt-2 space-y-4">
        <div className="h-5 w-32 bg-white/5 rounded animate-pulse" />
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-8 w-16 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Trending tags skeleton */}
      <div className="space-y-4">
        <div className="h-5 w-36 bg-white/5 rounded animate-pulse" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-28 bg-white/5 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
};

export default RightSidebarSkeleton;