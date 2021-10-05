namespace jcast {
  export class Texture {
    public image?: HTMLImageElement = undefined;

    public constructor({ image = undefined }: { image?: HTMLImageElement } = {}) {
      this.image = image;
    }
  }
}
