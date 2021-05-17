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

// ====================================================================================================
// Después de cargar el DOM (antes de img y css)
// Este evento se activa cuando el el documento HTML inicial se ha cargado y analizado por completo, 
// sin esperar a que las hojas de estilo, las imágenes y los subtítulos finalicen la carga. 
// En esta etapa, se podría optimizar mediante programación la carga de imágenes y 
// css según el dispositivo del usuario o la velocidad de ancho de banda.
document.addEventListener("DOMContentLoaded", function() {
	// ...
});
// ====================================================================================================

// ====================================================================================================
// load: Un evento muy diferente, load , solo debe usarse para detectar una página completamente cargada. 
// es no intrusivo y es se considera más estándar .
window.addEventListener("load", function() {
	// Gestion del formulario
	document.getElementById('formSignin').addEventListener("submit", function(e) {
		e.preventDefault();
		var x0 = formSigninSubmit();
	});
});
// ====================================================================================================


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
	// Eventos
	// capturar boton derecho del mouse....
	window.oncontextmenu = function() {
		// return !1
	};

	// ==================================================================
	// Mostrar u ocultar reconocimiento facial, etc.
	// ==================================================================
	if($appConfig.usarAutenticacionSegura) {
		$BCL.showElement('btnReconocimientoFacial');
	};
	// ==================================================================

	// ==================================================================
	// Obtener el logo (imagen web) correspondiente al CLUFS actual
	// http://salomon.proiecto.cloud:1117/proiecto/logoClufs/?url=banesco
	// 	--> "SELECT MEMORY_STREAM FROM [dbo].[BLOB] WHERE CLUFS_FK = @CLUFS_FK"
	// $sessionToken.empresaAlias = $BCL.getUrlSubDomain();
	// $sessionToken.empresaAlias = "demo", "banesco", "dell", "amazon", etc.
	// ==================================================================
	var xUrl = $appConfig.salomonWebServicesUrl + 'proiecto/logoClufs/?url=' + $sessionToken.empresaAlias;
	$("#imgCompanyLogo").attr("src", xUrl);
	// ==================================================================

	// ==================================================================		
	// Año actual en pie de página
	$('#spanAnoActual').html(new Date().getFullYear());

	// Link de enlace para crear cuenta Proiecto
	document.getElementById("linkCreateAccount").href = $appConfig.linkCreacionCuenta;
	// ============================================================

	// ============================================================
	// Capturar eventos de teclas especiales y eventos generales
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
	// Close any open menu accordions when window is resized below 768px
	// ============================================================
	$(window).resize(function() {

         if($(window).width() < 850) {
            // Ocultar lo que no se desea ver por debajo de 760 pixeles
            // --> showWarning(alertTitle, alertText, styleColor, autoClose)
            showWarning(l('AVISO_IMPORTANTE'), l('USANDO_RESOLUCION_BAJA'), 'warning', true)
        };

	});
	// ============================================================

	// ============================================================
	if($BCL.getUrlQueryVariable("serviceId") === false) {
		// ============================================================
		// Si no se recibe parámetro
		// ============================================================
		$.when(
			cargarImagenFondo(),
			cargarServicios()
		).then(function() {
			mostrarNombreEmpresaServicio(); // Everything was completed
		}).done(function() {
			$sessionToken.numeroDeServiciosEnCluf = numeroDeServiciosEnCluf(); // Everything was OK!
		}).fail(function(jqXHR, textStatus, errorThrown) {
			var xResult = jQueryAjaxAvisoError('Ajax response fail: ' + textStatus);
		});
		// ============================================================
	} else {
		// ============================================================
		// Cargar servicio por defecto, si el alias del mismo se pasa 
		// por parámetro
		// 	http://demo.proiecto.net/@portal/signin/?serviceAlias=erp
		// 	http://demo.proiecto.net/@portal/signin/?serviceAlias=contab
		// 	http://demo.proiecto.net/@portal/signin/?serviceAlias=inventory
		// 	http://demo.proiecto.net/@portal/signin/?serviceAlias=crm
		// ============================================================
		cargarServicioPorUrl($BCL.getUrlQueryVariable("serviceAlias"));
	};

});
// ============================== $(document).on('ready') ============================== //

