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

let $appConfig = {
    backOfficeServerUrl 		: 'https://backoffice.proiecto.ws/',
    salomonWebServicesUrl 	: 'https://salomon.proiecto.ws/',
    ajaxCallTimeOut 		: (7 * 1000),
    linkCreacionCuenta 		: 'https://portal.proiecto.net',
    usarAutenticacionSegura 	: true,
    formatoFecha			: 'd/M/yyyy',   // Cambia según el idioma
    sessionLocalTimeOut  	: (120 * 1000), // (120 * 1000) --> 2 min ||| (780 * 1000) --> 13 minutos
    sessionTokenTimeRefresh 	: (20 * 1000),	 // 20 segundos --> 3 veces por minuto
    esModoDebug 			: true
};

