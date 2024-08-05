class PurpleBlock {
	public var positionX:Int;
	public var positionY:Int;

	public var width:Int;
	public var height:Int = 8;

	public function new() {}

	public static function copy(block:PurpleBlock):PurpleBlock {
		var newBlock:PurpleBlock = new PurpleBlock();
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
				0.5, 
				0, 
				0, 
				0, 
				0, 
				[]
			], 
			56, 
			1150, 
			[], 
			[], 
			[1, "Default", 0, 1]
		];
	}
}