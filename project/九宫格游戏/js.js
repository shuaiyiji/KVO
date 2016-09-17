/**
 * Created by jishuaiyi on 16/8/6.
 */

$(document).ready(function () {
    change();
});
var SUCCESS = [1,2,3,4,5,6,7,8,0];
var emptyPosition; // 空格的位置
var randomPosition = [];
var step = 0;
function change(){
    var index = parseInt(Math.random()*9)+1;
    $('.block,.answer').css('background-image','url(img/bg_'+index+'.jpg)');
    randomPlace();
    //return 1;

}

function randomPlace(){
        console.log(this);
    //$('.step').html(step);
    var arr = $.extend([],SUCCESS);
    for(var x, j,i = arr.length;i;j = parseInt(Math.random()*i),x = arr[--i],arr[i] = arr[j],arr[j] = x);
    console.log(arr)
    randomPosition = arr;
    console.log(arr)
    for(var i in arr){
        if(arr[i] == 0){
            //console.log(i);
            emptyPosition = parseInt(i);
        }
        console.log(arr[i]);
        $("#main>div").eq(arr[i]).attr('data-index',i).css({
            left : 100*(i%3),
            top : 100*(Math.floor(i/3))
        })
    }
}
//更新空位置
function upDataPosition(p1){

    emptyPosition = p1;
    step = step + 1;
    var tmp = [];
    var end = ['8','0','1','2','3','4','5','6','7'];
    $('#main>div').each(function () {
        tmp.push($(this).attr('data-index'));
    })
    if(tmp.toString() == end.toString()){
        $('#success').show();
    }
    $('.step').html(step);
}

function left(){
    if(emptyPosition%3<2){
        var currentIndex = parseInt(emptyPosition)+1;
        $('#main>div[data-index=' + currentIndex + ']').animate({
            left :'-=100px'
        },100, function () {
            $(this).attr('data-index',currentIndex-1);
        });

        $('#main>div[data-index='+emptyPosition+']').animate({
            left  :'+=100px'
        },100, function () {
            $(this).attr('data-index',currentIndex);
            upDataPosition(currentIndex);
        })

    }

}
function right(){
    if(emptyPosition%3>0){
        var currentIndex = parseInt(emptyPosition)-1;
        $('#main>div[data-index=' + currentIndex + ']').animate({
            left :'+=100px'
        },100, function () {
            $(this).attr('data-index',currentIndex+1);
        });

        $('#main>div[data-index='+emptyPosition+']').animate({
            left  :'-=100px'
        },100, function () {
            $(this).attr('data-index',currentIndex);
            upDataPosition(currentIndex);
        })
    }
}

function up(){
    if(emptyPosition<6){
        var currentIndex = parseInt(emptyPosition)+3;
        $('#main>div[data-index='+currentIndex+']').animate({
            top : '-=100px'
        },100,function(){
            $(this).attr('data-index',currentIndex-3);
        })
        $('#main>div[data-index='+emptyPosition+']').animate({
            top : '+=100px'
        },100, function () {
            $(this).attr('data-index',currentIndex);
            upDataPosition(currentIndex);
         })

    }
}
function down(){
    if(emptyPosition > 2){
        var currentIndex = parseInt(emptyPosition)-3;
        $('#main>div[data-index='+currentIndex+']').animate({
            top : '+=100px'
        },100,function(){
            $(this).attr('data-index',currentIndex+3);
        })
        $('#main>div[data-index='+emptyPosition+']').animate({
            top : '-=100px'
        },100, function () {
            $(this).attr('data-index',currentIndex);
            upDataPosition(currentIndex);
        })
    }
}
$(document).ready(function () {
    change();
}).on('keypress', function (e) {
    console.log(e.keyCode)
    switch (e.keyCode){
        case 97:
            console.log(6666);
            left();
            break;
        case 100:
            right();
            break;
        case 119:
            up();
            break;
        case 115:
            down();
            break;
    }
}).on('click','#showAnswer', function () {
    $('.answer').toggle()
}).on('click','#showNum', function () {
    $('#main>div>span').toggle()
}).on('click','.reset', function () {
    randomPlace();
    $('#success').hide()
}).on('click','#change', function () {
    change()
});

touch.on(document,'swipeleft',left);
touch.on(document,'swiperight',right);
touch.on(document,'swipeup',up);
touch.on(document,'swipedown',down);

