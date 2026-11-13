import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getSettings(): Promise<{
        id: string;
        updatedAt: Date;
        description: string | null;
        key: string;
        value: string;
    }[]>;
    getDraftSettings(): Promise<{
        id: string;
        updatedAt: Date;
        description: string | null;
        key: string;
        value: string;
    }[]>;
    updateSetting(key: string, value: string): Promise<{
        id: string;
        updatedAt: Date;
        description: string | null;
        key: string;
        value: string;
    }>;
    updateBatch(settings: Record<string, string>, userId?: string): Promise<{
        success: boolean;
        count: number;
    }>;
    saveDraft(settings: Record<string, string>, userId?: string): Promise<{
        success: boolean;
        count: number;
    }>;
    publishDraft(userId?: string): Promise<{
        success: boolean;
        publishedCount: number;
    }>;
    discardDraft(): Promise<{
        success: boolean;
        discardedCount: number;
    }>;
}