// ============================================================
function cargarServicios() {
	// ============================================================
	// Obtener Servicios asociados a la empresa (CLUFS) activa
	// Empresa activa --> $sessionToken.empresaAlias -> 'demo'
	// ============================================================

	// =============================================================
	// Código frecuente con interacción del usuario...
	// =============================================================
	$sessionToken.ultimaVerificacionToken = new Date();
	$sessionToken.empresaAlias = $BCL.getUrlSubDomain();
	if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); return false; }
	
	// =============================================================

	// =============================================================
	// Obtener un JSON con los servicios asociados al CLUFS actual
	// incluyendo su descripción en todos los idiomas soportados
	// =============================================================
	var $url = $appConfig.salomonWebServicesUrl + "proiecto/servicesClufs/?url=" + $sessionToken.empresaAlias;
	// http://salomon.proiecto.cloud:1117/proiecto/servicesClufs/?url=demo
	//	--> SELECT * FROM dbo.VISTA_CLUFS_SERVICIOS WHERE URL_ALIAS = @URL_ALIAS
	return $.ajax({
		headers: { 'Access-Control-Allow-Origin': '*' },
		method: "GET", // "POST", "GET", "PUT" (default: 'GET')
		url: $url,
		contentType: "application/json; charset=utf-8", // "application/javascript"
		dataType: 'json',
		data: {},
		crossDomain: true,
		timeout: $appConfig.ajaxCallTimeOut,
		cache: false,
		async: false, // default: true IMPORTANT!
		beforeSend: function(jqXHR) {
			// ...
		},
		success: function(data) {
			if(!data) {
				return jQueryAjaxAvisoError('No response was obtained from the web service.');
			} else {
				// ============================================================
				// [data] viene de la vista --> SELECT * FROM [dbo].[V_CLUFS_SERVICES]
				// ============================================================
				// data --> un array multidimensional
				// El método slice devuelve los elementos de un array que se le 
				// indiquen en sus argumentos. Al no poner ninguno, los devuelve todos, 
				// por lo que tenemos una copia perfecta del array.
				// Y esto funciona con un array multidimensional -> Sin problemas:
				$sessionToken.listaServiciosEnClufs = data.slice();
				// Para copiar un objeto no podemos hacer uso del método slice ya que éste, 
				// es único para los arrays. Tenemos que recurrir jQuery
				// 	$sessionToken.listaServiciosEnClufs = $.extend( {}, data );
				// ============================================================
				// Recorrer el arreglo original
				// console.table(data)
				// data.forEach(function(datos, index) {
				//	// 0: object.propiedad1
				//	// 1: object.propiedad2
				//	// ...
				//	console.log(index + " - " + datos.SERVICES_NAME);
				// });
				// ============================================================
				// Combo de servicios
				// Vaciar el Combo...
				$('#comboSeleccionarServicio').empty();
				// Colocar primera opcion al combo.
				$("#comboSeleccionarServicio").get(0).options[0] = new Option(l("SELECCIONE"), "-1");

				// ============================================================
				// Si $sessionToken.listaServiciosEnClufs.length = 0, representa que
				// el CLUFS no tiene servicios asociados en la tabla [CLUFS_SERVICIOS]
				// Para desactivar servicios en forma general (todos los clientes)
				// --> UPDATE dbo.SERVICIOS SET ESTATUS = 0 WHERE ID = ID_DEL_SERVICIO_A_DESACTIVAR
				// ============================================================
				if($sessionToken.listaServiciosEnClufs.length === 0) {
					$alertaAvisoActivo = true;
					$.alert({
						boxWidth: '90%',
						useBootstrap: false,
						// columnClass: 'small' // default        
						// Available animations:
						// right, left, bottom, top, rotate, none, opacity, scale, zoom,
						// scaleY, scaleX, rotateY, rotateYR (reverse), rotateX, rotateXR (reverse)
						animation: 'opacity',
						closeAnimation: 'scale',
						animationBounce: 2, // default is 1.2 whereas 1 is no bounce.
						escapeKey: false,
						// titleClass: '',
						// typeAnimated: true,
						closeIcon: false,
						// closeIconClass: 'fa fa-close',
						draggable: true,
						type: 'red',
						icon: 'fa fa-hand-stop-o',
						title: l('AVISO_NO_SERVICES_ASIGNADO_TITULO'),
						dragWindowGap: 100,
						content: l('AVISO_NO_SERVICES_ASIGNADO'),
						onDestroy: function() {
							$alertaAvisoActivo = false;
							window.location.replace('/@portal/');
						}
					});
				};
				// ============================================================

				// Recorrer el arreglo global --> $sessionToken.listaServiciosEnClufs
				// console.table($sessionToken.listaServiciosEnClufs)
				$sessionToken.listaServiciosEnClufs.forEach(function(datos, index) {
					// alert(datos.COMPANY_NAME);
					// 0: datos.ID
					// 0: datos.COMPANY_NAME
					// 0: datos.URL_ALIAS
					// 0: datos.SERVICIO_NOMBRE
					// 0: datos.CURRENT_VERSION
					// 0: datos.ES
					// 0: datos.EN
					// 0: datos....
					// console.log(index + " - " + datos.SERVICIO_NOMBRE);
					// LLENAR EL COMBO

					// Cargar determinando el idioma
					switch (lGet()) { // $sessionToken.idiomaId
						case 'de':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.DE));
							break;
						case 'en':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.EN));
							break;
						case 'es':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.ES));
							break;
						case 'fr':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.FR));
							break;
						case 'it':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.IT));
							break;
						case 'jp':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.JP));
							break;
						case 'kr':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.KR));
							break;
						case 'pt':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.PT));
							break;
						case 'ru':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.RU));
							break;
						case 'zh':
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.ZH));
							break;
						default:
							$("#comboSeleccionarServicio").append($('<option></option>').attr('value', datos.SERVICIO_NOMBRE).text(datos.ES));
					}
					$sessionToken.empresaNombre = datos.COMPANY_NAME;
				});
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			
			// $sessionToken.empresaNombre = "";
			$sessionToken.listaServiciosEnClufs = {};
			var xResult = jQueryAjaxAvisoError('Ajax Response status: ' + textStatus);
		}
	});
};
// ==================================================================



