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
window.addEventListener("beforeunload", function (event) {
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

// ============================================================
// Funciones globales
// ============================================================
// showWarning('Titulo', 'Texto...', 'success', true)
// showWarning(title, text, colorWarning, isFixed)
// openNav(url) - openNav() - closeNav()
// opendivUsuarioInfoContenedor() - closedivUsuarioInfoContenedor()
// preloader(true) - preloader(false) - preloader()
// topbar.show(); - topbar.hide();
// ============================================================

// ============================================================
// Fade-out between pages
// ============================================================
// $('body').delay(500).fadeOut(1000, function() {}) // Ocultar
// $('body').delay(500).fadeIn(1000, function() {}) // Mostrar
// ============================================================


// ============================== $(document).on('ready') ============================== //
// the following is a version of that with the  jQuery
// keyword instead of the  $ which produce the same results
// $(window).load() was deprecated in jQuery version 1.8 (and completely removed from jQuery 3.0) 
$(document).on('ready', function() {

    // ==================================================================
    // Eventos
    // ==================================================================
    // capturar boto derecho del mouse....
    window.oncontextmenu = function() {
        // return !1
    };

    // ============================================================
    // Navigator events
    // ============================================================
    //  $(window).on("scroll", function() { });
    //  $('body').on('mouseleave', function() { });
    //  $('body').on('mouseenter', function() { });
    // ============================================================

    // ============================================================
    // Show Help
    // ============================================================
    // $(document.body).on('keydown', this, function(event) {
    // Detectar teclas pulsadas
    // alert(event.keyCode);
    // if (e.which == 116 || e.which == 17)  CTRl+F5
    //  Fx keys are keyCodes 112 - 123        
    // if(event.keyCode == 116) { ;} // F5
    //    if (event.keyCode == 112) { showHelp(); } // F1
    // });
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
            // Ocultar lo que no se desea ver por debajo de 760 pixeles
            // --> showWarning(alertTitle, alertText, styleColor, autoClose)
            showWarning(l('AVISO_IMPORTANTE'), l('USANDO_RESOLUCION_BAJA'), 'warning', true)
        };
        
        // ============================================================
        // Ajustar sideNav si esta activo
        // ============================================================
        if($alertaContenedorFlotante) {
            var xW = Math.trunc(window.innerWidth * 0.75) + "px";
            document.getElementById("contenedorFlotante").style.width = xW;
            document.getElementById("contenedorFlotanteContenido").style.width = xW;
        }
    });
    // ============================================================


    // ==================================================================    
    // Cargar Dashboard principal
    // ==================================================================
    var x0 = loadDashboard();
    // ==================================================================        

    // ==================================================================        
    // Cargar pie de página
    // ==================================================================        
    $('#mainPageFooter').load('/pages/footer.html', function() {
        // callBack
    });
    // ==================================================================        

    // ============================================================
    // Mostrar nombre del servicio activo
    // ============================================================
    document.getElementById("spanNombreServicio").innerHTML = "Asi me llamo yo"; // $sessionToken.servicioSeleccionado

});
// ============================== $(document).on('ready') ============================== //


  function startTime() {


     var today = new Date();
     var hr = today.getHours();
     var min = today.getMinutes();
     var sec = today.getSeconds();

     // Add a zero in front of numbers<10
     hr = checkTime(hr);
     min = checkTime(min);
     sec = checkTime(sec);

     document.getElementById("horaentrada").innerHTML = hr + ":" + min + ":" + sec;


     var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
     var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
     var curWeekDay = days[today.getDay()];
     var curDay = today.getDate();
     var curMonth = months[today.getMonth()];
     var curYear = today.getFullYear();
     var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
     
     document.getElementById("date").innerHTML = date;

     var time = setTimeout(function(){ startTime() }, 200);
 }

 // Add a zero in front of numbers<10
 function checkTime(i) {
     if (i < 10) {
         i = "0" + i;
     }
     return i;
 }

 

function loadDashboard(){
    // =============================================================
    if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); return; }
    // =============================================================

    $('#mainContent').load('/pages/tablero/index.html', function() {
        // menu
        $(".hs-menubar").hsMenu();

        return true;
    });
};

// ============================================================
// Cargar contenido en #content
// loadContent("/pages/#/dashboard/index.html", false);
// ============================================================
// $BCL.getUrlQueryVariable(...)

