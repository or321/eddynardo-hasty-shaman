class Ghost {
	public var positionX:Int;
	public var positionY:Int;
	public var width:Int = 10;
	public var height:Int = 17;

	public function new() {}

	public static function copy(ghost:Ghost):Ghost {
		var newGhost:Ghost = new Ghost();

		if (ghost.positionX != null)
			newGhost.positionX = ghost.positionX;

		if (ghost.positionY != null)
			newGhost.positionY = ghost.positionY;

		if (ghost.width != null)
			newGhost.width = ghost.width;

		if (ghost.height != null)
			newGhost.height = ghost.height;

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
			[ // I assume this determines the path of the ghost, needs more testing
				[1, 0, 0, 2, 0, 1, 0, 0, 0],
				[1, 1, 0, 3, 0, 0, 0, 4, 0],
				[1, 7, 0, 2, 0, 0, 1, 0, 0],
				[0, 0, 0.01, 0.3, 1]
			],
			[0, "Ghost", 0, 1]
		];
	}
}