// ==================================================================
// Cargar el servicio pasado como parametro en la url
// ==================================================================
function cargarServicioPorUrl(urlAlias) {
	// =============================================================
	// Código frecuente con interacción del usuario...
	// =============================================================
	$sessionToken.ultimaVerificacionToken = new Date();
	$sessionToken.empresaAlias = $BCL.getUrlSubDomain();
	if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); return false; }
	
	// =============================================================

	// =============================================================
	// ToDo
	// =============================================================
	$('#comboSeleccionarServicio').empty();



	// ToDo: validar con un swhich que el "urlAlias" corresponda con algun
	// servicio valido, si no lo es, mostrar mensaje y regresar con "regresoPortal()"
	// Tambien obtener el nombre completo del servicio y segun el lGet()
	// hacer las traducciones necesarias

	alert("Cargar servicio por URL no se ha implementado");
	regresoPortal();
};
// ==================================================================


// ==================================================================   
// Cambiar imagen de fondo
// ==================================================================   
function cargarImagenFondo() {
	$("html").fadeOut('fast'); // Ocultar
	
	// Clean image...
	// document.body.backgroundImage='none';
	$('body').css('background-image', 'none');

	// Cambiar este rango según la cantidad de imágenes que existan
	var xNum = $BCL.randomNumber2(100, 430);
	var imgName = '"/assets/images/loginBackground/img' + xNum + '.jpg"';
	$('body').css('background-image', 'url(' + imgName + ')');
	
	// Obtener lenguaje actual y colocarlo en combo de selección de idioma
	document.getElementById("comboSeleccionarIdioma").value = lGet();

	$("html").fadeIn('slow'); // Mostrar

};
// ============================================================

// ============================================================
//
// ============================================================
function mostrarNombreEmpresaServicio() {
	$('#spanServicio').text($sessionToken.servicioSeleccionado);
	$('#spanEmpresa').text($sessionToken.empresaNombre);
};
// ============================================================

