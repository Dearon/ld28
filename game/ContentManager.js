function ContentManager() {
    // Method called back once all elements
    // have been downloaded
    var ondownloadcompleted;
    // Number of elements to download
    var NUM_ELEMENTS_TO_DOWNLOAD = 6;

    // setting the callback method
    this.SetDownloadCompleted = function (callbackMethod) {
        ondownloadcompleted = callbackMethod;
    };

    // We have 4 type of enemies, 1 hero & 1 type of tile
    this.iconEasy   = new Image();
    this.iconNormal = new Image();
    this.iconHard   = new Image();
    this.iconTreasure = new Image();
    this.iconExit = new Image();
    this.imgWhiteOut = new Image();
    // the background can be created with 3 different layers
    // those 3 layers exist in 3 versions
    this.imgBackgroundLayers = new Array();
    var numImagesLoaded = 0;

    // public method to launch the download process
    this.StartDownload = function () {
        SetDownloadParameters(this.iconEasy, "assets/images/green.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.iconNormal, "assets/images/orange.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.iconHard, "assets/images/red.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.iconTreasure, "assets/images/icontreasure.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.iconExit, "assets/images/iconexit.png", handleImageLoad, handleImageError);


        SetDownloadParameters(this.imgWhiteOut, "assets/images/whiteout.png", handleImageLoad, handleImageError);

    }

    function SetDownloadParameters(imgElement, url, loadedHandler, errorHandler) {
        imgElement.src = url;
        imgElement.onload = loadedHandler;
        imgElement.onerror = errorHandler;
    }

    // our global handler
    function handleImageLoad(e) {
        numImagesLoaded++

        // If all elements have been downloaded
        if (numImagesLoaded == NUM_ELEMENTS_TO_DOWNLOAD) {
            numImagesLoaded = 0;
            // we're calling back the method set by SetDownloadCompleted
            ondownloadcompleted();
        }
    }

    //called if there is an error loading the image (usually due to a 404)
    function handleImageError(e) {
        console.log("Error Loading Image : " + e.target.src);
    }
}
