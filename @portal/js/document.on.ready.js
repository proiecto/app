/**
* @preserve ====================================================================
* Copyright 1997, 2021. Proiecto, C. A. Todos los derechos reservados.
* Proiecto, Proiecto BackOffice, Proiecto BackOffice Server, Proiecto Salomón
* y Proiecto Web Services, son marcas registradas de Proiecto, C. A.
* El eslogan: 'Plataforma de servicios en la nube', es marca registrada de
* Proiecto, C. A. Otros productos citados son marcas registradas de sus
* respectivos propietarios y/o fabricantes.
* Producto desarrollado por Edward Ocando con licencia para uso exclusivo de
* Proiecto, C. A. Para más información visite https://www.proiecto.net, ó 
* si lo desea, puede escribir a: 
* info@proiecto.net, ventas@proiecto.net ó soporte@proiecto.net
* ====================================================================
* THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* ====================================================================
*/
"use strict";

// ============================== orden de ejecución ============================== //
// 1 - Fin del HTML 
// 2 - jQuery -> $(document).on('ready', function() {...})
// 3 - document.addEventListener("DOMContentLoaded"...)
// 4 - window.addEventListener("load"...)
// 5 - window.onload = function() {...}
// ============================== orden de ejecución ============================== //

// ============================================================
// Después de cargar el DOM (antes de img y css)
// Este evento se activa cuando el el documento HTML inicial se ha cargado y analizado por completo, 
// sin esperar a que las hojas de estilo, las imágenes y los subtítulos finalicen la carga. 
// En esta etapa, se podría optimizar mediante programación la carga de imágenes y 
// css según el dispositivo del usuario o la velocidad de ancho de banda.
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
    // ...
});
// ============================================================

// ============================================================
// load: Un evento muy diferente, load , solo debe usarse para detectar una página completamente cargada. 
// es no intrusivo y es se considera más estándar.
// ============================================================
window.addEventListener("load", function() {
    // ...
});
// ============================================================


// ============================================================
// El evento beforeunload es disparado cuando la ventana, 
// el documento y sus recursos estan a punto de ser descargados. 
// El documento todavia es visible y el evento todavia es cancelable en este punto.
// Si es asignado un string a la propiedad del objeto Evento returnValue, 
// una caja de dialogo aparece, preguntando al usuario que confirme 
// que dejara la pagina.
// ============================================================
window.addEventListener("beforeunload", function(event) {
    // event.preventDefault();
    // return 'Texto de aviso';
});
// ============================================================


// ============================================================
// Detectar desconexion a la red
// ============================================================
//  window.addEventListener('online', () => console.log('online'));
//  window.addEventListener('offline', () => console.log('offline'));
// ============================================================
window.addEventListener("online", () => {
    // Set hasNetwork to online when they change to online.
    $sessionToken.accesoRed = true;
    alertaAccesoRedRecuperado();
});

window.addEventListener("offline", () => {
    // Set hasNetwork to offline when they change to offline.
    $sessionToken.accesoRed = false;
    alertaNoAccesoRed();
});
// ============================================================


// ====================================================================================================
// Funciones globales
// ====================================================================================================
// showWarning('Titulo', 'Texto...', 'success', true)
// openNav(url) - openNav() - closeNav()
// opendivUsuarioInfoContenedor() - closedivUsuarioInfoContenedor()
// preloader(true) - preloader(false) - preloader()
// topbar.show(); - topbar.hide();
// ====================================================================================================

