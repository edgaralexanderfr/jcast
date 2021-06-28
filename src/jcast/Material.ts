namespace jcast {
  export class Material {
    public color?: Color;

    public constructor({ color = undefined }: { color?: Color } = {}) {
      this.color = color;
    }
  }
}
