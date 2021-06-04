namespace jcast {
  export class Block {
    private _wall?: Wall;

    public constructor({ wall = undefined }: { wall?: Wall } = {}) {
      this.wall = wall;
    }

    get wall(): Wall | undefined {
      return this._wall;
    }

    set wall(value: Wall | undefined) {
      this._wall = value;
    }

    public render(renderer: Renderer, px: number, origin: Vector3, target: Vector3, step: Vector3): void {
      /**
       * TODO: Implement render logic...
       */
    }
  }
}
