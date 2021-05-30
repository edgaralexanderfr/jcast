namespace jcast {
    export class Map {
        private width:Number;
        private height:Number;
        private name?:String;

        public constructor (width:Number, height:Number, name?:String) {
            this.width = width;
            this.height = height;
            this.name = name;
        }
    }
}
