Option Explicit On
Option Strict On
Option Compare Binary
' Option Infer Off
' ====================================================================================================
' Copyright 2021. Proiecto, C. A. Todos los derechos reservados.
' Proiecto y Proiecto BackOffice son marcas registradas de Proiecto, C. A.
' El eslogan: Plataforma de servicios en la nube, es marca registrada de Proiecto, C. A.
' Otros productos citados son marcas registradas de sus respectivos propietarios y/o fabricantes.
' Producto desarrollado por Edward Ocando con licencia para uso exclusivo de Proiecto, C. A.
' Para más información visite https://www.proiecto.net ó si lo desea escríbanos a: 
' soporte@proiecto.net - info@proiecto.net - ventas@proiecto.net
' ====================================================================================================
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
' EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
' MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
' NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
' LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
' OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
' WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
' ====================================================================================================
Imports BCL
Imports BCL.LIB
Imports BCL.Loggers
Imports BCL.SQLDataSource
Imports Proiecto
' ============================================================
Imports System.Web
Imports System.Web.Services
Imports Newtonsoft.Json
Imports System.Drawing.Imaging
Imports System.IO
Imports System.Drawing
Imports System.ComponentModel
Imports Microsoft.Web.WebSockets
Imports System.Data
Imports Devart.Data.SQLite
Imports System.Web.Services.Protocols.SoapHeader
Imports System.Web.Services.Protocols

' ============================================================
' http://services.proiecto.net/default.asmx
' http://services.proiecto.net/default.asmx?wsdl
' ============================================================
<System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://services.proiecto.net/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Partial Public Class ProiectoAM
    Inherits System.Web.Services.WebService

    ' ============================================================
    ' http://services.proiecto.net:1520/default.asmx
    ' http://services.proiecto.net:1520/default.asmx?wsdl
    ' ============================================================

    ' ============================================================
    Private HTML_DIV_ERROR As String = "<div class='bcl-warning-red'>{*}</div>"

    <WebMethod(
    BufferResponse:=True,
    CacheDuration:=0,
    EnableSession:=True,
    Description:="Proiecto BackOffice, Plataforma Tecnológica Empresarial"),
    Browsable(True)> _
    Public Function Proiecto3(ByVal idLang As String) As String

        ' if (Request.Headers["XYZComponent"] != null)

        'If (Request.Headers.AllKeys.Contains("XYZComponent")) Then
        '{
        '    // Can now check if the value is true:
        '    var value = Convert.ToBoolean(Request.Headers["XYZComponent"]);
        '}

        Dim soapHeader As String = Context.Request.Headers("ocando")

        'Dim header As String() = Context.Request.Headers.AllKeys
        'If Not header.Contains("name") Then
        '    ' Context.Response.ContentType = "text/plain"
        '    ' Context.Response.Write("Please send name in request header")
        'Else
        '    Dim name As String = Context.Request.Headers.[Get]("name")
        '    ' Context.Response.ContentType = "text/plain"
        '    ' Context.Response.Write("Hi " & name & "! Thanks to send name in HTTP header")
        '    Return ("Hi " & name & "! Thanks to send name in HTTP header")
        'End If



        Context.Response.AddHeader("Bertha", "Edward")

        If idLang = "es" Then Return "Proiecto: Plataforma de servicios en la nube"
        If idLang = "en" Then Return "Proiecto: enterprise cloud platform"
        If idLang = "de" Then Return "Proiecto: Geschäftsplattform in der Cloud"
        If idLang = "fr" Then Return "Proiecto: plate-forme commerciale dans le cloud"
        If idLang = "it" Then Return "Proiecto: piattaforma di business nel cloud"
        If idLang = "jp" Then Return "Proiecto: エンタープライズクラウドプラットフォーム"
        If idLang = "kr" Then Return "Proiecto: 엔터프라이즈 클라우드 플랫폼"
        If idLang = "ru" Then Return "Proiecto: бизнес-платформа в облаке"
        If idLang = "zh" Then Return "Proiecto: 企業雲平台"
        Return "Proiecto"

    End Function


End Class

' ============================================================
' CacheDuration:=60 = (seg)
' ============================================================
' El valor de esta propiedad indica cuántos segundos debe almacenar ASP.NET en caché los resultados. 
' Un valor de cero deshabilita el almacenamiento en caché de los resultados. 
' A menos que se especifique lo contrario, el valor predeterminado es cero.
' https://msdn.microsoft.com/es-es/library/system.web.services.webmethodattribute.cacheduration(v=vs.90).aspx
' ============================================================

' ============================================================
' EnableSession
' ============================================================
' La propiedad EnableSession del atributo WebMethod habilita el estado de sesión en un método de servicio Web
' XML. Una vez habilitada esta función, el servicio Web XML puede tener acceso a la colección de estado de sesión
' directamente desde HttpContext.Current.Session o con la propiedadWebService.Session si se hereda de la clase
' base WebService. A menos que se especifique lo contrario, el valor predeterminado es false.

' CODE\CODE_READY\AJAX\NET - Cómo Utilizar el atributo WebMethod.pdf
' ============================================================

' ============================================================
' Leyendo contenido desde una pagina web...
' ============================================================
' Dim client As WebClient = New WebClient()
' client.Encoding = System.Text.Encoding.UTF8
' Return client.DownloadString("http://services.proiecto.net/proiecto/cmsContext/?id=" & idUser.ToString())

