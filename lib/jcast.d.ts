declare namespace jcast {
    class Block {
        private _wall?;
        constructor({ wall }?: {
            wall?: Wall;
        });
        get wall(): Wall | undefined;
        set wall(value: Wall | undefined);
        render(renderer: Renderer, px: number, origin: Vector3, target: Vector3, step: Vector3): void;
    }
}
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
        constructor({ transform, farClipPlane }?: {
            transform?: Transform;
            farClipPlane?: number;
        });
        get farClipPlane(): number;
        set farClipPlane(value: number);
    }
}
declare namespace jcast {
    class Color {
        private _hexString?;
        private _r;
        private _g;
        private _b;
        private _a;
        constructor({ r, g, b, a }?: {
            r?: number;
            g?: number;
            b?: number;
            a?: number;
        });
        get r(): number;
        set r(value: number);
        get g(): number;
        set g(value: number);
        get b(): number;
        set b(value: number);
        get a(): number;
        set a(value: number);
        toHexString(prefixed?: boolean): string;
        toRGBAString(): string;
    }
}
declare namespace jcast {
    class JCast {
        private _renderer;
        constructor({ canvas, map }: {
            canvas: HTMLCanvasElement;
            map?: Map;
        });
        get renderer(): Renderer;
    }
}
declare namespace jcast {
    class Map {
        private _camera?;
        private _width;
        private _height;
        private _depth;
        private _name?;
        private _blocks;
        constructor({ camera, width, height, depth, name }?: {
            camera?: Camera;
            width?: number;
            height?: number;
            depth?: number;
            name?: string | undefined;
        });
        get activeCamera(): Camera | undefined;
        set activeCamera(value: Camera | undefined);
        get width(): number;
        get height(): number;
        get depth(): number;
        set depth(value: number);
        get name(): string | undefined;
        set name(value: string | undefined);
        nullify(): void;
        getBlock(x: number, y: number): Block | null;
        setBlock(x: number, y: number, block: Block | null): void;
    }
}
declare namespace jcast {
    class Renderer {
        static readonly RENDER_MODE_NONE = 0;
        static readonly RENDER_MODE_RAF = 1;
        static readonly RENDER_MODE_INTERVAL = 2;
        static readonly requestAnimationFrame: ((callback: FrameRequestCallback) => number) & typeof requestAnimationFrame;
        static readonly cancelAnimationFrame: ((handle: number) => void) & typeof cancelAnimationFrame;
        private _canvas;
        private _width;
        private _height;
        private _context;
        private _ps;
        private _fps;
        private _map?;
        private _rendering;
        private _renderMode;
        private _intervalID;
        constructor({ canvas, map, ps, fps }: {
            canvas: HTMLCanvasElement;
            ps?: number;
            fps?: number;
            map?: Map;
        });
        get canvas(): HTMLCanvasElement;
        set canvas(value: HTMLCanvasElement);
        get width(): number;
        get height(): number;
        get context(): CanvasRenderingContext2D | null;
        get ps(): number;
        set ps(value: number);
        get fps(): number;
        set fps(value: number);
        get map(): Map | undefined;
        set map(value: Map | undefined);
        get renderMode(): number;
        start(): void;
        stop(): void;
        private render;
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
    class Wall {
        private _color?;
        constructor({ color }?: {
            color?: Color;
        });
        get color(): Color | undefined;
        set color(value: Color | undefined);
    }
}
declare namespace jcast {
    function init({ canvas, map }: {
        canvas: HTMLCanvasElement;
        map?: Map;
    }): JCast;
}
//# sourceMappingURL=jcast.d.ts.map