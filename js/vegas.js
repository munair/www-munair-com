function debounce(func,wait,immediate){'use strict';var timeout;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate){func.apply(context,args);}};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow){func.apply(context,args);}};}
$(function(){'use strict';FastClick.attach(document.body);var $slideContainer=$('.slide-container'),$pageContainer=$('.work-container'),$pageNavigation=$('.work-pagination'),totalSlides=$('.slide').length,totalWorks=$('.work').length,totalPages=totalWorks,slide=1,page=1,threshold=25,allowedTime=1000,restraint=50,startX,startY,distX,distY,elapsedTime,startTime;var animationEnd='webkitAnimationEnd oanimationend msAnimationEnd animationend',transitionEnd='webkitTransitionEnd otransitionend msTransitionEnd transitionend';var angle={'contributions':0,'awards':0},face={'contributions':0,'awards':0};function rotateCube(type){angle[type]+=90;face[type]++;if(face[type]>=4){face[type]=0;}
$('.'+ type+' div').set('.active','remove').eq(face[type]).set('.active');$('.'+ type).set(':transform','rotateX('+ angle[type]+'deg)');setTimeout(function(){rotateCube(type);},Math.random()*(2000- 1000)+ 1000);}
rotateCube('contributions');rotateCube('awards');function gotoSlide(idx){slide=idx;$slideContainer.set(':transform','translateY('+((slide- 1)*-100)+'vh)').find('.slide').set('.active','remove').eq(slide- 1).set('.active');$('.social').on(transitionEnd,function(){if(slide===1&&!sessionStorage.getItem('swipe1')){$('.touch .slide-swipe').set('.vertical');$('.slide-swipe .icon').on(animationEnd,function(){$('.slide-swipe').set('.vertical','remove');});sessionStorage.setItem('swipe1',true);}});if(slide===2&&!sessionStorage.getItem('swipe2',true)){$('.touch .slide-swipe').set('.horizontal');$('.slide-swipe .icon').on(animationEnd,function(){$('.slide-swipe').set('.horizontal','remove');});sessionStorage.setItem('swipe2',true);}else{$('.slide-swipe').set('.vertical','remove').set('.horizontal','remove');}
if(slide===3){$('.footer').set('.animated');}}
function nextSlide(){if(slide>=totalSlides){return;}
gotoSlide(++slide);}
function previousSlide(){if(slide<=1){return;}
gotoSlide(--slide);}
function gotoPage(idx){page=idx;var width=$('.work').width();$pageContainer.set(':transform','translateX('+((page- 1)*-width)+'px)').find('.work').set('.active','remove').eq(page- 1).set('.active');updatePageNavigation();}
function nextPage(){if(slide!==2||page>=totalPages){return;}
gotoPage(++page);}
function previousPage(){if(slide!==2||page<=1){return;}
gotoPage(--page);}
function changePage(e){window.scrollTo(0,0);if(e.keyCode===38||e.keyCode===33){e.preventDefault();previousSlide();}
if(e.keyCode===40||e.keyCode===34||e.keyCode===32){e.preventDefault();nextSlide();}
if(e.keyCode===37){e.preventDefault();previousPage();}
if(e.keyCode===39){e.preventDefault();nextPage();}
if(e.type==='mousewheel'){e.preventDefault();if(e.wheelDelta>=0){previousSlide();}else{nextSlide();}}}
function touchstart(e){var touchobj=e.changedTouches[0];distX=0;distY=0;startX=touchobj.pageX;startY=touchobj.pageY;startTime=new Date().getTime();}
function touchmove(e){e.preventDefault();}
function touchend(e){var touchobj=e.changedTouches[0],dir;distX=touchobj.pageX- startX;distY=touchobj.pageY- startY;elapsedTime=new Date().getTime()- startTime;if(elapsedTime<=allowedTime){if(Math.abs(distX)>=threshold&&Math.abs(distY)<=restraint){dir=(distX<0)?'left':'right';}else if(Math.abs(distY)>=threshold&&Math.abs(distX)<=restraint){dir=(distY>0)?'up':'down';}}
swipe(e,dir);}
function swipe(e,dir){if(dir==='up'){previousSlide();}
if(dir==='down'){nextSlide();}
if(dir==='left'){nextPage();}
if(dir==='right'){previousPage();}}
function updatePageNavigation(){$pageNavigation.find('a').set('.active','remove').eq(page- 1).set('.active');$('.work-previous').set('.disabled','remove');if(page===1){$('.work-previous').set('.disabled');}
$('.work-next').set('.disabled','remove');if(page===totalPages){$('.work-next').set('.disabled');}}
function orientation(){if(window.orientation%180!==0){$('.touch .slide-swipe').set('.orientation');}else{$('.touch .slide-swipe').set('.orientation','remove');}}
function initWorks(){var x,link;totalPages=Math.ceil(totalWorks/($(window).width()/ $('.work').width()));
$pageContainer.set(':width',(totalPages*100)+'vw');$pageNavigation[0].innerHTML='';if(totalPages<=1){return;}
for(x=0;x<totalPages;x++){link=$('<a href="#" />').on('click',function(e){e.preventDefault();gotoPage($pageNavigation.find('a').index(this)+ 1);});$pageNavigation.append(link);}
if(page>totalPages){page=totalPages;gotoPage(page);}
updatePageNavigation();}
initWorks();gotoSlide(slide);gotoPage(page);if('ontouchstart'in window||'onmsgesturechange'in window){$('html').set('.touch');}else{$('html').set('.no-touch');}
$($('.header-bio p')[0].childNodes).each(function(){if(this.nodeType===3){$(this).wrap('<span></span>');}});$($('.footer p')[0].childNodes).each(function(){if(this.nodeType===3){$(this).wrap('<span></span>');}});$('.social-email a').set('@href',function(){return'mailto:'+ $(this).get('@href').replace('[at]','@').replace('[dot]','.');});$('.header-scroll').on('click',function(e){e.preventDefault();gotoSlide(2);});$('.work-previous').on('click',function(e){previousPage();e.preventDefault();});$('.work-next').on('click',function(e){nextPage();e.preventDefault();});setTimeout(function(){$('.header').set('.animated');},10);$(window).on('scroll',debounce(changePage,50,true)).on('mousewheel',debounce(changePage,50,true)).on('keydown',debounce(changePage,50,true)).on('resize',debounce(initWorks,250)).on('touchstart',touchstart).on('touchmove',touchmove).on('touchend',touchend).on('orientationchange',orientation).trigger('orientationchange');});
