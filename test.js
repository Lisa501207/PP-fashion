// Smooth background color interpolation on scroll
(function(){
    'use strict'

    var bottomBtn = document.querySelector('.btn[data-js="btn"]');
    var showThresholdPx = 100; // show when within 120px from bottom

    // Utilities
    function hexToRgb(hex){
        hex = hex.replace('#','');
        if(hex.length===3) hex = hex.split('').map(function(c){return c+c}).join('');
        var bigint = parseInt(hex,16);
        return [(bigint>>16)&255, (bigint>>8)&255, bigint&255];
    }

    function rgbToCss(rgb){
        return 'rgb(' + rgb.map(Math.round).join(',') + ')';
    }

    function lerp(a,b,t){ return a + (b - a) * t; }

    function lerpColor(c1,c2,t){
        return [lerp(c1[0],c2[0],t), lerp(c1[1],c2[1],t), lerp(c1[2],c2[2],t)];
    }

    // Gather sections and their positions
    var sections = Array.prototype.slice.call(document.querySelectorAll('main article[data-color]'))
        .map(function(el){
            return {
                el: el,
                colorHex: el.getAttribute('data-color') || '#000000',
                color: hexToRgb(el.getAttribute('data-color') || '#000000'),
                top: 0,
                height: 0
            };
        });

    function recalc(){
        sections.forEach(function(s){
            var r = s.el.getBoundingClientRect();
            // top relative to document
            s.top = s.el.offsetTop;
            s.height = s.el.offsetHeight;
        });
    }

    // initial calc
    recalc();

    var ticking = false;

    function onScroll(){
        if(!ticking){
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }

    function update(){
        var scrollY = window.scrollY || window.pageYOffset;
        // find current section index
        var idx = 0;
        for(var i=0;i<sections.length;i++){
            if(scrollY >= sections[i].top) idx = i;
        }

        var current = sections[idx];
        var next = sections[idx+1];

        var t = 0;
        if(next){
            var span = next.top - current.top;
            if(span > 0){
                t = clamp((scrollY - current.top) / span, 0, 1);
            }else{
                t = 0;
            }
        }

        var color = next ? lerpColor(current.color, next.color, t) : current.color;
        document.body.style.background = rgbToCss(color);

        // show button only near the bottom
        if(bottomBtn){
            var docH = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            );
            var atBottom = (scrollY + window.innerHeight) >= (docH - showThresholdPx);
            bottomBtn.classList.toggle('is-visible', atBottom);
        }

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', function(){
        // re-calc positions after resize
        recalc();
        onScroll();
    });

    // initial paint
    update();

})();

// http://shoptalkshow.com/episodes/134-marc-grabanski/#t=16:07

// vanilla JS
function toggleButton(el) {
  var body = document.body;
  var element = document.querySelector(el);
  element.addEventListener('mouseenter', function(e) {
    e.target.classList.add('active');
    body.classList.add('blur');
  }, false);
  element.addEventListener('mouseleave', function(e) {
    e.target.classList.remove('active');
    body.classList.remove('blur');
  }, false);
};

toggleButton('[data-js="btn"]');

// jQuery
/*
$('[data-js="btn"]').hover(function(){
  $(this).toggleClass('active');
  if ($(this).hasClass('active')) {
    $('body').addClass('blur');
  } else {
    $('body').removeClass('blur');
  }
});
*/