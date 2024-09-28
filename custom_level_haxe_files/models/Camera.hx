class Camera {

	public function new() {}

	public static function copy(camera:Camera):Camera {
		var newCamera:Camera = new Camera();

		return newCamera;
	}

	// Transforming the class into a structure for the game code
	public function toLayoutComponent():Dynamic {
		return [
			[
				160, 
				90, 
				0, 
				56, 
				65, 
				0, 
				0, 
				1, 
				0.5, 
				0.4923076927661896, 
				0, 
				0, 
				[]
			], 
			24, 
			102, 
			[[1], [1], [0], [0]], 
			[[1]], 
			[1, "Default", 0, 1]
		];
	}
}