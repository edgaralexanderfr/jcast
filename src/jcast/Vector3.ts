namespace jcast {
  export class Vector3 {
    public static readonly zero: Vector3 = new Vector3();

    public x: number;
    public y: number;
    public z: number;

    public constructor({ x = 0, y = 0, z = 0 }: { x?: number, y?: number, z?: number } = {}) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
}
