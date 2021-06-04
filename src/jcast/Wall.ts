namespace jcast {
  export class Wall {
    private _color?: Color;

    public constructor({ color = undefined }: { color?: Color } = {}) {
      this.color = color;
    }

    get color(): Color | undefined {
      return this._color;
    }

    set color(value: Color | undefined) {
      this._color = value;
    }
  }
}
