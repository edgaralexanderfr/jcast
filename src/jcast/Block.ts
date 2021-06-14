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

    public render(renderer: Renderer, a: number, isClosestTarget: boolean, hit: boolean, origin: Vector3, relative: Vector3, step: Vector3, target: Vector3): void {
      let map: Map | undefined = renderer.map;
      let activeCamera: Camera | undefined = map?.activeCamera;
      let context: CanvasRenderingContext2D | null = renderer.context;

      // if (!isClosestTarget || !hit || !map || !activeCamera || !context || !this._wall || !this._wall.color) {
      if (!hit || !map || !activeCamera || !context || !this._wall || !this._wall.color) {
        return;
      }

      let eulerAngles: Vector3 = activeCamera.transform.eulerAngles;
      let hf: number = renderer.fov / 2;
      let aa: number = a - (eulerAngles.y - hf);
      let depth = map.depth;
      let rendererHeight = renderer.height;
      let distance: number = Math.sqrt(Math.pow(target.x - origin.x, 2) + Math.pow(target.y - origin.y, 2));
      let height: number = ((depth - (Math.min(depth, distance))) * rendererHeight) / depth;

      if (height == 0) {
        return;
      }

      context.fillStyle = this._wall.color.toRGBAString();
      context.fillRect((aa * renderer.width) / renderer.fov, (rendererHeight - height) / 2, renderer.width / renderer.fov, height); // TODO: Pre-calculate Pixel Size
    }
  }
}
