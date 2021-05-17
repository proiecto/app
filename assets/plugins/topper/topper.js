/**
 * @preserve ====================================================================================================
 * Copyright 2021. Proiecto, C. A. Todos los derechos reservados.
 * Proiecto y Proiecto BackOffice son marcas registradas de Proiecto, C. A.
 * El eslogan: Plataforma de servicios en la nube, es marca registrada de Proiecto, C. A.
 * Otros productos citados son marcas registradas de sus respectivos propietarios y/o fabricantes.
 * Producto desarrollado por Edward Ocando con licencia para uso exclusivo de Proiecto, C. A.
 * Para más información visite https://www.proiecto.net ó si lo desea escríbanos a: 
 * soporte@proiecto.net - info@proiecto.net - ventas@proiecto.net
 * ====================================================================================================
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================================================
 */
// "use strict";

if (!window.jQuery) {
    console.error('Topper requires jQuery in order to work.');
}


var title, content, duration, style;

function Topper(...args) {
    var a = args[0];

    title       = a.title;
    text        = a.text;
    duration    = a.duration;
    type        = a.type;
    style       = a.style;
    autoclose   = a.autoclose;
    autocloseMs = a.autocloseAfter;
    style       = a.style;

    TopperTop();
    /* 
        switch(type) {
            case 'top':
                TopperTop();
                break;
            default:
                console.error('^Topper: Unknown type "' + type + '"');
        };
    */
}

function TopperTop()
{
    // var notifid = 'tjs-' + fromPool();
    var notifid = 'tjs-' + Math.random().toString(36).substring(3);

    jQuery('<div/>', {
        class: 'topper topper-top topper-' + style,
        id: notifid
    }).appendTo('body');

    jQuery('<div/>', {
        class: 'topper-content'
    }).appendTo('#'+notifid);

    $('#' + notifid).slideDown();

    var prepTitle   = '<div class="topper-title">' + title + '</div>';
    var prepText    = '<div class="topper-text">' + text + '</div>';
    
    var prepClose   = '<div class="topper-close" data-target="' + notifid + '"><i class="fa fa-close"></i></div>';
    // var prepClose   = '<div class="topper-close" data-target="' + notifid + '">&times;</div>';

    $('#'+notifid+' .topper-content').append(prepTitle + prepText);
    $('#'+notifid).append(prepClose);

    if(autoclose == true)
    {
        setTimeout(function(){
            $('#'+notifid).fadeOut(500);
        }, autocloseMs);
    }
}

/*
function fromPool() {
    var str = "";
    var pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
    str += pool.charAt(Math.floor(Math.random() * pool.length));
    return str;
}
*/

// Close Topper
$(document).on('click', '.topper-close', function(){
    // $('#' + $(this).data('target')).hide();
    $('#' + $(this).data('target')).delay(300).fadeOut(100);;
});