
function addLoadEvent(func){
    var b = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function () {
            b();
            func();
        }
    }
}
function addclass(elment,claasName){
    if(!elment.className){
        elment.className = claasName;
    }else{
        var a = elment.className;
        a += " ";
        a += claasName;
        elment.className = a;
    }
}

function move(ID,x,y,time){
    var a=document.getElementById(ID);
    if(!a.style.top) a.style.top="0px";
    if(!a.style.left) a.style.left="0px";
    var ax=parseInt(a.style.left);
    var ay=parseInt(a.style.top);
    if(a.move) clearTimeout(a.move);
    if(ax<x) ax+=Math.ceil((x-ax)/10);
    if(ax>x) ax-=Math.ceil((ax-x)/10);
    if(ay<y) ay+=Math.ceil((y-ay)/10);
    if(ay>y) ay-=Math.ceil((ay-y)/10);
    a.style.left=ax+"px";
    a.style.top=ay+"px";
    a.move=setTimeout("move('"+ID+"',"+x+","+y+","+time+")",time);
}

function insertAfter(newElement,old){
    var parent=old.parentNode;
    if(parent.lastChild==old){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,old.nextSibling);
    }
}

function a(){
    if(!document.getElementById("ms")) return false;
    var links = document.getElementsByTagName("a");
    var ms = document.getElementById("ms");
    console.log(links.length);
    for(var i = 0;i<links.length;i++){
        links[i].onmouseover = function () {
           var href = this.getAttribute("href");
            //alert(href);
            if(href.indexOf("index.html") != -1)
                move("ms",0,0,20);
            if(href.indexOf("jiqiao.html") != -1)
                move("ms",-150,0,20);
            if(href.indexOf("jineng.html") != -1)
                move("ms",-300,0,20);
            if(href.indexOf("paihang.html") != -1)
                move("ms",-450,0,20);
            if(href.indexOf("lianxi.html") != -1)
                move("ms",-600,0,20);


        }
    }
    //return true;
}
function b(){
    var links = document.getElementsByTagName('a');
    var hide = document.getElementsByClassName("hide");
    for(var i = 0;i<links.length;i++){
        links[i].onclick = function () {
            var id = this.getAttribute("href").split("#")[1];
            for(var j = 0;j<hide.length;j++){
                if(id == hide[j].getAttribute("id")){
                    hide[j].style.display = "block";
                }else{
                    hide[j].style.display = "none";
                }
            }
        }
    }
}

function c(){
    if(!document.getElementsByTagName("tbody")) return false;
    if(!document.getElementById("paihang")) return false;
    var main = document.getElementById("paihang");
    var tb = document.getElementsByTagName("tbody")[0];
    var tr = tb.getElementsByTagName("tr");
    var span = tb.getElementsByTagName("span");
    console.log(span.length);
    for(var i = 0;i<tr.length;i++){
        if(i%2 != 0){
            addclass(tr[i],"even")
        }else{
            addclass(tr[i],"odd");
        }
    }
    var dl = document.createElement("dl");
    var p = document.createElement("h3");
    var p_text = document.createTextNode("名词解释");
    p.appendChild(p_text);
    main.appendChild(p)
    for(var j = 0;j<span.length;j++){
        var dd = document.createElement("dd");
        var dt = document.createElement("dt");
        var title = span[j].getAttribute("title");
        var text = span[j].lastChild.nodeValue;
        dd.innerHTML = text;
        dt.innerHTML = title;
        //dd.appendChild(text);
        //dt.appendChild(title);
        dl.appendChild(dd);
        dl.appendChild(dt);
    }
    main.appendChild(dl);

}


function g(){
    if(!document.getElementById("jineng")) return false;
    var jn = document.getElementById("jineng");
    var p = document.createElement("p");
    var img = document.createElement("img");
    var p_text = document.createTextNode("选择小技能图片");
    p.appendChild(p_text);
    jn.appendChild(p);
    //insertAfter()
    img.setAttribute("src","images/placeholder.gif");
    img.setAttribute("class","pic");
    jn.appendChild(img);
    var links = jn.getElementsByTagName("a");
    //console.log(links.length);
    for(var i = 0;i<links.length;i++){
        links[i].onclick = function(){
            var title =this.title;
            var href = this.href;
            p.textContent = title;
            img.setAttribute("src",href);
            return false;
        }
    }
}


function e(){
    $(".showMe").click(function(){
        $.ajax({
            type:"get",
            url:"data.json",
            dataType:"jsonp",
            success:function(dataB){
	            	    alert(dataB);
                $(".authorName").html(dataB.authorName);
                $(".head").attr("src",dataB.authorHead);
                $(".tel").html(dataB.tel);
                $(".major").html(dataB.major);
                $(".email").html(dataB.email);
                $(".qq").html(dataB.qq);

                $(".authorMs").show();
            }
        })
    })
}

function f(){
    var container = document.getElementsByClassName("container")[0];
    var name = document.getElementsByClassName("name")[0];
    var message = document.getElementsByClassName("message")[0];

    if(name.value && message.value){
        var comments = document.createElement("div");
        comments.className = "comments";
        var user = document.createElement("label");
        var mesageDiv = document.createElement("p");
        mesageDiv.textContent = message.value;
        user.innerHTML = name.value + "&nbsp; :";
        comments.appendChild(user);
        comments.appendChild(mesageDiv);
        container.appendChild(comments);
        var heght = mesageDiv.clientHeight;
        comments.style.height = heght + "px";

    }else{
        alert("请您留言");
    }
}
addLoadEvent(a);
addLoadEvent(b);
addLoadEvent(c);
addLoadEvent(g);
addLoadEvent(e);