namespace jcast {
  export class Mathf {
    public static readonly HALF_PI = Math.PI / 2;

    public static degToRad(deg: number): number {
      return (deg * Math.PI) / 180;
    }

    public static radToDeg(rad: number): number {
      return (rad * 180) / Math.PI;
    }
  }
}
