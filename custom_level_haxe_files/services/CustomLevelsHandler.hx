import js.Browser;
import js.html.URL;

class CustomLevelsHandler {
    public var levels:Array<Level>;
    public var loading:Bool;
    private static inline var DEFAULT_FILE_NAME = "default";

    public function new(){
        untyped window.customLevelsHandler = this;

        var pageUrl = new URL(Browser.location.href);
        var levelPackFileName = pageUrl.searchParams.get("pack");
        if (levelPackFileName == null)
            levelPackFileName = DEFAULT_FILE_NAME;

		loadCustomLevelsFromFile(levelPackFileName);
	}

    private function loadCustomLevelsFromFile(levelPackFileName:String):Void {
        var levelPackUrl = Browser.location.origin + "/custom_level_packs/" + levelPackFileName + ".json?" + Date.now().getTime();

		var http = new haxe.Http(levelPackUrl);
        loading = true;

		http.onData = function (levelPackData:String){
			var loadedLevels:Array<Level> = haxe.Json.parse(levelPackData);
			levels = loadedLevels.map(level -> Level.copy(level));
            loading = false;

			//var levelLayoutData:Dynamic = level.toLevelLayoutData();
			//var levelLayout:Dynamic = js.Syntax.code("new window.cr.layout(window.game, levelLayoutData)");

			//untyped window.game.doChangeLayout(levelLayout);
		}

        http.onError = function (error:String){
            loadCustomLevelsFromFile(DEFAULT_FILE_NAME);
        }
		
		http.request();
	}

}