class Spike {
    public var positionX:Int;
    public var positionY:Int;
    public var width:Int = 13;
    public var height:Int = 11;

	public var direction:Direction = Direction.Up;

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
				directionAngle(direction),
				1, 
				0.6153846383094788, 
				0.2727272808551788, 
				0, 
				0, 
				[]
			], 
			25, 
			1386, 
			[], 
			[], 
			[0, "Default", 0, 1]
		];
    }
}