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

function demo1() {
	$.toast({
		heading: 'Título del aviso',
		text: 'Un conjunto de software colaborativo, único e inteligente para gestionar su empresa o negocio.',
		beforeShow: function() {},
		afterShown: function() {},
		afterHidden: function() {},
		onClick: function() {},
		beforeHide: function() {}
	});
	return false;
};

function demo2() {
	$.toast('Here you can put the text of the toast');
};