// ============================================================
// Icono flecha regresar atras
// ============================================================
function regresoPortal() {
	// ========================================================
	$sessionToken.ultimaVerificacionToken = new Date();
	// ========================================================

	// fade-out between pages
	$('body').delay(1000).fadeOut(2000, function() {
		tokenReset(); // -> $sessionToken.sesionUID = "000-000-000-000-000";

		// =============================================================
		if(!$sessionToken.accesoRed) {
			alertaNoAccesoRed();
			// return;
		}
		// =============================================================
		$("html").fadeOut("slow", function() { // Ocultar
			// Animation complete.
			$sessionToken.empresaAlias = $BCL.getUrlSubDomain();
			$BCL.redirect('../');
		});
	});
};
// ============================================================

// ============================================================
// Refrescar pagina y cambiar fondo
// ============================================================
function refreshPage() {
	// ========================================================
	$sessionToken.ultimaVerificacionToken = new Date();
	$sessionToken.empresaAlias = $BCL.getUrlSubDomain();
	// ========================================================

	$BCL.hideElement('mainSignin');

	cargarImagenFondo();
	tokenReset(); // -> $sessionToken.sesionUID = "000-000-000-000-000";

	var aElementsToHide = new Array('divUsuarioContrasena', 'spanCredencialesLogin');
	$BCL.hideElements(aElementsToHide);

	var aElementsToShow = new Array('divIdioma', 'divServicio', 'spanTitleLogin');
	$BCL.showElements(aElementsToShow);

	$sessionToken.servicioSeleccionado = "";
	$sessionToken.servicioSeleccionadoAlias = "";
	$sessionToken.listaServiciosEnClufs = {};
	// $sessionToken.empresaNombre = "";

	cargarServicios();

	var $tmpLng = traduceDOM();
	$(".preTranslate").show("slow", function() {
		mostrarNombreEmpresaServicio();
	});
};
// ============================================================

// ============================================================
$("#comboSeleccionarIdioma").change(function() {
	// =============================================================
	// Código frecuente con interacción del usuario...
	// =============================================================
	$sessionToken.ultimaVerificacionToken = new Date();
	$sessionToken.empresaAlias = $BCL.getUrlSubDomain();
	if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); return false; }
	// =============================================================

	var e = document.getElementById("comboSeleccionarIdioma");
	var lgValue = e.options[e.selectedIndex].value; // es, en, jp, ....
	var lgText = e.options[e.selectedIndex].text; // Español, English, 日本語
	lSet(lgValue);
	$sessionToken.idiomaId = lgValue;

	// Actualizar el "Seleccione..."
	var optServicio = document.getElementById('comboSeleccionarServicio').options[0];
	optServicio.value = -1;
	optServicio.text = l("SELECCIONE");

	var $tmpLng = traduceDOM();

	cargarServicios();

});
// ============================================================

// ============================================================
$("#comboSeleccionarServicio").change(function() {
	// =============================================================
	// Código frecuente con interacción del usuario...
	// =============================================================
	$sessionToken.ultimaVerificacionToken = new Date();
	$sessionToken.empresaAlias = $BCL.getUrlSubDomain();
	if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); return false; }
	
	// =============================================================

	// Obtener el value y text del combo
	$sessionToken.servicioSeleccionadoAlias = document.getElementById("comboSeleccionarServicio").value; // "ERP"
	$sessionToken.servicioSeleccionado = $(this).find("option:selected").text(); // "Planificación de Recursos Empresariales"
	mostrarNombreEmpresaServicio();

	var aElementsToHide = new Array('divIdioma', 'divServicio', 'spanTitleLogin');
	$BCL.hideElements(aElementsToHide);

	var aElementsToShow = new Array('divUsuarioContrasena', 'spanCredencialesLogin');
	$BCL.showElements(aElementsToShow);
});
// ============================================================


// ============================================================
// Formulario Login
// ============================================================
function formSigninSubmit() {
	// =============================================================
	// Código frecuente con interacción del usuario...
	// =============================================================
	$sessionToken.ultimaVerificacionToken = new Date();
	$sessionToken.empresaAlias = $BCL.getUrlSubDomain();
	if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); return false; }
	
	// =============================================================

	var _txtEmail = document.getElementById("inputEmail").value;
	// sha256('Passw0rd');
	// 	"ab38eadaeb746599f2c1ee90f8267f31f467347462764a24d71ac1843ee77fe3"
	//	"ab38eadaeb746599f2c1ee90f8267f31f467347462764a24d71ac1843ee77fe3"
	var _txtPassword = sha256(document.getElementById("inputPassword").value);

	if(!formValidate(_txtEmail, _txtPassword)) {
		return false;
	}



	return true;
	// =============================================================
};

