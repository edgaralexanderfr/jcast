namespace jcast {
    export function init (canvas:HTMLCanvasElement, map?:Map) {
        return new JCast(canvas, map);
    }
}
