namespace jcast {
  export abstract class Interactive {
    public transform: Transform;

    public constructor({ transform = new Transform() }: { transform?: Transform } = {}) {
      this.transform = transform;
    }
  }
}
