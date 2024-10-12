## Backend My Task Board

 - Se manejo con id incremental identado
 - El back se hizo en **mysql2** pero tiene la propia conexion en **PostgreSQL** para que se modificada para subir a cloud
 - La respuesta de cada consulta es una **Promesa** en los **helpers** y solo se extrae el metodo y se manda el **query a ejecutar y los parametros**
 - EL archivo .env_demo esta las variables de entorno para modificar el **ANON_KEY** y la **URL**
 - Esta documentada en swagger en la ruta ``` http://localhost:3000/api-docs/ ```
 - Hay espejos de archivos uno con mySQL y otro con PostgreSQL en la carpeta ``` router/index.js ``` se hace el cambio entre un manejador de Base de datos y otro
 - En local se incia con yarn dev

 ## Estos son los endpoints

 - Crear una tarea ```http://localhost:3000/api/task/new-task```
 - Obtener las tareas activas ``` http://localhost:3000/api/task/task-progress ```
 - Obtener las tareas completadas ``` http://localhost:3000/api/task/task-complete ```
 - Obtener las tareas no realizadas ``` http://localhost:3000/api/task/task-itWasNot ```
 - Editar una tarea ``` http://localhost:3000/api/task/update-task ```
 - Eliminar una tarea ``` http://localhost:3000/api/task/delete-task/4 ```