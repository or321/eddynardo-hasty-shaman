class Player {
    public var positionX:Int;
    public var positionY:Int;

    public function new() {}

	// Transforming the class into a structure for the game code
    public function ToLayoutComponent():dynamic {
        return [
            "Player",
            5,
            213273497078706,
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
                        this.positionX, 
                        this.positionY, 
                        0, 
                        10, 
                        15, 
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
                ]
            ],
            []
        ];
    }
}