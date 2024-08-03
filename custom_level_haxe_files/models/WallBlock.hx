class WallBlock {
	public var positionX:Int;
	public var positionY:Int;

	public var width:Int;
	public var height:Int;

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
				0, 
				1, 
				0, 
				0, 
				[]
			], 
			10, 
			1308, 
			[], 
			[[1]], 
			[0, "Default", 0, 1]
		];
	}
}