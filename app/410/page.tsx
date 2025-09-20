import { Metadata } from 'next'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'Page No Longer Available - 410 Gone',
  description: 'This page has been permanently removed and is no longer available.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function GonePage() {
  // Return 410 status code
  const headersList = headers()
  
  // This will only work in production, not in development
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">410</h1>
      <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-300 mb-6">Page Gone</h2>
      <p className="max-w-md text-gray-500 dark:text-gray-400 mb-8">
        This page has been permanently removed and is no longer available. 
        The content you are looking for has been moved to a new location or has been discontinued.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Go to Homepage
      </a>
    </div>
  )
} 
