const frisby = require("frisby");

const BASE_URL = "http://localhost:3000/api/task";

describe("🧪 Pruebas de la API de Tareas", () => {
  it("✅ Obtener todas las tareas", async () => {
    await frisby
      .get(`${BASE_URL}/task`)
      .expect("status", 200)
      .expect("header", "Content-Type", /application\/json/)
      .expect("jsonTypes", "*", {
        id: frisby.Joi.string().required(),
        title: frisby.Joi.string().required(),
        description: frisby.Joi.string().required(),
        icon: frisby.Joi.string().required(),
        Status: frisby.Joi.string().required(),
      });
  });

  it("✅ Obtener todas las tareas en progreso", async () => {
    await frisby
      .get(`${BASE_URL}/task-progress`)
      .expect("status", 200)
      .expect("header", "Content-Type", /application\/json/)
      .expect("jsonTypes", "*", {
        id: frisby.Joi.string().required(),
        title: frisby.Joi.string().required(),
        description: frisby.Joi.string().required(),
        icon: frisby.Joi.string().required(),
        Status: frisby.Joi.string().required(),
      });
  });

  it("✅ Obtener todas las tareas completadas", async () => {
    await frisby
      .get(`${BASE_URL}/task-complete`)
      .expect("status", 200)
      .expect("header", "Content-Type", /application\/json/)
      .expect("jsonTypes", "*", {
        id: frisby.Joi.string().required(),
        title: frisby.Joi.string().required(),
        description: frisby.Joi.string().required(),
        icon: frisby.Joi.string().required(),
        Status: frisby.Joi.string().required(),
      });
  });

  it("✅ Obtener todas las tareas no completadas", async () => {
    await frisby
      .get(`${BASE_URL}/task-itWasNot`)
      .expect("status", 200)
      .expect("header", "Content-Type", /application\/json/)
      .expect("jsonTypes", "*", {
        id: frisby.Joi.string().required(),
        title: frisby.Joi.string().required(),
        description: frisby.Joi.string().required(),
        icon: frisby.Joi.string().required(),
        Status: frisby.Joi.string().required(),
      });
  });

  it("✅ Crear una nueva tarea", async () => {
    await frisby
      .post(`${BASE_URL}/new-task`, {
        title: "Nueva tarea",
        description: "Descripción de la nueva tarea",
        icon: "📝",
        status: "Active",
      })
      .expect("status", 201)
      .expect("json", "message", "Tarea creada con exito");
  });

  it("✅ Editar una tarea", async () => {
    const taskId = "e411cb11-1426-11f0-8690-c31f503312c1";
    await frisby
      .put(`${BASE_URL}/update-task`, {
        id: taskId,
        title: "Actualizar documentación",
        description:
          "Revisar la documentación del proyecto y hacer las correcciones necesarias",
        icon: "sd",
        status: "Complete",
      })
      .expect("status", 200)
      .expect("json", "message", "La tarea se actualizo con exito");
  });

  // it('✅ Borrar una tarea', async () => {
  //   await frisby
  //     .del(`${BASE_URL}/delete-task/facc2813-142a-11f0-8690-c31f503312c1`)
  //     .expect('status', 200)
  //     .expect(
  //       'json',
  //       'message',
  //       "La tarea 'Actualizar documentación' fue eliminada"
  //     );
  // });
});
