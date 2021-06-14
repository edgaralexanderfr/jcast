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

      this._origin.x = activeCamera.transform.position.x + (Math.cos(activeCamera.transform.rotation.y - Mathf.HALF_PI) * (this._fov / 2));
      this._origin.y = activeCamera.transform.position.y + (Math.sin(activeCamera.transform.rotation.y - Mathf.HALF_PI) * (this._fov / 2));

      let xl: number = Math.cos(activeCamera.transform.rotation.y) * activeCamera.farClipPlane;
      let yl: number = Math.sin(activeCamera.transform.rotation.y) * activeCamera.farClipPlane;
      let tx: number = this._origin.x + xl;
      let ty: number = this._origin.y + yl;
      let fs: number = this._fov / this._width;
      let xs: number = Math.cos(activeCamera.transform.rotation.y + Mathf.HALF_PI) * fs;
      let ys: number = Math.sin(activeCamera.transform.rotation.y + Mathf.HALF_PI) * fs;
      let hd: number = this._origin.x - tx;
      let vd: number = this._origin.y - ty;
      let st: number = Math.abs(hd) > Math.abs(vd) ? Math.abs(hd) : Math.abs(vd);
      let xd: number = hd / st;
      let yd: number = vd / st;

      // Draw white background:
      // this._context!.fillStyle = 'white';
      // this._context?.fillRect(0, 0, this.width, this.height);
      //

      for (let fx: number = 0; fx < this._fov; fx += fs) {
        let oxi = Math.floor(this._origin.x);
        let oyi = Math.floor(this._origin.y);
        let txi = Math.floor(tx);
        let tyi = Math.floor(ty);
        let oxip1 = oxi + 1;
        let oyip1 = oyi + 1;
        let txip1 = txi + 1;
        let tyip1 = tyi + 1;

        if (oxi == txi && oyi == tyi) {
          let block: Block | null = this._map.getBlock(txi, tyi);

          if (block) {
            block.transform.position.x = txi;
            block.transform.position.y = tyi;
          }

          this._target.x = tx;
          this._target.y = ty;

          block?.render(this, fx, true, false, this._origin, this._step, this._target);
        } else {
          if (xd == -1 || xd == 1) {
            if (xd == -1) {
              this._target.x = txip1;
            } else {
              this._target.x = txi;
            }
          } else {
            if (yd == -1) {
              this._target.x = tx - ((tyip1 - ty) * xd);
            } else {
              this._target.x = tx - ((ty - tyi) * xd);
            }
          }

          if (yd == -1 || yd == 1) {
            if (yd == -1) {
              this._target.y = tyip1;
            } else {
              this._target.y = tyi;
            }
          } else {
            if (xd == -1) {
              this._target.y = ty - ((txip1 - tx) * yd);
            } else {
              this._target.y = ty - ((tx - txi) * yd);
            }
          }

          let block: Block | null;

          do {
            this._target.x += xd;
            this._target.y += yd;

            block = this._map.getBlock(this._target.x, this._target.y);

            if (
              (
                xd == 0 ||
                (xd < 0 && this._target.x <= oxip1) ||
                (xd > 0 && this._target.x >= oxi)
              ) && (
                yd == 0 ||
                (yd < 0 && this._target.y <= oyip1) ||
                (yd > 0 && this._target.y >= oyi)
              )
            ) {
              // Draw the reached point:
              // let pw: number = 3;
              // let ph: number = 3;
              // this.context!.fillStyle = 'red';
              // this.context?.fillRect(this._target.x - (pw / 2), this._target.y - (ph / 2), pw, ph);
              //

              break;
            }

            block?.render(this, fx, false, true, this._origin, this._step, this._target);
          } while (true);

          block?.render(this, fx, true, true, this._origin, this._step, this._target);
        }

        // Draw line from target to origin:
        // this._context!.strokeStyle = 'rgba(0, 255, 0, 0.5)';
        // this._context?.beginPath();
        // this._context?.moveTo(tx, ty);
        // this._context?.lineTo(this._origin.x, this._origin.y);
        // this._context?.stroke();
        //

        this._origin.x += xs;
        this._origin.y += ys;

        tx += xs;
        ty += ys;
      }

      // Draw angle:
      // this._context!.strokeStyle = 'red';
      // this._context?.beginPath();
      // this._context?.moveTo(activeCamera.transform.position.x, activeCamera.transform.position.y);
      // this._context?.lineTo(activeCamera.transform.position.x + (Math.cos(activeCamera.transform.rotation.y) * activeCamera.farClipPlane), activeCamera.transform.position.y + (Math.sin(activeCamera.transform.rotation.y) * activeCamera.farClipPlane));
      // this._context?.stroke();
      //

      // Draw camera point:
      // let cw: number = 3;
      // let ch: number = 3;
      // this.context!.fillStyle = 'blue';
      // this.context?.fillRect(activeCamera.transform.position.x - (cw / 2), activeCamera.transform.position.y - (ch / 2), cw, ch);
      //

      // Draw directions steps:
      // this._context!.font = '16px Arial Bold';
      // this._context?.fillText(`XD: ${xd} YD: ${yd}`, 20, 20);
      //

      if (this._renderMode == Renderer.RENDER_MODE_RAF) {
        window.requestAnimationFrame(() => this.render());
      }
    }
  }
}
