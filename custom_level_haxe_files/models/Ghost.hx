class Ghost {
	public var positionX:Int;
	public var positionY:Int;
	public var width:Int = 10;
	public var height:Int = 17;

	// The distance (in pixels) from starting position of the ghost to the edges of its horizontal path
	public var horizontalPathRadiusLength:Int = 0;

	// The speed of the ghost, determined by number of seconds to complete a full horizontal movement cycle
	public var horizontalPathCycleTime:Float = 2;

	// The initial position of the ghost in its horizontal path, determined by number of seconds of initial movement
	// 0 = start position, moving right
	// Cycle time * 0.25 = right edge, moving left
	// Cycle time * 0.5 = start position , moving left
	// Cycle time * 0.75 = left edge, moving right
	public var horizontalPathCycleOffset:Float = 0;

	// The distance (in pixels) from starting position of the ghost to the edges of its vertical path
	public var varticalPathRadiusLength:Int = 5;

	// The speed of the ghost, determined by number of seconds to complete a full vertical movement cycle
	public var varticalPathCycleTime:Float = 5;

	// The initial position of the ghost in its vertical path, determined by number of seconds of initial movement
	// 0 = start position, moving down
	// Cycle time * 0.25 = bottom edge, moving up
	// Cycle time * 0.5 = start position , moving up
	// Cycle time * 0.75 = top edge, moving down
	public var varticalPathCycleOffset:Float = 0; 

	public function new() {}

	public static function copy(ghost:Ghost):Ghost {
		var newGhost:Ghost = new Ghost();

		newGhost.positionX = ghost.positionX;
		newGhost.positionY = ghost.positionY;

		if (ghost.width != null)
			newGhost.width = ghost.width;

		if (ghost.height != null)
			newGhost.height = ghost.height;

		if (ghost.horizontalPathRadiusLength != null)
			newGhost.horizontalPathRadiusLength = ghost.horizontalPathRadiusLength;

		if (ghost.horizontalPathCycleTime != null)
			newGhost.horizontalPathCycleTime = ghost.horizontalPathCycleTime;

		if (ghost.horizontalPathCycleOffset != null)
			newGhost.horizontalPathCycleOffset = ghost.horizontalPathCycleOffset;

		if (ghost.varticalPathRadiusLength != null)
			newGhost.varticalPathRadiusLength = ghost.varticalPathRadiusLength;

		if (ghost.varticalPathCycleTime != null)
			newGhost.varticalPathCycleTime = ghost.varticalPathCycleTime;

		if (ghost.varticalPathCycleOffset != null)
			newGhost.varticalPathCycleOffset = ghost.varticalPathCycleOffset;

		return newGhost;
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
			1388,
			[[0]],
			[
				[1, 0, 0, this.horizontalPathCycleTime, 0, this.horizontalPathCycleOffset, 0, this.horizontalPathRadiusLength, 0],
				[1, 1, 0, this.varticalPathCycleTime, 0, this.varticalPathCycleOffset, 0, this.varticalPathRadiusLength, 0],
				[1, 7, 0, 2, 0, 0, 1, 0, 0],
				[0, 0, 0.01, 0.3, 1]
			],
			[0, "Ghost", 0, 1]
		];
	}
}