namespace jcast {
    export class JCast {
        private renderer:Renderer;

        public constructor (canvas:HTMLCanvasElement, map?: Map) {
            this.renderer = new Renderer(canvas, map);
        }

        public getRenderer ():Renderer {
            return this.renderer;
        }
    }
}
