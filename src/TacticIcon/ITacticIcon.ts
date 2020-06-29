export interface ITacticIconMetaData {
    keuz?: string;
    id: string;
    defaultAngle?: number;
    name: string;
    group?: string;
    rotationType: "flip" | "fixed" | "rotate";
}

export interface ITacticIcon {
    meta: ITacticIconMetaData;
    svg(): string;
}
