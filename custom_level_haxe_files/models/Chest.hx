class Chest {
	public var positionX:Int;
	public var positionY:Int;

	public var width:Int = 16;
	public var height:Int = 16;

	public function new() {}

	public static function copy(chest:Chest):Chest {
		var newChest:Chest = new Chest();

		if (chest.positionX != null)
			newChest.positionX = chest.positionX;

		if (chest.positionY != null)
			newChest.positionY = chest.positionY;

		if (chest.width != null)
			newChest.width = chest.width;

		if (chest.height != null)
			newChest.height = chest.height;

		return newChest;
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