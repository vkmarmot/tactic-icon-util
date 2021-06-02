import { ITacticIcon } from "./ITacticIcon";
import {
    SVG_NS,
    TACTIC_NS_VALUE,
    TAG_ANGLE,
    TAG_GROUP,
    TAG_ID,
    TAG_KEUZ,
    TAG_NAME,
    TAG_ROTATION,
    TACTIC_NS_KEY,
    TAG_COMMENT,
    TAG_PANORAMA
} from "./constants";

export const createTagWithValue = (tagName: string, value: string | number | undefined) => {
    if (!value) {
        return undefined;
    }
    const tag = document.createElementNS(TACTIC_NS_VALUE, tagName);
    const text = document.createTextNode(String(value));
    tag.appendChild(text);
    return tag;
};

export const makeIconSvgWithDesc = (icon: ITacticIcon) => {
    const content = new DOMParser().parseFromString(icon.svg(), "image/svg+xml");
    const svg1 = content.querySelector("svg")!;
    const svg = document.importNode(svg1, true);
    svg.removeAttribute("id");
    const desc = svg.querySelector("desc") || document.createElementNS(SVG_NS, "desc")!;
    while (desc.firstChild) {
        desc.firstChild.remove();
    }
    svg.setAttribute(`xmlns:${TACTIC_NS_KEY}`, TACTIC_NS_VALUE);
    const name = createTagWithValue(TAG_NAME, icon.meta.name);
    const group = createTagWithValue(TAG_GROUP, icon.meta.group);
    const angle = createTagWithValue(TAG_ANGLE, icon.meta.defaultAngle);
    const rotation = createTagWithValue(TAG_ROTATION, icon.meta.rotationType);
    const id = createTagWithValue(TAG_ID, icon.meta.id);
    const keuz = createTagWithValue(TAG_KEUZ, icon.meta.keuz);
    const panorama = createTagWithValue(TAG_PANORAMA, icon.meta.panoramaId);
    const comment = createTagWithValue(TAG_COMMENT, icon.meta.comment);
    if (name) {
        desc.appendChild(name);
    }
    if (group) {
        desc.appendChild(group);
    }
    if (angle) {
        desc.appendChild(angle);
    }
    if (rotation) {
        desc.appendChild(rotation);
    }
    if (id) {
        desc.appendChild(id);
    }
    if (keuz) {
        desc.appendChild(keuz);
    }
    if (panorama) {
        desc.appendChild(panorama);
    }
    if (comment) {
        desc.appendChild(comment);
    }
    if (desc.childNodes.length) {
        svg.appendChild(desc);
    }
    const selector = svg.querySelector(".selector");
    if (!selector) {
        svg.querySelector("[stroke=\"#4B54FF\"],[fill=\"#4B54FF\"]")?.setAttribute("class", "selector");
    }
    return svg;
};


export const makeIconListJson = (list: ITacticIcon[]) => {
    const result: SVGSVGElement[] = [];
    for (const icon of list) {
        const svg = makeIconSvgWithDesc(icon);
        result.push(svg);
    }
    const serializer = new XMLSerializer();
    return JSON.stringify(
        result.map((sv) => serializer.serializeToString(sv)),
        null,
        "    "
    );
};
