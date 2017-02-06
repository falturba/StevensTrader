
export function setDivXYScale(div, x, y){
    div.style.WebkitTransform = `translate3d( ${ x }px, ${ y}px, 0)`;
    div.style.MsTransform     = `scale(${ scale},${ scale})`; /* IE 9 */
    div.style.WebkitTransform = `scale(${ scale},${ scale})`; /* Safari */
    div.style.transform       = `scale(${ scale},${ scale}) translate3d( ${x}px, ${y}px, 0px)`;
}

export function setDivTransition(div, t=".3s", props="all"){
    div.style.WebkitTransition = props+" "+t;
    div.style.MozTransition    = props+" "+t;
    div.style.MsTransition     = props+" "+t;
    div.style.transition       = props+" "+t;
}
export function setDivAlpha(div){
    div.filter  = `alpha(opacity= ${alpha} )`; // IE 5-7,
    div.opacity = alpha         /* Modern Browsers */
}

export function getDivWith(div){
    return div.clientWidth;
}
export function getDivHeight(div){
    return div.clientHeight;
}
export function getDivXFromParent(div){
    return div.offsetLeft;
}
export function getDivYFromParent(div){
    return div.offsetTop;
}
export function getDivCenter(div){
    return {
        x:div.offsetLeft+( div.clientWidth/2),
        y:div.offsetTop +( div.clientHeight/2)
    };
}

export function getWindowPositionFromElement(div){
    var viewportOffset = div.getBoundingClientRect();
    var x = viewportOffset.left + ((window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft);
    var y = viewportOffset.top + ((window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop);
    return {x,y};
}
    