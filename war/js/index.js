$(function(){
	//inner html data
    var coco_html = "";
    var bukuma_html = "";
    var blog_html = "";
    var photo_html = "";

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
            	if(json.checkins[i].spot.primarycategory != null){
            		coco_html = coco_html.concat('<img src="');
            		coco_html = coco_html.concat(json.checkins[i].spot.primarycategory.icon_url);
            		coco_html = coco_html.concat('" style="float:left;"><div>');
            	}
        		coco_html = coco_html.concat('<strong>' + (json.checkins[i].created).slice(0, 10) + ' ' + (json.checkins[i].created).slice(11, 19) + '</strong>');
        		coco_html = coco_html.concat('<br>');
        		coco_html = coco_html.concat(json.checkins[i].spot.name);
        		if(json.checkins[i].body != ''){
            		coco_html = coco_html.concat('にイマココ！<br><span style="color:blue;">a-know『' + json.checkins[i].body + '』</span></div><div style="clear:both;"></div><hr>');
        		}else{
            		coco_html = coco_html.concat('にイマココ！</div><div style="clear:both;"></div><hr>');
        		}
        	}


        	coco_html = coco_html.concat('<div align="center"><a href="http://c.hatena.ne.jp/a-know/" target="_blank">a-know の はてなココ</a></div>');
        	coco_html = coco_html.concat('<table class="table table-striped table-condensed"><tbody>');
        	coco_html = coco_html.concat('<tr>');
        	coco_html = coco_html.concat('<td colspan="2">今週の移動距離</td>');
        	coco_html = coco_html.concat('</tr>');
        	coco_html = coco_html.concat('<tr>');
        	coco_html = coco_html.concat('<td colspan="2"><strong>' + json.stats.travel_distance_of_this_week + ' m</strong></td>');
        	coco_html = coco_html.concat('</tr>');
        	coco_html = coco_html.concat('<tr>');
        	coco_html = coco_html.concat('<td>イマココ回数</td>');
        	coco_html = coco_html.concat('<td>コココイン枚数</td>');
        	coco_html = coco_html.concat('</tr>');
        	coco_html = coco_html.concat('<tr>');
        	coco_html = coco_html.concat('<td><strong>' + json.stats.cocohere_count + ' 回</strong></td>');
        	coco_html = coco_html.concat('<td><strong>' + json.stats.cococoin_count + ' 枚</strong></td>');
        	coco_html = coco_html.concat('</tr>');
        	coco_html = coco_html.concat('<tr>');
        	coco_html = coco_html.concat('<td>開拓スポット数</td>');
        	coco_html = coco_html.concat('<td>作成スポット数</td>');
        	coco_html = coco_html.concat('</tr>');
        	coco_html = coco_html.concat('<tr>');
        	coco_html = coco_html.concat('<td><strong>' + json.stats.visited_cocospot_count + ' ヶ所</strong></td>');
        	coco_html = coco_html.concat('<td><strong>' + json.stats.created_cocospot_count + ' ヶ所</strong></td>');
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

        	for(var i = 1; i < 5; i++){
        		blog_html = blog_html.concat('<strong>' + json.entries[i].date + '</strong><br>');
        		if(json.entries[i].hatebu_count != ''){
        			blog_html = blog_html.concat('<strong><a href="' + json.entries[i].target_url + '" target="_blank">' + json.entries[i].target_title + '</a></strong> <a href="' + json.entries[i].hatebu_url + '" target="_blank" style="color:#ff1493; text-decoration:underline;">' + json.entries[i].hatebu_count + 'users</a><br>');
        		}else{
        			blog_html = blog_html.concat('<strong><a href="' + json.entries[i].target_url + '" target="_blank">' + json.entries[i].target_title + '</a></strong><br>');
        		}
        		blog_html = blog_html.concat('<span style="color:gray;">' + json.entries[i].description + '</span><hr>');
        	}
        	blog_html = blog_html.concat('<div align="center"><a href="http://d.hatena.ne.jp/a-know/" target="_blank">えいのうにっき - はてなダイアリー</a></div>');
            $("#blog-rss-area").html( blog_html );
        },
        complete : function() {
          //通信終了
        }
    });

	$.ajax({
        type : 'POST',
        url : '/getPhotos',
        data : controll_data,
        cache : false,
        dataType : 'json',

        success : function(json) {

        	photo_html = photo_html.concat('<div id="images">');
        	$.each(json.images.reverse(), function(i, e){
        		if(i == 0) photo_html = photo_html.concat('<div id="image">');
        		if(i == 4) photo_html = photo_html.concat('<div id="image">');
        		photo_html = photo_html.concat('<div style="float:left;padding:5px 5px 5px 5px;">');
        		photo_html = photo_html.concat('<a href="' + e.image_url + '" target="_blank"><img src="' + e.thumbnail_url + '" class="class_box_shadow"></a>');
        		photo_html = photo_html.concat('<br>');
        		photo_html = photo_html.concat('<strong><span style="font-size:70%;">' + e.date + '</span></strong>');
        		photo_html = photo_html.concat('</div>');
        		if(i == 3){
            		photo_html = photo_html.concat('</div><div style="clear:both;"></div>');
            		photo_html = photo_html.concat('<hr>');
        		}else if(i == 7){
            		photo_html = photo_html.concat('</div>');
        		}
            });
    		photo_html = photo_html.concat('<div style="clear:both;"></div>');
        	photo_html = photo_html.concat('</div>')
            $("#photo-area").html( photo_html );
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