import js.Browser;

// Run this in terminal: haxelib install json2object

class Level {
	public var name:String;
	public var scale:Int = 1;

	public var player:Player;
	
	public var bats:Array<Bat>;
	public var ghosts:Array<Ghost>;
	public var fires:Array<Fire>;
	public var spikes:Array<Spike>;

	public var chests:Array<Chest>;

	public var wall_blocks:Array<WallBlock>; // All the blocks that define the walls, floors and ceilings of the level
	public var grey_blocks:Array<GreyBlock>; // Tiles that block the character from teleporting
	public var yellow_blocks:Array<YellowBlock>; // Tiles that invert the level
	public var purple_blocks:Array<PurpleBlock>; // Tiles that invert the character orientation

	public var dynamicLevelText:DynamicLevelText;
	public var staticLevelText:StaticLevelText;

	public var texture_code:String = "";

	public function new() {}

	public static function copy(level:Level):Level {
		var newLevel:Level = new Level();

		newLevel.name = level.name;

		if (level.scale != null)
			newLevel.scale = level.scale;

		if (level.texture_code != null)
			newLevel.texture_code = level.texture_code;

		newLevel.player = Player.copy(level.player);
		newLevel.bats = level.bats.map(bat -> Bat.copy(bat));
		newLevel.ghosts = level.ghosts.map(ghost -> Ghost.copy(ghost));
		newLevel.fires = level.fires.map(fire -> Fire.copy(fire));
		newLevel.spikes = level.spikes.map(spike -> Spike.copy(spike));
		newLevel.chests = level.chests.map(chest -> Chest.copy(chest));
		newLevel.wall_blocks = level.wall_blocks.map(block -> WallBlock.copy(block));
		newLevel.grey_blocks = level.grey_blocks.map(block -> GreyBlock.copy(block));
		newLevel.yellow_blocks = level.yellow_blocks.map(block -> YellowBlock.copy(block));
		newLevel.purple_blocks = level.purple_blocks.map(block -> PurpleBlock.copy(block));
		newLevel.dynamicLevelText = DynamicLevelText.copy(level.dynamicLevelText);
		newLevel.staticLevelText = StaticLevelText.copy(level.staticLevelText);

		return newLevel;
	}

	public static function loadLevelFromFile(customLevelFileName:String):Void {
		var url = Browser.location.origin + "/custom/" + customLevelFileName + "?" + Date.now();
		var http = new haxe.Http(url);

		http.onData = function (levelData:String){
			var loadedLevel:Level = haxe.Json.parse(levelData);
			var level:Level = Level.copy(loadedLevel);

			var levelLayoutData:Dynamic = level.toLevelLayoutData();
			var levelLayout:Dynamic = js.Syntax.code("new window.cr.layout(window.game, levelLayoutData)");

			untyped window.game.doChangeLayout(levelLayout);
		}
		
		http.request();
	}

