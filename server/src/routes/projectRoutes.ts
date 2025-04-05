// Импортируем Router из express для создания модульных маршрутов
import { Router } from "express";
// Импортируем контроллеры для обработки запросов к проектам
import { createProject, getProjects } from "../controllers/projectController";

// Создаем новый экземпляр роутера
const router = Router();

// Определяем маршруты для работы с проектами:

// GET / - получение списка всех проектов
// Например: GET /projects/
router.get("/", getProjects);

// POST / - создание нового проекта
// Например: POST /projects/ с данными проекта в теле запроса
router.post("/", createProject);

// Экспортируем роутер для использования в основном приложении
export default router;
