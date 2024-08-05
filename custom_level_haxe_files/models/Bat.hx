class Bat {
	public var positionX:Int;
	public var positionY:Int;
	public var width:Int = 16;
	public var height:Int = 17;

	public function new() {}

	public static function copy(bat:Bat):Bat {
		var newBat:Bat = new Bat();

		if (bat.positionX != null)
			newBat.positionX = bat.positionX;

		if (bat.positionY != null)
			newBat.positionY = bat.positionY;

		if (bat.width != null)
			newBat.width = bat.width;

		if (bat.height != null)
			newBat.height = bat.height;

		return newBat;
	}

	// Transforming the class into a structure for the game code
	public function toLayoutComponent():Dynamic {
		return [
			[
				this.positionX, 
				this.positionY, 
				0, 
				this.width, 
				this.height, 
				0, 
				0, // rotation angle in radians
				1, 
				0.5, 
				1, 
				0, 
				0, 
				[]
			],
			40,
			1392,
			[[0]],
			[ // I assume this determines the path of the bat, needs more testing
				[1, 0, 0, 6, 0, 6, 0, 30, 0],
				[1, 1, 0, 2, 0, 0, 0, 2, 0],
				[1, 7, 0, 2, 0, 0, 1, 15, 0],
				[0, 0, 0.01, 0.3, 1]
			],
			[0, "Bat", 0, 1]
		];
	}
}