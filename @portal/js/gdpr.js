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

// "use strict"; // IMPORTANTE "DESACTIVADO"


// https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679

// POLÍTICA DE COOKIES
// Proiecto utiliza cookies propias y de terceros para posibilitar y mejorar su experiencia de navegación, mostrarle publicidad personalizada así como para realizar análisis estadísticos. Obtendrá más información en nuestra [Política de Cookies].

// https://www.arsys.es/legal/cookies

// Usted puede elegir si acepta las cookies utilizadas por Proiecto y continúa navegando, o puede dedicar unos minutos a personalizarlas a través del Panel de Configuración.

//                  [ACEPTAR Y SEGUR NAVEGANDO]

(function($) {

    $.fn.ihavecookies = function(options, event) {

        var $element = $(this);

        // Set defaults
        var settings = $.extend({
            cookieTypes: [{
                    type: 'Site Preferences',
                    value: 'preferences',
                    // Se trata de cookies relacionadas con las preferencias de su sitio, por ejemplo, recordar su nombre de usuario, los colores del sitio, etc.
                    description: 'These are cookies that are related to your site preferences, e.g. remembering your username, site colours, etc.'
                },
                {
                    type: 'Analytics',
                    value: 'analytics',
                    // Cookies relacionadas con las visitas al sitio, los tipos de navegador, etc.
                    description: 'Cookies related to site visits, browser types, etc.'
                },
                {
                    type: 'Marketing',
                    value: 'marketing',
                    // Cookies relacionadas con la comercialización, por ejemplo, boletines de noticias, medios sociales, etc.
                    description: 'Cookies related to marketing, e.g. newsletters, social media, etc'
                }
            ],
            title: '<i class="fa fa-hand-paper-o"></i>&nbsp;Important information about the cookies used on this website.',
            // Las cookies le permiten utilizar carros de compra y personalizar su experiencia en nuestros sitios, nos dicen qué partes de nuestros sitios web han visitado las personas, nos ayudan a medir la eficacia de los anuncios y las búsquedas en la web, y nos dan información sobre el comportamiento de los usuarios para que podamos mejorar nuestras comunicaciones y productos.
            message: 'To improve your browsing experience, we use cookies to remember your login details and provide you with a secure start, to collect statistics to optimize the functionality of the site and to offer you personalized content based on your interests. Click <strong style="color:#FFFFFF">“Accept and proceed”</strong> to accept cookies and go directly to the application, or click “More information...” to see the detailed description of the types of cookies we use and decide whether to accept them while browsing and use the application.<br>If you do not accept the installation of cookies, please do not continue using this application.',
            link: '#',
            delay: 2000,
            expires: 30,
            moreInfoLabel: 'More information',
            acceptBtnLabel: 'Accept Cookies',
            advancedBtnLabel: 'Customise Cookies',
            cookieTypesTitle: 'Select cookies to accept',
            fixedCookieTypeLabel: 'Necessary',
            // Son cookies que son esenciales para que el sitio web funcione correctamente.
            fixedCookieTypeDesc: 'These are cookies that are essential for the website to work correctly.',
            onAccept: function() {},
            uncheckBoxes: false
        }, options);

        var myCookie = getCookie('cookieControl');
        var myCookiePrefs = getCookie('cookieControlPrefs');

        if(!myCookie || !myCookiePrefs || event == 'reinit') {
            // Remove all instances of the cookie message so it's not duplicated
            $('#gdpr-cookie-message').remove();

            // Set the 'necessary' cookie type checkbox which can not be unchecked
            var cookieTypes = '<li><input type="checkbox" name="gdpr[]" value="necessary" checked="checked" disabled="disabled"> <label title="' + settings.fixedCookieTypeDesc + '">' + settings.fixedCookieTypeLabel + '</label></li>';

            // Generate list of cookie type checkboxes
            preferences = JSON.parse(myCookiePrefs);
            $.each(settings.cookieTypes, function(index, field) {
                if(field.type !== '' && field.value !== '') {
                    var cookieTypeDescription = '';
                    if(field.description !== false) {
                        cookieTypeDescription = ' title="' + field.description + '"';
                    }
                    cookieTypes += '<li><input type="checkbox" id="gdpr-cookietype-' + field.value + '" name="gdpr[]" value="' + field.value + '" data-auto="on"> <label for="gdpr-cookietype-' + field.value + '"' + cookieTypeDescription + '>' + field.type + '</label></li>';
                }
            });

            // Display cookie message on page
            /* Boton salir */
            var cookieMessage = '<div id="gdpr-cookie-message"><h4>' + settings.title + '</h4><p>' + settings.message + ' <a href="' + settings.link + '" target="_blank">' + settings.moreInfoLabel + '</a><div id="gdpr-cookie-types" style="display:none;"><h5>' + settings.cookieTypesTitle + '</h5><ul>' + cookieTypes + '</ul></div><p><button id="gdpr-cookie-accept" type="button">' + settings.acceptBtnLabel + '</button><button id="gdpr-cookie-advanced" type="button">' + settings.advancedBtnLabel + '</button>' +
                '<button type="button" id="gdpr-cookie-close"><i class="fa fa-share"></i></button></p></div>';
            setTimeout(function() {
                $($element).append(cookieMessage);
                $('#gdpr-cookie-message').hide().fadeIn('slow', function() {
                    // If reinit'ing, open the advanced section of message
                    // and re-check all previously selected options.
                    if(event == 'reinit') {
                        $('#gdpr-cookie-advanced').trigger('click');
                        $.each(preferences, function(index, field) {
                            $('input#gdpr-cookietype-' + field).prop('checked', true);
                        });
                    }
                });
            }, settings.delay);

            // When accept button is clicked drop cookie
            $('body').on('click', '#gdpr-cookie-accept', function() {
                // ========================================================
                $sessionToken.ultimaVerificacionToken = new Date();
                // ========================================================
                
                // Set cookie
                dropCookie(true, settings.expires);

                // If 'data-auto' is set to ON, tick all checkboxes because
                // the user hasn't clicked the customise cookies button
                $('input[name="gdpr[]"][data-auto="on"]').prop('checked', true);

                // Save users cookie preferences (in a cookie!)
                var prefs = [];
                $.each($('input[name="gdpr[]"]').serializeArray(), function(i, field) {
                    prefs.push(field.value);
                });
                setCookie('cookieControlPrefs', encodeURIComponent(JSON.stringify(prefs)), 365);

                // Run callback function
                settings.onAccept.call(this);
            });

            // ========================================================
            // Boton Cerrar
            // ========================================================
            $('body').on('click', '#gdpr-cookie-close', function() {
                // ========================================================
                $sessionToken.ultimaVerificacionToken = new Date();
                // ========================================================

                $('#gdpr-cookie-message').hide().fadeOut('slow', function() {
                    $BCL.deleteCookieAll();
                });
            });
            // ========================================================

            // Toggle advanced cookie options
            $('body').on('click', '#gdpr-cookie-advanced', function() {
                // ========================================================
                $sessionToken.ultimaVerificacionToken = new Date();
                // ========================================================
                // Uncheck all checkboxes except for the disabled 'necessary'
                // one and set 'data-auto' to OFF for all. The user can now
                // select the cookies they want to accept.
                $('input[name="gdpr[]"]:not(:disabled)').attr('data-auto', 'off').prop('checked', false);
                $('#gdpr-cookie-types').slideDown('fast', function() {
                    $('#gdpr-cookie-advanced').prop('disabled', true);
                });
            });

        } else {
            var cookieVal = true;
            if(myCookie == 'false') {
                cookieVal = false;
            }
            dropCookie(cookieVal, settings.expires);
        }

        // Uncheck any checkboxes on page load
        if(settings.uncheckBoxes === true) {
            $('input[type="checkbox"].ihavecookies').prop('checked', false);
        }

    };

    // Method to get cookie value
    $.fn.ihavecookies.cookie = function() {
        var preferences = getCookie('cookieControlPrefs');
        return JSON.parse(preferences);
    };

    // Method to check if user cookie preference exists
    $.fn.ihavecookies.preference = function(cookieTypeValue) {
        var control = getCookie('cookieControl');
        var preferences = getCookie('cookieControlPrefs');
        preferences = JSON.parse(preferences);
        if(control === false) {
            return false;
        }
        if(preferences === false || preferences.indexOf(cookieTypeValue) === -1) {
            return false;
        }
        return true;
    };

    var dropCookie = function(value, expiryDays) {
        setCookie('cookieControl', value, expiryDays);
        $('#gdpr-cookie-message').fadeOut('fast', function() {
            $(this).remove();
        });
    };

    var setCookie = function(name, value, expiry_days) {
        var d = new Date();
        d.setTime(d.getTime() + (expiry_days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
        return getCookie(name);
    };

    var getCookie = function(name) {
        var cookie_name = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while(c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(cookie_name) === 0) {
                return c.substring(cookie_name.length, c.length);
            }
        }
        return false;
    };
}(jQuery));
