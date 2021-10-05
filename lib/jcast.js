"use strict";
var jcast;
(function (jcast) {
    var Asset = /** @class */ (function () {
        function Asset(_a) {
            var _b = _a.data, data = _b === void 0 ? { sections: [] } : _b;
            this._data = { sections: [] };
            this._assets = {};
            this._onload = null;
            this._data = data;
        }
        Asset.prototype.get = function (section, name) {
            if (this._assets[section] != undefined && this._assets[section][name] != undefined) {
                return this._assets[section][name];
            }
            return null;
        };
        Asset.prototype.onload = function (onload) {
            this._onload = onload;
        };
        Asset.prototype.load = function (callback) {
            var _this = this;
            var total = this.getAssetsCount();
            var loaded = 0;
            this.logLoadingGameAssets();
            for (var _i = 0, _a = this._data.sections; _i < _a.length; _i++) {
                var section = _a[_i];
                if (this._assets[section.name] == undefined) {
                    this._assets[section.name] = {};
                }
                for (var _b = 0, _c = section.resources; _b < _c.length; _b++) {
                    var resource = _c[_b];
                    if (this._assets[section.name][resource.name] != undefined) {
                        loaded += resource.url.length;
                        if (this._onload)
                            this._onload(loaded, total);
                        this.logSkippingAlreadyLoadedResource();
                        continue;
                    }
                    switch (resource.type) {
                        case 'material':
                            this._assets[section.name][resource.name] = new jcast.Material();
                            if (resource.url.length > 0) {
                                this.loadTexture(resource.url[0], section, resource, function (section, resource, texture) {
                                    _this._assets[section.name][resource.name].texture = texture;
                                    loaded++;
                                    if (_this._onload)
                                        _this._onload(loaded, total, texture);
                                    _this.logAllAssetsLoadedCorrectly(loaded, total, callback);
                                });
                            }
                            if (resource.url.length > 1) {
                                this.loadColor(resource.url[1], section, resource, function (section, resource, color) {
                                    _this._assets[section.name][resource.name].color = color;
                                    loaded++;
                                    if (_this._onload)
                                        _this._onload(loaded, total, color);
                                    _this.logAllAssetsLoadedCorrectly(loaded, total, callback);
                                });
                            }
                            break;
                        case 'data':
                            this._assets[section.name][resource.name] = {};
                            if (resource.url.length > 0) {
                                this.loadData(resource.url[0], section, resource, function (section, resource, data) {
                                    _this._assets[section.name][resource.name] = data;
                                    loaded++;
                                    if (_this._onload)
                                        _this._onload(loaded, total, data);
                                    _this.logAllAssetsLoadedCorrectly(loaded, total, callback);
                                });
                            }
                            break;
                        default:
                            loaded += resource.url.length;
                            if (this._onload)
                                this._onload(loaded, total);
                            this.logResourceHasAnInvalidType(resource.name);
                            break;
                    }
                }
            }
            this.logAllAssetsLoadedCorrectly(loaded, total, callback);
        };
        Asset.prototype.getAssetsCount = function () {
            var total = 0;
            this._data.sections.forEach(function (section) {
                section.resources.forEach(function (resource) {
                    total += resource.url.length;
                });
            });
            return total;
        };
        Asset.prototype.loadTexture = function (url, section, resource, callback) {
            var image = new Image();
            image.onload = function (e) {
                var texture = new jcast.Texture({ image: image });
                if (callback) {
                    callback(section, resource, texture);
                }
            };
            image.src = url;
        };
        Asset.prototype.loadColor = function (url, section, resource, callback) {
            jcast.http.get(url, function (data) {
                var color = new jcast.Color(data);
                if (callback) {
                    callback(section, resource, color);
                }
            });
        };
        Asset.prototype.loadData = function (url, section, resource, callback) {
            jcast.http.get(url, function (data) {
                if (callback) {
                    callback(section, resource, data);
                }
            });
        };
        Asset.prototype.logLoadingGameAssets = function () {
            jcast.Console.log('Loading game assets...');
        };
        Asset.prototype.logSkippingAlreadyLoadedResource = function () {
            jcast.Console.warn('Skipping already loaded resource');
        };
        Asset.prototype.logResourceHasAnInvalidType = function (name) {
            jcast.Console.warn("Resource " + name + " has an invalid type");
        };
        Asset.prototype.logAllAssetsLoadedCorrectly = function (loaded, total, callback) {
            if (loaded >= total) {
                jcast.Console.log('All assets loaded correctly');
                if (callback) {
                    callback(loaded, total);
                }
            }
        };
        return Asset;
    }());
    jcast.Asset = Asset;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Interactive = /** @class */ (function () {
        function Interactive(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.transform, transform = _c === void 0 ? new jcast.Transform() : _c;
            this.transform = transform;
        }
        return Interactive;
    }());
    jcast.Interactive = Interactive;
})(jcast || (jcast = {}));
/// <reference path="Interactive.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var jcast;
(function (jcast) {
    var Block = /** @class */ (function (_super) {
        __extends(Block, _super);
        function Block(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.walls, walls = _c === void 0 ? [] : _c, _d = _b.transform, transform = _d === void 0 ? undefined : _d;
            var _this = _super.call(this, {
                transform: transform
            }) || this;
            _this.walls = walls;
            return _this;
        }
        Object.defineProperty(Block.prototype, "walls", {
            get: function () {
                return this._walls;
            },
            set: function (value) {
                this._walls = value;
            },
            enumerable: false,
            configurable: true
        });
        Block.prototype.render = function (renderer, c, distance, sx, sy, dx, dy, side) {
            var _a;
            var map = renderer.map;
            var camera = (_a = renderer.map) === null || _a === void 0 ? void 0 : _a.activeCamera;
            if (!map || !camera || !this._walls || this._walls.length == 0) {
                return;
            }
            var height = Math.floor(map.depth * renderer.height / distance);
            var wy = Math.floor((camera.transform.rotation.z * 100) + (renderer.height - height) / 2);
            for (var i = 0; i < this._walls.length && wy + height > 0; i++) {
                var wall = this._walls[i];
                if (wall && wall.material) {
                    if (wall.material.texture && wall.material.texture.image) {
                        // Render a textured vertical chunk from the wall:
                        var wallX = (side == 0) ? camera.transform.position.y + distance * dy : camera.transform.position.x + distance * dx;
                        wallX -= Math.floor(wallX);
                        var image = wall.material.texture.image;
                        var texX = Math.floor(wallX * image.width);
                        if ((side == 0 && dx > 0) || (side == 1 && dy < 0)) {
                            texX = image.width - texX - 1;
                        }
                        renderer.context.drawImage(image, texX, 0, 1, image.height, c, wy, 1, height);
                    }
                    else if (wall.material.color) {
                        // Render a solid coloured vertical chunk from the wall:
                        renderer.context.fillStyle = wall.material.color.toRGBAString();
                        renderer.context.fillRect(c, wy, 1, height);
                    }
                }
                wy -= height;
            }
        };
        Block.render = function (renderer, hits) {
            for (var i = hits.length - 1; i >= 0; i--) {
                var hit = hits[i];
                hit.block.render(renderer, hit.c, hit.distance, hit.sx, hit.sy, hit.dx, hit.dy, hit.side);
            }
        };
        return Block;
    }(jcast.Interactive));
    jcast.Block = Block;
})(jcast || (jcast = {}));
/// <reference path="Interactive.ts" />
var jcast;
(function (jcast) {
    var Camera = /** @class */ (function (_super) {
        __extends(Camera, _super);
        function Camera(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.transform, transform = _c === void 0 ? new jcast.Transform() : _c, _d = _b.plane, plane = _d === void 0 ? new jcast.Vector3({ y: 0.66 }) : _d, _e = _b.farClipPlane, farClipPlane = _e === void 0 ? 10.0 : _e;
            var _this = _super.call(this, {
                transform: transform
            }) || this;
            _this._farClipPlane = 0;
            _this.plane = plane;
            _this.farClipPlane = farClipPlane;
            return _this;
        }
        Object.defineProperty(Camera.prototype, "farClipPlane", {
            get: function () {
                return this._farClipPlane;
            },
            set: function (value) {
                this._farClipPlane = value;
            },
            enumerable: false,
            configurable: true
        });
        Camera.prototype.rotate = function (x, y, z) {
            var planeX = this.plane.x;
            this.plane.x = this.plane.x * Math.cos(y) - this.plane.y * Math.sin(y);
            this.plane.y = planeX * Math.sin(y) + this.plane.y * Math.cos(y);
            this.transform.rotation.y += y;
            this.transform.rotation.z += z;
        };
        return Camera;
    }(jcast.Interactive));
    jcast.Camera = Camera;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Color = /** @class */ (function () {
        function Color(_c) {
            var _d = _c === void 0 ? {} : _c, _e = _d.r, r = _e === void 0 ? 0 : _e, _f = _d.g, g = _f === void 0 ? 0 : _f, _h = _d.b, b = _h === void 0 ? 0 : _h, _j = _d.a, a = _j === void 0 ? 1.0 : _j;
            this._hexString = undefined;
            this._r = 0;
            this._g = 0;
            this._b = 0;
            this._a = 0;
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Object.defineProperty(Color.prototype, "r", {
            get: function () {
                return this._r;
            },
            set: function (value) {
                this._hexString = undefined;
                this._r = Math.min(Math.max(0, value), 255);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            get: function () {
                return this._g;
            },
            set: function (value) {
                this._hexString = undefined;
                this._g = Math.min(Math.max(0, value), 255);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            get: function () {
                return this._b;
            },
            set: function (value) {
                this._hexString = undefined;
                this._b = Math.min(Math.max(0, value), 255);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "a", {
            get: function () {
                return this._a;
            },
            set: function (value) {
                this._hexString = undefined;
                this._a = Math.min(Math.max(0.0, value), 1.0);
            },
            enumerable: false,
            configurable: true
        });
        Color.prototype.toHexString = function (prefixed) {
            if (prefixed === void 0) { prefixed = true; }
            var hexString;
            if (this._hexString) {
                hexString = this._hexString;
            }
            else {
                hexString = "" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
                this._hexString = hexString;
            }
            return prefixed ? "#" + hexString : hexString;
        };
        Color.prototype.toRGBAString = function () {
            return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
        };
        return Color;
    }());
    jcast.Color = Color;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Console = /** @class */ (function () {
        function Console() {
        }
        Console.log = function (output) {
            if (this.displayLogs) {
                console.log(jcast.JCast.getIdentifier() + ": " + output);
            }
        };
        Console.warn = function (output) {
            if (this.displayLogs) {
                console.warn(jcast.JCast.getIdentifier() + ": " + output);
            }
        };
        Console.displayLogs = true;
        return Console;
    }());
    jcast.Console = Console;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var JCast = /** @class */ (function () {
        function JCast(_a) {
            var canvas = _a.canvas, data = _a.data, _b = _a.map, map = _b === void 0 ? undefined : _b;
            this._renderer = new jcast.Renderer({ canvas: canvas, map: map });
            this._asset = new jcast.Asset({ data: data.assets });
        }
        Object.defineProperty(JCast.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JCast.prototype, "asset", {
            get: function () {
                return this._asset;
            },
            enumerable: false,
            configurable: true
        });
        JCast.prototype.start = function () {
            this.renderer.start();
        };
        JCast.prototype.stop = function () {
            this.renderer.stop();
        };
        JCast.getIdentifier = function () {
            return JCast.NAME + " " + JCast.VERSION;
        };
        JCast.NAME = 'JCast Engine';
        JCast.VERSION = 'v0.0.1';
        return JCast;
    }());
    jcast.JCast = JCast;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Map = /** @class */ (function () {
        function Map(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.camera, camera = _c === void 0 ? undefined : _c, _d = _b.width, width = _d === void 0 ? 64 : _d, _e = _b.height, height = _e === void 0 ? 64 : _e, _f = _b.depth, depth = _f === void 0 ? 1 : _f, _g = _b.name, name = _g === void 0 ? undefined : _g, _h = _b.bg, bg = _h === void 0 ? undefined : _h, _j = _b.floor, floor = _j === void 0 ? undefined : _j;
            this._width = 0;
            this._height = 0;
            this._depth = 0.0;
            this._blocks = [];
            this.activeCamera = camera;
            this.depth = depth;
            this.name = name;
            this.bg = bg;
            this.floor = floor;
            if (width > 0) {
                this._width = Math.round(width);
            }
            if (height > 0) {
                this._height = Math.round(height);
            }
            this.nullify();
        }
        Object.defineProperty(Map.prototype, "activeCamera", {
            get: function () {
                return this._camera;
            },
            set: function (value) {
                this._camera = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "depth", {
            get: function () {
                return this._depth;
            },
            set: function (value) {
                this._depth = Math.max(0, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "bg", {
            get: function () {
                return this._bg;
            },
            set: function (value) {
                this._bg = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "floor", {
            get: function () {
                return this._floor;
            },
            set: function (value) {
                this._floor = value;
            },
            enumerable: false,
            configurable: true
        });
        Map.prototype.nullify = function () {
            var blocks = [];
            for (var x = 0; x < this.width; x++) {
                blocks.push([]);
                for (var y = 0; y < this.height; y++) {
                    blocks[x][y] = null;
                }
            }
            this._blocks = blocks;
        };
        Map.prototype.getBlock = function (x, y) {
            if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
                return null;
            }
            var blockX = Math.floor(x);
            var blockY = Math.floor(y);
            var block = this._blocks[blockX][blockY];
            if (block) {
                block.transform.position.x = blockX;
                block.transform.position.y = blockY;
            }
            return block;
        };
        Map.prototype.setBlock = function (x, y, block) {
            if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
                var blockX = Math.floor(x);
                var blockY = Math.floor(y);
                if (block) {
                    block.transform.position.x = blockX;
                    block.transform.position.y = blockY;
                }
                this._blocks[blockX][blockY] = block;
            }
        };
        return Map;
    }());
    jcast.Map = Map;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Material = /** @class */ (function () {
        function Material(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.texture, texture = _c === void 0 ? undefined : _c, _d = _b.color, color = _d === void 0 ? undefined : _d;
            this.texture = texture;
            this.color = color;
        }
        return Material;
    }());
    jcast.Material = Material;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Mathf = /** @class */ (function () {
        function Mathf() {
        }
        Mathf.degToRad = function (deg) {
            return (deg * Math.PI) / 180;
        };
        Mathf.radToDeg = function (rad) {
            return (rad * 180) / Math.PI;
        };
        Mathf.HALF_PI = Math.PI / 2;
        return Mathf;
    }());
    jcast.Mathf = Mathf;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Renderer = /** @class */ (function () {
        function Renderer(_a) {
            var canvas = _a.canvas, _b = _a.map, map = _b === void 0 ? undefined : _b, _c = _a.fps, fps = _c === void 0 ? 0 : _c;
            this._width = 0;
            this._height = 0;
            this._context = null;
            this._fps = 0;
            this._rendering = false;
            this._renderMode = Renderer.RENDER_MODE_NONE;
            this._intervalID = 0;
            this._canvas = canvas;
            this.canvas = canvas;
            this.fps = fps;
            this.map = map;
        }
        Object.defineProperty(Renderer.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            set: function (value) {
                this._canvas = value;
                this._width = value.width;
                this._height = value.height;
                this._context = value.getContext('2d');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "context", {
            get: function () {
                return this._context;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "fps", {
            get: function () {
                return this._fps;
            },
            set: function (value) {
                this._fps = Math.round(Math.max(0, value));
                if (this._rendering) {
                    this.stop();
                    this.start();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "map", {
            get: function () {
                return this._map;
            },
            set: function (value) {
                this._map = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "renderMode", {
            get: function () {
                return this._renderMode;
            },
            enumerable: false,
            configurable: true
        });
        Renderer.prototype.start = function () {
            var _this = this;
            if (this._rendering) {
                return;
            }
            this._rendering = true;
            if (this._fps > 0) {
                this._renderMode = Renderer.RENDER_MODE_INTERVAL;
                this._intervalID = setInterval(function () { return _this.render(); }, Math.round(1000 / this._fps));
            }
            else {
                this._renderMode = Renderer.RENDER_MODE_RAF;
                window.requestAnimationFrame = Renderer.requestAnimationFrame;
                requestAnimationFrame(function () { return _this.render(); });
            }
        };
        Renderer.prototype.stop = function () {
            if (!this._rendering) {
                return;
            }
            this._rendering = false;
            this._renderMode = Renderer.RENDER_MODE_NONE;
            clearInterval(this._intervalID);
        };
        Renderer.prototype.render = function () {
            var _this = this;
            var _a, _b, _c;
            jcast.Time.update();
            (_a = this._context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.width, this.height);
            if (!this._map || !this._map.activeCamera) {
                return;
            }
            var map = this._map;
            var camera = this._map.activeCamera;
            if (map.bg && map.bg.color) {
                this._context.fillStyle = map.bg.color.toRGBAString();
                (_b = this._context) === null || _b === void 0 ? void 0 : _b.fillRect(0, 0, this.width, this.height);
            }
            if (map.floor && map.floor.color) {
                this._context.fillStyle = map.floor.color.toRGBAString();
                (_c = this._context) === null || _c === void 0 ? void 0 : _c.fillRect(0, Math.max(0, (camera.transform.rotation.z * 100) + (this.height / 2)), this.width, this.height);
            }
            for (var c = 0; c < this.width; c++) {
                var cx = 2 * c / this.width - 1;
                var dx = Math.cos(camera.transform.rotation.y) + camera.plane.x * cx;
                var dy = Math.sin(camera.transform.rotation.y) + camera.plane.y * cx;
                var mx = Math.floor(camera.transform.position.x);
                var my = Math.floor(camera.transform.position.y);
                var ddx = Math.sqrt(1 + (dy * dy) / (dx * dx));
                var ddy = Math.sqrt(1 + (dx * dx) / (dy * dy));
                var sx = void 0, sy = void 0, sdx = void 0, sdy = void 0, side = void 0;
                var hits = [];
                if (dx < 0.0) {
                    sx = -1;
                    sdx = (camera.transform.position.x - mx) * ddx;
                }
                else {
                    sx = 1;
                    sdx = (mx + 1.0 - camera.transform.position.x) * ddx;
                }
                if (dy < 0.0) {
                    sy = -1;
                    sdy = (camera.transform.position.y - my) * ddy;
                }
                else {
                    sy = 1;
                    sdy = (my + 1.0 - camera.transform.position.y) * ddy;
                }
                while (true) {
                    if (sdx < sdy) {
                        sdx += ddx;
                        mx += sx;
                        side = 0;
                    }
                    else {
                        sdy += ddy;
                        my += sy;
                        side = 1;
                    }
                    var x = camera.transform.position.x;
                    var y = camera.transform.position.y;
                    var distance = (side == 0) ? (mx - x + (1 - sx) / 2) / dx : (my - y + (1 - sy) / 2) / dy;
                    var block = map.getBlock(mx, my);
                    if (block) {
                        hits.push({ block: block, mx: mx, my: my, c: c, distance: distance, sx: sx, sy: sy, dx: dx, dy: dy, side: side });
                    }
                    if (distance >= camera.farClipPlane) {
                        break;
                    }
                }
                jcast.Block.render(this, hits);
            }
            if (this._renderMode == Renderer.RENDER_MODE_RAF) {
                window.requestAnimationFrame(function () { return _this.render(); });
            }
        };
        Renderer.RENDER_MODE_NONE = 0x00;
        Renderer.RENDER_MODE_RAF = 0x01;
        Renderer.RENDER_MODE_INTERVAL = 0x02;
        // @ts-ignore
        Renderer.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        return Renderer;
    }());
    jcast.Renderer = Renderer;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Texture = /** @class */ (function () {
        function Texture(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.image, image = _c === void 0 ? undefined : _c;
            this.image = undefined;
            this.image = image;
        }
        return Texture;
    }());
    jcast.Texture = Texture;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Time = /** @class */ (function () {
        function Time() {
        }
        Time.update = function () {
            var currentTime = Date.now();
            Time.deltaTime = (Time._lastTime == 0) ? 0.0 : (currentTime - Time._lastTime) / 1000;
            Time._lastTime = currentTime;
        };
        Time.deltaTime = 0.0;
        Time._lastTime = 0;
        return Time;
    }());
    jcast.Time = Time;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Transform = /** @class */ (function () {
        function Transform(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.position, position = _c === void 0 ? new jcast.Vector3() : _c, _d = _b.rotation, rotation = _d === void 0 ? new jcast.Vector3() : _d;
            this.position = position;
            this.rotation = rotation;
        }
        Object.defineProperty(Transform.prototype, "eulerAngles", {
            get: function () {
                var eulerAngles = new jcast.Vector3();
                if (this.rotation.x != 0) {
                    eulerAngles.x = jcast.Mathf.radToDeg(this.rotation.x);
                }
                if (this.rotation.y != 0) {
                    eulerAngles.y = jcast.Mathf.radToDeg(this.rotation.y);
                }
                if (this.rotation.z != 0) {
                    eulerAngles.z = jcast.Mathf.radToDeg(this.rotation.z);
                }
                return eulerAngles;
            },
            enumerable: false,
            configurable: true
        });
        return Transform;
    }());
    jcast.Transform = Transform;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Vector3 = /** @class */ (function () {
        function Vector3(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d, _e = _b.z, z = _e === void 0 ? 0 : _e;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Vector3.zero = new Vector3();
        return Vector3;
    }());
    jcast.Vector3 = Vector3;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Wall = /** @class */ (function () {
        function Wall(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.material, material = _c === void 0 ? new jcast.Material() : _c;
            this.material = material;
        }
        Object.defineProperty(Wall.prototype, "material", {
            get: function () {
                return this._material;
            },
            set: function (value) {
                this._material = value;
            },
            enumerable: false,
            configurable: true
        });
        return Wall;
    }());
    jcast.Wall = Wall;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    function init(_a) {
        var canvas = _a.canvas, data = _a.data, _b = _a.map, map = _b === void 0 ? undefined : _b;
        return new jcast.JCast({ canvas: canvas, data: data, map: map });
    }
    jcast.init = init;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var http;
    (function (http) {
        function get(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                var _a;
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (((_a = xhr.getResponseHeader('Content-Type')) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase().indexOf('application/json')) !== -1) {
                        callback(JSON.parse(xhr.responseText));
                    }
                    else {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send();
        }
        http.get = get;
    })(http = jcast.http || (jcast.http = {}));
})(jcast || (jcast = {}));
//# sourceMappingURL=jcast.js.map