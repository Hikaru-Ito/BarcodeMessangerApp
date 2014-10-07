(function() {

	var WritePage = Backbone.View.extend({

		el : 'body',

		events : {
			'click #sendButton' : 'sendMessage',
		},

		sendMessage : function(e) {

			var text_data = $('#message_text').val();

			// 入力チェック
			if(text_data == '') {
				alert('入力されていません');

			} else {

			  cordova.plugins.barcodeScanner.scan(
			      function (result) {
			          if(result.cancelled == true) {

			          	alert(result.cancelled);
			            return false;


			          } else {

			            var num_data = result.text;
			            //alert(num_data);

			            // サーバーに送信
					    $.ajax({
					        url: 'http://rcodr.com/collectTest/api/Sfcbarcodes/edit.json',
					        type: 'POST',
					        data: {
					            number : num_data,
					            text : escapeHTML(text_data)
					        },
					        dataType: 'json',
					        success: function( data ) {

					        	alert('書き込みが完了しました！');
					        	prevPage();

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

		}

	});


	var writepage = new WritePage({});

})();