export class Image {
    public src: string | undefined;
    public alt: string | undefined;

    constructor(src: string, alt: string) {
        this.src = src;
        this.alt = alt;
    }

    public toHTMLElementString(): string {
        return `<img src="${this.src}" alt="${this.alt}"></img>`;
    }
}
