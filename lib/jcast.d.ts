declare namespace jcast {
    class Asset {
        private _data;
        private _assets;
        constructor({ data }: {
            data?: AssetData;
        });
        get(section: string, name: string): any;
        load(callback?: (loaded: number, total: number) => void): void;
        getAssetsCount(): number;
        private loadTexture;
        private loadColor;
        private loadData;
        private logLoadingGameAssets;
        private logSkippingAlreadyLoadedResource;
        private logResourceHasAnInvalidType;
        private logAllAssetsLoadedCorrectly;
    }
}
declare namespace jcast {
    export interface AssetData {
        displayLogs: boolean;
        sections: SectionData[];
    }
    interface SectionData {
        name: string;
        resources: ResourceData[];
    }
    interface ResourceData {
        name: string;
        url: string[2];
        type: 'material' | 'data';
    }
    export {};
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
    class Block extends Interactive {
        private _walls?;
        constructor({ walls, transform }?: {
            walls?: Wall[] | null[];
            transform?: Transform;
        });
        get walls(): Wall[] | null[] | undefined;
        set walls(value: Wall[] | null[] | undefined);
        render(renderer: Renderer, c: number, distance: number, sx: number, sy: number, dx: number, dy: number, side: number): void;
        static render(renderer: Renderer, hits: {
            block: Block;
            mx: number;
            my: number;
            c: number;
            distance: number;
            sx: number;
            sy: number;
            dx: number;
            dy: number;
            side: number;
        }[]): void;
    }
}
declare namespace jcast {
    class Camera extends Interactive {
        plane: Vector3;
        private _farClipPlane;
        constructor({ transform, plane, farClipPlane }?: {
            transform?: Transform;
            plane?: Vector3;
            farClipPlane?: number;
        });
        get farClipPlane(): number;
        set farClipPlane(value: number);
        rotate(x: number, y: number, z: number): void;
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
        static readonly NAME = "JCast Engine";
        static readonly VERSION = "v0.0.1";
        private _renderer;
        private _asset;
        constructor({ canvas, data, map }: {
            canvas: HTMLCanvasElement;
            data: JCastData;
            map?: Map;
        });
        get renderer(): Renderer;
        get asset(): Asset;
        start(): void;
        stop(): void;
        static getIdentifier(): string;
    }
}
declare namespace jcast {
    interface JCastData {
        assets: AssetData;
    }
}
declare namespace jcast {
    class Map {
        private _camera?;
        private _width;
        private _height;
        private _depth;
        private _name?;
        private _bg?;
        private _floor?;
        private _blocks;
        constructor({ camera, width, height, depth, name, bg, floor }?: {
            camera?: Camera;
            width?: number;
            height?: number;
            depth?: number;
            name?: string | undefined;
            bg?: Material;
            floor?: Material;
        });
        get activeCamera(): Camera | undefined;
        set activeCamera(value: Camera | undefined);
        get width(): number;
        get height(): number;
        get depth(): number;
        set depth(value: number);
        get name(): string | undefined;
        set name(value: string | undefined);
        get bg(): Material | undefined;
        set bg(value: Material | undefined);
        get floor(): Material | undefined;
        set floor(value: Material | undefined);
        nullify(): void;
        getBlock(x: number, y: number): Block | null;
        setBlock(x: number, y: number, block: Block | null): void;
    }
}
declare namespace jcast {
    class Material {
        texture?: Texture;
        color?: Color;
        constructor({ texture, color }?: {
            texture?: Texture;
            color?: Color;
        });
    }
}
declare namespace jcast {
    class Mathf {
        static readonly HALF_PI: number;
        static degToRad(deg: number): number;
        static radToDeg(rad: number): number;
    }
}
declare namespace jcast {
    class Renderer {
        static readonly RENDER_MODE_NONE = 0;
        static readonly RENDER_MODE_RAF = 1;
        static readonly RENDER_MODE_INTERVAL = 2;
        static readonly requestAnimationFrame: ((callback: FrameRequestCallback) => number) & typeof requestAnimationFrame;
        private _canvas;
        private _width;
        private _height;
        private _context;
        private _fps;
        private _map?;
        private _rendering;
        private _renderMode;
        private _intervalID;
        constructor({ canvas, map, fps }: {
            canvas: HTMLCanvasElement;
            fps?: number;
            map?: Map;
        });
        get canvas(): HTMLCanvasElement;
        set canvas(value: HTMLCanvasElement);
        get width(): number;
        get height(): number;
        get context(): CanvasRenderingContext2D | null;
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
    class Texture {
        private _image?;
        get image(): HTMLImageElement | undefined;
        constructor({ image }?: {
            image?: HTMLImageElement;
        });
    }
}
declare namespace jcast {
    class Time {
        static deltaTime: number;
        private static _lastTime;
        static update(): void;
    }
}
declare namespace jcast {
    class Transform {
        position: Vector3;
        rotation: Vector3;
        get eulerAngles(): Vector3;
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
        private _material?;
        constructor({ material }?: {
            material?: Material;
        });
        get material(): Material | undefined;
        set material(value: Material | undefined);
    }
}
declare namespace jcast {
    function init({ canvas, data, map }: {
        canvas: HTMLCanvasElement;
        data: JCastData;
        map?: Map;
    }): JCast;
}
declare namespace jcast {
    namespace http {
        function get(url: string, callback: (data: any) => any): void;
    }
}
//# sourceMappingURL=jcast.d.ts.map