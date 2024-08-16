class DynamicLevelText {
	public var value:String;

	public var width:Int;
	public var height:Int;

	public function new() {}

	public static function copy(text:DynamicLevelText):DynamicLevelText {
		var newText:DynamicLevelText = new DynamicLevelText();
		
		newText.value = text.value;
		newText.width = text.width;
		newText.height = text.height;
		
		return newText;
	}

	// Transforming the class into a structure for the game code
	public function toLayoutComponent():Dynamic {
		return [
			[
				160, // Position X
				-16, // Position Y
				0, 
				this.width, 
				this.height, 
				0, 
				0, 
				1, 
				0.5, 
				0, 
				0, 
				0, 
				[]
			],
			55,
			56,
			[],
			[
				[1, 1, 0, 20, 0, 15, 0, 30, 0],
				[0, 0, 0, 0.5, 1]
			],
			[
				16, 
				16, 
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>", 
				this.value, 
				0.5, 
				0, 
				1, 
				1, 
				1, 
				0, 
				0, 
				0
			]
		];
	}
}