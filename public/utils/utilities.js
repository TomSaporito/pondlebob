/**
 * Created by nutravel on 2/6/18.
 * @author Tom Saporito
 */


/**
 * @constant {array} pfx
 * */
const pfx = ["webkit", "moz", "MS", "o", ""];//prefixes for browser support for animation events

/**
 * @func addPrefixedEvent
 * @desc add animation event listeners with proper vendor prefixes
 *
 * @param element    {DOM Element}     -   |required| the DOM element to attach/remove listener to/from;
 * @param type       {String}          -   |required| the event type to listen for;
 * @param callback   {Function}        -   |required| the handler function for when the event happens;
 * */
function addPrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {//loop through prefixes

        element.addEventListener(type, callback, false);//add that event listener to the specified element
    }
}

/**
 *@func removePrefixedEvent
 * @desc utility for removing event listener to animation;
 *
 * @param element    {DOM Element}     -   |required| the DOM element to attach/remove listener to/from;
 * @param type       {String}          -   |required| the event type to listen for;
 * @param callback   {Function}        -   |required| the handler function for when the event happens;
 */
function removePrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {//loop through prefixes
        element.removeEventListener(type, callback);//remove that event listener from the specified element
    }
}


/**
 * @func lazyImg
 * @desc lazy-load images
 *
 * @param $el        {jQuery Object}   -   |required| the container to search for elements with [data-lazy-img] attribute;
 * @param exactEl    {Boolean}        -   |optional| is the $el param the exact el to transform into an image?
 * @param cb         {Function}        -   |optional| callback function to fire when the image tag has been placed into DOM;
 * */
function lazyImg($el, exactEl, cb){
    var _$el = exactEl? $el : $el.find('[data-lazy-img]');//if this is not the exact element then find those elements
    _$el.each(function(){
        var src = $(this).data('lazy-img');
        var alt = $(this).data('alt');
        var style = $(this).data('style');

        $(this).replaceWith(`<img src="${src}" alt="${alt}" style="${style}"/>`);
    });

    cb? cb() : null;
}




/**
 * @func lazyStyles
 * @desc dynamically load stylesheets
 *
 * @param $el        {jQuery object}   -   |required| the area of the DOM to search for stylesheets to lazy load;
 * @param exactEl    {Boolean}         -   |optional| is the $el param the exact JQuery Object to target;
 * @param position   {String}         -   |optional| defaults to 'beforeend', but accepts InsertAdjacentHTML positions;
 * @param cb         {Function}        -   |optional| callback function to fire after the stylesheet was added;
 *
 * */
function lazyStyles($el, exactEl, position, cb) {

    var _$el = exactEl? $el : $el.find('[data-lazy-styles]');

    _$el.each(function(){
        var src = $(this).data('href');
        if (document.createStyleSheet){
            document.createStyleSheet(src);
        }
        else {
            document.head.insertAdjacentHTML((position? position : 'beforeend'),`<link rel='stylesheet' type='text/css' media='screen' href='${src}' />`);
        }
    });

    cb? cb() : null;


}


/**
 * @func lazyScript
 * @desc lazy loads a script
 *
 * @param $el        {jQuery object}   -   |required| the area of the DOM to search for script to lazy load;
 * @param exactEl    {Boolean}         -   |optional| is the $el param the exact JQuery Object to target;
 * @param cb         {Function}        -   |optional| callback function to fire after the script was added;
 * */
function lazyScript($el, exactEl, cb){
    var $scripts = exactEl? $el : $el.find('[data-lazy-script]');

    $scripts.each(function(){
        var src    = $(this).data('lazy-script');


        $(this).replaceWith(`<script src="${src}"></script>`);
    });

    cb? cb() : null;
}



export {


    removePrefixedEvent,
    addPrefixedEvent,
    lazyImg,
    lazyStyles,
    lazyScript


}