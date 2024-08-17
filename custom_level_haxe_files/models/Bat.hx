class Bat {
	public var positionX:Int;
	public var positionY:Int;
	public var width:Int = 16;
	public var height:Int = 17;

	// The distance (in pixels) from starting position of the bat to the edges of its horizontal path
	public var horizontalPathRadiusLength:Int = 0;

	// The speed of the bat, determined by number of seconds to complete a full horizontal movement cycle
	public var horizontalPathCycleTime:Float = 5;

	// The initial position of the bat in its horizontal path, determined by number of seconds of initial movement
	// 0 = start position, moving right
	// Cycle time * 0.25 = right edge, moving left
	// Cycle time * 0.5 = start position , moving left
	// Cycle time * 0.75 = left edge, moving right
	public var horizontalPathCycleOffset:Float = 0;

	// The distance (in pixels) from starting position of the bat to the edges of its vertical path
	public var varticalPathRadiusLength:Int = 2;

	// The speed of the bat, determined by number of seconds to complete a full vertical movement cycle
	public var varticalPathCycleTime:Float = 2;

	// The initial position of the bat in its vertical path, determined by number of seconds of initial movement
	// 0 = start position, moving down
	// Cycle time * 0.25 = bottom edge, moving up
	// Cycle time * 0.5 = start position , moving up
	// Cycle time * 0.75 = top edge, moving down
	public var varticalPathCycleOffset:Float = 0; 
	

	public function new() {}

	public static function copy(bat:Bat):Bat {
		var newBat:Bat = new Bat();

		newBat.positionX = bat.positionX;
		newBat.positionY = bat.positionY;

		if (bat.width != null)
			newBat.width = bat.width;

		if (bat.height != null)
			newBat.height = bat.height;

		if (bat.horizontalPathRadiusLength != null)
			newBat.horizontalPathRadiusLength = bat.horizontalPathRadiusLength;

		if (bat.horizontalPathCycleTime != null)
			newBat.horizontalPathCycleTime = bat.horizontalPathCycleTime;

		if (bat.horizontalPathCycleOffset != null)
			newBat.horizontalPathCycleOffset = bat.horizontalPathCycleOffset;

		if (bat.varticalPathRadiusLength != null)
			newBat.varticalPathRadiusLength = bat.varticalPathRadiusLength;

		if (bat.varticalPathCycleTime != null)
			newBat.varticalPathCycleTime = bat.varticalPathCycleTime;

		if (bat.varticalPathCycleOffset != null)
			newBat.varticalPathCycleOffset = bat.varticalPathCycleOffset;

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
			[
				[1, 0, 0, this.horizontalPathCycleTime, 0, this.horizontalPathCycleOffset, 0, this.horizontalPathRadiusLength, 0],
				[1, 1, 0, this.varticalPathCycleTime, 0, this.varticalPathCycleOffset, 0, this.varticalPathRadiusLength, 0],
				[1, 7, 0, 2, 0, 0, 1, 15, 0],
				[0, 0, 0.01, 0.3, 1]
			],
			[0, "Bat", 0, 1]
		];
	}
}