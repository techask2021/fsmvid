import React from "react";
import Image from "next/image";
import { Copy, Check, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DownloadResult } from "@/lib/api";

interface DownloadResultsProps {
  data: DownloadResult;
  onCopyToClipboard: (text: string) => void;
}

export default function DownloadResults({ data, onCopyToClipboard }: DownloadResultsProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (url: string, index: number) => {
    onCopyToClipboard(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 bg-muted/50">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="relative aspect-video w-full md:w-48 overflow-hidden rounded">
                <Image 
                  src={data.thumbnail || "/placeholder.svg"} 
                  alt={data.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 192px"
                  loading="eager"
                  priority
                />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-lg line-clamp-2">{data.title}</h3>
                <p className="text-sm text-muted-foreground">
                  From: <span className="font-medium capitalize">{data.platform}</span>
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  Source: <span className="opacity-70">{data.url}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h4 className="font-medium mb-2">Available Download Options</h4>
            
            <div className="rounded border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quality</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.downloadOptions.map((option, index) => (
                    <TableRow key={index}>
                      <TableCell>{option.quality}</TableCell>
                      <TableCell>{option.format}</TableCell>
                      <TableCell>{option.size || "Unknown"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(option.url, index)}
                          >
                            {copiedIndex === index ? (
                              <Check className="h-4 w-4 mr-1" />
                            ) : (
                              <Copy className="h-4 w-4 mr-1" />
                            )}
                            {copiedIndex === index ? "Copied" : "Copy"}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(option.url)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 