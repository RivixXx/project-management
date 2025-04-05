// Импорт основных зависимостей
import express, { Request, Response } from "express";  // Основной фреймворк для создания веб-сервера
import dotenv from "dotenv";                          // Для работы с переменными окружения
import bodyParser from "body-parser";                 // Парсинг тела запроса
import cors from "cors";                              // Настройка CORS политики
import helmet from "helmet";                          // Middleware для безопасности
import morgan from "morgan";                          // Логирование HTTP запросов

/* ИМПОРТ МАРШРУТОВ */
// Подключаем все маршруты приложения
import projectRoutes from "./routes/projectRoutes";   // Маршруты для работы с проектами
import taskRoutes from "./routes/taskRoutes";         // Маршруты для работы с задачами
import searchRoutes from "./routes/searchRoutes";     // Маршруты для поиска
import userRoutes from "./routes/userRoutes";         // Маршруты для работы с пользователями
import teamRoutes from "./routes/teamRoutes";         // Маршруты для работы с командами

/* НАСТРОЙКА ПРИЛОЖЕНИЯ */
dotenv.config();                                      // Инициализация переменных окружения
const app = express();                                // Создание экземпляра приложения

// Настройка middleware
app.use(express.json());                              // Парсинг JSON в запросах
app.use(helmet());                                    // Добавление заголовков безопасности
app.use(helmet.crossOriginResourcePolicy({ 
  policy: "cross-origin"                             // Настройка политики Cross-Origin Resource Policy
}));
app.use(morgan("common"));                           // Настройка формата логирования запросов
app.use(bodyParser.json());                          // Парсинг JSON в теле запроса
app.use(bodyParser.urlencoded({ 
  extended: false                                    // Парсинг URL-encoded данных
}));
app.use(cors());                                     // Включение CORS для всех маршрутов

/* ОПРЕДЕЛЕНИЕ МАРШРУТОВ */
// Корневой маршрут для проверки работоспособности сервера
app.get("/", (req, res) => {
  res.send("This is home route");
});

// Подключение модульных маршрутов
app.use("/projects", projectRoutes);                 // Маршруты для проектов начинаются с /projects
app.use("/tasks", taskRoutes);                      // Маршруты для задач начинаются с /tasks
app.use("/search", searchRoutes);                   // Маршруты для поиска начинаются с /search
app.use("/users", userRoutes);                      // Маршруты для пользователей начинаются с /users
app.use("/teams", teamRoutes);                      // Маршруты для команд начинаются с /teams

/* ЗАПУСК СЕРВЕРА */
const port = Number(process.env.PORT) || 3000;       // Определение порта из переменных окружения или использование 3000
app.listen(port, "0.0.0.0", () => {                 // Запуск сервера на всех доступных сетевых интерфейсах
  console.log(`Server running on port ${port}`);     // Вывод сообщения об успешном запуске
});
