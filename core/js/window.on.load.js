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

/*
document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    loadWindowSettings();
    loadWindowEvents();
    loadMenu();
    loadTabs();
    izotope();
    popup();
});
*/

// ============================== window.onload ============================== //
// Colocar aqui funciones que se ejecutan al cargar y despues 
// de mostrar el DOOM completo y que no afecten al UI
// NOTA: NO es equivalemnte al $(document).on.ready(function()...)
// ============================== window.onload ============================== //
window.onload = function() {
    "use strict";

    // ============================================================
    // Cargar contenido principal...
    // ============================================================
    loadContent("/@/dashboard/index.html", false);
    // http://portal.proiecto.net/@/dashboard/index.html
    // ============================================================

    $("#contenedorPrincipal").delay(700).fadeIn(1500);

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
};
// ============================== window.onload ============================== //
