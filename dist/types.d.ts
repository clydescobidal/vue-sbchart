export type TSerie = {
    timestamp: number;
    value: number;
};
export type TRgb = {
    r: number;
    g: number;
    b: number;
};
export type TOption = {
    upColor: string;
    downColor: string;
    lineWidth: number;
};
export type TPoint = {
    x: number;
    y: number;
    serie: TSerie;
};
