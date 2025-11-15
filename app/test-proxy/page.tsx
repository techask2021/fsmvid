'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export default function TestProxyPage() {
  const [testUrl, setTestUrl] = useState('https://www.tiktok.com/@zachking/video/7086367003569278254')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testEndpoint = async (endpoint: string) => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: testUrl })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(`Status ${response.status}: ${JSON.stringify(data, null, 2)}`)
      } else {
        setResult(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Proxy Endpoint Tester</CardTitle>
            <CardDescription className="text-blue-200">
              Test different proxy endpoints to debug the 500 error issue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testUrl" className="text-white">Test URL</Label>
              <Input
                id="testUrl"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                className="bg-white/20 text-white border-white/30"
                placeholder="Enter a video URL to test"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => testEndpoint('/api/proxy-minimal')}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                Test /api/proxy-minimal
              </Button>

              <Button
                onClick={() => testEndpoint('/api/proxy-test')}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                Test /api/proxy-test
              </Button>

              <Button
                onClick={() => testEndpoint('/api/proxy')}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                Test /api/proxy (Original)
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="bg-red-900/30 border-red-500/50">
            <CardHeader>
              <CardTitle className="text-red-200">❌ Error</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-red-100 whitespace-pre-wrap text-sm overflow-auto max-h-96">
                {error}
              </pre>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="bg-green-900/30 border-green-500/50">
            <CardHeader>
              <CardTitle className="text-green-200">✅ Success</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-green-100 whitespace-pre-wrap text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">📋 Test Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-100 space-y-2 text-sm">
            <p>1. <strong className="text-white">/api/proxy-minimal</strong> - Ultra-minimal proxy with ZERO dependencies</p>
            <p>2. <strong className="text-white">/api/proxy-test</strong> - Test proxy without security middleware</p>
            <p>3. <strong className="text-white">/api/proxy</strong> - Original proxy (currently broken with 500 error)</p>
            <p className="mt-4 text-yellow-200">
              ⚠️ If proxy-minimal works but proxy fails, the issue is with security middleware imports (caching, bot detection)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
