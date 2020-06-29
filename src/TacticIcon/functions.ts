export const contentToSvg = (svgText: string) => {
    const xml: XMLDocument = new DOMParser().parseFromString(svgText, "image/svg+xml");
    return xml.querySelector("svg");
};

export const fileAsBase64 = (file: File): Promise<string> =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(e) {
            resolve(reader.result as any);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });

export const fileAsText = (file: File): Promise<string> =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(e) {
            resolve(reader.result as any);
        };

        reader.onerror = reject;

        reader.readAsText(file);
    });
