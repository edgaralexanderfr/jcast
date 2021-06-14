namespace jcast {
  export class Transform {
    public position: Vector3;
    public rotation: Vector3;

    get eulerAngles(): Vector3 {
      let eulerAngles: Vector3 = new Vector3();

      if (this.rotation.x != 0) {
        eulerAngles.x = Mathf.radToDeg(this.rotation.x);
      }

      if (this.rotation.y != 0) {
        eulerAngles.y = Mathf.radToDeg(this.rotation.y);
      }

      if (this.rotation.z != 0) {
        eulerAngles.z = Mathf.radToDeg(this.rotation.z);
      }

      return eulerAngles;
    }

    public constructor({ position = new Vector3(), rotation = new Vector3() }: { position?: Vector3, rotation?: Vector3 } = {}) {
      this.position = position;
      this.rotation = rotation;
    }
  }
}
