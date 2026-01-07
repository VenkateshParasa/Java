function LoadingSkeleton() {
  return (
    <div className="max-w-4xl animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
      </div>

      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        
        {/* Tags skeleton */}
        <div className="flex gap-2 mt-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
        </div>

        {/* Button skeleton */}
        <div className="mt-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-8"></div>
        
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        
        {/* Code block skeleton */}
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mt-6"></div>
        
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mt-6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  )
}

export default LoadingSkeleton