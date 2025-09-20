"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
    
    // Check if error is related to translation
    const isTranslationError = 
      error.message?.includes('translation') || 
      error.message?.includes('Unexpected token') ||
      error.stack?.includes('google') ||
      error.stack?.includes('translate');
      
    if (isTranslationError) {
      console.warn("Possible translation-related error detected");
    }
  }, [error])

  // Safe error message handling
  const getErrorMessage = () => {
    try {
      // First try to get the error message
      if (error.message && typeof error.message === 'string') {
        return error.message;
      }
      
      // If there's a digest, use that as fallback
      if (error.digest) {
        return `Error ID: ${error.digest}`;
      }
      
      // Default message
      return "We encountered an error while processing your request. Please try again.";
    } catch (e) {
      // Ultimate fallback
      return "An unexpected error occurred. Please try again.";
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]" translate="no">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-center text-xl" translate="no">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground" translate="no">
            {getErrorMessage()}
          </p>
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-md">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              If you're using browser translation, try disabling it and reload the page.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => (window.location.href = "/")} translate="no">
            Go Home
          </Button>
          <Button onClick={() => {
            // Clear any translation-related state
            if (window.location.search.includes('translate')) {
              window.location.href = window.location.pathname;
              return;
            }
            reset();
          }} translate="no">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
