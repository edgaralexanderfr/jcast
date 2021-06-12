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

      // xl: X Length
      // yl: Y Length
      // sa: Start Angle
      // fs: Field Step
      // sx: Step X
      // sy: Step Y
      // hw: Half Width
      // tx: Target X
      // ty: Target Y
      // xd: X Direction, -1: Left, 0: None, 1: Right
      // yd: Y Direction, -1: Up,   0: None, 1: Down
      // vd: Vertical Difference
      // m: Slope
      // am: Absolute Slope
      // ddaxs: DDA X Step
      // ddays: DDA Y Step
      // fx: Field X

      this._step.x = Math.cos(activeCamera.transform.rotation.y);
      this._step.y = Math.sin(activeCamera.transform.rotation.y);

      let xl: number = this._step.x * activeCamera.farClipPlane;
      let yl: number = this._step.y * activeCamera.farClipPlane;
      let sa: number = activeCamera.transform.rotation.y + Mathf.HALF_PI;
      let fs: number = this._fov / this.width;
      let sx: number = Math.cos(sa) * fs; // TODO: multiply by Field Step
      let sy: number = Math.sin(sa) * fs; // TODO: multiply by Field Step
      let hw: number = this._fov / 2;

      this._origin.x = activeCamera.transform.position.x + (sx * hw);
      this._origin.y = activeCamera.transform.position.y + (sy * hw);

      let tx: number = this._origin.x + xl;
      let ty: number = this._origin.y + yl;

      sx *= -1;
      sy *= -1;

      this._step.x *= -1;
      this._step.y *= -1;

      let xd: number = 0;
      let yd: number = 0;

      if (this._origin.x < tx) {
        xd = -1;
      } else {
        xd = 1;
      }

      if (this._origin.y < ty) {
        yd = -1;
      } else {
        yd = 1;
      }

      let vd: number = this._origin.y - ty;
      let m: number = (this._origin.x - tx) / vd;
      let am: number = Math.abs(m);
      let ddaxs: number = 0;
      let ddays: number = 0;

      if (m == 0) {
        ddaxs = 0;
        ddays = yd;
      } else if (vd == 0) {
        ddaxs = xd;
        ddays = 0;
      } else if (m < 1) {
        ddaxs = xd;
        ddays = am * yd;
      } else if (m > 1) {
        ddaxs = 1 / am * xd;
        ddays = yd;
      } else {
        ddaxs = xd;
        ddays = yd;
      }

      for (let fx = 0; fx < this._fov; fx += fs) {
        // We start DDA checks:

        // oxi: Origin X Integer
        // oyi: Origin Y Integer
        // txi: Target X Integer
        // tyi: Target Y Integer
        // oxip1: Origin X Integer + 1
        // oyip1: Origin Y Integer + 1
        // txip1: Target X Integer + 1
        // tyip1: Target Y Integer + 1

        let oxi = Math.floor(this._origin.x);
        let oyi = Math.floor(this._origin.y);
        let txi = Math.floor(tx);
        let tyi = Math.floor(ty);
        let oxip1 = oxi + 1;
        let oyip1 = oyi + 1;
        let txip1 = txi + 1;
        let tyip1 = tyi + 1;

        if (oxi == txi && oyi == tyi) {
          // Target in the same block from the origin without hitting any wall:

          let block: Block | null = this._map.getBlock(txi, tyi);

          if (block) {
            block.transform.position.x = txi;
            block.transform.position.y = tyi;
          }

          this._target.x = tx;
          this._target.y = ty;

          block?.render(this, fx, true, false, this._origin, this._step, this._target);
        } else {
          // Perform DDA:

          // if (ddaxs == 1) {
          //   if (xd == -1) {
          //     this._target.x = txip1;
          //   } else {
          //     this._target.x = txi;
          //   }
          // } else {
          //   if (yd == -1) {
          //     this._target.x = tx - ((tyip1 - ty) * am * xd);
          //   } else {
          //     this._target.x = tx - ((ty - tyi) * am * xd);
          //   }
          // }

          // if (ddays == 1) {
          //   if (yd == -1) {
          //     this._target.y = tyip1;
          //   } else {
          //     this._target.y = tyi;
          //   }
          // } else {
          //   if (xd == -1) {
          //     this._target.y = ty - ((txip1 - tx) * am * yd);
          //   } else {
          //     this._target.y = ty - ((tx - txi) * am * yd);
          //   }
          // }

          if (ddaxs == -1 || ddaxs == 1) {
            if (xd == -1) {
              this._target.x = txip1;
            } else {
              this._target.x = txi;
            }
          } else {
            if (yd == -1) {
              this._target.x = tx - ((tyip1 - ty) * ddaxs);
            } else {
              this._target.x = tx - ((ty - tyi) * ddaxs);
            }
          }

          if (ddays == -1 || ddays == 1) {
            if (yd == -1) {
              this._target.y = tyip1;
            } else {
              this._target.y = tyi;
            }
          } else {
            if (xd == -1) {
              this._target.y = ty - ((txip1 - tx) * ddays);
            } else {
              this._target.y = ty - ((tx - txi) * ddays);
            }
          }

          let block: Block | null;

          do {
            // this._target.x += ddaxs * xd; // TODO: Assign to variable
            // this._target.y += ddays * yd; // TODO: Assign to variable

            this._target.x += ddaxs;
            this._target.y += ddays;

            let xi: number = Math.floor(this._target.x);
            let yi: number = Math.floor(this._target.y);

            block = this._map.getBlock(xi, yi);

            if (block) {
              block.transform.position.x = xi;
              block.transform.position.y = yi;
            }

            // TODO: Analyse the right conditions to STOP:
            // (It seems OK though)
            if (
              (ddaxs == -1 && this._target.x == oxip1 && yi == oyi) ||
              (ddaxs == 1 && this._target.x == oxi && yi == oyi) ||
              (ddays == -1 && this._target.y == oyip1 && xi == oxi) ||
              (ddays == 1 && this._target.y == oyi && xi == oxi)
            ) {
              break;
            }

            block?.render(this, fx, false, true, this._origin, this._step, this._target);
          } while (true);

          block?.render(this, fx, true, true, this._origin, this._step, this._target);
        }

        this._origin.x += sx;
        this._origin.y += sy;

        tx += sx;
        ty += sy;
      }

      if (this._renderMode == Renderer.RENDER_MODE_RAF) {
        window.requestAnimationFrame(() => this.render());
      }
    }
  }
}
