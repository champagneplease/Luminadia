import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class ContentService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    getAllSettings(): Promise<{
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
    updateBatchSettings(settings: Record<string, string>, userId?: string): Promise<{
        success: boolean;
        count: number;
    }>;
    saveDraftSettings(settings: Record<string, string>, userId?: string): Promise<{
        success: boolean;
        count: number;
    }>;
    getDraftSettings(): Promise<{
        id: string;
        updatedAt: Date;
        description: string | null;
        key: string;
        value: string;
    }[]>;
    publishDraft(userId?: string): Promise<{
        success: boolean;
        publishedCount: number;
    }>;
    discardDraft(): Promise<{
        success: boolean;
        discardedCount: number;
    }>;
}
