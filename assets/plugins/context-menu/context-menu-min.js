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
function ContextMenu(t,e,n){this.contextContainerID=t,this.contextMenuContainer=$('.context-menu[data-container-id="'+t+'"]');var i=this;$(this);this.contextMenuContainer.click(function(t){var o=$(this),s="#"+$(this).attr("data-container-id"),u=$(s);i.contextMenu=u;var l={left:t.clientX-u.width()-15,top:u.offset().top+t.clientY};if(isElementInViewport(u))u.css({top:l.top,left:l.left,position:"absolute"});else{alert("View not visible");var d=u.width()+u.offset().left,h=$(window).width(),r=l.left-(l.left-(h-d))-10;u.css({top:l.top,left:r,position:"absolute"})}return null!=n&&void 0!==n&&void 0!==n.openCallBack&&n.openCallBack(i,o),u.find("ul > li").click(function(){$(this).hasClass("disabled")||(e($(this),o),u.hide(),u.find("ul > li").unbind("click"))}),u.show(),!1}),this.destroy=function(){this.contextMenuContainer.unbind("click")},this.returnContextMenu=function(){var t=null;if(void 0!==i.contextMenu)t=i.contextMenu;else{var e="#"+$('.context-menu[data-container-id="'+this.contextContainerID+'"]').attr("data-container-id");t=$(e)}return t},this.disableMenuItem=function(t){var e=0,n=this.returnContextMenu(),i=n.find("ul > li").length;n.find("ul > li").each(function(){if("number"==typeof t){if(t<0||t>i)throw"3Dot-ContextMenu: Item index is out of bounds";e===t&&$(this).addClass("disabled")}else"string"==typeof t&&$(this).text()===t&&$(this).addClass("disabled");e++})},this.enableMenuItem=function(t){var e=0,n=this.returnContextMenu(),i=n.find("ul > li").length;n.find("ul > li").each(function(){if("number"==typeof t){if(t<0||t>i)throw"3Dot-ContextMenu: Item index is out of bounds";e===t&&$(this).removeClass("disabled")}else"string"==typeof t&&$(this).text()===t&&$(this).removeClass("disabled");e++})},this.hideMenuItem=function(t){var e=0,n=this.returnContextMenu(),i=n.find("ul > li").length;n.find("ul > li").each(function(){if("number"==typeof t){if(t<0||t>i)throw"3Dot-ContextMenu: Item index out of bounds";e===t&&$(this).hide()}else"string"==typeof t&&$(this).text()===t&&$(this).hide();e++})},this.showMenuItem=function(t){var e=this.returnContextMenu(),n=e.find("ul > li").length;e.find("ul > li").each(function(){if("number"==typeof t){if(t<0|t>n)throw"3Dot-ContextMenu: Item index out of bounds";0===t&&$(this).show()}else"string"==typeof t&&$(this).text()===t&&$(this).show()})}}function isElementInViewport(t){"function"==typeof jQuery&&t instanceof jQuery&&(t=t[0]);var e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}$(document).mouseup(function(t){var e=$(".context-menu-container");e.is(t.target)||0!==e.has(t.target).length||e.hide()});