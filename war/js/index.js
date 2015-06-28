$(function(){
	//inner html data
    var coco_html = "";
    var bukuma_html = "";
    var blog_html = "";

	//ajax通信用のコントロールデータ作成
    var controll_data = {};

	$.ajax({
        type : 'POST',
        url : '/getImaCoco',
        data : controll_data,
        cache : false,
        dataType : 'json',

        success : function(json) {
        	for(var i = 0; i < 10; i++){
            	if(json.checkins.items[i].venue.categories[0].icon != null){
            		coco_html = coco_html.concat('<img src="');
            		coco_html = coco_html.concat(json.checkins.items[i].venue.categories[0].icon.prefix);
            		coco_html = coco_html.concat('44');
            		coco_html = coco_html.concat(json.checkins.items[i].venue.categories[0].icon.suffix);
            		coco_html = coco_html.concat('" style="float:left;background-color:#AFEEEE"><div>');
            	}
            	checkin_date = new Date( json.checkins.items[i].createdAt * 1000 )
        		coco_html = coco_html.concat('<strong>' + checkin_date.getFullYear() + '-' + (checkin_date.getMonth() + 1) + '-' + checkin_date.getDate() + ' ' + checkin_date.getHours() + ':' + checkin_date.getMinutes() + ':' + checkin_date.getSeconds() + '</strong>');
        		coco_html = coco_html.concat('<br>');
        		coco_html = coco_html.concat(json.checkins.items[i].venue.name);
        		if(json.checkins.items[i].shout != undefined){
            		coco_html = coco_html.concat('にイマココ！<br><span style="color:blue;">a-know『' + json.checkins.items[i].shout + '』</span></div><div style="clear:both;"></div><hr>');
        		}else{
            		coco_html = coco_html.concat('にイマココ！</div><div style="clear:both;"></div><hr>');
        		}
        	}


        	coco_html = coco_html.concat('<div align="center">a-know の Foursquare</div>');
        	coco_html = coco_html.concat('<table class="table table-striped table-condensed"><tbody>');
        	coco_html = coco_html.concat('<tr>');
        	coco_html = coco_html.concat('<td colspan="2">総チェックイン回数</td>');
        	coco_html = coco_html.concat('</tr>');
        	coco_html = coco_html.concat('<tr>');
        	coco_html = coco_html.concat('<td colspan="2"><strong>' + json.checkins.count + ' 回</strong></td>');
        	coco_html = coco_html.concat('</tr>');
        	coco_html = coco_html.concat('</tbody></table>');

            $("#ima-coco-area").html( coco_html );
        },
        complete : function() {
          //通信終了
        }
    });



	$.ajax({
        type : 'POST',
        url : '/getBukuma',
        data : controll_data,
        cache : false,
        dataType : 'json',

        success : function(json) {

        	for(var i = 0; i < 10; i++){
        		bukuma_html = bukuma_html.concat('<strong><span style="color:blue;">B! </span></strong>');
        		bukuma_html = bukuma_html.concat('<strong>' + json.entries[i].date + '</strong><br>');
        		bukuma_html = bukuma_html.concat('『<a href="' + json.entries[i].target_url + '" target="_blank">' + json.entries[i].target_title + '</a>』<a href="' + json.entries[i].hatebu_url + '" target="_blank" style="color:#ff1493; text-decoration:underline;">' + json.entries[i].hatebu_count + 'users</a>をブックマークしました。<br>');
        		if(json.entries[i].comment != ''){
            		bukuma_html = bukuma_html.concat('<span style="color:blue;">a-know『' + json.entries[i].comment + '』</span><hr>');
        		}else{
        			bukuma_html = bukuma_html.concat('<hr>');
        		}
        	}
        	bukuma_html = bukuma_html.concat('<div align="center"><a href="http://b.hatena.ne.jp/a-know/" target="_blank">a-know の はてなブックマーク</a></div>');
            $("#bukuma-area").html( bukuma_html );
        },
        complete : function() {
          //通信終了
        }
    });

	$.ajax({
        type : 'POST',
        url : '/getBlogRss',
        data : controll_data,
        cache : false,
        dataType : 'json',

        success : function(json) {

        	for(var i = 0; i < 4; i++){
        		blog_html = blog_html.concat('<strong>' + json.entries[i].date + '</strong><br>');
        		if(json.entries[i].hatebu_count != ''){
        			blog_html = blog_html.concat('<strong><a href="' + json.entries[i].target_url + '" target="_blank">' + json.entries[i].target_title + '</a></strong> <a href="' + json.entries[i].hatebu_url + '" target="_blank" style="color:#ff1493; text-decoration:underline;">' + json.entries[i].hatebu_count + 'users</a><br>');
        		}else{
        			blog_html = blog_html.concat('<strong><a href="' + json.entries[i].target_url + '" target="_blank">' + json.entries[i].target_title + '</a></strong><br>');
        		}
        		blog_html = blog_html.concat('<span style="color:gray;">' + json.entries[i].description + '</span><hr>');
        	}
        	blog_html = blog_html.concat('<div align="center"><a href="http://blog.a-know.me/" target="_blank">えいのうにっき - はてなブログ</a></div>');
            $("#blog-rss-area").html( blog_html );
        },
        complete : function() {
          //通信終了
        }
    });
});
$(function(){
	$('#adminForm').submit(function(){
		$('#password').val(sha256.hex($('#password').val()));
	})
})
$(function(){
    $('#accordion_head').click(function() {
        $(this).next().slideToggle();
    }).next().hide();
});