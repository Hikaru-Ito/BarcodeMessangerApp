$(function() {
	//
	// テンプレート読込み
	//

	$('#inputMessagePage-tmp').load('template/inputMessagePage.html');

	$('#textShowPage-tmp').load('template/textShowPage.html');

	//
	// イベントトリガ設定
	//

    $('body').on('click', '.backPageButton', function() {
        prevPage();
    });


	document.addEventListener("deviceready",onDeviceReady,false);

	function onDeviceReady() {
	    //ActivityIndicator.hide();
	    //navigator.splashscreen.hide();
	    StatusBar.overlaysWebView(false);
	    StatusBar.backgroundColorByHexString("#ff8778");
	    //toolbar.hide();
	}
});