	private function backgroundLayer():Dynamic {
		return [
			"BG",
			0,
			624342637661101,
			true,
			[49, 53, 69],
			false,
			1,
			1,
			1,
			false,
			false,
			1,
			0,
			0,
			[
				[
					[
						0,
						0,
						0,
						330.9016723632813,
						201.7607116699219,
						0,
						0,
						0.4000000059604645,
						0,
						0,
						0,
						0,
						[],
						[
							213,
							120,
							"42x0,171x-1,30x0,4,11x0,171x-1,6x0,97,3x100,4,18x0,4,7x3,4,4x0,171x-1,4x0,97,5x100,97,18x0,97,6x3,98,5x0,171x-1,3x0,97,5x100,3,4,21x0,1,2x3,2x4,5x0,171x-1,3x0,2,2x100,4,26x0,5,3,4,6x0,171x-1,42x0,171x-1,12x0,97,29x0,171x-1,9x0,6,2x3,6,10x0,2,102,4,16x0,171x-1,6x0,4,6x3,2,8x0,2,6x3,5,12x0,171x-1,5x0,99,8x3,99,6x0,97,4x3,1,15x0,171x-1,7x0,6,2x100,6,31x0,171x-1,6x0,4,97,100,5,32x0,171x-1,6x0,5,100,4,33x0,171x-1,28x0,1,13x0,171x-1,2x0,4,24x0,97,2x100,5,11x0,171x-1,2x0,6,2x100,4,15x0,4,5x0,4,2x100,1,11x0,171x-1,0,4,4x100,4,12x0,5,3x100,4,3x0,5,4x100,1,9x0,171x-1,2x0,3x100,5,13x0,4,3x100,6,3x0,4,7x100,5,6x0,171x-1,0,4,3x100,6,14x0,4,4x100,4,2x0,4,2x0,6,2x100,97,7x0,171x-1,0,4,3x100,4,18x0,4,7x0,4,0,4,7x0,171x-1,2x0,4,0,4,37x0,171x-1,42x0,20832x-1"
						]
					],
					23,
					57,
					[],
					[],
					[0, 8, 8, 0, 0, 0, 0, 1]
				]
			],
			[]
		];
	}

	private function wallBlocksLayer():Dynamic {
		var wallBlocksInstances = this.wall_blocks.map(item -> item.toLayoutComponent());

		return [
			"GroundCol",
			1,
			405191807692717,
			true,
			[255, 255, 255],
			true,
			1,
			1,
			1,
			false,
			false,
			1,
			0,
			0,
			wallBlocksInstances,
			[]
		];
	}

	private function texturesLayer():Dynamic {
		/*
		top-left green corner inside wall: 46
		top green ceiling: 49
		top-right green corner inside wall: 33
		left green wall: 47
		right green wall: 32
		bottom-left green corner inside wall: 350
		bottom green floor: 17
		bottom-right green corner inside wall: 337
		top-left green corner: 16
		top-right green corner: 31
		bottom-left green corner: 48
		bottom-right green corner: 63

		 */
		return [
			"Ground",
			2,
			683889757010212,
			true,
			[255, 255, 255],
			true,
			1,
			1,
			1,
			false,
			false,
			1,
			0,
			0,
			[
				[
					[
						0,
						0,
						0,
						320,
						192,
						0,
						0,
						1,
						0,
						0,
						0,
						0,
						[[0, 1, 1]],
						[
							40,
							24,
							this.texture_code
						]
					],
					12,
					78,
					[],
					[],
					[0, 8, 8, 0, 0, 0, 0, 1]
				]
			],
			[]
		];
	}

	private function chestsAndTilesLayer():Dynamic {
		var instances:Array<Dynamic> = [];
		instances = instances.concat(this.chests.map(item -> item.toLayoutComponent()));
		instances = instances.concat(this.grey_blocks.map(item -> item.toLayoutComponent()));
		instances = instances.concat(this.yellow_blocks.map(item -> item.toLayoutComponent()));
		instances = instances.concat(this.purple_blocks.map(item -> item.toLayoutComponent()));

		return [
			"UnderPlayer",
			3,
			427841631151004,
			true,
			[255, 255, 255],
			true,
			1,
			1,
			1,
			false,
			false,
			1,
			0,
			0,
			instances,
			[]
		];
	}

	private function enemiesLayer():Dynamic {
		var instances:Array<Dynamic> = [];
		instances = instances.concat(this.bats.map(item -> item.toLayoutComponent()));
		instances = instances.concat(this.ghosts.map(item -> item.toLayoutComponent()));
		instances = instances.concat(this.fires.map(item -> item.toLayoutComponent()));
		instances = instances.concat(this.spikes.map(item -> item.toLayoutComponent()));

		return [
			"Enemies",
			4,
			213208484116281,
			true,
			[255, 255, 255],
			true,
			1,
			1,
			1,
			false,
			false,
			1,
			0,
			0,
			instances,
			[]
		];
	}

