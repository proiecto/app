@Echo Off
REM ====================================================================================================
REM Copyright 1997, 2021. Proiecto, C. A. Todos los derechos reservados.
REM Proiecto y el eslogan: Plataforma empresarial en la nube, son marcas registradas de Proiecto, C. A.
REM Otros productos citados son marcas registradas de sus respectivos propietarios y/o fabricantes.
REM Producto desarrollado por Edward Ocando con licencia para uso exclusivo de Proiecto, C. A.
REM Para más información visite http://www.proiecto.net, ó si lo desea, escríbanos a: 
REM soporte@proiecto.net - info@proiecto.net - ventas@proiecto.net
REM ====================================================================================================
REM THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
REM EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
REM MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
REM NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
REM LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
REM OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
REM WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
REM ====================================================================================================

Verify On
CLS
SET PATH=C:\JAVA\jdk-11.0.1\bin;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32;C:\Tools;C:\Tools\sysinternals;C:\Tools\SysTools\Console;C:\Tools\SysTools\Notepad2;C:\Tools\TotalCMD;C:\Tools\Sublime3;C:\Tools\SysTools\Winrar;C:\Tools\Dev\SDK;C:\Tools\Dev\ColorCopy;C:\Tools\SysTools\zip;S:\Obfuscation\HTML;S:\Obfuscation\JavaCompiler;C:\ProgramData\Proiecto\bin;C:\Users\Edward\AppData\Local\Programs\Python\Python38;C:\Users\Edward\AppData\Local\Programs\Python\Python38\Scripts;S:\EZSignIt32;C:\Tools\miniweb;

REM ============================================================
ECHO Preparing...
REM ============================================================
ATTRIB -H -R -S W:\SITES\PROIECTO.APP\WWW\*.* /S
DEL W:\SITES\PROIECTO.APP\WWW\*.* /Q /F /S
CLS
REM ============================================================

REM ============================================================
REM COPIAR ARCHIVOS
ECHO Copying...
REM ============================================================

XCOPY P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\*.* W:\SITES\PROIECTO.APP\WWW\ /E /V /Q /H /R /Y 
REM ============================================================

REM ============================================================
REM 
REM ============================================================
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\core\$core.js W:\SITES\PROIECTO.APP\WWW\core\core.min.js  /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\core\$l.js W:\SITES\PROIECTO.APP\WWW\core\l.min.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\core\$callBacks.min.js W:\SITES\PROIECTO.APP\WWW\core\callBacks.min.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\core\js\$document.on.ready.js W:\SITES\PROIECTO.APP\WWW\core\js\document.on.ready.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\core\js\$prepare.js W:\SITES\PROIECTO.APP\WWW\core\js\prepare.min.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\core\js\$window.on.load.js W:\SITES\PROIECTO.APP\WWW\core\js\window.on.load.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\@portal\js\$document.on.ready.js W:\SITES\PROIECTO.APP\WWW\@portal\js\document.on.ready.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\@portal\js\$window.on.load.js W:\SITES\PROIECTO.APP\WWW\@portal\js\window.on.load.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\@portal\signin\js\$document.on.ready.js W:\SITES\PROIECTO.APP\WWW\@portal\signin\js\document.on.ready.js /V /Y 
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\@portal\signin\js\$window.on.load.js W:\SITES\PROIECTO.APP\WWW\@portal\signin\js\window.on.load.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\pages\tablero\$tablero.js W:\SITES\PROIECTO.APP\WWW\pages\tablero\tablero.js /V /Y
Copy P:\PROIECTO\5-PROIECTO.APP\PROIECTO.APP\pages\ayuda\$ayuda.js W:\SITES\PROIECTO.APP\WWW\pages\ayuda\ayuda.min.js /V /Y

REM ============================================================
CLS
ECHO Deleting unnecessary files...
REM ============================================================
DEL W:\SITES\PROIECTO.APP\WWW\$*.* /Q /F /S > NUL
DEL W:\SITES\PROIECTO.APP\WWW\*.RAR /Q /F /S > NUL 
DEL W:\SITES\PROIECTO.APP\WWW\*.7Z /Q /F /S > NUL
DEL W:\SITES\PROIECTO.APP\WWW\*.EXE /Q /F /S > NUL
DEL W:\SITES\PROIECTO.APP\WWW\*.CMD /Q /F /S > NUL
DEL W:\SITES\PROIECTO.APP\WWW\*.BAT /Q /F /S > NUL
DEL W:\SITES\PROIECTO.APP\WWW\Thumbs.db /Q /F /S > NUL
DEL W:\SITES\PROIECTO.APP\WWW\*.ZIP /Q /F /S > NUL
REM ============================================================

REM ============================================================
CLS
ECHO Minimize HTML and CSS...
REM ============================================================
S:\Obfuscation\HTML\HtmlMinifier.exe W:\SITES\PROIECTO.APP\WWW\

ECHO ============================================================
ECHO Bertha, Edberlith y Enizabeth
ECHO ============================================================
GOTO END

:ERR
CLEAR
ECHO ============================================================
ECHO !Warning...¡
ECHO ============================================================
GOTO END
:END
