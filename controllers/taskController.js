const { connectionQuery } = require('../helpers/connection.helper');

// Función genérica para obtener tareas
const obtainTasks = async (req, res, status = null) => {
  try {
    const query = status
      ? `SELECT * FROM task WHERE Status = ?`
      : `SELECT * FROM task`;

    const result = await connectionQuery(query, status ? [status] : []);

    if (result.length === 0) {
      return res.status(404).send({ message: 'No se encontraron tareas' });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener tareas', error });
  }
};

// Endpoints optimizados
const ObtainFullTask = (req, res) => obtainTasks(req, res);
const ObtainTaskInProgress = (req, res) => obtainTasks(req, res, 'Active');
const ObtainTaskCompleted = (req, res) => obtainTasks(req, res, 'Complete');
const ObtainTaskWontDo = (req, res) => obtainTasks(req, res, 'ItWasNot');

const createTask = async (req, res) => {
  try {
    const { title, description, icon, status } = req.body;

    if (!title || !description || !icon || !status)
      return res.status(400).send({ message: 'Los campos son requeridos' });

    const queryInsert = `INSERT INTO task (id, title, description, icon, Status) VALUES(UUID(), ?, ?, ?, ?) `;
    const queryParamsInsert = [title, description, icon, status];
    await connectionQuery(queryInsert, queryParamsInsert);

    res.status(201).send({ message: 'Tarea creada con exito' });
  } catch (error) {
    res.status(500).send({ message: 'Error al crear la tarea', error });
  }
};

const editTask = async (req, res) => {
  try {
    const { title, description, icon, status, id } = req.body;

    if (id) {
      const queryValidateExistId = `SELECT * FROM task WHERE id = ?`;
      const resultValidateExistId = await connectionQuery(
        queryValidateExistId,
        [id]
      );
      if (resultValidateExistId.length === 0) {
        res.status(404).send({
          message: 'No se proporciono un id valido o la tarea no existe',
        });
      }
    }

    const queryUpdateTask = `UPDATE task SET title = ?, description = ?, icon = ?, Status = ? WHERE id = ?`;
    const queryParamsUpdateTask = [title, description, icon, status, id];
    await connectionQuery(queryUpdateTask, queryParamsUpdateTask);

    res.status(200).send({ message: 'La tarea se actualizo con exito' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Ocurrio un error al actualizar la tarea', error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'ID de tarea requerido' });
    }

    const result = await connectionQuery(
      `SELECT title FROM task WHERE id = ?`,
      [id]
    );
    if (result.length === 0) {
      return res.status(404).send({ message: 'Tarea no encontrada' });
    }

    await connectionQuery(`DELETE FROM task WHERE id = ?`, [id]);

    res
      .status(200)
      .send({ message: `La tarea '${result[0].title}' fue eliminada` });
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar la tarea', error });
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