function formValidate(usrEmail, pdw) {

	if(!$BCL.isValidEmail(usrEmail)) {
		$.toast({
			heading: l("AVISO"),
			text: l("USER_EMAIL_NO_VALID"),
			beforeShow: function () {},
			afterShown: function () {},
			afterHidden: function () {},
			onClick: function () {},
			beforeHide: function() {
				document.getElementById("inputEmail").focus();
				document.getElementById("inputEmail").select();
				return false;
			}
		});
		return false;
	};

	// Se analiza el valor del control, porque
	// pdw ya viene cifrado con sha256()
	var _pdw = document.getElementById("inputPassword").value;
	if(_pdw.length < 7) {
		$.toast({
			heading: l("AVISO"),
			text: l("USER_PDW_NO_VALID"),
			beforeShow: function () {},
			afterShown: function () {},
			afterHidden: function () {},
			onClick: function () {},
			beforeHide: function() {
				document.getElementById("inputPassword").focus();
				document.getElementById("inputPassword").select();
				return false;
			}
		});
		return false;
	};



	// $sessionToken.servicioSeleccionadoAlias --> "ERP"
	// $sessionToken.servicioSeleccionado --> "Planificación de Recursos Empresariales"

	// Enviar --> usrEmail, pdw, $sessionToken.empresaAlias y $sessionToken.servicioSeleccionadoAlias
	// al ws --> http://services.proiecto.net:1520/getSessionToken/?usr=***&pdw=***&alias=***&service=erp
	const $url = $appConfig.backOfficeServerUrl + "getSessionToken/?usr=" + usrEmail + "&pdw=" + pdw + "&alias=" + $sessionToken.empresaAlias + "&service=" + $sessionToken.servicioSeleccionadoAlias;

	alert($url);
	return true;
}




























// ============================================================
function ultimaFuncion() {

	// ========================================================
	$sessionToken.ultimaVerificacionToken = new Date();
	$sessionToken.empresaAlias = $BCL.getUrlSubDomain();
	// ========================================================

};
// ============================================================











































































function validateCheckBoxLDAP() {
	var checkbox = document.getElementById("chkValdationLDAP");
	if(checkbox.checked) {
		// document.getElementById("myCheck").checked = true;
		// document.getElementById("myCheck").checked = false;

		// habilitar #resetPassword
		// document.getElementById("resetPassword").disabled = false;
		$BCL.hideElement("resetPassword");
	} else {
		// deshabilitar #resetPassword
		// document.getElementById("resetPassword").disabled = true;
		$BCL.showElement("resetPassword");
	}
};


// ============================================================
// Boton login
// ============================================================
// Para evitar la doble pulsacion...
var isBtnLoginPulsed = false;
var serviceId = "";
var serviceName = "";
var companyName = "";
var companyId = "";

