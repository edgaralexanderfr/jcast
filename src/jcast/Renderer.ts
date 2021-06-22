namespace jcast {
  export class Renderer {
    public static readonly RENDER_MODE_NONE = 0x00;
    public static readonly RENDER_MODE_RAF = 0x01;
    public static readonly RENDER_MODE_INTERVAL = 0x02;

    // @ts-ignore
    public static readonly requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    private _canvas: HTMLCanvasElement;
    private _width: number = 0;
    private _height: number = 0;
    private _context: CanvasRenderingContext2D | null = null;
    private _fps: number = 0;
    private _map?: Map;
    private _rendering: boolean = false;
    private _renderMode: number = Renderer.RENDER_MODE_NONE;
    private _intervalID: number = 0;

    public constructor({ canvas, map = undefined, fps = 0 }: { canvas: HTMLCanvasElement, fps?: number, map?: Map }) {
      this._canvas = canvas;

      this.canvas = canvas;
      this.fps = fps;
      this.map = map;
    }

    get canvas(): HTMLCanvasElement {
      return this._canvas;
    }

    set canvas(value: HTMLCanvasElement) {
      this._canvas = value;
      this._width = value.width;
      this._height = value.height;
      this._context = value.getContext('2d');
    }

    get width(): number {
      return this._width;
    }

    get height(): number {
      return this._height;
    }

    get context(): CanvasRenderingContext2D | null {
      return this._context;
    }

    get fps(): number {
      return this._fps;
    }

    set fps(value: number) {
      this._fps = Math.round(Math.max(0, value));

      if (this._rendering) {
        this.stop();
        this.start();
      }
    }

    get map(): Map | undefined {
      return this._map;
    }

    set map(value: Map | undefined) {
      this._map = value;
    }

    get renderMode(): number {
      return this._renderMode;
    }

    public start(): void {
      if (this._rendering) {
        return;
      }

      this._rendering = true;

      if (this._fps > 0) {
        this._renderMode = Renderer.RENDER_MODE_INTERVAL;
        this._intervalID = setInterval(() => this.render(), Math.round(1000 / this._fps));
      } else {
        this._renderMode = Renderer.RENDER_MODE_RAF;
        window.requestAnimationFrame = Renderer.requestAnimationFrame;
        requestAnimationFrame(() => this.render());
      }
    }

    public stop(): void {
      if (!this._rendering) {
        return;
      }

      this._rendering = false;
      this._renderMode = Renderer.RENDER_MODE_NONE;

      clearInterval(this._intervalID);
    }

    private render(): void {
      Time.update();

      this._context?.clearRect(0, 0, this.width, this.height);

      if (!this._map || !this._map.activeCamera) {
        return;
      }

      let map = this._map;
      let camera: Camera = this._map.activeCamera;

      for (let c: number = 0; c < this.width; c++) {
        let cx: number = 2 * c / this.width - 1;
        let dx: number = Math.cos(camera.transform.rotation.y) + camera.plane.x * cx;
        let dy: number = Math.sin(camera.transform.rotation.y) + camera.plane.y * cx;
        let mx: number = Math.floor(camera.transform.position.x);
        let my: number = Math.floor(camera.transform.position.y);
        let ddx: number = Math.sqrt(1 + (dy * dy) / (dx * dx));
        let ddy: number = Math.sqrt(1 + (dx * dx) / (dy * dy));
        let sx, sy, sdx, sdy, side;

        if (dx < 0.0) {
          sx = -1;
          sdx = (camera.transform.position.x - mx) * ddx;
        } else {
          sx = 1;
          sdx = (mx + 1.0 - camera.transform.position.x) * ddx;
        }

        if (dy < 0.0) {
          sy = -1;
          sdy = (camera.transform.position.y - my) * ddy;
        } else {
          sy = 1;
          sdy = (my + 1.0 - camera.transform.position.y) * ddy;
        }

        while (true) {
          if (sdx < sdy) {
            sdx += ddx;
            mx += sx;
            side = 0;
          } else {
            sdy += ddy;
            my += sy;
            side = 1;
          }

          let block: Block | null = map.getBlock(mx, my);

          if (block) {
            block.render(this, c, sx, sy, dx, dy, side);

            break;
          }
        }
      }

      if (this._renderMode == Renderer.RENDER_MODE_RAF) {
        window.requestAnimationFrame(() => this.render());
      }
    }
  }
}
