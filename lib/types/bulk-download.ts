export type BulkDownloadStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface BulkDownloadJob {
    id: string;
    user_id: string;
    urls: string[];
    total_files: number;
    quality_preference: 'auto' | 'best' | '1080p' | '720p' | '480p';
    format_preference: 'mp4' | 'mp3';
    platform?: string;

    status: BulkDownloadStatus;
    progress: number;
    current_file: number;
    completed_files: number;
    failed_files: number;

    zip_storage_path?: string;
    zip_download_url?: string;
    zip_size_bytes?: number;
    zip_expires_at?: string;

    credits_used: number;
    error_message?: string;
    failed_urls?: string[];

    processing_started_at?: string;
    processing_completed_at?: string;
    created_at: string;
    updated_at: string;
}

export interface BulkDownloadRequest {
    urls: string[];
    quality?: string;
    format?: string;
}

export interface BulkDownloadResponse {
    success: boolean;
    jobId?: string;
    message?: string;
    error?: string;
}
