const express = require('express');
const TaskController = require('../controllers/taskControllerPG');
const api = express.Router();
api.use(express.json());

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Obtiene la lista completa de tareas
 *     description: Devuelve todas las tareas almacenadas en la base de datos.
 *     tags:
 *       - Tareas
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "c31dfbe2-105a-11f0-9712-eb9217ba62bd"
 *                   title:
 *                     type: string
 *                     example: "Comprar víveres"
 *                   description:
 *                     type: string
 *                     example: "Comprar pan, leche y huevos"
 *                   status:
 *                     type: string
 *                     example: "pendiente"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-03T10:15:30Z"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al obtener las tareas"
 *                 error:
 *                   type: string
 */

api.get('/task', TaskController.ObtainFullTask);

/**
 * @swagger
 * /task-progress:
 *   get:
 *     summary: Obtiene tareas en progreso
 *     description: Devuelve una lista de tareas que están en progreso con el estado "Active".
 *     tags:
 *       - Tareas
 *     responses:
 *       200:
 *         description: Lista de tareas en progreso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la tarea.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nombre de la tarea.
 *                     example: "Tarea de ejemplo"
 *                   status:
 *                     type: string
 *                     description: Estado de la tarea.
 *                     example: "Active"
 *       404:
 *         description: No se encontraron tareas en progreso.
 *       500:
 *         description: Error del servidor.
 */

api.get('/task-progress', TaskController.ObtainTaskInProgress);

/**
 * @swagger
 * /task-complete:
 *   get:
 *     summary: Obtiene tareas completadas
 *     description: Devuelve una lista de tareas que tienen el estado "Complete".
 *     tags:
 *       - Tareas
 *     responses:
 *       200:
 *         description: Lista de tareas completadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la tarea.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nombre de la tarea.
 *                     example: "Tarea completada"
 *                   status:
 *                     type: string
 *                     description: Estado de la tarea.
 *                     example: "Complete"
 *       404:
 *         description: No se encontraron tareas completadas.
 *       500:
 *         description: Error del servidor.
 */

api.get('/task-complete', TaskController.ObtainTaskCompleted);

/**
 * @swagger
 * /task-itWasNot:
 *   get:
 *     summary: Obtiene tareas que no se realizaron
 *     description: Devuelve una lista de tareas con el estado "It was not".
 *     tags:
 *       - Tareas
 *     responses:
 *       200:
 *         description: Lista de tareas que no se realizaron.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la tarea.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nombre de la tarea.
 *                     example: "Tarea que no se hizo"
 *                   status:
 *                     type: string
 *                     description: Estado de la tarea.
 *                     example: "It was not"
 *       404:
 *         description: No se encontraron tareas que no se realizaron.
 *       500:
 *         description: Error del servidor.
 */

api.get('/task-itWasNot', TaskController.ObtainTaskWontDo);

/**
 * @swagger
 * /new-task:
 *   post:
 *     summary: Crea una nueva tarea
 *     description: Permite crear una nueva tarea con título, descripción, ícono y estado.
 *     tags:
 *       - Tareas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea.
 *                 example: "Nueva tarea"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea.
 *                 example: "Descripción de la nueva tarea"
 *               icon:
 *                 type: string
 *                 description: Ícono de la tarea.
 *                 example: "📝"
 *               status:
 *                 type: string
 *                 description: Estado de la tarea.
 *                 example: "Active"
 *     responses:
 *       201:
 *         description: Tarea creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea creada con exito"
 *       400:
 *         description: Faltan campos requeridos en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Los campos son requeridos"
 *       500:
 *         description: Error al crear la tarea.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear la tarea"
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado.
 */

api.post('/new-task', TaskController.createTask);

/**
 * @swagger
 * /update-task:
 *   put:
 *     summary: Actualiza una tarea existente
 *     description: Permite editar los detalles de una tarea en la base de datos.
 *     tags:
 *       - Tareas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID de la tarea a actualizar
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Nuevo título de la tarea
 *                 example: "Actualizar documentación"
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la tarea
 *                 example: "Revisar la documentación del proyecto y hacer las correcciones necesarias"
 *               icon:
 *                 type: string
 *                 description: Icono representativo de la tarea
 *                 example: "fa-check-circle"
 *               status:
 *                 type: string
 *                 description: Estado de la tarea (por ejemplo, "pendiente", "en progreso", "completado")
 *                 example: "completado"
 *     responses:
 *       200:
 *         description: La tarea se actualizó con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La tarea se actualizo con exito"
 *       404:
 *         description: La tarea no existe o no se proporcionó un ID válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se proporciono un id valido o la tarea no existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocurrio un error al actualizar la tarea"
 *                 error:
 *                   type: string
 */

api.put('/update-task', TaskController.editTask);

/**
 * @swagger
 * /delete-task/{id}:
 *   delete:
 *     summary: Elimina una tarea existente
 *     description: Permite eliminar una tarea de la base de datos usando su ID.
 *     tags:
 *       - Tareas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *           example: c31dfbe2-105a-11f0-9712-eb9217ba62bd
 *     responses:
 *       200:
 *         description: La tarea fue eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La tarea fue eliminada"
 *       400:
 *         description: ID inválido o la tarea no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se envió el id válido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al eliminar la tarea"
 *                 error:
 *                   type: string
 */
api.delete('/delete-task/:id', TaskController.deleteTask);

module.exports = api;
