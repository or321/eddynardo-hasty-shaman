class Level {
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

	public function new() {}

	public function ToLevelLayout():dynamic {
		
	}
}