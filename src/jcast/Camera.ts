/// <reference path="Interactive.ts" />

namespace jcast {
  export class Camera extends Interactive {
    private _farClipPlane: number = 0;

    get farClipPlane(): number {
      return this._farClipPlane;
    }

    set farClipPlane(value: number) {
      this._farClipPlane = value;
    }

    public constructor({ transform = new Transform(), farClipPlane = 10.0 }: { transform?: Transform, farClipPlane?: number } = {}) {
      super({
        transform
      });

      this.farClipPlane = farClipPlane;
    }
  }
}