function userLogin() {
	// Evitar doble pulsacion del boton....
	if(isBtnLoginPulsed) { return false; }
	isBtnLoginPulsed = true;


	// =============================================================
	if(!$sessionToken.accesoRed) { alertaNoAccesoRed(); return; }
	// =============================================================

	// ============================================================
	// TIP
	// ============================================================
	// Al ir a la pagina principal:
	// fade-out between pages
	// $('body').delay(700).fadeOut(1000, function() {
	//     document.location.href = '/@portal/signin/';
	/// });
	// ============================================================



	// ============================================================
	var _txtEmail = document.getElementById("txtEmail").value;
	var _txtPassword = document.getElementById("txtPassword").value;
	var _selectCompany = document.getElementById("sources"); // combo de emprsas
	var _selectService = document.getElementById("services"); // combo de servicios

	companyName = "";
	companyId = "";

	serviceId = _selectService.options[_selectService.selectedIndex].value; // indice base 0 de la seleccion
	serviceName = _selectService.options[_selectService.selectedIndex].text; // indice base 0 de la seleccion
	// ============================================================
	// Validaciones
	// ============================================================
	// Correo electrónico en blanco
	if($BCL.isStringNullOrEmpty(_txtEmail)) {
		$.toast({
			heading: l(41),
			text: l(42)
		});
		document.getElementById("txtEmail").focus();
		return false;
	};

	// Correo electrónico no valido
	if(!$BCL.isValidEmail(_txtEmail)) {
		$.toast({
			heading: l(41),
			text: l(43)
		});
		document.getElementById("txtEmail").focus();
		return false;
	};

	// Password
	if($BCL.isStringNullOrEmpty(_txtPassword)) {
		$.toast({
			heading: l(41),
			text: l(44)
		});
		document.getElementById("txtPassword").focus();
		return false;
	};

	if(_txtPassword.length <= 5) {
		$.toast({
			heading: l(41),
			text: l(45)
		});
		document.getElementById("txtPassword").focus();
		return false;
	};

	// Si no se escogió empresa....
	// companyId --> (integer begin in cero)
	if(companyId < 0) {
		$.toast({
			heading: l(41),
			text: l(40)
		});
		_selectCompany.focus();
		return false;
	};

	// Si no se escogió servicio....
	// serviceId  --> (integer begin in cero)
	if(serviceId < 0) {
		$.toast({
			heading: l(41),
			text: l(39)
		});
		_selectService.focus();
		return false;
	};


	// un campo al for por codigo
	// o agregarle htm
	/*
	    $('#proiectoLoginForm').prepend('<input type="hidden" name="token" value="' + token + '">');
	    // ó
	    var recaptchaResponse = document.getElementById('recaptchaResponse');
	    recaptchaResponse.value = token;
	*/


	getSessionToken(_txtEmail, _txtPassword, companyId);
	// companyId --> (integer begin in cero)

};

