import { connectionQuery } from "../helpers/connection.helper";

// Función genérica para obtener tareas
const obtainTasks = async (req, res, status = null) => {
  try {
    const query = status
      ? `SELECT * FROM task WHERE "Status" = $1`
      : `SELECT * FROM task`;

    const result = await connectionQuery(query, status ? [status] : []);

    if (result.length === 0) {
      return res.status(404).send({ message: "No se encontraron tareas" });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener tareas", error });
  }
};

// Endpoints optimizados
const ObtainFullTask = (req, res) => obtainTasks(req, res);
const ObtainTaskInProgress = (req, res) => obtainTasks(req, res, "Active");
const ObtainTaskCompleted = (req, res) => obtainTasks(req, res, "Complete");
const ObtainTaskWontDo = (req, res) => obtainTasks(req, res, "ItWasNot");

const createTask = async (req, res) => {
  try {
    const { title, description, icon, status } = req.body;

    if (!title || !description || !icon || !status)
      return res.status(400).send({ message: "Los campos son requeridos" });

    const queryInsert = `INSERT INTO task (title, description, icon, "Status") VALUES ($1, $2, $3, $4)`;
    const queryParamsInsert = [title, description, icon, status];

    await connectionQuery(queryInsert, queryParamsInsert);

    res.status(201).send({ message: "Tarea creada con éxito" });
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res
      .status(500)
      .send({ message: "Error al crear la tarea", error: error.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { title, description, icon, status, id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send({ message: "Se debe proporcionar un ID válido" });
    }

    const queryValidateExistId = `SELECT * FROM task WHERE id = $1`;
    const resultValidateExistId = await connectionQuery(queryValidateExistId, [
      id,
    ]);
    if (resultValidateExistId.length === 0) {
      return res.status(404).send({
        message: "No se proporcionó un ID válido o la tarea no existe",
      });
    }

    // Actualizar la tarea
    const queryUpdateTask = `UPDATE task SET title = $1, description = $2, icon = $3, "Status" = $4 WHERE id = $5`;
    const queryParamsUpdateTask = [title, description, icon, status, id];
    await connectionQuery(queryUpdateTask, queryParamsUpdateTask);

    res.status(200).send({ message: "La tarea se actualizó con éxito" });
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).send({
      message: "Ocurrió un error al actualizar la tarea",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "No se envió un ID válido" });
    }

    const queryValidate = `SELECT * FROM task WHERE id = $1`;
    const resultValidate = await connectionQuery(queryValidate, [id]);

    if (resultValidate.length === 0) {
      return res.status(404).send({
        message: "La tarea no existe",
      });
    }

    const queryDeleteTask = `DELETE FROM task WHERE id = $1`;
    await connectionQuery(queryDeleteTask, [id]);

    res.status(200).send({ message: "La tarea fue eliminada" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(500).send({
      message: "Hubo un error al eliminar la tarea",
      error: error.message,
    });
  }
};

module.exports = {
  ObtainFullTask,
  ObtainTaskInProgress,
  ObtainTaskCompleted,
  ObtainTaskWontDo,
  createTask,
  editTask,
  deleteTask,
};
