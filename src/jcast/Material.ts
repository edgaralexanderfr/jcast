namespace jcast {
  export class Material {
    public texture?: Texture;
    public color?: Color;

    public constructor({ texture = undefined, color = undefined }: { texture?: Texture, color?: Color } = {}) {
      this.texture = texture;
      this.color = color;
    }
  }
}
