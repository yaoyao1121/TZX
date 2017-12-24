/**
 * Created by 晓霞 on 2017/9/18.
 */
(function(){
    window.onload=function(){
        function cla(a){
            return document.getElementsByClassName(a);
        }
        function id(a){
            return document.getElementById(a);
        }
        (function(){
            var resizeEvt='orientationchange' in window ? 'orientationchange':'resize',
                banner=cla("banner_wrap")[0],
                ul=banner.children[0],
                ol=banner.children[1],
                lis=ul.children,
                ww=lis[0].children[0].offsetWidth,
                len=lis.length,
                index= 1,k= 0,start= 0,move= 0,end= 0,distance= 0,
                fa=true;
            window.addEventListener(resizeEvt,function(){
                ww=lis[0].children[0].offsetWidth;
            });
            var timer=setInterval(next,3000);
            banner.addEventListener("touchstart",function(e){
                start= e.touches[0].pageX;
                clearInterval(timer);
            });
            banner.addEventListener("touchmove",function(e){
                move= e.touches[0].pageX;
                distance=move-start;
                ul.style.transition="left 0.5s linear 0s";
                ul.style.left=-index*ww+distance+'px';
            });
            banner.addEventListener("touchend",function(e){
                end= e.changedTouches[0].pageX;
                var cha=end-start;
                if(cha>1/3*ww && fa==true){
                    fa=false;
                    prev();
                }else if(cha<-1/3*ww && fa==true){
                    fa=false;
                    next();
                }else{
                    animate();
                }
                timer=setInterval(next,3000);
            });
            ul.addEventListener("transitionend",function(){
                if(index<=0){
                    index=len-2;
                }else if(index>=len-1){
                    index=1;
                }
                ul.style.transition='none';
                ul.style.left=-index*ww+'px';
                fa=true;
            });
            function animate(){
                ul.style.transition="left 0.5s linear 0s";
                ul.style.left=-index*ww+'px';
            }
            function prev(){
                index--;
                animate();
                k--;
                if (k < 0) {
                    k = len-3;
                    ol.children[k].className = "col";
                    ol.children[0].className = "";
                } else {
                    ol.children[k].className = "col";
                    ol.children[k + 1].className = "";
                }

            }
            function next(){
                index++;
                animate();
                k++;
                if (k > len-3) {
                    k = 0;
                    ol.children[k].className = "col";
                    ol.children[len-3].className = " ";
                } else {
                    ol.children[k].className = "col";
                    ol.children[k - 1].className = " ";
                }

            }
        })();
        (function(){
            var hour=id("time_h"),
                minute=id("time_m"),
                second=id('time_s');
            setInterval(function(){
                timer(21)
            },1000);

            function timer(number){
                var time=new Date();
                /*获取系统的时间*/
                var h=time.getHours();
                var m=time.getMinutes();
                var s=time.getSeconds();
                /*从中把时分秒提取出来*/
                var end=number*60*60;
                /*知道要结束的时间并换算成秒*/
                var start=h*60*60+m*60+s;
                /*把系统提取的当前时间转换成秒*/
                var cha=end-start;
                /*拿未来的时间减去现在的时间，剩下的就是剩余的时间*/
                var  hh=parseInt(cha/3600);
                var  mm=parseInt(cha%3600/60);
                var  ss=parseInt(cha%3600%60);
                hour.value=hh;
                minute.value=mm;
                second.value=ss;
            }
        })();
        (function(){
            var grab=cla("grab_bot")[0],
                ul=grab.children[0],start= 0,move= 0,
                grabW=grab.offsetWidth,
                ulW=ul.offsetWidth,
                chaW=grabW-ulW,
                left= 0,distance=0;
            grab.addEventListener("touchstart",function(e){
                start= e.touches[0].pageX;
                left=ul.style.left;
            });
            grab.addEventListener("touchmove",function(e){
                move= e.touches[0].pageX;
                distance=move-start;
                ul.style.left=parseInt(left)+distance+'px';
            });
            grab.addEventListener("touchend",function(){
                if(parseInt(ul.style.left)>0){
                    ul.style.left=0;
                }else if(parseInt(ul.style.left)<chaW){
                    ul.style.left=chaW+'px';
                }
            });
        })();
        (function(){
            var index=0;
            window.addEventListener("scroll", function (event) {
                //判断滚动条到底部，需要用到DOM的三个属性值，即scrollTop、clientHeight、scrollHeight。
                //scrollTop为滚动条在Y轴上的滚动距离。
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                //clientHeight为内容可视区域的高度。
                //scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
                //所以，滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight
                if(document.documentElement.scrollHeight == document.documentElement.clientHeight + scrollTop) {
                    //添加数据
                    index++;
                    if(index<12) {
                        ajax();
                    }
                }
            });
            ajax();
            function ajax(){
                var xhr=new XMLHttpRequest(); /*new一个实例化XMLHttpRequest()对象*/
                xhr.open("get","javascript/listData.json");     /*三个参数 方式 接口  是否异步*/
                xhr.send(null);
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4){  /*判断请求数据是否成功*/
                        if(xhr.status==200){
                            var list=JSON.parse(xhr.responseText);/*把json格式转换成js格式*/
                            if(index==0){
                                $(".like_content").html("");
                            }
                            var data=list[index].data.list;
                            for(var i=0;i<data.length;i++){
                                var item=$("#item").html().replace("$img$",data[i].coverImg)
                                    .replace("$money$",data[i].money)
                                    .replace("$number$",data[i].number);
                                $(".like_content").append(item);
                            }
                        }
                    }
                }
            }
        })();
    }
})();