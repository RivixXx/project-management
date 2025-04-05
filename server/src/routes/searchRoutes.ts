/**
 * Модуль маршрутизации для функционала поиска
 * @module searchRoutes
 */

import { Router } from "express";
import { search } from "../controllers/searchController";

// Создаем новый экземпляр роутера Express
const router = Router();

/**
 * @route GET /
 * @description Обрабатывает GET-запросы для поиска
 * @access Public
 */
router.get("/", search);

export default router;
