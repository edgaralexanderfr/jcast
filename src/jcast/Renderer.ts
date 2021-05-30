namespace jcast {
    export class Renderer {
        private canvas:HTMLCanvasElement;
        private map?:Map;
        private context:CanvasRenderingContext2D | null;

        public constructor (canvas:HTMLCanvasElement, map?:Map) {
            this.canvas = canvas;
            this.map = map;
            this.context = canvas.getContext('2d');
        }
    }
}
