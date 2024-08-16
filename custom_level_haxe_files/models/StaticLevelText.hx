class StaticLevelText {
	public var value:String;

	public var positionX:Int;
	public var positionY:Int;
	public var width:Int;
	public var height:Int;

	public function new() {}

	public static function copy(text:StaticLevelText):StaticLevelText {
		var newText:StaticLevelText = new StaticLevelText();
		
		newText.value = text.value;
		newText.positionX = text.positionX;
		newText.positionY = text.positionY;
		newText.width = text.width;
		newText.height = text.height;
		
		return newText;
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
				0, 
				0, 
				0, 
				0, 
				[]
			], 
			14, 
			46, 
			[], 
			[], 
			[
				16, 
				16, 
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>", 
				this.value, 
				0.5, 
				0, 
				1, 
				0, 
				0, 
				0, 
				0, 
				0
			]
		];
	}
}