import { Router } from "express";

import { getUser, getUsers, postUser } from "../controllers/userController";

/**
 * Создаем экземпляр маршрутизатора Express
 */
const router = Router();

/**
 * @route   GET /api/users
 * @desc    Получить список всех пользователей
 * @access  Public
 */
router.get("/", getUsers);

/**
 * @route   POST /api/users
 * @desc    Создать нового пользователя
 * @access  Public
 */
router.post("/", postUser);

/**
 * @route   GET /api/users/:cognitoId
 * @desc    Получить пользователя по его Cognito ID
 * @access  Public
 * @param   {string} cognitoId - Идентификатор пользователя в Amazon Cognito
 */
router.get("/:cognitoId", getUser);

export default router;
