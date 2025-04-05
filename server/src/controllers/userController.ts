import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Инициализация клиента Prisma для работы с базой данных
const prisma = new PrismaClient();

/**
 * Получение списка всех пользователей
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

/**
 * Получение информации о конкретном пользователе по его Cognito ID
 * @param req - объект запроса Express, содержащий cognitoId в параметрах
 * @param res - объект ответа Express
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });

    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user: ${error.message}` });
  }
};

/**
 * Создание нового пользователя
 * @param req - объект запроса Express, содержащий данные пользователя в теле запроса
 * @param res - объект ответа Express
 * 
 * Обязательные поля в теле запроса:
 * - username: имя пользователя
 * - cognitoId: идентификатор пользователя в Amazon Cognito
 * 
 * Опциональные поля:
 * - profilePictureUrl: URL фотографии профиля (по умолчанию "i1.jpg")
 * - teamId: идентификатор команды (по умолчанию 1)
 */
export const postUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.json({ message: "User Created Successfully", newUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};
