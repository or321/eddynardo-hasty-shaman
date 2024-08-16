class GreyBlock {
	public var positionX:Int;
	public var positionY:Int;

	public var width:Int;
	public var height:Int = 8;

	public function new() {}

	public static function copy(block:GreyBlock):GreyBlock {
		var newBlock:GreyBlock = new GreyBlock();
		
		newBlock.positionX = block.positionX;
		newBlock.positionY = block.positionY;
		newBlock.width = block.width;

		if (block.height != null)
			newBlock.height = block.height;

		return newBlock;
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
				0, 
				0, 
				0, 
				0, 
				[]
			], 
			50, 
			1150, 
			[], 
			[], 
			[1, "Default", 0, 1]
		];
	}
}