declare namespace jcast {
    class JCast {
        private renderer;
        constructor(canvas: HTMLCanvasElement, map?: Map);
        getRenderer(): Renderer;
    }
}
declare namespace jcast {
    class Map {
        private width;
        private height;
        private name?;
        constructor(width: Number, height: Number, name?: String);
    }
}
declare namespace jcast {
    class Renderer {
        private canvas;
        private map?;
        private context;
        constructor(canvas: HTMLCanvasElement, map?: Map);
    }
}
declare namespace jcast {
    function init(canvas: HTMLCanvasElement, map?: Map): JCast;
}
//# sourceMappingURL=jcast.d.ts.map