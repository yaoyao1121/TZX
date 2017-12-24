/**
 * Created by 晓霞 on 2017/9/27.
 */
var kk={};
kk.tab=function(objDom,callback){
    /*1.不能滑动
     * 2.响应需要在一定的时间完成 150ms*/
    var isMove=false;/*记录是否滑动过*/
    var startTime=0;
    objDom.addEventListener('touchstart',function(e){
        console.time('end');/*计时开始的一个声明 end*/
        startTime=Date.now();/*取到当前时间(距离1970.1.1)ms*/
    });
    objDom.addEventListener('touchmove',function(e){
        isMove=true;
    });
    objDom.addEventListener('touchend',function(e){
        console.timeEnd('end');/*计时结束的时候 打印出时间差 end*/
        /*isMove是false
         * 并且 响应时间在150ms内
         * 这就是一个模拟封装的tap事件的所有条件*/
        if(!isMove && (Date.now()-startTime)<150){
            callback && callback(e);
        }
        /*注意要重置*/
        isMove=false;
        startTime=0;
    })
};