<h1>Implementacion-de-una-aplicacion-Serverless</h1>

<p> Implementaremos un aplicacion serverless con el lenguaje nodejs 18.x. Esta aplicacion procesa las solicitudes para obtener el cambio del dolar por fecha de una 
base de datos mediante solicitud HTTP. A continuacion se muestra el diagrama de implementacion que consta de los siguientes elementos</p>

<ol>
  <li>Función que contiene la lógica necesaria para procesar la solicitud.</li>
  <li>Una API HTTP que sirve de comunicación entre el cliente (solicitante) y la aplicación.</li>
  <li>Una base de datos para almacenar elementos.</li>
  <li>Permisos para que la aplicación se ejecute de forma segura.</li>
</ol>  
<img src="https://github.com/mhcuenca/Implementacion-de-una-aplicacion-Serverless/blob/main/images/implement%20app.PNG" alt="alternatetext">


Primero crearemos nuestra base de datos RDS Aurora PostgreSQL con la siguiente configuracion

<img src="https://github.com/mhcuenca/Implementacion-de-una-aplicacion-Serverless/blob/main/images/RDS1.PNG" alt="alternatetext">  <img src="https://github.com/mhcuenca/Implementacion-de-una-aplicacion-Serverless/blob/main/images/RDS2.PNG" alt="alternatetext">

<p> Luego nos conectaremos a nuestra instancia de RDS mediante la herramienta pgAdmin, para esto también configuramos los grupos de seguridad de RDS (reglas de entrada) tal que nos permita el acceso por el puerto 5432, cuando el acceso es permitido crearemos nuestra base de datos DBPrueba e ingresamos algunos datos de manera manual.</p>
