/// <reference path="Interactive.ts" />

namespace jcast {
  export class Block extends Interactive {
    private _wall?: Wall;

    public constructor({ wall = undefined, transform = undefined }: { wall?: Wall, transform?: Transform } = {}) {
      super({
        transform
      });

      this.wall = wall;
    }

    get wall(): Wall | undefined {
      return this._wall;
    }

    set wall(value: Wall | undefined) {
      this._wall = value;
    }

    public render(renderer: Renderer, fx: number, isClosestTarget: boolean, hit: boolean, origin: Vector3, step: Vector3, target: Vector3): void {
      /**
       * TODO: Implement render logic...
       */
    }
  }
}
