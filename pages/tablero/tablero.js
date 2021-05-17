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
"use strict";


$(function() {
	var availableTags = [
		"ActionScript",
		"AppleScript",
		"Asp",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scala",
		"Scheme"
	];
	/*
		// autocomplete basico
		$("#cadenaBusqueda").autocomplete({
			source: availableTags,
			minLength: 2
		});
	*/

	// usando fuente remota
	/*
	 $( "#birds" ).autocomplete({
	      source: "search.php", // que retorne un JSON
	      minLength: 2,
	      select: function( event, ui ) {
	        log( "Selected: " + ui.item.value + " aka " + ui.item.id );
	      }
	    });
	*/
	// For multiple values
	function split(val) {
		return val.split(/,\s*/);
	}

	function extractLast(term) {
		return split(term).pop();
	}

	// ===================================================
	// autocmplete con multiples valores
	// ===================================================
	$("#cadenaBusqueda")
		// don't navigate away from the field on tab when selecting an item
		.on("keydown", function(event) {

			// =============================================================
			if (!$sessionToken.accesoRed){alertaNoAccesoRed();return;}
			// =============================================================

			if(event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		})
		.autocomplete({
			minLength: 0,
			source: function(request, response) {
				// delegate back to autocomplete, but extract the last term
				response($.ui.autocomplete.filter(
					availableTags, extractLast(request.term)));
			},
			focus: function() {
				// prevent value inserted on focus
				return false;
			},
			select: function(event, ui) {
				var terms = split(this.value);
				// remove the current input
				terms.pop();
				// add the selected item
				terms.push(ui.item.value);
				// add placeholder to get the comma-and-space at the end
				terms.push("");
				this.value = terms.join(", ");
				return false;
			}
		});
	// ===================================================

});



$('#searchInBing').on('click', function(e) {
	e.preventDefault(); // Evitar comportamiento normal de boton (POSTBACK)
	
	// =============================================================
	if (!$sessionToken.accesoRed){alertaNoAccesoRed();return;}
	// =============================================================


	var param = document.getElementById("cadenaBusqueda").value;
	var url = 'https://www.bing.com/search?q=' + param.replace(/\s/g, '+');

	//   https://www.bing.com/search?q=edward+ocando
	// https://www.google.com/search?q=edward+ocando
	// https://search.yahoo.com/search?p=edward+ocando
	// https://yandex.com/search/?text=edward+ocando
	// https://swisscows.com/web?query=edward+ocando
	// https://duckduckgo.com/?q=edward+ocando
	// https://www.startpage.com/sp/search?q=edward+ocando
	// https://www.searchencrypt.com/search/?q=edward+ocando
	// https://gibiru.com/results.html?q=edward+ocando
	// https://www.ecosia.org/search?q=edward+ocando
	// https://ekoru.org/?q=edward+ocando&target=all
	// https://search.givewater.com/serp?q=edward+ocando

	// https://twitter.com/search?q=edward+ocando

	// Esta lista requiere inicio de sesion en el respectivo portal
	// https://www.facebook.com/search/top/?q=windows+microsoft
	// https://www.linkedin.com/search/results/all/?keywords=microsoft+windows&origin=GLOBAL_SEARCH_HEADER
	window.open(url);
});

// ====================================================================================================
var $traduceDOM = traduceDOM();
// ====================================================================================================
