class Player {
	public static inline var baseSpriteWidth:Float = 16;
	public static inline var baseSpriteHeight:Float = 24;
	public static inline var baseHitboxWidth:Float = 10;
	public static inline var baseHitboxHeight:Float = 15;
	public static inline var baseHorizontalSpeed:Float = 80;
	public static inline var baseJumpSpeed:Float = 130;

	public var positionX:Int;
	public var positionY:Int;
	public var widthMultiplier:Float = 1;
	public var heightMultiplier:Float = 1;

	public function new() {}

	public static function copy(player:Player):Player {
		var newPlayer:Player = new Player();

		newPlayer.positionX = player.positionX;
		newPlayer.positionY = player.positionY;

		if (player.widthMultiplier != null)
			newPlayer.widthMultiplier = player.widthMultiplier;

		if (player.heightMultiplier != null)
			newPlayer.heightMultiplier = player.heightMultiplier;

		return newPlayer;
	}

	// Transforming the class into a structure for the game code
	public function toPlayerSpriteLayoutComponent(globalMultiplier:Float):Dynamic {
		return [
			[
				this.positionX, //-24, 
				this.positionY, //48, 
				0, 
				baseSpriteWidth * this.widthMultiplier * globalMultiplier, 
				baseSpriteHeight * this.heightMultiplier * globalMultiplier, 
				0, 
				0, 
				1, 
				0.5, 
				1, 
				0, 
				0, 
				[]
			],
			8,
			1069,
			[],
			[[], [0, 0, 0.8, 0.4, 1]],
			[0, "Idle", 0, 1]
		];
	}

	// Transforming the class into a structure for the game code
	public function toPlayerHitboxLayoutComponent(globalMultiplier:Float):Dynamic {
		return [
			[
				this.positionX, 
				this.positionY, 
				0, 
				baseHitboxWidth * this.widthMultiplier * globalMultiplier, 
				baseHitboxHeight * this.heightMultiplier * globalMultiplier, 
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
			[[
				80 * Math.pow(globalMultiplier, 0.75), // Horizontal speed
				1500,
				1500,
				130 * Math.sqrt(globalMultiplier), // Jump speed. The multipliers are scaled to their square because of gravity acceleration
				350, 
				1000,
				0, 
				0, 
				0, 
				1
			]], 
			[1, "Default", 0, 1]
		];
	}
}