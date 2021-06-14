"use strict";
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
            var _b = _a === void 0 ? {} : _a, _c = _b.wall, wall = _c === void 0 ? undefined : _c, _d = _b.transform, transform = _d === void 0 ? undefined : _d;
            var _this = _super.call(this, {
                transform: transform
            }) || this;
            _this.wall = wall;
            return _this;
        }
        Object.defineProperty(Block.prototype, "wall", {
            get: function () {
                return this._wall;
            },
            set: function (value) {
                this._wall = value;
            },
            enumerable: false,
            configurable: true
        });
        Block.prototype.render = function (renderer, a, isClosestTarget, hit, origin, relative, step, target) {
            var map = renderer.map;
            var activeCamera = map === null || map === void 0 ? void 0 : map.activeCamera;
            var context = renderer.context;
            // if (!isClosestTarget || !hit || !map || !activeCamera || !context || !this._wall || !this._wall.color) {
            if (!hit || !map || !activeCamera || !context || !this._wall || !this._wall.color) {
                return;
            }
            var eulerAngles = activeCamera.transform.eulerAngles;
            var hf = renderer.fov / 2;
            var aa = a - (eulerAngles.y - hf);
            var depth = map.depth;
            var rendererHeight = renderer.height;
            var distance = Math.sqrt(Math.pow(target.x - origin.x, 2) + Math.pow(target.y - origin.y, 2));
            var height = ((depth - (Math.min(depth, distance))) * rendererHeight) / depth;
            if (height == 0) {
                return;
            }
            context.fillStyle = this._wall.color.toRGBAString();
            context.fillRect((aa * renderer.width) / renderer.fov, (rendererHeight - height) / 2, renderer.width / renderer.fov, height); // TODO: Pre-calculate Pixel Size
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
            var _b = _a === void 0 ? {} : _a, _c = _b.transform, transform = _c === void 0 ? new jcast.Transform() : _c, _d = _b.farClipPlane, farClipPlane = _d === void 0 ? 10.0 : _d;
            var _this = _super.call(this, {
                transform: transform
            }) || this;
            _this._farClipPlane = 0;
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
    var JCast = /** @class */ (function () {
        function JCast(_a) {
            var canvas = _a.canvas, _b = _a.map, map = _b === void 0 ? undefined : _b;
            this._renderer = new jcast.Renderer({ canvas: canvas, map: map });
        }
        Object.defineProperty(JCast.prototype, "renderer", {
            get: function () {
                return this._renderer;
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
        return JCast;
    }());
    jcast.JCast = JCast;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Map = /** @class */ (function () {
        function Map(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.camera, camera = _c === void 0 ? undefined : _c, _d = _b.width, width = _d === void 0 ? 64 : _d, _e = _b.height, height = _e === void 0 ? 64 : _e, _f = _b.depth, depth = _f === void 0 ? 10.0 : _f, _g = _b.name, name = _g === void 0 ? undefined : _g;
            this._width = 0;
            this._height = 0;
            this._depth = 0.0;
            this._blocks = [];
            this.activeCamera = camera;
            this.depth = depth;
            this.name = name;
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
            var canvas = _a.canvas, _b = _a.map, map = _b === void 0 ? undefined : _b, _c = _a.fov, fov = _c === void 0 ? 2 : _c, _d = _a.fps, fps = _d === void 0 ? 0 : _d;
            this._width = 0;
            this._height = 0;
            this._context = null;
            this._fov = 0;
            this._fps = 0;
            this._rendering = false;
            this._renderMode = Renderer.RENDER_MODE_NONE;
            this._intervalID = 0;
            this._origin = new jcast.Vector3();
            this._relative = new jcast.Vector3();
            this._target = new jcast.Vector3();
            this._step = new jcast.Vector3();
            this._canvas = canvas;
            this.canvas = canvas;
            this.fov = fov;
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
        Object.defineProperty(Renderer.prototype, "fov", {
            get: function () {
                return this._fov;
            },
            set: function (value) {
                this._fov = Math.round(Math.max(1, value));
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
            var _a;
            (_a = this._context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.width, this.height);
            if (!this._map || !this._map.activeCamera) {
                return;
            }
            var activeCamera = this._map.activeCamera;
            var eulerAngles = activeCamera.transform.eulerAngles;
            var xl = Math.cos(activeCamera.transform.rotation.y) * activeCamera.farClipPlane;
            var yl = Math.sin(activeCamera.transform.rotation.y) * activeCamera.farClipPlane;
            var hf = this._fov / 2;
            var tf = eulerAngles.y + hf;
            this._origin.x = activeCamera.transform.position.x;
            this._origin.y = activeCamera.transform.position.y;
            for (var a = eulerAngles.y - hf; a < tf; a++) {
                var ar = jcast.Mathf.degToRad(a);
                var tx = activeCamera.transform.position.x + (Math.cos(ar) * activeCamera.farClipPlane);
                var ty = activeCamera.transform.position.y + (Math.sin(ar) * activeCamera.farClipPlane);
                var hd = this._origin.x - tx;
                var vd = this._origin.y - ty;
                var st = Math.abs(hd) > Math.abs(vd) ? Math.abs(hd) : Math.abs(vd);
                var xd = hd / st;
                var yd = vd / st;
                var oxi = Math.floor(this._origin.x);
                var oyi = Math.floor(this._origin.y);
                var txi = Math.floor(tx);
                var tyi = Math.floor(ty);
                var oxip1 = oxi + 1;
                var oyip1 = oyi + 1;
                var txip1 = txi + 1;
                var tyip1 = tyi + 1;
                this._relative.x = tx - xl;
                this._relative.y = ty - yl;
                if (oxi == txi && oyi == tyi) {
                    var block = this._map.getBlock(txi, tyi);
                    this._target.x = tx;
                    this._target.y = ty;
                    block === null || block === void 0 ? void 0 : block.render(this, a, true, false, this._origin, this._relative, this._step, this._target);
                }
                else {
                    if (xd == -1 || xd == 1) {
                        if (xd == -1) {
                            this._target.x = txip1;
                        }
                        else {
                            this._target.x = txi;
                        }
                    }
                    else {
                        if (yd == -1) {
                            this._target.x = tx - ((tyip1 - ty) * xd);
                        }
                        else {
                            this._target.x = tx - ((ty - tyi) * xd);
                        }
                    }
                    if (yd == -1 || yd == 1) {
                        if (yd == -1) {
                            this._target.y = tyip1;
                        }
                        else {
                            this._target.y = tyi;
                        }
                    }
                    else {
                        if (xd == -1) {
                            this._target.y = ty - ((txip1 - tx) * yd);
                        }
                        else {
                            this._target.y = ty - ((tx - txi) * yd);
                        }
                    }
                    var block = void 0;
                    do {
                        this._target.x += xd;
                        this._target.y += yd;
                        block = this._map.getBlock(this._target.x, this._target.y);
                        if ((xd == 0 ||
                            (xd < 0 && this._target.x <= oxip1) ||
                            (xd > 0 && this._target.x >= oxi)) && (yd == 0 ||
                            (yd < 0 && this._target.y <= oyip1) ||
                            (yd > 0 && this._target.y >= oyi))) {
                            break;
                        }
                        block === null || block === void 0 ? void 0 : block.render(this, a, false, true, this._origin, this._relative, this._step, this._target);
                    } while (true);
                    block === null || block === void 0 ? void 0 : block.render(this, a, true, true, this._origin, this._relative, this._step, this._target);
                }
                if (this._renderMode == Renderer.RENDER_MODE_RAF) {
                    window.requestAnimationFrame(function () { return _this.render(); });
                }
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
            var _b = _a === void 0 ? {} : _a, _c = _b.color, color = _c === void 0 ? undefined : _c;
            this.color = color;
        }
        Object.defineProperty(Wall.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
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
        var canvas = _a.canvas, _b = _a.map, map = _b === void 0 ? undefined : _b;
        return new jcast.JCast({ canvas: canvas, map: map });
    }
    jcast.init = init;
})(jcast || (jcast = {}));
//# sourceMappingURL=jcast.js.map