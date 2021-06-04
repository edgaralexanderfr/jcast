namespace jcast {
  export class Transform {
    public position: Vector3;
    public rotation: Vector3;

    public constructor({ position = new Vector3(), rotation = new Vector3() }: { position?: Vector3, rotation?: Vector3 } = {}) {
      this.position = position;
      this.rotation = rotation;
    }
  }
}
