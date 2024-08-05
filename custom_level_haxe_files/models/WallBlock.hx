class WallBlock {
	public var positionX:Int;
	public var positionY:Int;

	public var width:Int;
	public var height:Int;

	public function new() {}

	public static function copy(block:WallBlock):WallBlock {
		var newBlock:WallBlock = new WallBlock();
		newBlock.positionX = block.positionX;
		newBlock.positionY = block.positionY;
		newBlock.width = block.width;
		newBlock.height = block.height;

		return newBlock;
	}

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
				0, 
				1, 
				0, 
				0, 
				[]
			], 
			10, 
			1308, 
			[], 
			[[1]], 
			[0, "Default", 0, 1]
		];
	}
}