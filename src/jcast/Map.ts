namespace jcast {
  export class Map {
    private _camera?: Camera;
    private _width: number = 0;
    private _height: number = 0;
    private _depth: number = 0.0;
    private _name?: string;
    private _blocks: Block[][] | null[][] = [];

    public constructor({ camera = undefined, width = 64, height = 64, depth = 10.0, name = undefined }: { camera?: Camera, width?: number, height?: number, depth?: number, name?: string | undefined } = {}) {
      this.activeCamera = camera;
      this.depth = depth;
      this.name = name;

      if (width > 0) {
        this._width = Math.round(width);
      }

      if (height > 0) {
        this._height = Math.round(height);
      }

      this.nullify();
    }

    get activeCamera(): Camera | undefined {
      return this._camera;
    }

    set activeCamera(value: Camera | undefined) {
      this._camera = value;
    }

    get width(): number {
      return this._width;
    }

    get height(): number {
      return this._height;
    }

    get depth(): number {
      return this._depth;
    }

    set depth(value: number) {
      this._depth = Math.max(0, value);
    }

    get name(): string | undefined {
      return this._name;
    }

    set name(value: string | undefined) {
      this._name = value;
    }

    public nullify(): void {
      let blocks: Block[][] | null[][] = [];

      for (let x = 0; x < this.width; x++) {
        blocks.push([]);

        for (let y = 0; y < this.height; y++) {
          blocks[x][y] = null;
        }
      }

      this._blocks = blocks;
    }

    public getBlock(x: number, y: number): Block | null {
      if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
        return null;
      }

      let blockX: number = Math.floor(x);
      let blockY: number = Math.floor(y);
      let block: Block | null = this._blocks[blockX][blockY];

      if (block) {
        block.transform.position.x = blockX;
        block.transform.position.y = blockY;
      }

      return block;
    }

    public setBlock(x: number, y: number, block: Block | null) {
      if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
        let blockX: number = Math.floor(x);
        let blockY: number = Math.floor(y);

        if (block) {
          block.transform.position.x = blockX;
          block.transform.position.y = blockY;
        }

        this._blocks[blockX][blockY] = block;
      }
    }
  }
}
