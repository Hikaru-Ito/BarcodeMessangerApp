// 原因不明クリック場所測定テスト関数
//
(function() {

	var TestClick = Backbone.View.extend({

		el : 'body',

		events : {
			'click' : 'alertClickElement',
			'click #hideErrorMessage' : 'hideErrorMessage'
		},

		alertClickElement : function(e) {

			// クリックされた部分のエレメントを抽出
			var _this = $(e.target);

			// コンソールに表示
			console.log(_this);
		},

		hideErrorMessage : function(e) {

			hideErrorMessage();
		}
	});


	var teskclick = new TestClick({});

})();