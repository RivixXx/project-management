import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Контроллер для выполнения поиска по задачам, проектам и пользователям
 * @param req - Объект запроса Express, содержащий параметр query для поиска
 * @param res - Объект ответа Express
 */
export const search = async (req: Request, res: Response): Promise<void> => {
  // Получаем поисковый запрос из параметров
  const { query } = req.query;
  try {
    // Поиск задач, где заголовок или описание содержат искомую строку
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    // Поиск проектов, где название или описание содержат искомую строку
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    // Поиск пользователей по имени пользователя
    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });

    // Отправляем успешный ответ со всеми найденными данными
    res.json({ tasks, projects, users });
  } catch (error: any) {
    // В случае ошибки отправляем статус 500 и сообщение об ошибке
    res
      .status(500)
      .json({ message: `Error performing search: ${error.message}` });
  }
};
