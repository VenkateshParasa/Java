import { Link } from 'react-router-dom'

function Breadcrumbs({ path, metadata }) {
  const pathParts = path ? path.split('/').filter(Boolean) : []

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...pathParts.map((part, index) => ({
      name: formatBreadcrumb(part),
      path: '/content/' + pathParts.slice(0, index + 1).join('/'),
    })),
  ]

  // If we have metadata title, use it for the last breadcrumb
  if (metadata?.title && breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].name = metadata.title
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-gray-900 dark:text-white">{crumb.name}</span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function formatBreadcrumb(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

export default Breadcrumbs
