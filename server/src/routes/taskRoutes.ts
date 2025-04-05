// Импортируем Router из express для создания модульных маршрутов
import { Router } from "express";
// Импортируем необходимые контроллеры для обработки запросов к задачам
import {
  createTask,      // Создание новой задачи
  getTasks,        // Получение списка задач
  getUserTasks,    // Получение задач пользователя
  updateTaskStatus, // Обновление статуса задачи
} from "../controllers/taskController";

// Создаем новый экземпляр роутера
const router = Router();

// Определяем маршруты для работы с задачами:

// GET / - получение списка задач проекта
// Пример: GET /tasks?projectId=1
router.get("/", getTasks);

// POST / - создание новой задачи
// Пример: POST /tasks с данными задачи в теле запроса
router.post("/", createTask);

// PATCH /:taskId/status - обновление статуса конкретной задачи
// Пример: PATCH /tasks/1/status с новым статусом в теле запроса
router.patch("/:taskId/status", updateTaskStatus);

// GET /user/:userId - получение всех задач конкретного пользователя
// Пример: GET /tasks/user/1
router.get("/user/:userId", getUserTasks);

// Экспортируем роутер для использования в основном приложении
export default router;
