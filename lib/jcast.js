"use strict";
var jcast;
(function (jcast) {
    var JCast = /** @class */ (function () {
        function JCast(canvas, map) {
            this.renderer = new jcast.Renderer(canvas, map);
        }
        JCast.prototype.getRenderer = function () {
            return this.renderer;
        };
        return JCast;
    }());
    jcast.JCast = JCast;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Map = /** @class */ (function () {
        function Map(width, height, name) {
            this.width = width;
            this.height = height;
            this.name = name;
        }
        return Map;
    }());
    jcast.Map = Map;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    var Renderer = /** @class */ (function () {
        function Renderer(canvas, map) {
            this.canvas = canvas;
            this.map = map;
            this.context = canvas.getContext('2d');
        }
        return Renderer;
    }());
    jcast.Renderer = Renderer;
})(jcast || (jcast = {}));
var jcast;
(function (jcast) {
    function init(canvas, map) {
        return new jcast.JCast(canvas, map);
    }
    jcast.init = init;
})(jcast || (jcast = {}));
//# sourceMappingURL=jcast.js.map