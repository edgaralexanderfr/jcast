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

    public render(renderer: Renderer, c: number, sx: number, sy: number, dx: number, dy: number, side: number): void {
      let map: Map | undefined = renderer.map;
      let camera: Camera | undefined = renderer.map?.activeCamera;
      let color: Color | undefined = this._wall?.color;

      if (!map || !camera || !color) {
        return;
      }

      let x: number = camera.transform.position.x;
      let y: number = camera.transform.position.y;
      let mx: number = this.transform.position.x;
      let my: number = this.transform.position.y;
      let distance: number = (side == 0) ? (mx - x + (1 - sx) / 2) / dx : (my - y + (1 - sy) / 2) / dy;
      let height: number = Math.floor(map.depth * renderer.height / distance);
      let wy: number = Math.floor((renderer.height - height) / 2);

      renderer.context!.fillStyle = color.toRGBAString();
      renderer.context!.fillRect(c, wy, 1, height);
    }
  }
}
