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

// ============================== window.onload ============================== //
// Colocar aqui funciones que se ejecutan al cargar y despues 
// de mostrar el DOOM completo y que no afecten al UI
// NOTA: NO es equivalemnte al $(document).on.ready(function()...)
// ============================== window.onload ============================== //
window.onload = function() {
	"use strict";
    
    // ============================================================
    // Ultimas funciones que se debe ejecutar en --> window.on.load.js
    // ============================================================
    // topbar.hide(); // Sólo para procesos en background
    var $traduceDOM = traduceDOM();

    // <span class='fontProiecto' data-translate="PROIECTO">[PROIECTO]</span>
    // $(".fontProiecto").show("slow", function() {});

    // Mostrar las areas ocultas por defecto 
    // con la clase --> class='preTranslate'
    $(".preTranslate").show("slow", function() {});
    preloader(false);
    consoleCopyright();
    // ============================================================

    // ============================================================
    // Mostrar o no mensaje de GDPR
    // ============================================================
    setGDPR();
    // ============================================================
    	
};
// ============================== window.onload ============================== //


// ============================================================
// GDPR
// ============================================================
function setGDPR() {
    // var options = {};
    var options = {
        title: l('HTML_SOBRE_LAS_COOKIES'),
        message: l('HTML_INFORMACION_COOKIES'),
        delay: 7000,
        expires: 7,
        link: 'https://www.intel.la/content/www/xl/es/privacy/intel-cookie-notice.html',
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

    // Conocer opciones activas
    if($.fn.ihavecookies.preference('preferences') === true) {};
    if($.fn.ihavecookies.preference('analytics') === true) {};
    if($.fn.ihavecookies.preference('marketing') === true) {};
};
// ============================================================


