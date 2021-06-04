namespace jcast {
  export class Renderer {
    private _canvas: HTMLCanvasElement;
    private _map?: Map;
    private _width: number = 0;
    private _height: number = 0;
    private _context: CanvasRenderingContext2D | null = null;

    get canvas(): HTMLCanvasElement {
      return this._canvas;
    }

    set canvas(value: HTMLCanvasElement) {
      this._canvas = value;
      this._width = value.width;
      this._height = value.height;
      this._context = value.getContext('2d');
    }

    get map(): Map | undefined {
      return this._map;
    }

    set map(value: Map | undefined) {
      this._map = value;
    }

    get context(): CanvasRenderingContext2D | null {
      return this._context;
    }

    public constructor({ canvas, map = undefined }: { canvas: HTMLCanvasElement, map?: Map }) {
      this._canvas = canvas;

      this.canvas = canvas;
      this.map = map;
    }
  }
}
