namespace jcast {
  export class Console {
    public static displayLogs: boolean = true;

    public static log(output: any): void {
      if (this.displayLogs) {
        console.log(`${JCast.getIdentifier()}: ${output}`);
      }
    }

    public static warn(output: any): void {
      if (this.displayLogs) {
        console.warn(`${JCast.getIdentifier()}: ${output}`);
      }
    }
  }
}
