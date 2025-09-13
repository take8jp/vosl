$(function(){
				function getParam(name, url) {
					if (!url) url = window.location.href;
					name = name.replace(/[\[\]]/g, "\\$&");
					var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
							results = regex.exec(url);
					if (!results) return null;
					if (!results[2]) return '';
					return decodeURIComponent(results[2].replace(/\+/g, " "));
				}
				var search_txt = getParam('search');
				//alert(search_txt);
				$('#search').val(search_txt).quicksearch('#VOSL>.col', {'noResults': '#noresults',});
				
				//vtuber名で検索
				var target_artist_name = '#artist_name_tag';
				var csvList_artist_name;
				var insert_artist_name = '';
				//ジャンルで検索
				var target_genre = '#genre_tag';
				var csvList_genre;
				var insert_genre = '';
				//年号で検索
				var target_release_year = '#release_year_tag';
				var csvList_release_year;
				var insert_release_year = '';
				//一覧
				var target_vosl = '#VOSL';
				var csvList_vosl;
				var insert_vosl = '';
				var year = new Date().getFullYear();
				 var month = new Date().getMonth() + 1;
				var date = new Date().getDate();
				var nichiji = year + "" + month + "" + date;
					 
    $.ajax({
			 url: 'csv/VOSL.csv?' + new Date().getTime() +'',
       success: function(data) {
         // csvを配列に格納(vtuber名で検索)
				 csvList_artist_name = $.csv()(data);
				 // 挿入するHTMLを作成(vtuber名で検索)
         for (var i = 1; i < csvList_artist_name.length; i++) {
					 //多言語化
					 params = location.href.split("?");
					 if(params.length>1){
							var url = decodeURI(location.search)
							if(url.indexOf('lang=en') !== -1){
					 insert_artist_name += '<div class="artist_name_list v_name_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_artist_name[i][17] + '\').quicksearch(\'#VOSL>.col\', {});">' + csvList_artist_name[i][17] + '</div>';
							} else if(url.indexOf('lang=ko') !== -1){
					 insert_artist_name += '<div class="artist_name_list v_name_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_artist_name[i][18] + '\').quicksearch(\'#VOSL>.col\', {});">' + csvList_artist_name[i][18] + '</div>';
							} else{
					 insert_artist_name += '<div class="artist_name_list v_name_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_artist_name[i][1] + '\').quicksearch(\'#VOSL>.col\', {});">' + csvList_artist_name[i][1] + '</div>';
							}
						} else{
					 insert_artist_name += '<div class="artist_name_list v_name_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_artist_name[i][1] + '\').quicksearch(\'#VOSL>.col\', {});">' + csvList_artist_name[i][1] + '</div>';
						}
         };
         // csvを配列に格納(ジャンルで検索)
				 csvList_genre = $.csv()(data);
				 // 挿入するHTMLを作成(ジャンルで検索)
				 for (var i = 1; i < csvList_genre.length; i++) {
					 insert_genre += '<div class="genre_list genre_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_genre[i][4] + '\').quicksearch(\'#VOSL>.col\', {});">' + csvList_genre[i][4] + '</div>';
         };
         // csvを配列に格納(年号で検索)
				 csvList_release_year = $.csv()(data);
				 // 挿入するHTMLを作成(年号で検索)
				 for (var i = 1; i < csvList_release_year.length; i++) {
					 insert_release_year += '<div class="release_year_list badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_release_year[i][5] + '\').quicksearch(\'#VOSL>.col\', {});">' + csvList_release_year[i][5] + '</div>';
         };
         // csvを配列に格納(一覧)
         csvList_vosl = $.csv()(data);
         // 挿入するHTMLを作成
         for (var i = 1; i < csvList_vosl.length; i++) {
					 var youtubeurl = csvList_vosl[i][2]; // youtube動画のURL
					 var youtubeid = youtubeurl.split('v=')[1];
					 //多言語化
					 params = location.href.split("?");
					 //alert(youtubeid);
					insert_vosl += '<div class="col">';
					insert_vosl += '<div class="card">';
					insert_vosl += '<div class="thum">';
					//insert_vosl += '<img src="https://img.youtube.com/vi/' + youtubeid + '/sddefault.jpg" class="card-img-top" alt="...">';
					insert_vosl += '<a href="#exampleModal' + i + '" class="popup-modal" title="' + csvList_vosl[i][3] + '"><img src="Images/loading-buffering.gif" data-src="https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg" class="card-img-top lazyload" alt="' + csvList_vosl[i][3] + '" width="320" height="180"></a>';
//					 if(csvList_vosl[i][7]==""){}else{
//					insert_vosl += '<div class=""><div class="user_icon rounded-circle" style=" background: url(' + csvList_vosl[i][7] + ')center center;"></div></div>';
//					};
					 //new
					 const tourokubi = csvList_vosl[i][19];
					 const tourokubi02 = tourokubi.substring(0,10);
					 const tourokubi03 = tourokubi02.replace(/(\\|\/)/g,"");
					 const today = new Date();
					 const year = today.getFullYear();
						const month = ("0"+(today.getMonth() + 1)).slice(-2);
						const date = ("0"+today.getDate()).slice(-2);
					 var today2 = year +""+ month +""+ date;
					 var newicon = tourokubi03 - today2;
					 //insert_vosl += newicon;
					 if(newicon>-30){
					 insert_vosl += '<small class="small"><span class="badge text-bg-danger small" style="position:absolute;top:4px;left:4px;">NEW!</span></small>';
					 }
					 
					 //new
          insert_vosl += '</div>';
					insert_vosl += '<div class="card-body">';
					insert_vosl += '<h5 class="card-title mb-1">' + csvList_vosl[i][3] + '</h5>';
					 if(params.length>1){
							var url = decodeURI(location.search)
							if(url.indexOf('lang=en') !== -1){
								insert_vosl += '<div class=" mb-1"><a href="' + csvList_vosl[i][15] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vosl[i][17] + '</small></a></div>';
							} else if(url.indexOf('lang=ko') !== -1){
								insert_vosl += '<div class=" mb-1"><a href="' + csvList_vosl[i][15] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vosl[i][18] + '</small></a></div>';
							} else{
								insert_vosl += '<div class=" mb-1"><a href="' + csvList_vosl[i][15] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vosl[i][1] + '</small></a></div>';
							}
						} else{
								insert_vosl += '<div class=" mb-1"><a href="' + csvList_vosl[i][15] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vosl[i][1] + '</small></a></div>';
						}
					 insert_vosl += '<div class="card-text">';
					if(csvList_vosl[i][4]==""){}else{
					 insert_vosl += '<div class=" small"><span class="badge text-bg-secondary mx-1 title_genre">ジャンル</span><span class="small genre_txt">' + csvList_vosl[i][4] + '</span></div>';
					};
          insert_vosl += '</div>';
          insert_vosl += '<div class="d-flex justify-content-between align-items-center mt-2">';
          insert_vosl += '<div class="btn-group">';
          insert_vosl += '<a href="' + csvList_vosl[i][2] + '" target="_blank" class="btn btn-sm btn-outline-secondary woy" title="Youtube">Youtubeで見る</a>';
          insert_vosl += '<a href="#exampleModal' + i + '" class="btn btn-sm btn-outline-secondary popup-modal details_btn">詳細</a>';
          insert_vosl += '</div>';
					 if(csvList_vosl[i][5]==""){}else{
          insert_vosl += '<small class="text-body-secondary">' + csvList_vosl[i][5] + '</small>';
					};
					insert_vosl += '<div id="exampleModal' + i + '" class="mfp-hide modal_bg">';
          insert_vosl += '<h5 class="card-title mb-3 text-center">' + csvList_vosl[i][3] + '</h5>';
          insert_vosl += '<div class="row row-cols-1 row-cols-sm-2">';
          insert_vosl += '<div class="col">';
					insert_vosl += '<div class="youtube mb-2 ">';
					 if(params.length>1){
							var url = decodeURI(location.search)
							if(url.indexOf('lang=en') !== -1){
								insert_vosl += '<div class="youtube_playon" style="background-image:url(Images/youtubeload_en.png),url(https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg);">' + youtubeid + '</div>';
							} else if(url.indexOf('lang=ko') !== -1){
								insert_vosl += '<div class="youtube_playon" style="background-image:url(Images/youtubeload_ko.png),url(https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg);">' + youtubeid + '</div>';
							} else{
								insert_vosl += '<div class="youtube_playon" style="background-image:url(Images/youtubeload.png),url(https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg);">' + youtubeid + '</div>';
							}
						} else{
								insert_vosl += '<div class="youtube_playon" style="background-image:url(Images/youtubeload.png),url(https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg);">' + youtubeid + '</div>';
						}
//					insert_vosl += '<iframe src="https://www.youtube.com/embed/' + youtubeid + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
					insert_vosl += '</div>';
					 if(params.length>1){
							var url = decodeURI(location.search)
							if(url.indexOf('lang=en') !== -1){
					insert_vosl += '<div class=" mb-1"><a href="' + csvList_vosl[i][15] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vosl[i][17] + '</small></a></div>';
							} else if(url.indexOf('lang=ko') !== -1){
					insert_vosl += '<div class=" mb-1"><a href="' + csvList_vosl[i][15] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vosl[i][18] + '</small></a></div>';
							}else{
					insert_vosl += '<div class=" mb-1"><a href="' + csvList_vosl[i][15] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vosl[i][1] + '</small></a></div>';
							}
						} else{
					insert_vosl += '<div class=" mb-1"><a href="' + csvList_vosl[i][15] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vosl[i][1] + '</small></a></div>';
						}
					insert_vosl += '<span class="badge text-bg-secondary mx-1">' + csvList_vosl[i][20] + '</span>';
					insert_vosl += '</div>';
          insert_vosl += '<div class="col">';
					insert_vosl += '<table class="table table-sm">';
					insert_vosl += '<tbody>';
					if(csvList_vosl[i][4]==""){}else{
						insert_vosl += '<tr><th class="small table_th01 title_genre">ジャンル</th><td class="genre_txt">' + csvList_vosl[i][4] + '</td></tr>';
					};
					 if(csvList_vosl[i][5]==""){}else{
					insert_vosl += '<tr><th class="small table_th01 title_release">リリース年</th><td>' + csvList_vosl[i][5] + '</td></tr>';
					};
					 if(csvList_vosl[i][6]==""){}else{
					insert_vosl += '<tr><th class="small table_th01 title_belonging">所属</th><td>' + csvList_vosl[i][6] + '</td></tr>';
					};
					 if(csvList_vosl[i][8]==""){}else{
					insert_vosl += '<tr><th class="small table_th01 title_lyrics">作詞</th><td>' + csvList_vosl[i][8] + '</td></tr>';
					};
					 if(csvList_vosl[i][9]==""){}else{
					insert_vosl += '<tr><th class="small table_th01 title_composer">作曲</th><td>' + csvList_vosl[i][9] + '</td></tr>';
					};
					 if(csvList_vosl[i][10]==""){}else{
					insert_vosl += '<tr><th class="small table_th01 title_arranger">編曲</th><td>' + csvList_vosl[i][10] + '</td></tr>';
					};
					 if(csvList_vosl[i][11]==""){}else{
					insert_vosl += '<tr><th class="small table_th01">MIX</th><td>' + csvList_vosl[i][11] + '</td></tr>';
					};
					 if(csvList_vosl[i][12]==""){}else{
					insert_vosl += '<tr><th class="small table_th01 title_player">演奏</th><td>' + csvList_vosl[i][12] + '</td></tr>';
					};
					 if(csvList_vosl[i][13]==""){}else{
					insert_vosl += '<tr><th class="small table_th01">REMIX</th><td>' + csvList_vosl[i][13] + '</td></tr>';
					};
					 if(csvList_vosl[i][14]==""){}else{
					insert_vosl += '<tr><th class="small table_th01">SNS</th><td><a href="' + csvList_vosl[i][14] + '" target="_blank"><img loading="lazy" src="Images/x_logo.svg" width="20"></a></td></tr>';
					};
					 if(csvList_vosl[i][16]==""){}else{
					insert_vosl += '<tr><th class="small table_th01 title_stream">サブスク</th><td><a href="' + csvList_vosl[i][16] + '" target="_blank" class="stream_txt">サブスクで聞く</a></td></tr>';
					};
					insert_vosl += '</tbody>';
					insert_vosl += '</table>';
					insert_vosl += '<div class="search_only">' + csvList_vosl[i][1] + '' + csvList_vosl[i][4] + '' + csvList_vosl[i][17] + '' + csvList_vosl[i][18] + '</div>';
					 insert_vosl += '<div class="text-center pb-1 mb-2"><a href="https://twitter.com/share?url=' + csvList_vosl[i][2] + '&text=私の推し曲は（' + csvList_vosl[i][1] + '）の『' + csvList_vosl[i][3] + '』です！%0a理由：◯◯%0aエピソード：◯◯%0a&hashtags=ぶいあーる" target="_blank" class="btn text-bg-secondary mb-1 btn-sm kikaku03">この楽曲を #ぶいあーる でポスト</a><br/><a href="https://www.nhk.jp/p/vr-radio/rs/6N87LJL8ZM/" target="_blank" ><small class="detail_txt small">詳しくはこちら</small></a></div>';
					 if(csvList_vosl[i][20]=="ユニット・グループ"){
						 insert_vosl += '<div class="text-center pb-1 mb-2"><a href="https://twitter.com/share?url=' + csvList_vosl[i][2] + '&text=（' + csvList_vosl[i][1] + '）の『' + csvList_vosl[i][3] + '』に投票します！&hashtags=VTuber楽曲ランキング,ミューコミVR" target="_blank" class="btn text-bg-secondary mb-1 btn-sm">この楽曲を #VTuber楽曲ランキング #ミューコミVR でポスト<div class="small">※現在活動中の女性ユニット、グループが対象です。</div></a><br/><a href="https://x.com/mc1242/status/1964710511511298301" target="_blank" ><small class="detail_txt small">詳しくはこちら</small></a></div>';
					 }else{};
					 
					 
					insert_vosl += '</div>';
					insert_vosl += '</div>';
          insert_vosl += '</div>';
          insert_vosl += '</div>';
          insert_vosl += '</div>';
					insert_vosl += '</div>';
					insert_vosl += '</div>';
					insert_vosl += '</div>';
         };
				 //表示
         $(target_artist_name).append(insert_artist_name);
         $(target_genre).append(insert_genre);
				 $(target_release_year).append(insert_release_year);
         $(target_vosl).append(insert_vosl);
				 const texts_release_year = new Set();
				 for (let li of document.querySelectorAll(".release_year_list")) {
						const string = li.textContent;
						texts_release_year.has(string) ? li.remove() : texts_release_year.add(string);
					}
				 const texts_artist_name = new Set();
				 for (let li of document.querySelectorAll(".artist_name_list")) {
						const string = li.textContent;
						texts_artist_name.has(string) ? li.remove() : texts_artist_name.add(string);
					}
				 const texts_genre = new Set();
				 for (let li of document.querySelectorAll(".genre_list")) {
						const string = li.textContent;
						texts_genre.has(string) ? li.remove() : texts_genre.add(string);
					}
				 //ランダム表示
          var bool = [1, -1];
          $('#artist_name_tag').html(
            $('#artist_name_tag>.artist_name_list').sort(function (a, b) {
              return bool[Math.floor(Math.random() * bool.length)];
            })
          );
				 //ランダム表示
          var bool = [1, -1];
          $('#genre_tag').html(
            $('#genre_tag>.genre_list').sort(function (a, b) {
              return bool[Math.floor(Math.random() * bool.length)];
            })
          );
				 //画像load
  				$("img.lazyload").lazyload({effect:'fadeIn'});
				 //検索
         	$(function search() {
						$('#search').quicksearch('#VOSL>.col', {
							'noResults': '#noresults',//検索該当無しの場合表示する対象
						});
						$('#search2').quicksearch('#artist_name_tag>.artist_name_list', {
							'noResults': '#noresults2',//検索該当無しの場合表示する対象
						});
					});
					$("#search").keydown(function (e) {
						if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
							return false;
						} else {
							return true;
						}
					});
					$("#search2").keydown(function (e) {
						if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
							return false;
						} else {
							return true;
						}
					});
    			//ランダム表示
          var bool = [1, -1];
          $('#VOSL').html(
            $('#VOSL>.col').sort(function (a, b) {
              return bool[Math.floor(Math.random() * bool.length)];
            })
          );
					//popup
					$('.popup-modal').magnificPopup({
						type: 'inline',
						preloader: false
					});
					//閉じるリンクの設定
					$(document).on('click', '.popup-modal-dismiss', function (e) {
						e.preventDefault();
						$.magnificPopup.close();
					});
				 	$(".youtube_playon").click(function(){
						//alert($(this).html());
						youtubeid = $(this).html()
						//クリックで置き換え
						$(this).after('<iframe src="https://www.youtube.com/embed/' + youtubeid + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
      		});
					 //多言語化
						if(params.length>1){
							var url = decodeURI(location.search)
					 		var genre_txt = $('.genre_txt').html();
					 		var v_name_txt = $('.v_name_txt').html();
							if(url.indexOf('lang=en') !== -1){
								//alert("en");
								$('html').attr('lang', 'en');
								$("body").addClass("lang_en");
								$(".info_txt").html("This site is a collection of original songs and remixes of original songs by Vtubers and virtual singers.<br/>We are looking forward to hearing from you.");//info
								$(".form_btn").text("Open the form in a separate tab");//別タブでフォームを開く
								$(".woy").text("Youtube");//Youtubeで見る
								$(".details_btn").text("Details");//詳細
								$(".search_btn01").text("Search by Vtuber name");//Vtuber名で検索
								$(".search_btn02").text("Search by Release Year");//リリース年で検索
								$(".search_btn03").text("Search by Genre");//ジャンルで検索
								$(".search_btn04").text("Unit/Group");//ユニット・グループ
								$(".noresults").text("Not found.");//見つかりませんでした
								$(".title_genre").text("Genre");//ジャンル
								$(".title_release").text("Release year");//リリース年
								$(".title_belonging").text("belonging");//所属
								$(".title_lyrics").text("Lyrics");//作詞
								$(".title_composer").text("Composer");//作曲
								$(".title_arranger").text("Arranger");//編曲
								$(".title_player").text("Player");//演奏
								$(".title_stream").text("Stream");//サブスク
								$(".stream_txt").text("Listen to streaming");//ストリーミングで聞く
								$(".clear_txt").text("clear");//クリア
								$(".kikaku01").text("Post this song with the hashtag #VTuber楽曲ランキング");//この楽曲を#VTuber楽曲ランキングでポスト
								$(".kikaku02").text("VTubers who are currently active are eligible.");//※現在活動中のVTuberが対象です
								$(".kikaku03").text("Post this song with the hashtag #ぶいあーる");//この楽曲を#ぶいあーるでポスト
								$(".detail_txt").text("Learn more");//詳しくはこちら
								$(".share_btn").text("Share on X");//Xでシェアする
								$("#search").attr("placeholder","Enter search words");//検索ワードを入力
								$(".left_link_txt").text("Click here for cover song");//歌ってみたはこちら
								$('.genre_txt').each(function(){
									var genre_txt = $(this).html();
									$(this).html(
										genre_txt.replace(/ベース/g,'base').replace(/ロック/g,'ROCK').replace(/フィーチャー/g,'Fture ').replace(/ハイテック/g,'High-Tech').replace(/ダブステップ/g,'Dobstep').replace(/コア/g,'Core').replace(/和風/g,'Japanese-style ')
									);
								});
							}else if(url.indexOf('lang=ko') !== -1){
								//alert("en");
								$('html').attr('lang', 'ko');
								$("body").addClass("lang_ko");
								$(".info_txt").html("이 사이트는 Vtuber, Virtual singer의 오리지널 곡이나 오리지널 곡의 리믹스를 모은 사이트입니다.<br/>여러분으로부터의 정보를 기다리고 있습니다.");//info
								$(".form_btn").text("다른 탭에서 양식 열기");//別タブでフォームを開く
								$(".woy").text("Youtube");//Youtubeで見る
								$(".details_btn").text("상세");//詳細
								$(".search_btn01").text("Vtuber 이름으로 검색");//Vtuber名で検索
								$(".search_btn02").text("출시년도 검색");//リリース年で検索
								$(".search_btn03").text("장르로 검색");//ジャンルで検索
								$(".search_btn04").text("유닛·그룹");//ユニット・グループ
								$(".noresults").text("찾을 수 없음");//見つかりませんでした
								$(".title_genre").text("장르");//ジャンル
								$(".title_release").text("출시년도");//リリース年
								$(".title_belonging").text("소속");//所属
								$(".title_lyrics").text("작사");//作詞
								$(".title_composer").text("작곡");//作曲
								$(".title_arranger").text("편곡");//編曲
								$(".title_player").text("연주");//演奏
								$(".title_stream").text("스트리밍");//サブスク
								$(".stream_txt").text("스트리밍으로 듣기");//ストリーミングで聞く
								$(".clear_txt").text("클리어");//クリア
								$(".kikaku01").text("이 악곡을 #VTuber楽曲ランキング 으로 포스트");//この楽曲を#VTuber楽曲ランキングでポスト
								$(".kikaku02").text("※현재 활동중인 VTuber가 대상입니다.");//※現在活動中のVTuberが対象です
								$(".kikaku03").text("이 악곡을 #ぶいあーる 으로 포스트");//この楽曲を#ぶいあーるでポスト
								$(".detail_txt").text("자세한 것은 이쪽");//詳しくはこちら
								$(".share_btn").text("X로 공유");//Xでシェアする
								$("#search").attr("placeholder","검색어 입력");//検索ワードを入力
								$(".left_link_txt").text("커버곡은 여기");//歌ってみたはこちら
								$('.genre_txt').each(function(){
									var genre_txt = $(this).html();
									$(this).html(
										genre_txt.replace(/ベース/g,'base').replace(/ロック/g,'ROCK').replace(/フィーチャー/g,'Fture ').replace(/ハイテック/g,'High-Tech').replace(/ダブステップ/g,'Dobstep').replace(/コア/g,'Core').replace(/和風/g,'Japanese-style ')
									);
								});
							}
						}
       		}
     		});
				$(".share_btn").click(function(){
					if(getParam('lang') == null){
						var share_btn_link = "https://twitter.com/share?url=https://take8jp.github.io/vosl/&hashtags=VOSList";
						window.open(share_btn_link, "_blank");
					} else{
						var share_btn_link = "https://twitter.com/share?url=https://take8jp.github.io/vosl/?lang=" + getParam('lang') + "&hashtags=VOSList";
						window.open(share_btn_link, "_blank");
					}
				});
				
        var topBtn = $('#pageTop');
        topBtn.hide();
        $(window).scroll(function () {
          if ($(this).scrollTop() > 80) {
            topBtn.fadeIn();
          } else {
            topBtn.fadeOut();
          }
        });
        topBtn.click(function () {
          $('body,html').animate({
            scrollTop: 0
          }, 500);
          return false;
        });
      });
			
			window.onload = function() {
				const spinner = document.getElementById('loading');
				spinner.classList.add('loaded');
			};