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

    public render(renderer: Renderer, c: number, distance: number, sx: number, sy: number, dx: number, dy: number, side: number): void {
      let map: Map | undefined = renderer.map;
      let camera: Camera | undefined = renderer.map?.activeCamera;
      let color: Color | undefined = this._wall?.color;

      if (!map || !camera || !color) {
        return;
      }

      let height: number = Math.floor(map.depth * renderer.height / distance);
      let wy: number = Math.floor((camera.transform.rotation.z * 100) + (renderer.height - height) / 2);

      renderer.context!.fillStyle = color.toRGBAString();
      renderer.context!.fillRect(c, wy, 1, height);
    }
  }
}
