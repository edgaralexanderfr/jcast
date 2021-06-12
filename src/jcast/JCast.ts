namespace jcast {
  export class JCast {
    private _renderer: Renderer;

    public constructor({ canvas, map = undefined }: { canvas: HTMLCanvasElement, map?: Map }) {
      this._renderer = new Renderer({ canvas, map });
    }

    get renderer(): Renderer {
      return this._renderer;
    }

    public start(): void {
      this.renderer.start();
    }

    public stop(): void {
      this.renderer.start();
    }
  }
}
