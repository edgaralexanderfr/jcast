/// <reference path="Interactive.ts" />

namespace jcast {
  export class Camera extends Interactive {
    public plane: Vector3;

    private _farClipPlane: number = 0;

    public constructor({ transform = new Transform(), plane = new Vector3({ y: 0.66 }), farClipPlane = 10.0 }: { transform?: Transform, plane?: Vector3, farClipPlane?: number } = {}) {
      super({
        transform
      });

      this.plane = plane;
      this.farClipPlane = farClipPlane;
    }

    get farClipPlane(): number {
      return this._farClipPlane;
    }

    set farClipPlane(value: number) {
      this._farClipPlane = value;
    }

    public rotate(x: number, y: number, z: number): void {
      let planeX: number = this.plane.x;

      this.plane.x = this.plane.x * Math.cos(y) - this.plane.y * Math.sin(y);
      this.plane.y = planeX * Math.sin(y) + this.plane.y * Math.cos(y);

      this.transform.rotation.y += y;
      this.transform.rotation.z += z;
    }
  }
}
