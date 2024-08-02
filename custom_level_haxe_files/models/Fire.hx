class Fire {
    public var positionX:Int;
    public var positionY:Int;
    public var width:Int = 8;
    public var height:Int = 12;

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
                0, // rotation angle in radians
                0.699999988079071, 
                0, 
                0.9166666865348816, 
                0, 
                0, 
                []
            ], 
            13, 
            1372, 
            [], 
            [[0, 0, 0, 0.1, 1]], 
            [0, "on", 0, 1]
        ];
    }
}