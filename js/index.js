// 로딩화면 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    // 화면이 최상단에 위치할 때만 로딩화면 나타나게
    if (window.scrollY === 0) {
        // 로딩 화면 표시
        const loadingElement = document.querySelector(".loading");
        if (loadingElement) {
            loadingElement.style.display = "block";
            
            setTimeout(() => {
                const introText_tit = document.querySelectorAll(".loading h1 span");
                
                let timer = 100;
                introText_tit.forEach((item) => {
                    item.style.animation = `fade 300ms ${(timer += 40)}ms forwards`;
                });
            }, 200);
            
            setTimeout(() => {
                const introText_sub = document.querySelectorAll(".loading h3 span");
                
                let timer = 100;
                introText_sub.forEach((item) => {
                    item.style.animation = `fade 300ms ${(timer += 50)}ms forwards`;
                });
            }, 700);
            
            // 3초 후 로딩 화면 숨김
            setTimeout(function () {
                document.querySelector("html").style.overflow = 'auto';
                loadingElement.style.display = "none";
            }, 2500);
        }
    } else {
        // 스크롤 위치가 0이 아니면 로딩 화면 숨김
        const loadingElement = document.querySelector(".loading");
        if (loadingElement) {
            loadingElement.style.display = "none";
        }
        document.querySelector("html").style.overflow = 'auto';
    }
});

window.onload = function(){
    setTimeout(function () {
        $("html").css("overflow",'auto'); 
        $(".loading").fadeOut();
    }, 2500);
};

// 디데이 타이머
function remaindTime() {
    var now = new Date(); //현재시간을 구한다.
    var open = new Date(2025, 9, 19, 14, 30, 0o0); //월은 0부터 시작(0=1월, 11=12월)

    var nt = now.getTime(); // 현재의 시간만 가져온다
    var ot = open.getTime(); // 오픈시간만 가져온다

    if (nt < ot) {
        //현재시간이 오픈시간보다 이르면 오픈시간까지의 남은 시간을 구한다.
        sec = parseInt(ot - nt) / 1000;
        day = parseInt(sec / 60 / 60 / 24);
        sec = sec - day * 60 * 60 * 24;
        hour = parseInt(sec / 60 / 60);
        sec = sec - hour * 60 * 60;
        min = parseInt(sec / 60);
        sec = parseInt(sec - min * 60);

        if (hour < 10) {
        hour = "0" + hour;
        }
        if (min < 10) {
        min = "0" + min;
        }
        if (sec < 10) {
        sec = "0" + sec;
        }
        $("#d-day-day").html(day);
        $("#d-day-hour").html(hour);
        $("#d-day-min").html(min);
        $("#d-day-sec").html(sec);
    } else {
        //현재시간이 종료시간보다 크면
        $('#d-day-txt').html("D-day 입니다. :)");
        $('.time .col').html("");
        $("#d-day-day").html("");
        $("#d-day-hour").html("");
        $("#d-day-min").html("");
        $("#d-day-sec").html("");
    }
}

setInterval(remaindTime, 1000);

$(document).ready(function() {
    // 갤러리 이미지 크기 맞춤
    $('.gallery .zoom_gallery a').each(function() {
        var $box = $(this);
        var $img = $box.find('img');
        
        var liHeight = $box.height();
        var imgHeight = $img.height();
        
        if(liHeight > imgHeight){ // 가로사진일 때 box에 img 채우기
            $img.each(function() {
                var scaleFactor = liHeight / imgHeight;
    
                $img.css({
                    'transform': 'translate(-50%, -50%) scale(' + scaleFactor + ')',
                    'transform-origin': 'center center'
                });
            })
        }
    });

    // 계좌번호 복사하기
    $(".account .copy_btn").on("click", function(){
        var textVal = $(this).siblings('.num').text().replace(/\-/g, "").trim();
        var textarea = document.createElement('textarea');
        textarea.value = textVal;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 9999);
        document.execCommand('copy');
        document.body.removeChild(textarea);
        // alert("복사되었습니다.");

        let msg = $(".copied_msg");
        msg.css({ bottom: "15%", opacity: 1});
        
        setTimeout(function(){
            msg.css({ bottom: "-30%", opacity: 0});
        }, 1500);
    });

    // 링크 복사
    $(".share .copy_link").on("click", function(){
        var textVal = 'https://wedding1019.site/';
        var textarea = document.createElement('textarea');
        textarea.value = textVal;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 9999);
        document.execCommand('copy');
        document.body.removeChild(textarea);

        let msg = $(".copied_msg");
        msg.css({ bottom: "15%", opacity: 1});
        
        setTimeout(function(){
            msg.css({ bottom: "-30%", opacity: 0});
        }, 1500);
    });

    // waypoint
    var target = $('.mobile section:not(:first-child)');

    target.each(function (i, v) {
        $(this).waypoint(function () {
            $(v).addClass('fadeInUp')
        }, {
            offset: '80%'
        })
    })

    // gallery popup
    $('.zoom_gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: true,
		mainClass: 'mfp-with-zoom mfp-img-mobile',

		allowHTMLInTemplate: true,
		image: {
			verticalFit: true,
		},

		gallery: {
			enabled: true,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            tPrev: '이전',
            tNext: '다음',
            tCounter: '%curr% / %total%',
            preload: [0, 2]
		},
		zoom: {
			enabled: false,
			duration: 300,
			opener: function(element) {
				return element.find('img');
			}
		},
        callbacks: {
            open: function() {
                // 팝업이 열린 후 화살표를 특정 div에 추가
                $('.mfp-arrow').appendTo('.mfp-content');
                
                // 필요에 따라 화살표 위치 조정을 위한 CSS 적용
                $('.mfp-arrow').css({
                    'position': 'absolute',
                    'top': '50%',
                });
            }
        }
	});
});