// ============================== $(document).on('ready') ============================== //
// the following is a version of that with the  jQuery
// keyword instead of the  $ which produce the same results
// $(window).load() was deprecated in jQuery version 1.8 (and completely removed from jQuery 3.0) 
$(document).on('ready', function() {

    // ==================================================================
    // Cambiar imagen de fondo
    // ==================================================================
    var x0 = backGroundChange();
    // ==================================================================

    // ==================================================================
    // Eventos
    // ==================================================================
    // capturar boto derecho del mouse....
    window.oncontextmenu = function() {
        // return !1
    };

    // ==================================================================
    // Al llegar al final de la página...
    // ==================================================================
    $(window).on('scroll', function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {

        };
    });
    // ==================================================================

    // ============================================================
    // Close any open menu accordions when window is resized below 768px
    // ============================================================
    $(window).resize(function() {

         if($(window).width() < 850) {
            // Ocultar lo que no se desea ver por debajo de 850 pixeles
            // --> showWarning(alertTitle, alertText, styleColor, autoClose)
            showWarning(l('AVISO_IMPORTANTE'), l('USANDO_RESOLUCION_BAJA'), 'warning', true)
        };

    });
    // ============================================================

    // ============================================================
    // Capturar eventos de teclas especiales y eventos generales
    // ============================================================
    document.onkeydown = function(e) {
        e = e || window.event;
        if(e.code === 'F1') {
            e.preventDefault();
            console.log("F1 Down");
            // showHelp();
            return !1;
        }
    };
    document.onkeyup = function(e) {
        e = e || window.event;
        if(e.code === 'F1') {
            e.preventDefault();
            console.log("F1 Up");
            // showHelp();
            return !1;
        }
    };
    // ============================================================

    // ============================================================
    // Al pulsar opcion lenguaje
    // ============================================================
    var objCambiarLang = new ContextMenu("context-menu-items", menuCambiarLang, {
        openCallBack: function(contextMenu) {
            // console.log("On open callBack...");
        }
    });
    // ============================================================
});
// ============================== $(document).on('ready') ============================== //

// ==================================================================
// Cambiar imagen de fondo
// ==================================================================
function backGroundChange() {
    // Cambiar este rango según la cantidad de imágenes que existan
    var xNum = $BCL.randomNumber(1, 28);
    var imgName = '../assets/images/portalBackground/masthead' + xNum + '.jpg';
    // $('body').css('background-image', 'url(' + imgName + ')');
    $('.bgimg').css('background-image', 'url(' + imgName + ')');
    // --> url(../assets/images/portalBackground/masthead9.jpg)
    // ==================================================================   

    return true;
};
// ==================================================================


// ============================================================
// Al pulsar opcion lenguaje
// ============================================================
function menuCambiarLang(menu_item, parent) {
    // alert(menu_item.text());             // --> Español, English, ...
    // alert(menu_item.attr("data-lang"));  // --> es, en, ...
    $sessionToken.idiomaId = menu_item.attr("data-lang");
    lSet($sessionToken.idiomaId);
    var x0 = traduceDOM();
    // console.log("On close...");
};
// ============================================================




// ============================================================
// GDPR
// ============================================================
function setGDPR() {
    // var options = {};
    var options = {
        title: l('HTML_SOBRE_LAS_COOKIES'),
        message: l('HTML_INFORMACION_COOKIES'),
        delay: 5000,
        expires: 7, // days
        link: '/pages/legal/cluf.html',
        uncheckBoxes: true,
        acceptBtnLabel: l('ACEPTAR_CONTINUAR'),
        moreInfoLabel: l('MAS_INFORMACION'),
        advancedBtnLabel: l('CUSTOMIZAR_COOKIES'),
        cookieTypesTitle: l('SELECT_WHICH_COOKIES'),
        fixedCookieTypeLabel: 'Essential',
        fixedCookieTypeDesc: 'These are essential for the website to work correctly.',
        onAccept: function() {
            var gdprPreferences = $.fn.ihavecookies.cookie();
            // El arreglo contiene las opciones que se marcaron
            // ['preferences', 'analytics', 'marketing']
            gdprPreferences.forEach(function(index, gdpr) {
                if(gdprPreferences[gdpr] === 'preferences') {
                    $sessionToken.gdprPreferences = true;
                };
                if(gdprPreferences[gdpr] === 'analytics') {
                    $sessionToken.gdprAnalytics = true;
                };
                if(gdprPreferences[gdpr] === 'marketing') {
                    $sessionToken.gdprMarketing = true;
                };
            });
        }
    };

    $('body').ihavecookies(options);
    // Reset
    // $('body').ihavecookies(options, 'reinit');
};
// ============================================================
