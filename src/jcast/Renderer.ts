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
    private _fov: number = 0;
    private _fps: number = 0;
    private _map?: Map;
    private _rendering: boolean = false;
    private _renderMode: number = Renderer.RENDER_MODE_NONE;
    private _intervalID: number = 0;
    private _origin: Vector3 = new Vector3();
    private _target: Vector3 = new Vector3();
    private _step: Vector3 = new Vector3();

    public constructor({ canvas, map = undefined, fov = 2, fps = 0 }: { canvas: HTMLCanvasElement, fov?: number, fps?: number, map?: Map }) {
      this._canvas = canvas;

      this.canvas = canvas;
      this.fov = fov;
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

    get fov(): number {
      return this._fov;
    }

    set fov(value: number) {
      this._fov = Math.round(Math.max(1, value));
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
      this._context?.clearRect(0, 0, this.width, this.height);

      if (!this._map || !this._map.activeCamera) {
        return;
      }

      let activeCamera: Camera = this._map.activeCamera;
      let ox: number = activeCamera.transform.position.x + (Math.cos(activeCamera.transform.rotation.y - Mathf.HALF_PI) * (this._fov / 2));
      let oy: number = activeCamera.transform.position.y + (Math.sin(activeCamera.transform.rotation.y - Mathf.HALF_PI) * (this._fov / 2));
      let xl: number = Math.cos(activeCamera.transform.rotation.y) * activeCamera.farClipPlane;
      let yl: number = Math.sin(activeCamera.transform.rotation.y) * activeCamera.farClipPlane;
      let tx: number = ox + xl;
      let ty: number = oy + yl;
      let xs: number = Math.cos(activeCamera.transform.rotation.y + Mathf.HALF_PI);
      let ys: number = Math.sin(activeCamera.transform.rotation.y + Mathf.HALF_PI);

      // Draw white background:
      this._context!.fillStyle = 'white';
      this._context?.fillRect(0, 0, this.width, this.height);
      //

      for (let f: number = 0; f < this._fov; f += 1) {
        // Draw line from target to origin:
        this._context!.strokeStyle = 'rgba(0, 255, 0, 0.5)';
        this._context?.beginPath();
        this._context?.moveTo(tx, ty);
        this._context?.lineTo(ox, oy);
        this._context?.stroke();
        //

        ox += xs;
        oy += ys;

        tx += xs;
        ty += ys;
      }

      // Draw angle:
      this._context!.strokeStyle = 'red';
      this._context?.beginPath();
      this._context?.moveTo(activeCamera.transform.position.x, activeCamera.transform.position.y);
      this._context?.lineTo(activeCamera.transform.position.x + (Math.cos(activeCamera.transform.rotation.y) * activeCamera.farClipPlane), activeCamera.transform.position.y + (Math.sin(activeCamera.transform.rotation.y) * activeCamera.farClipPlane));
      this._context?.stroke();
      //

      // Draw camera point:
      let cw: number = 3;
      let ch: number = 3;
      this.context!.fillStyle = 'blue';
      this.context?.fillRect(activeCamera.transform.position.x - (cw / 2), activeCamera.transform.position.y - (ch / 2), cw, ch);
      //

      if (this._renderMode == Renderer.RENDER_MODE_RAF) {
        window.requestAnimationFrame(() => this.render());
      }
    }
  }
}
