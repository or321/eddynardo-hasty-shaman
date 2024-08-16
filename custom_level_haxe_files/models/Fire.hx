class Fire {
	public var positionX:Int;
	public var positionY:Int;
	public var width:Int = 8;
	public var height:Int = 12;

	public function new() {}

	public static function copy(fire:Fire):Fire {
		var newFire:Fire = new Fire();

		newFire.positionX = fire.positionX;
		newFire.positionY = fire.positionY;

		if (fire.width != null)
			newFire.width = fire.width;

		if (fire.height != null)
			newFire.height = fire.height;

		return newFire;
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