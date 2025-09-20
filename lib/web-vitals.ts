import { onCLS, onFID, onLCP, onINP } from "web-vitals"

export function reportWebVitals() {
  onCLS(sendToAnalytics)
  onFID(sendToAnalytics)
  onLCP(sendToAnalytics)
  onINP(sendToAnalytics)
}

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric)

  // Example: send to Google Analytics
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id,
  })

  // Use `navigator.sendBeacon()` if available
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/vitals", body)
  } else {
    // Fall back to fetch
    fetch("/api/vitals", {
      body,
      method: "POST",
      keepalive: true,
    })
  }
}