function loadContent(contextUrl, showProgress) {

    // =============================================================
    if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); return; }
    // =============================================================

    if(showProgress) {
        topbar.show(); // topbar.hide();
    };

    // =============================================================
    // Carga normal de la pagina sin parametros
    // =============================================================
    /// $BCL.getUrlQueryVariable("q") === false
    if(!typeof $BCL.getUrlQueryVariable("q")) {
        // Si no se ha recibido un parametro por la url....
        // se carga el dashboard por defecto que incluye 
        // el motor de busqueda, dahsboard, resumen del usuario, email, etc.
        // --> /pages/#/dashboard       
        $("#mainContent").load(contextUrl, function(data, status, jqXGR) {
            // console.info('Data Loaded...');
            // console.info(status); // success
            // console.dir(jqXGR);   // jqXGR.statusText -> "OK" , jqXGR.status -> 200
        });
    } else {

        // =============================================================
        // ToDo
        // =============================================================

        // =============================================================
        // Cargar algun componente segun los parametros recibidos
        // =============================================================

        // http://portal.proiecto.net/?q=1&data=BC614E

        // identifica la accion o paginas o componente a ejecutar
        let q = $BCL.getUrlQueryVariable("q");

        // identifica el valor que se usará en la acción elegida
        // =============================================================
        // Podria ser un base64:
        //   From String to Base-64
        //      var obj = {a: 'a', b: 'b'};
        //      var encoded = btoa(JSON.stringify(obj))
        //   To decode back to actual
        //      var actual = JSON.parse(atob(encoded))
        //
        // When converting object to base64 I was getting out of latin range issues and character invalid error.
        //      var bytes = base64.encode(utf8.encode(JSON.stringify(getOverviewComments())));

        // =============================================================


        let data = $BCL.getUrlQueryVariable("data");

        // ============================================================
        // ToDo: Analizar el parametro recibido y hacer algo segun
        // los parametros q & oq usando switch (){};
        // ============================================================
        console.log("http://portal.proiecto.net/?q=" + q + "&data=" + data);
        var url = "/@/erp/index.html"; // se define segun el valor de q
        $("#mainContent").load(url, function(responseData, status, jqXGR) {

            $.confirm({
                icon: 'fa fa-warning',
                columnClass: 'medium',
                type: 'red',
                typeAnimated: true,
                animation: 'scale',
                closeIcon: true,
                closeIconClass: 'fa fa-close',
                theme: 'material',
                dragWindowGap: 100,
                title: 'http://portal.proiecto.net/?q=' + q + '&o=' + o
            });

        });
    }
};





// ============================================================
// Salir de la aplicación
// ============================================================
function exitApp() {

    // =============================================================
    if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); }
    // =============================================================

    $.confirm({
        title: l('SALIR'),
        icon: 'fa fa-warning',
        type: 'red',
        content: l('ESTO_CIERRA_LA_APLICACION'),
        dragWindowGap: 100,
        contentLoaded: function(data, status, xhr) {},
        onContentReady: function() {},
        onOpenBefore: function() {},
        onOpen: function() {},
        onClose: function() {},
        onDestroy: function() {},
        onAction: function() {},
        buttons: {
            ok: {
                text: 'Te vas!', // With spaces and symbols
                // btnClass: 'btn-blue',
                // btnClass: 'btn-red',
                // btnClass: 'btn-red any-other-class',
                // btnClass: 'btn-warning',
                // isHidden: true, // hide the button
                // keys: ['y'], // tecla asociada al boton
                action: function() {

                    // ============================================================
                    // $(selector).fadeOut(speed,easing,callback)
                    // $(selector).fadeOut(1200,'swing',callback)
                    // $(selector).fadeOut(function () {
                    // code
                    // });
                    // speed = milliseconds, 'slow' & 'fast'
                    $("html").fadeOut(1200); // Oculta
                    // $("html").fadeIn('slow'); // Mostrar
                    // ============================================================
                    $BCL.clearCache(false);
                    clearInterval(intervalID);
                    window.location.replace('/@portal/logout/');

                    // Simulate a mouse click: // HTTP redirect
                    // window.location.href = "/@portal/logout/";

                    // Simulate an HTTP redirect:
                    // window.location.replace("/@portal/logout/");
                }
            },
            cancel: {
                text: 'Te quedas!', // With spaces and symbols
                action: function() {
                    $.alert('Estas cancelado');
                }
            }
        }
    });
};
// ============================================================

/*
$('#newContent').load('/foo.html', function(html) {

});
*/



// Vaciar antes ed llenar
// $('#cmsFooter').empty().append(data);


/*
$.preloadImages = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
}
$.preloadImages("hoverimage1.jpg","hoverimage2.jpg");
*/

