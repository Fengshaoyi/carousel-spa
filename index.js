var content = 
'<div class="slider" id="slider">'+
    '<div class="slide"><img src="img/b5.png" alt=""></div>'+
    '<div class="slide"><img src="img/b1.png" alt=""></div>'+
    '<div class="slide"><img src="img/b2.png" alt=""></div>'+
    '<div class="slide"><img src="img/b3.png" alt=""></div>'+
    '<div class="slide"><img src="img/b4.png" alt=""></div>'+
    '<div class="slide"><img src="img/b5.png" alt=""></div>'+
    '<div class="slide"><img src="img/b1.png" alt=""></div>'+
"</div>"+
'<span id="left"><</span>'+
'<span id="right">></span>'+
'<ul class="nav" id="navs">'+
    '<li>1</li>'+
    '<li>2</li>'+
    '<li>3</li>'+
    '<li>4</li>'+
    '<li>5</li>'+
'</ul>'
$('#box').append(content);

var slider = document.getElementById('slider');
var left = document.getElementById("left");
var right = document.getElementById("right");
var nav = document.getElementById('navs').children;
var index = 1;//图片下标
nav[0].className = "active";//设置圆点初始状态

//轮播效果
timer = setInterval(next, 3000);
function carousel(obj, json, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            (function (attr) {
                var now = parseInt(getStyle(obj, attr));
                var dest = json[attr];
                var speed = (dest - now) / 6;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                obj.style[attr] = now + speed + "px";
                if (now != dest) {
                    flag = false;
                }
            })(attr);
        }
        if (flag) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}

function getStyle(obj, attr) { //得到的返回值带 px
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
}

//鼠标移入幻灯片显示图标
$('#box').mouseover(function(){
    clearInterval(timer);
    left.style.opacity="0.5";
	right.style.opacity="0.5";
})
//鼠标移出图标消失
$('#box').mouseout(function(){
    timer = setInterval(next,2000);
    left.style.opacity="0";
	right.style.opacity="0";
})

//切换幻灯片
var moving = false;
//切换上一张
left.onclick = last;
function last() {
	if (moving) { return; }
	moving = true;
	index--;
	navChange();
	carousel(slider, {
		left: -1200  * index
	}, function () {
		if (index == 0) {
			index = 6;
		}
		moving = false;
	});
}

//切换下一张
right.onclick = next;
function next() {
	if (moving) { return; }
	moving = true;
	index++;
	navChange();
	carousel(slider, {
		left: -1200 * index
	}, function () {
		if (index == 6) {
			slider.style.left = '-1200px';
			index = 1;
		}
		moving = false;
	});
}

//圆点样式自动切换
function navChange(){
    for(var i = 0; i < 5; i++){
        nav[i].className = " ";
    }
    if(index > 5){
        nav[0].className = "active";
    }else if(index <=0){
        nav[4].className = "active";
    }else{
        nav[index - 1].className = "active";
    }
}

//点击圆点切换
for(var i = 0; i < 5; i++){
    nav[i].index = i;
    nav[i].onclick = function(){
        index = this.index + 1;
        carousel(slider,{
            left:-1200 * index
        });
        navChange();
    }
}
