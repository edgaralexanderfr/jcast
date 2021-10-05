/// <reference path="Interactive.ts" />

namespace jcast {
  export class Block extends Interactive {
    private _walls?: Wall[] | null[];

    public constructor({ walls = [], transform = undefined }: { walls?: Wall[] | null[], transform?: Transform } = {}) {
      super({
        transform
      });

      this.walls = walls;
    }

    get walls(): Wall[] | null[] | undefined {
      return this._walls;
    }

    set walls(value: Wall[] | null[] | undefined) {
      this._walls = value;
    }

    public render(renderer: Renderer, c: number, distance: number, sx: number, sy: number, dx: number, dy: number, side: number): void {
      let map: Map | undefined = renderer.map;
      let camera: Camera | undefined = renderer.map?.activeCamera;

      if (!map || !camera || !this._walls || this._walls.length == 0) {
        return;
      }

      let height: number = Math.floor(map.depth * renderer.height / distance);
      let wy: number = Math.floor((camera.transform.rotation.z * 100) + (renderer.height - height) / 2);

      for (let i: number = 0; i < this._walls.length && wy + height > 0; i++) {
        let wall: Wall | null = this._walls[i];

        if (wall && wall.material) {
          if (wall.material.texture && wall.material.texture.image) {
            // Render a textured vertical chunk from the wall:

            let wallX = (side == 0) ? camera.transform.position.y + distance * dy : camera.transform.position.x + distance * dx;
            wallX -= Math.floor(wallX);

            let image: HTMLImageElement = wall.material.texture.image;
            let texX: number = Math.floor(wallX * image.width);

            if ((side == 0 && dx > 0) || (side == 1 && dy < 0)) {
              texX = image.width - texX - 1;
            }

            renderer.context!.drawImage(image, texX, 0, 1, image.height, c, wy, 1, height);
          } else if (wall.material.color) {
            // Render a solid coloured vertical chunk from the wall:

            renderer.context!.fillStyle = wall.material.color.toRGBAString();
            renderer.context!.fillRect(c, wy, 1, height);
          }
        }

        wy -= height;
      }
    }

    public static render(renderer: Renderer, hits: { block: Block, mx: number, my: number, c: number, distance: number, sx: number, sy: number, dx: number, dy: number, side: number }[]): void {
      for (let i: number = hits.length - 1; i >= 0; i--) {
        let hit = hits[i];

        hit.block.render(renderer, hit.c, hit.distance, hit.sx, hit.sy, hit.dx, hit.dy, hit.side);
      }
    }
  }
}
