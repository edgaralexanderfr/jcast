namespace jcast {
  export class Map {
    private _camera?: Camera;
    private _width: number = 0;
    private _height: number = 0;
    private _depth: number = 0.0;
    private _name?: string;

    get activeCamera(): Camera | undefined {
      return this._camera;
    }

    set activeCamera(value: Camera | undefined) {
      this._camera = value;
    }

    get width(): number {
      return this._width;
    }

    set width(value: number) {
      this._width = value;
    }

    get height(): number {
      return this._height;
    }

    set height(value: number) {
      this._height = value;
    }

    get depth(): number {
      return this._depth;
    }

    set depth(value: number) {
      this._depth = value;
    }

    get name(): string | undefined {
      return this._name;
    }

    set name(value: string | undefined) {
      this._name = value;
    }

    public constructor({ camera = undefined, width = 64, height = 64, depth = 10.0, name = undefined }: { camera?: Camera, width?: number, height?: number, depth?: number, name?: string | undefined } = {}) {
      this.activeCamera = camera;
      this.width = width;
      this.height = height;
      this.depth = depth;
      this.name = name;
    }
  }
}
