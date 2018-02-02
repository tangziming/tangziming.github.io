window.onload = function () {
    var oDiv=document.getElementById('pic');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');
    var oCover_left = document.getElementById('cover_left');
    var oCover_right = document.getElementById('cover_right');

    var oDivBig = document.getElementById('big_pic');
    var aLiBig = oDivBig.getElementsByTagName('li');
    var oDivSmall = document.getElementById('small_pic');
    var aLiSmall = oDivSmall.getElementsByTagName('li');
    var oUlSmall = oDivSmall.getElementsByTagName('ul')[0];
    oUlSmall.style.width=aLiSmall[0].offsetWidth*aLiSmall.length+'px';
    


    //左右按钮
    oPrev.onmouseover = oCover_left.onmouseover = function () {
        startmove(oPrev, {opacity: 100});
    }
    oNext.onmouseover = oCover_right.onmouseover = function () {
        startmove(oNext, {opacity: 100});
    }
    oPrev.onmouseout = oCover_left.onmouseout = function () {
        startmove(oPrev, {opacity: 0});
    }
    oNext.onmouseout = oCover_right.onmouseout = function () {
        startmove(oNext, {opacity: 0});
    }
    //左右按钮结束

    //点击小图时大图切换
    var nowzindex = 2;//设置图片的Zindex，目的：是图片在最上，显示出来
    var now = 0;      //存储 index值
    for (var i = 0; i < aLiSmall.length; i++) {//遍历所有aLiSmall元素；
        aLiSmall[i].index = i; //给每个alismall 赋予index值
        aLiSmall[i].onclick = function () {
            if (this.index == now) { //如果点击的当前的index值=now
                return; //返回
            }
            now = this.index;//否则，把当前点击的index值赋给now；
            tab(); //调用tab函数；
        }

        function tab() {  //tab函数
            aLiBig[now].style.zIndex = nowzindex++; //使图片放在最高层，且nowzindex++，下次赋值时比这次+1；

            for (var i = 0; i < aLiSmall.length; i++) { 
                startmove(aLiSmall[i], {opacity: 60}); //将所有小图透明度运动至0.6
            }
            startmove(aLiSmall[now], {opacity: 100});//将当前小图透明度运动至1

            aLiBig[now].style.height = 0; //先将当前大图的height设置为0
            startmove(aLiBig[now], {height: 426});//在另当前大图的height运动值原本高度
            //小图滚动
            if(now==0){ //第一张图和最后一张图不动 ,其他运动1个小图的width
                startmove(oUlSmall,{left: 0});
            }else if(now==aLiSmall.length-1){
                startmove(oUlSmall,{left:-(now-2)*aLiSmall[0].offsetWidth});
            }else{
            startmove(oUlSmall,{left:-(now-1)*aLiSmall[0].offsetWidth});
            }
           
        }



        aLiSmall[i].onmouseover = function () { //鼠标悬浮时 小图透明度为1
            startmove(this, {opacity: 100});
        }
        aLiSmall[i].onmouseout = function () {//鼠标移出时，除了当前小图，其他小图透明度运动至0.6
            if (this.index != now) {
                startmove(this, {opacity: 60});
            }
        }

        oNext.onclick=function(){
            now++;
            if(now==aLiSmall.length){
                now=0;
            }
            tab();
        }
        oPrev.onclick=function(){
            now--;
            if(now==-1){
                now=aLiSmall.length-1;
            }
            tab();
        }
    }
   var timer= setInterval(oNext.onclick,3000);
   oDiv.onmouseover=function(){
       clearInterval(timer);
   }
   oDiv.onmouseout=function(){
   timer=setInterval(oNext.onclick,3000);
}


};




