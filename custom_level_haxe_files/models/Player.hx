class Player {
	public var positionX:Int;
	public var positionY:Int;
	public var width:Int = 10;
	public var height:Int = 15;

	public function new() {}

	public static function copy(player:Player):Player {
		var newPlayer:Player = new Player();

		newPlayer.positionX = player.positionX;
		newPlayer.positionY = player.positionY;

		if (player.width != null)
			newPlayer.width = player.width;

		if (player.height != null)
			newPlayer.height = player.height;

		return newPlayer;
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
				0.5, 
				0.5, 
				1, 
				0, 
				0, 
				[]
			],
			9, 
			1321, 
			[[0], [0], [0], [1], ["No Spell"], [1], [40], [1], [0], [1], [0], [0]], 
			[[80, 1500, 1500, 130, 350, 1000, 0, 0, 0, 1]], 
			[1, "Default", 0, 1]
		];		
	}
}