namespace jcast {
  export class JCast {
    public static readonly NAME = 'JCast Engine';
    public static readonly VERSION = 'v0.0.1';

    private _renderer: Renderer;
    private _asset: Asset;

    public constructor({ canvas, data, map = undefined }: { canvas: HTMLCanvasElement, data: JCastData, map?: Map }) {
      this._renderer = new Renderer({ canvas, map });
      this._asset = new Asset({ data: data.assets });
    }

    get renderer(): Renderer {
      return this._renderer;
    }

    get asset(): Asset {
      return this._asset;
    }

    public start(): void {
      this.renderer.start();
    }

    public stop(): void {
      this.renderer.stop();
    }

    public static getIdentifier(): string {
      return `${JCast.NAME} ${JCast.VERSION}`;
    }
  }
}
