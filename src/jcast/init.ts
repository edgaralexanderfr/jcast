namespace jcast {
  export function init({ canvas, data, map = undefined }: { canvas: HTMLCanvasElement, data: JCastData, map?: Map }): JCast {
    return new JCast({ canvas, data, map });
  }
}
