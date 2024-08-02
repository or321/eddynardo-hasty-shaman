class Chest {
    public var positionX:Int;
    public var positionY:Int;

    public var width:Int = 16;
    public var height:Int = 16;

    public function new() {}

    public function ToLayoutComponent():dynamic {
        return [
            [
                this.positionX, 
                this.positionY, 
                0, 
                this.width, 
                this.height, 
                0, 
                0, 
                1, 
                0.5, 
                1, 
                0, 
                0, 
                []
            ], 
            21, 
            1345, 
            [], 
            [], 
            [0, "Default", 0, 1]
        ];
    }
}