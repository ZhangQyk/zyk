const ap = new APlayer({
    container: document.getElementById('aplayer'),
    order: 'random',
    preload: 'auto',
    listMaxHeight: '336px',
    volume: '0.5',
    mutex: true,
    lrcType: 3,
    /* 下方更改为你自己的歌单就行 */
    audio: [{
            name: "《给你呀(DJ版)》",
            artist: "蒋小呢",
            url: "http://music.163.com/song/media/outer/url?id=1884291086.mp3",
            cover: "http://p2.music.126.net/06C0K_HdpFXpgl7w0ZvgcQ==/109951166494395595.jpg?param=300x300",
            lrc: "https://www.myfreemp3.com.cn/static/lrc/%E7%BB%99%E4%BD%A0%E5%91%80%EF%BC%88%E5%8F%88%E5%90%8D%EF%BC%9AFor%20ya%EF%BC%89%EF%BC%88Takuau%20Bootleg%EF%BC%89%E8%92%8B%E5%B0%8F%E5%91%A2%20-%20Takuau.lrc",
            theme: "#171513"
        },
        {
            name: "《Lifeline (生命线)》",
            artist: "六翼使徒",
            url: "http://music.163.com/song/media/outer/url?id=38019092.mp3",
            cover: "http://p2.music.126.net/rukrV8tgLCltzzT7ZJJ6Yw==/109951163861234431.jpg?param=300x300",
            lrc: "https://www.myfreemp3.com.cn/static/lrc/Lifeline%20-%20Zeraphym%20%E5%85%AD%E7%BF%BC%E4%BD%BF%E5%BE%92.lrc",
            theme: "#0057a7"
        },
        {
            name: "《可不可以》",
            artist: "张紫豪",
            url: "http://music.163.com/song/media/outer/url?id=2133591453.mp3",
            cover: "http://p2.music.126.net/bT4RxypDWVbHyAyMwxGmZA==/109951169395349439.jpg?param=300x300",
            lrc: "https://www.myfreemp3.com.cn/static/lrc/%E5%8F%AF%E4%B8%8D%E5%8F%AF%E4%BB%A5%20-%20%E5%BC%A0%E5%AD%90%E8%B1%AA.lrc",
            theme: "#171513"
        },
    ]
});

/* 底栏歌词 */
setInterval(function () {
    $("#lrc").html("<span class='lrc-show'><i class='iconfont icon-music'></i> " + $(".aplayer-lrc-current").text() + " <i class='iconfont icon-music'></i></span>");
}, 500);

/* 音乐通知及控制 */
ap.on('play', function () {
    music = $(".aplayer-title").text() + $(".aplayer-author").text();
    iziToast.info({
        timeout: 8000,
        iconUrl: './img/icon/music.png',
        displayMode: 'replace',
        message: music
    });
    $("#play").html("<i class='iconfont icon-pause'>");
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
    if ($(document).width() >= 990) {
        $('.power').css("cssText", "display:none");
        $('#lrc').css("cssText", "display:block !important");
    }
});

ap.on('pause', function () {
    $("#play").html("<i class='iconfont icon-play'>");
    if ($(document).width() >= 990) {
        $('#lrc').css("cssText", "display:none !important");
        $('.power').css("cssText", "display:block");
    }
});

//音量调节
function changevolume() {
    var x = $("#volume").val();
    ap.volume(x, true);
    if (x == 0) {
        $("#volume-ico").html("<i class='iconfont icon-volume-x'></i>");
    } else if (x > 0 && x <= 0.3) {
        $("#volume-ico").html("<i class='iconfont icon-volume'></i>");
    } else if (x > 0.3 && x <= 0.6) {
        $("#volume-ico").html("<i class='iconfont icon-volume-1'></i>");
    } else {
        $("#volume-ico").html("<i class='iconfont icon-volume-2'></i>");
    }
}

$("#music").hover(function () {
    $('.music-text').css("display", "none");
    $('.music-volume').css("display", "flex");
}, function () {
    $('.music-text').css("display", "block");
    $('.music-volume').css("display", "none");
})

/* 一言与音乐切换 */
$('#open-music').on('click', function () {
    $('#hitokoto').css("display", "none");
    $('#music').css("display", "flex");
});

$("#hitokoto").hover(function () {
    $('#open-music').css("display", "flex");
}, function () {
    $('#open-music').css("display", "none");
})

$('#music-close').on('click', function () {
    $('#music').css("display", "none");
    $('#hitokoto').css("display", "flex");
});

/* 上下曲 */
$('#play').on('click', function () {
    ap.toggle();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

$('#last').on('click', function () {
    ap.skipBack();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

$('#next').on('click', function () {
    ap.skipForward();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

/* 打开音乐列表 */
$('#music-open').on('click', function () {
    if ($(document).width() >= 990) {
        $('#box').css("display", "block");
        $('#row').css("display", "none");
        $('#more').css("cssText", "display:none !important");
    }
});