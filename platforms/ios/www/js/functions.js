//
// 階層ページ生成・遷移する関数
//
function nextPage(html) {

        //現在のページ階層番号
        var now_num = Number($('#now_page_number').attr('data-num'));

        //遷移先のページ階層番号
        var next_num = Number(now_num) + 1;

        //新しく生成するページ番号
        var create_num = Number(next_num) + 1;

        //前のページ階層番号
        var prev_page = Number(now_num) - 1;

        //遷移先にhtml合成テスト
        $('#pn_'+next_num).html(html);


        //ページ遷移
        if(now_num == 0) {
            $('#main').addClass('close');
        } else {
            $('#pn_'+now_num).addClass('close');
        }
        $('#pn_'+next_num).addClass('open');

        $('#pn_'+prev_page).addClass('disnon');

        //新規ページを生成
        htmlData = '';
        htmlData += '<div id="pn_'+create_num+'" class="page">';
        htmlData += '</div>';
        htmlData += '<div id="next_empty_page_template"></div>';

        //新規ページ埋め込み
        $('#next_empty_page_template').replaceWith(htmlData);

        //階層情報更新
        $('#now_page_number').attr('data-num', next_num);

        return next_num;
}


//
// ページを戻る関数
//
function prevPage() {

        //現在のページ階層番号
        var now_num = Number($('#now_page_number').attr('data-num'));

        //戻るページの階層番号
        var prev_num = Number(now_num) - 1;

        //消去するページの階層番号
        var next_num = Number(now_num) + 1;

        //用意するページの階層番号
        var back_page = Number(now_num) - 2;

        if(now_num !== 0) {

            //ページ遷移
            $('#pn_'+now_num).removeClass('open');

            if(now_num == 1) {
                $('#main').removeClass('close');
            } else {
                $('#pn_'+prev_num).removeClass('close');
            }

            $('#pn_'+back_page).removeClass('disnon');

            //階層情報更新
            $('#now_page_number').attr('data-num', prev_num);

            //ページ消去
            $('#pn_'+next_num).remove();

            // ヘッダーを戻す関数呼び出し
            prevHeader();
        }
}


//
// ページ遷移でヘッダーの中身を更新する関数
//
function nextHeader(html) {

    // ページ遷移が終了したら作動させる
    setTimeout(function() {

        // htmlの合成
        var htmlData = '';
        htmlData += '<div class="header-content">';
        htmlData += '<div class="leftButton backPageButton">';
        htmlData += '<i class="icon-arrow-left"></i>';
        htmlData += '</div>';
        htmlData += html;
        htmlData += '</div>';

        // 現在のヘッダー以外は非表示にする
        $('#header .header-content').addClass('disnon');

        // ヘッダーの末尾に追加
        $('#header').append(htmlData);

    }, 300);
}


//
// ページ遷移でヘッダーの中身を戻す関数
//
function prevHeader() {

    // ページ遷移が終了したら作動させる
    setTimeout(function() {

        // 現在表示されているヘッダー（最後のヘッダー）を削除する
        $('#header .header-content:last').remove();

        // 一つ前（削除後だから一番最後）のヘッダーを表示する
        $('#header .header-content:last').removeClass('disnon');

    }, 300);

}

//
// 文字列をURL判定する関数
//
function isUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

//
// エスケープ関数
//
function escapeHTML(val) {
    return $('<div />').text(val).html();
};