/**
 * Модуль маршрутизации для управления командами
 * @module teamRoutes
 */

import { Router } from "express";

import { getTeams } from "../controllers/teamController";

// Создаем новый экземпляр роутера Express
const router = Router();

/**
 * @route GET /api/teams
 * @desc Получить список всех команд
 * @access Public
 */
router.get("/", getTeams);

export default router;
