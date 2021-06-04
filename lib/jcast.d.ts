declare namespace jcast {
    abstract class Interactive {
        transform: Transform;
        constructor({ transform }?: {
            transform?: Transform;
        });
    }
}
declare namespace jcast {
    class Camera extends Interactive {
        private _farClipPlane;
        get farClipPlane(): number;
        set farClipPlane(value: number);
        constructor({ transform, farClipPlane }?: {
            transform?: Transform;
            farClipPlane?: number;
        });
    }
}
declare namespace jcast {
    class JCast {
        private _renderer;
        constructor({ canvas, map }: {
            canvas: HTMLCanvasElement;
            map?: Map;
        });
    }
}
declare namespace jcast {
    class Map {
        private _camera?;
        private _width;
        private _height;
        private _depth;
        private _name?;
        get activeCamera(): Camera | undefined;
        set activeCamera(value: Camera | undefined);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get depth(): number;
        set depth(value: number);
        get name(): string | undefined;
        set name(value: string | undefined);
        constructor({ camera, width, height, depth, name }?: {
            camera?: Camera;
            width?: number;
            height?: number;
            depth?: number;
            name?: string | undefined;
        });
    }
}
declare namespace jcast {
    class Renderer {
        private _canvas;
        private _map?;
        private _width;
        private _height;
        private _context;
        get canvas(): HTMLCanvasElement;
        set canvas(value: HTMLCanvasElement);
        get map(): Map | undefined;
        set map(value: Map | undefined);
        get context(): CanvasRenderingContext2D | null;
        constructor({ canvas, map }: {
            canvas: HTMLCanvasElement;
            map?: Map;
        });
    }
}
declare namespace jcast {
    class Transform {
        position: Vector3;
        rotation: Vector3;
        constructor({ position, rotation }?: {
            position?: Vector3;
            rotation?: Vector3;
        });
    }
}
declare namespace jcast {
    class Vector3 {
        static readonly zero: Vector3;
        x: number;
        y: number;
        z: number;
        constructor({ x, y, z }?: {
            x?: number;
            y?: number;
            z?: number;
        });
    }
}
declare namespace jcast {
    function init({ canvas, map }: {
        canvas: HTMLCanvasElement;
        map?: Map;
    }): JCast;
}
//# sourceMappingURL=jcast.d.ts.map