// ============================================================
//
// ============================================================
function getSessionToken(txtEmail, txtPassword, companyId) {
	// =============================================================
	if(!$sessionToken.accesoRed) {
		alertaNoAccesoRed();
		return;
	}
	// =============================================================

	// ============================================================
	// ToDo
	// ============================================================
	// Validar que la cuenta de usuario este activa...
	// ============================================================

	isBtnLoginPulsed = true;

	// Por favor espere un momento...
	document.getElementById('btnLogin').innerText = l(49);

	topbar.show();
	// topbar.hide()

	txtPassword = $BCL.md5(txtPassword);
	// companyId --> (integer begin in cero)               
	var dataJson = `{'UserEmail':'${txtEmail}', 'Security':'${txtPassword}', 'CompannyDbId':'${companyId}'}`;

	// ==================================================================
	//  The data parameter of $.ajax could be rewritten as the following:
	// ==================================================================
	// data: {
	//       firstName: $('myFirstName').val(),
	//       lastName: $('myLastName').val()
	// }
	//      or in some situation even as
	// data: {
	//     firstName: function() { return JSON.stringify($('myFirstName').val()); },
	//     lastName: function() { return JSON.stringify($('myLastName').val()); }
	// }

	$.ajax({
		type: "POST",
		url: $appConfig.backOfficeServerUrl + 'default.asmx/getSessionToken',
		// data: JSON.stringify($sessionToken),
		data: dataJson,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(result) {
			// Del lado del ws se crea el regitro "sessionToken" en a tabla corespondiente
			// y se regresa mediante el parametro: result

			// Permite ejecutar código al ser exitoso un llamado.
			// if (data != null && data.d != null) {
			//      ok... 
			// }
			// ============================================================
			// AJAX SUCCESS
			// ============================================================
			var obj = JSON.parse(result.d); // string from ws to JSON object

			topbar.hide(); // topbar.show();

			// -1 = credencials no validas...
			//  0 = usuario bloqueado
			var noAccessReason;
			if(obj.GUID == "-1") { noAccessReason = l(46); }
			if(obj.GUID == "0") { noAccessReason = l(55); }

			if((obj.GUID == "-1") || (obj.GUID == "0")) {
				$.alert({
					type: 'red',
					typeAnimated: true,
					animation: 'scale',
					title: l(41),
					content: noAccessReason,
					closeIcon: true,
					closeIconClass: 'fa fa-close',
					draggable: true,
					dragWindowGap: 100,
					theme: 'light',
					columnClass: 'col-md-6 col-md-offset-3', // medium size
					buttons: {
						somethingElse: {
							text: l(48),
							btnClass: 'btn-blue',
							keys: ['enter', 'shift'],
							action: function() {
								document.getElementById('btnLogin').innerText = l(4);
								isBtnLoginPulsed = false;
								document.getElementById("txtEmail").focus();
								this.setCloseAnimation('zoom');
							}
						}
					}
				});
				return;
			};

			topbar.show(); // topbar.hide();

			// ============================================================
			// YES
			// ============================================================

			// La variabe $sessionToken debe contener:
			//  - Los valores gelocalizacion /ip, lactiud, ongitus, country, city, etc)
			//  - el UserAvatarUrl (url para obtener desde un ashx)
			//  - el serviceName
			//  - el serviceId
			//  - el companyName
			//  - el companyId
			//  - el compayLegalId (RIF)
			//  - el user email
			//  - el user full name
			//  - Datos de configuracion como
			//      * simbolo monetario (propio de cada compañia)
			//      * separadores decimal y miles en cantidades numericas
			//      * formato de fecha
			//      * url logo de la empresa (url para obtener desde un ashx)
			//



			$sessionToken = obj;

			// UserAvatarUrl
			$sessionToken.usuarioAvatarUrl = $appConfig.backOfficeServerUrl + obj.UserAvatarUrl;
			// Guardar el Objeto JSON como texto...
			sessionStorage.setItem('sessionToken', JSON.stringify($sessionToken));

			// Servicio seleecionado....
			sessionStorage.setItem("sessionServiceName", serviceName);
			sessionStorage.setItem("sessionServiceId", serviceId);
			sessionStorage.setItem("sessionCompanyName", companyName);



			// Recuperar el texto desde la session y convertirlo en JSON
			// $sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
			/*
			    GUID:             "AC92-60E7-7618-39E6"
			    appUser_FK:       ""
			    appUserFullName:  ""
			    appUserAvatarURL: ""
			    appUserEmail:     "edward.ocando@gmail.com"
			    userAgent:        "Chrome 80"
			    loginDate:        0
			    dbCompanyName:    ""
			    dbCompanyID:      -1
			    langId:           ""
			    ip:               "8.8.8.8"
			    city_name:        "Mountain View"
			    region_name:      "California"
			    country_name:     "United States of America"
			    country_code:     "US"
			    latitude:         37.405992
			    longitude:        -122.078515 
			    tag:              "NO_VALID_CREDENTALS"
			    isEnabled:        true
			    isDeleted:        false
			    UserAvatarUrl:    "http://bcp.proiecto.net/undefined"
			*/

			$('#divLimiter').delay(300).fadeOut(700, function() {
				document.location.href = "/";
			});

		},
		beforeSend: function(xhr) {
			// Permite llamar una función antes de mandar el objeto ajax.
		},
		complete: function(obj, exito) {
			// Se ejecutar sin importar si la petición falló o no
			// Es una funcion que se ejecuta cuando el llamado al ajax esta completo. 
			// Permite saber si fue existoso
			// obj = XMLHttpRequest
			// if (exito == "success") {
			//      obj.readyState (4)
			//      obj.responseText
			//      obj.responseJSON
			//      obj.status (200)
			//      obj.statusText ("OK")
			// }
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// onAjaxError(jqXHR, textStatus, errorThrown);
		}
	})
};








// ============================================================
// EVENTOS DEL SELECTS OPTIONS
// ============================================================

// ============================================================
// END SELECT OPTION
// ============================================================

// ============================================================
// Evento del formulario...
// ============================================================
/*
document.getElementById('formSignin').addEventListener("submit", function(e) {
	e.preventDefault();

	// =============================================================
	if(!$sessionToken.accesoRed) { 
		alertaNoAccesoRed(); 
		return; 
	}

	// =============================================================

	var x0 = formSigninSubmit(); // Evento del boton Submit....
});
*/
// ============================================================

// ============================================================
// Eventos de preparación iniciales
// Callback functions
// ============================================================
// cargarImagenFondo(getGeoInfo);
