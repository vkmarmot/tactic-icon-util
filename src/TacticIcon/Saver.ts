import { ITacticIcon } from "./ITacticIcon";
import { SVG_NS, TACTIC_NS, TAG_ANGLE, TAG_GROUP, TAG_ID, TAG_KEUZ, TAG_NAME, TAG_ROTATION } from "./constants";

export const createTagWithValue = (tagName: string, value: string | number | undefined) => {
    if (!value) {
        return undefined;
    }
    const tag = document.createElementNS(TACTIC_NS, tagName);
    tag.innerHTML = String(value);
    return tag;
};

export const makeIconSvgWithDesc = (icon: ITacticIcon) => {
    const content = new DOMParser().parseFromString(icon.svg(), "image/svg+xml");
    const svg1 = content.querySelector("svg")!;
    const svg = document.importNode(svg1, true);
    const desc = svg.querySelector("desc") || document.createElementNS(SVG_NS, "desc")!;
    while (desc.firstChild) {
        desc.firstChild.remove();
    }
    desc.setAttribute("xmlns:tactic", TACTIC_NS);
    const name = createTagWithValue(TAG_NAME, icon.meta.name);
    const group = createTagWithValue(TAG_GROUP, icon.meta.group);
    const angle = createTagWithValue(TAG_ANGLE, icon.meta.defaultAngle);
    const rotation = createTagWithValue(TAG_ROTATION, icon.meta.rotationType);
    const id = createTagWithValue(TAG_ID, icon.meta.id);
    const keuz = createTagWithValue(TAG_KEUZ, icon.meta.keuz);
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
    if (desc.childNodes.length) {
        svg.appendChild(desc);
    }
    return svg;
};


export const makeIconListJson = (list: ITacticIcon[]) => {
    const result: SVGSVGElement[] = [];
    for (const icon of list) {
        const svg = makeIconSvgWithDesc(icon);
        result.push(svg);
    }
    return JSON.stringify(
        result.map((sv) => sv.outerHTML),
        null,
        "    "
    );
};
