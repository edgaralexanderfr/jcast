namespace jcast {
  export class Color {
    private _hexString?: string = undefined;
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 0;

    public constructor({ r = 0, g = 0, b = 0, a = 1.0 }: { r?: number, g?: number, b?: number, a?: number } = {}) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }

    get r(): number {
      return this._r;
    }

    set r(value: number) {
      this._hexString = undefined;
      this._r = Math.min(Math.max(0, value), 255);
    }

    get g(): number {
      return this._g;
    }

    set g(value: number) {
      this._hexString = undefined;
      this._g = Math.min(Math.max(0, value), 255);
    }

    get b(): number {
      return this._b;
    }

    set b(value: number) {
      this._hexString = undefined;
      this._b = Math.min(Math.max(0, value), 255);
    }

    get a(): number {
      return this._a;
    }

    set a(value: number) {
      this._hexString = undefined;
      this._a = Math.min(Math.max(0.0, value), 1.0);
    }

    public toHexString(prefixed: boolean = true): string {
      let hexString: string;

      if (this._hexString) {
        hexString = this._hexString;
      } else {
        hexString = `${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`;
        this._hexString = hexString;
      }

      return prefixed ? `#${hexString}` : hexString;
    }

    public toRGBAString(): string {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
  }
}
