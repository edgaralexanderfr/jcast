namespace jcast {
  export class Wall {
    private _material?: Material;

    public constructor({ material = new Material() }: { material?: Material } = {}) {
      this.material = material;
    }

    get material(): Material | undefined {
      return this._material;
    }

    set material(value: Material | undefined) {
      this._material = value;
    }
  }
}
