namespace jcast {
  export class Texture {
    private _image?: HTMLImageElement = undefined;

    get image(): HTMLImageElement | undefined {
      return this._image;
    }

    public constructor({ image = undefined }: { image?: HTMLImageElement } = {}) {
      this._image = image;
    }
  }
}
