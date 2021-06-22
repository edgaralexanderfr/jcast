namespace jcast {
  export class Time {
    public static deltaTime: number = 0.0;

    private static _lastTime: number = 0;

    public static update(): void {
      let currentTime: number = Date.now();

      Time.deltaTime = (Time._lastTime == 0) ? 0.0 : (currentTime - Time._lastTime) / 1000;
      Time._lastTime = currentTime;
    }
  }
}
