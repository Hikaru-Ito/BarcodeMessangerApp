(function() {

	var MainPage = Backbone.View.extend({

		el : 'body',

		events : {
			'click #writeButton' : 'goToInputPage',
			'click #scanButton' : 'scanBarcode'
		},

		goToInputPage : function(e) {

		    var values = {


		    },template = Handlebars.compile($('#inputMessagePage').html());


		    nextPage(template(values));

			var htmlData = '';
			htmlData += '<div class="leftButton backPageButton">';
	        htmlData += '<i class="icon-arrow-left"></i>';
	        htmlData += '</div>';
	        htmlData += '<h1>メッセージ入力</h1>';
		    nextHeader(htmlData);

		},

		scanBarcode : function(e) {

		  cordova.plugins.barcodeScanner.scan(
		      function (result) {
		          if((result.cancelled == true)) {

		            return false;

		          } else {

		            var num_data = result.text;

		            // サーバーに送信
				    $.ajax({
				        url: 'http://rcodr.com/collectTest/api/Sfcbarcodes/read.json',
				        type: 'POST',
				        data: {
				            number : num_data,
				        },
				        dataType: 'json',
				        success: function( data ) {


				        	var Response = data.Response;

				        	if(Response == 1) {

				        		var text_data = data.Data;

					        	// テキストデータがURLかどうか判別する
				                if(isUrl(text_data)) {
				                    // ブラウザで開く
				                    window.open(text_data, '_system', 'location=yes');

				                } else {
				                    // ページ遷移して表示
								    var values = {

								    	text_data : text_data

								    },template = Handlebars.compile($('#textShowPage').html());

								    nextPage(template(values));

									var htmlData = '';
									htmlData += '<div class="leftButton backPageButton">';
							        htmlData += '<i class="icon-arrow-left"></i>';
							        htmlData += '</div>';
							        htmlData += '<h1>読み取ったメッセージ</h1>';
								    nextHeader(htmlData);
				                }
				        	} else if(Response == 0) {
				        		alert('メッセージが登録されていません!');
				        	} else if(Response == 2) {
				        		alert('メッセージが登録されていません!');
				        	}

				        },
				        error: function( XMLHttpRequest, textStatus, errorThrown ) {
					        	alert('エラーが発生しました');

				        }
				    });


		          }
		      },
		      function (error) {
		          alert("Scanning failed: " + error);
		      }
		   );

		}
	});


	var mainpage = new MainPage({});

})();