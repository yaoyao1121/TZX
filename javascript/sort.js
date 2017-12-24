/**
 * Created by 晓霞 on 2017/9/25.
 */
(function(){
    window.onload=function() {
        function cla(a) {
            var len = document.querySelectorAll(a).length;
            if (len > 1) {
                return document.querySelectorAll(a);
            } else {
                return document.querySelector(a);
            }
        }
        var fa=true;
        (function(){
            var Lli = $(".sort_content_wrap .sort_content_left ul li"),
                len = Lli.length,
                Rsort = $(".sort_content_wrap .sort_content_right .sort_right"),
                k = 0,
                contentss=$('.sort_content_wrap .sort_content_right .contents').get(0);
            console.log(fa);
            for (var i = 0; i < len; i++) {
                Lli[i].index = i;
                Lli[i].addEventListener("touchend", function () {
                    if(fa){
                        k = this.index;
                        for (var j = 0; j < len; j++) {
                            Lli[j].className = '';
                            Rsort[j].className = 'sort_right';
                        }
                        this.className = 'active';
                        Lli.closest('.sort_content_left').siblings().find(".sort_right").eq(k).addClass('show');
                        contentss.style.top =0;
                    }
                })
            }
        })();
        (function () {
            var start = 0, move = 0, distance = 0, top = 0,
                startR= 0,moveR= 0,distanceR= 0,topR= 0,
                sortL = $('.sort_content_wrap .sort_content_left').get(0),
                Lul=$('.sort_content_wrap .sort_content_left ul').get(0),
                sortR = $('.sort_content_wrap .sort_content_right').get(0),
                sortRs=$('.sort_content_wrap .sort_content_right .sort_right').get(0),
                headerH=$('#header').get(0).offsetHeight,
                footerH=$('#footer').get(0).offsetHeight,
                clientHeight = document.documentElement.clientHeight-headerH-footerH,
                contents=$('.sort_content_wrap .sort_content_right .contents').get(0);
            window.resize = function () {
                clientHeight = document.documentElement.clientHeight-headerH-footerH;
            };
            sortL.style.height = clientHeight + 'px';
            sortR.style.height = clientHeight + 'px';
            var   chaH=Lul.offsetHeight-clientHeight,
                RchaH=sortRs.offsetHeight-clientHeight;
            //console.log(sortL.style.height, sortR.style.height);
            sortL.addEventListener('touchstart', function (e) {
                start = e.touches[0].pageY;
                top = Lul.offsetTop;
            });
            sortL.addEventListener('touchmove', function (e) {
                move = e.touches[0].pageY;
                distance = move - start;
                Lul.style.top = top + distance + 'px';
                //console.log(Lul.style.top,distance);
                if(parseInt(Lul.style.top)>0){
                    Lul.style.top =0;
                }else if(parseInt(Lul.style.top)<-chaH){
                    Lul.style.top = -chaH+ 'px';
                }
                fa=false;
            });
            sortL.addEventListener('touchend',function(){
                fa=true;
                console.log(fa);
            });
            sortR.addEventListener("touchstart",function(e){
                startR= e.touches[0].pageY;
                topR=contents.offsetTop;
            });
            sortR.addEventListener('touchmove', function (e) {
                moveR = e.touches[0].pageY;
                distanceR = moveR - startR;
                contents.style.top = topR + distanceR + 'px';
                if(parseInt(contents.style.top)>0){
                    contents.style.top =0;
                }else if(parseInt(contents.style.top)<-RchaH){
                    contents.style.top = -RchaH+ 'px';
                }
            });
        })();
    }
})();