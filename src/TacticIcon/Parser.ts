import { ITacticIcon, ITacticIconMetaData } from "./ITacticIcon";
import { TACTIC_NS_VALUE, TAG_ANGLE, TAG_GROUP, TAG_ID, TAG_KEUZ, TAG_NAME, TAG_ROTATION } from "./constants";
import { fileAsText } from "./functions";

export const getOuterHTML = (element: Element) =>
    element.outerHTML || (element.parentElement && element.parentElement.innerHTML);

export function loadStringValue(defaultValue: string | undefined, svg: SVGSVGElement, tag: string) {
    const tacticName = svg.getElementsByTagNameNS(TACTIC_NS_VALUE, tag);
    return (tacticName && tacticName[0] && tacticName[0].textContent) || defaultValue;
}

export function loadBooleanValue(svg: SVGSVGElement, tag: string): boolean {
    return loadStringValue("false", svg, tag) === "true";
}

export function loadNumericValue(defaultValue: number | undefined, svg: SVGSVGElement, tag: string): number {
    const stringValue = loadStringValue(defaultValue ? String(defaultValue) : undefined, svg, tag);
    const parsed = typeof stringValue !== "undefined" ? parseFloat(stringValue) : NaN;
    return isNaN(parsed) ? 0 : parsed;
}

export const loadIconMetaData = (svg: SVGSVGElement, name?: string): ITacticIconMetaData => {
    // const desc = svg.querySelector("desc");
    const metadata: ITacticIconMetaData = Object.create(null);
    metadata.id = loadStringValue(undefined, svg, TAG_ID)! || name!;
    metadata.keuz = loadStringValue(undefined, svg, TAG_KEUZ);
    metadata.name = loadStringValue(undefined, svg, TAG_NAME) || metadata.id;
    const nameWithMeta = /a\$\{__LANG\("(.)+"+\)\}/.exec(metadata.name);
    if (nameWithMeta && nameWithMeta.length > 1) {
        ([, metadata.name] = nameWithMeta);
    }
    metadata.group = loadStringValue(undefined, svg, TAG_GROUP);
    metadata.rotationType = (loadStringValue(undefined, svg, TAG_ROTATION) as any) || "rotate";
    metadata.defaultAngle = loadNumericValue(undefined, svg, TAG_ANGLE);
    return metadata;
};

export const parseSVG = (svgText: string, name?: string): ITacticIcon | undefined => {
    const content = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const serializer = new XMLSerializer();
    const svg = content.querySelector("svg");
    if (!svg) {
        return undefined;
    }
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    const resText = serializer.serializeToString(svg);
    return {
        meta: loadIconMetaData(svg, name),
        svg(): string {
            return resText;
        }
    };
};

export const parseJson = (file: File): Promise<ITacticIcon[]> => {
    return fileAsText(file).then(
        (text) => {
            const data = JSON.parse(text) as string[];
            if (data) {
                return data.map((res) => parseSVG(res)).filter((icon): icon is ITacticIcon => Boolean(icon));
            }
            return [];
        },
        (error) => {
            throw error;
        }
    );
};

export const parseJsonText = (text: string): Promise<ITacticIcon[]> => {
    return Promise.resolve(text).then(
        (textData) => {
            const data = JSON.parse(textData) as string[];
            if (data) {
                return data.map((res) => parseSVG(res)).filter((icon): icon is ITacticIcon => Boolean(icon));
            }
            return [];
        }
    );
};

const parseFile = (file: File) => {
    const { name } = file;
    if (name.endsWith(".json")) {
        return parseJson(file);
    }
    return fileAsText(file).then((response): ITacticIcon[] => {
        const data = parseSVG(
            response, name.toLowerCase().endsWith(".svg") ? name.substring(0, name.lastIndexOf(".")) : name
        );
        return data ? [data] : [];
    });
};

const reducer = <T>(resp: T[], current: T[]): T[] => [...resp, ...current];

const listReducer = <T>(datas: T[][]): T[] => datas.reduce(reducer, [] as T[]);

export const parseList = (files: File[]): Promise<ITacticIcon[]> => Promise.all(files.map(parseFile)).then(listReducer);
