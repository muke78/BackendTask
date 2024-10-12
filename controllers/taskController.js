const { connectionQuery } = require('../helpers/connection.helper');
// const { connectionQuery } = require('../helpers/connectionPostSQL.helper');

const ObtainTaskInProgress = async (req, res) => {
  try {
    const obtainTaskInProgess = `SELECT * FROM task WHERE Status = 'Active'`;
    const result = await connectionQuery(obtainTaskInProgess);

    if (result.length === 0)
      return res
        .status(404)
        .send({ message: 'No se encontraron tareas en progreso' });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const ObtainTaskCompleted = async (req, res) => {
  try {
    const obtainTaskInCompleted = `SELECT * FROM task WHERE Status = 'Complete'`;
    const result = await connectionQuery(obtainTaskInCompleted);

    if (result.length === 0)
      return res
        .status(404)
        .send({ message: 'No se encontraron tareas completadas' });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const ObtainTaskWontDo = async (req, res) => {
  try {
    const obtainTaskInWontDo = `SELECT * FROM task WHERE Status = 'ItWasNot'`;
    const result = await connectionQuery(obtainTaskInWontDo);

    if (result.length === 0)
      return res
        .status(404)
        .send({ message: 'No se encontraron tareas no realizadas' });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, icon, status } = req.body;

    if (!title || !description || !icon || !status)
      return res.status(400).send({ message: 'Los campos son requeridos' });

    const queryInsert = `INSERT INTO task (title, description, icon, Status) VALUES(?, ?, ?, ?) `;
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

    const queryUpdateTask = `UPDATE task SET title = ?, description = ?, icon = ?, status = ? WHERE id = ?`;
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

    if (!id)
      return res.status(400).send({ message: 'No se envio el id valido' });

    if (id) {
      const queryValidate = `SELECT * FROM task WHERE id = ?`;
      const queryParamsValidate = [id];
      const resultValidate = await connectionQuery(
        queryValidate,
        queryParamsValidate
      );

      if (resultValidate.length === 0) {
        return res.status(400).send({
          message: 'La tarea no existe',
        });
      }
    }

    const queryDeleteTask = `DELETE FROM task WHERE id = ?`;
    await connectionQuery(queryDeleteTask, [id]);

    res.status(200).send({ message: 'La tarea fue eliminada' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Hubo un error al eliminar la tarea', error });
  }
};

module.exports = {
  ObtainTaskInProgress,
  ObtainTaskCompleted,
  ObtainTaskWontDo,
  createTask,
  editTask,
  deleteTask,
};
