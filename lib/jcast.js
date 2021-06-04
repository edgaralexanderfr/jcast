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
    var JCast = /** @class */ (function () {
        function JCast(_a) {
            var canvas = _a.canvas, _b = _a.map, map = _b === void 0 ? undefined : _b;
            this._renderer = new jcast.Renderer({ canvas: canvas, map: map });
        }
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
            this.activeCamera = camera;
            this.width = width;
            this.height = height;
            this.depth = depth;
            this.name = name;
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
            set: function (value) {
                this._width = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "depth", {
            get: function () {
                return this._depth;
            },
            set: function (value) {
                this._depth = value;
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
        return Map;
    }());
    jcast.Map = Map;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Renderer = /** @class */ (function () {
        function Renderer(_a) {
            var canvas = _a.canvas, _b = _a.map, map = _b === void 0 ? undefined : _b;
            this._width = 0;
            this._height = 0;
            this._context = null;
            this._canvas = canvas;
            this.canvas = canvas;
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
        Object.defineProperty(Renderer.prototype, "context", {
            get: function () {
                return this._context;
            },
            enumerable: false,
            configurable: true
        });
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
    function init(_a) {
        var canvas = _a.canvas, _b = _a.map, map = _b === void 0 ? undefined : _b;
        return new jcast.JCast({ canvas: canvas, map: map });
    }
    jcast.init = init;
})(jcast || (jcast = {}));
//# sourceMappingURL=jcast.js.map