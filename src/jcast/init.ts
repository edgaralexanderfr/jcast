namespace jcast {
  export function init({ canvas, map = undefined }: { canvas: HTMLCanvasElement, map?: Map }): JCast {
    return new JCast({ canvas, map });
  }
}
