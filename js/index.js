// 디데이 타이머
function remaindTime() {
    var now = new Date(); //현재시간을 구한다.
    var open = new Date(2025, 11, 19, 14, 30, 0o0);

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
        $("#d-day-hour").html("00");
        $("#d-day-min").html("00");
        $("#d-day-sec").html("00");
    }
}

setInterval(remaindTime, 1000);

$(document).ready(function() {
    $('.gallery ul li').each(function() {
        var $li = $(this);
        var $img = $li.find('img');
        
        $img.on('load', function() {
            var liHeight = $li.height();
            var imgHeight = $img.height();
            
            // 이미지 비율 유지하며 조정
            var scaleFactor = liHeight / imgHeight;
            
            $img.css({
                'transform': 'scale(' + scaleFactor + ')',
                'transform-origin': 'center center'
            });
        });
    });

    // 계좌번호 복사하기
    $(".account .copy_btn").on("click", function(){
        var textVal = $(this).siblings('.num').text().replace(/\-/g, "").trim();
        console.log(textVal)
        var textarea = document.createElement('textarea');
        textarea.value = textVal;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 9999);
        document.execCommand('copy');
        document.body.removeChild(textarea);
        // alert("복사되었습니다.");

        let msg = $(".copied_msg");
        msg.css({ bottom: "15%", opacity: 1 });
        
        setTimeout(function(){
            msg.css({ bottom: "15%", opacity: 0 });
        }, 1500);
    });
});

function Tmapshow(){
    location.href ="https://www.tmap.co.kr/tmap2/mobile/route.jsp?appKey=1U1LoVKtfX4q8T73M91efacIhzRBNkQk4NnJPiFe&lat=37.590055&lat=127.059928";
}