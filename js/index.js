window.onload = function () {
    function crtE(Element) {
        return  document.createElement(Element);
    }

    var div = crtE('div');
    var divA=crtE('a');
    div.className = 'over';
    divA.className = 'divA';
    div.appendChild(divA);
    var oRight = document.getElementById('right');
    var ul = crtE('ul');
    ul.className = "ul";
    ul.appendChild(div);
    for (var i = 0; i < 12; i++) {
       // div.innerHTML=json[i].tittle;
        var li = crtE('li');
        var img = crtE('img');
        img.setAttribute('src', 'img/' + i + '.jpg');
        li.style.left = (i % 4) * 415 + 'px';
        li.style.top = Math.floor(i / 4) * 255 + 'px';
        li.setAttribute('value',i);
        li.appendChild(img);
        ul.appendChild(li);
        oRight.appendChild(ul);
    }
    var aLi = document.getElementsByTagName('li');
    var oDiv = document.getElementsByClassName('over')[0];
    var oDivA = document.getElementsByClassName('divA')[0];
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].onmouseover = function () {
            oDivA.innerHTML=json[this.value].tittle;
            oDiv.style.left = this.style.left;
            oDiv.style.top = this.style.top;
        }
    }
    var nav = document.getElementById('nav');
    for (var i = 0; i < json.length; i++) {
        var navLi = crtE('li');
        var span = crtE('span');
        var a = crtE('a');
        a.innerHTML = json[i].tittle;
        //a.href="mp3/"+json[i].src;
        navLi.setAttribute('value', i);
        navLi.className = "navLi";
        navLi.appendChild(a);
        navLi.appendChild(span);
        nav.appendChild(navLi);

        if (json[i].information && json[i].information.length > 0) {
            var secUl = crtE('ul');
            secUl.className = "secUl";
            for (var j = 0; j < json[i].information.length; j++) {
                var secLi = crtE('li');
                var secSpan = crtE('span');
                var secA = crtE('a');
                secLi.className = 'secLi';
                secA.innerHTML = json[i].information[j].secTittle;
                secLi.appendChild(secA);
                secLi.appendChild(secSpan);
                secUl.appendChild(secLi);
            }
            navLi.appendChild(secUl);
        }
    }

    function setMove(obj, opacity, width) {
        obj.childNodes[0].style.opacity = opacity;
        obj.childNodes[1].style.width = width + 'px';
        if (obj.childNodes[2]) {
            obj.childNodes[2].style.width = width + "px";
        }
    }

    var aNav = document.getElementsByClassName('navLi');
    var lastLi;
    var timer;
    for (var i = 0; i < aNav.length; i++) {
        aNav[i].onmouseover = function () {
            clearTimeout(timer)
            if (lastLi && lastLi != this) {
                setMove(lastLi,0.5,0);
                /*lastLi.childNodes[0].style.opacity = 0.5;
                lastLi.childNodes[1].style.width = 0;
                if (lastLi.childNodes[2]) {
                    lastLi.childNodes[2].style.width = 0;
                }*/
            }
            setMove(this,1,210);
            /*this.childNodes[0].style.opacity = 1;
            this.childNodes[1].style.width = "210px";
            if (this.childNodes[2]) {
                this.childNodes[2].style.width = "210px";
            }*/
            lastLi = this;
        }
        aNav[i].onmouseout = function () {

            timer = setTimeout(function () {
                setMove(lastLi,0.5,0);
                /*lastLi.childNodes[0].style.opacity = 0.5;
                lastLi.childNodes[1].style.width = 0;
                if (lastLi.childNodes[2]) {
                    lastLi.childNodes[2].style.width = 0;
                }*/
            }, 300)

        }
    }

    var aSecLi = document.getElementsByClassName("secLi");
    for (var i = 0; i < aSecLi.length; i++) {
        aSecLi[i].onmouseover = function () {
            clearTimeout(timer)
            setMove(this,1,210);
            /*this.childNodes[0].style.opacity = 1;
            this.childNodes[1].style.width = "210px";*/
        }
        aSecLi[i].onmouseout = function () {
            setMove(this,0.5,0);
            /*this.childNodes[0].style.opacity = 0.5;
            this.childNodes[1].style.width = 0;*/
        }
    }
    var audio = document.getElementById('Player');
    for (var i = 0; i < aNav.length; i++) {
        aNav[i].onclick = function () {
            audio.pause();
            audio.src = "mp3/" + json[this.value].src;
            audio.play();
        }
    }
}
