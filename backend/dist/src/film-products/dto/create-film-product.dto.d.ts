export declare class CreateFilmProductDto {
    name: string;
    slug: string;
    code?: string;
    description: string;
    categories: string[];
    rollWidthMeters?: number;
    usableWidthMeters?: number;
    vltPercent?: number;
    irRejectionPercent?: number;
    uvRejectionPercent?: number;
    colorShade?: string;
    technology?: string;
    active?: boolean;
}