	private function playerLayer():Dynamic {
		return [
			"Player",
			5,
			443345487680383,
			true,
			[255, 255, 255],
			true,
			1,
			1,
			1,
			false,
			false,
			1,
			0,
			0,
			[
				[[-24, 48, 0, 16, 24, 0, 0, 1, 0.5, 1, 0, 0, []], 8, 1069, [], [[], [0, 0, 0.8, 0.4, 1]], [0, "Idle", 0, 1]],
				this.player.toLayoutComponent()
			],
			[]
		];
	}

	// No idea what is this layer supposed to be
	private function overPlayerLayer():Dynamic {
		return ["OverPlayer", 6, 530797518988833, true, [255, 255, 255], true, 1, 1, 1, false, false, 1, 0, 0, [], []];
	}

	private function uiLayer():Dynamic {
		var cameraLayoutComponent:Dynamic = [[160, 90, 0, 56, 65, 0, 0, 1, 0.5, 0.4923076927661896, 0, 0, []], 24, 102, [[1], [1], [0], [0]], [[1]], [1, "Default", 0, 1]];
		var instances:Array<Dynamic> = [cameraLayoutComponent];

		if (this.dynamicLevelText != null)
			instances.push(this.dynamicLevelText.toLayoutComponent());

		if (this.staticLevelText != null)
			instances.push(this.staticLevelText.toLayoutComponent());
		
		return [
			"UI",
			7,
			581021616472218,
			true,
			[255, 255, 255],
			true,
			1,
			1,
			1,
			false,
			false,
			1,
			0,
			0,
			instances,
			[]
		];
	}

	private function fullScreenFXLayer():Dynamic {
		return [
			"FullScreenFX",
			8,
			176465583991634,
			true,
			[255, 255, 255],
			true,
			1,
			1,
			1,
			false,
			false,
			1,
			0,
			0,
			[
				[[296, 16, 0, 22, 14, 0, 0, 0.6000000238418579, 0, 1, 0, 0, []], 37, 144, [], [], [0, "Default", 0, 1]],
				[
					[8, 8, 0, 64, 24, 0, 0, 1, 0, 0, 0, 0, []],
					33,
					75,
					[],
					[[1, 1, 0, 0, 0]],
					[16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>", "Text", 0.25, 0, 0, 0, 0, 0, 0, 0]
				],
				[[248, 16, 0, 45, 14, 0, 0, 0.6000000238418579, 0, 1, 0, 0, []], 36, 95, [], [], [0, "Default", 0, 1]],
				[[304, -16, 0, 29, 14, 0, 0, 0.6000000238418579, 0, 1, 0, 0, []], 38, 147, [], [], [0, "Default", 0, 1]],
				[[152, 80, 0, 368, 250, 0, 0, 1, 0.5, 0.5, 0, 0, []], 35, 92, [], [[1, 0, 0, 0.5, 1]], [0, "Default", 0, 1]],
				[
					[41, 2, 0, 88, 16, 0, 0, 0.5, 0, 0, 0, 0, []],
					43,
					916,
					[],
					[],
					[16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>", "123456789", 0.5, 0, 0, 1, 0, 0, -2, 0]
				],
				[[32, 208, 0, 50, 14, 0, 0, 0.800000011920929, 0.5012787580490112, 0.5045871734619141, 0, 0, []], 45, 1008, [], [], [0, "Default", 0, 1]]
			],
			[]
		];
	}

	public function toLevelLayoutData():Dynamic {
		return [
			this.name,
			320,
			180,
			true,
			"LevelCode",
			572186813770178,
			[
				backgroundLayer(),
				wallBlocksLayer(),
				texturesLayer(),
				chestsAndTilesLayer(),
				enemiesLayer(),
				playerLayer(),
				overPlayerLayer(),
				uiLayer(),
				fullScreenFXLayer()
			],
			[],
			[]
		];
	}

	public static function main(){
		untyped window.loadLevelFromFile = loadLevelFromFile;
	}
}