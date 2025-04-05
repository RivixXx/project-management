import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Контроллер для получения всех команд с информацией о Product Owner и Project Manager
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 */
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    // Получаем все команды из базы данных
    const teams = await prisma.team.findMany();

    // Для каждой команды получаем дополнительную информацию о пользователях
    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        // Получаем информацию о Product Owner
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });

        // Получаем информацию о Project Manager
        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });

        // Объединяем данные команды с именами пользователей
        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );

    // Отправляем успешный ответ с данными
    res.json(teamsWithUsernames);
  } catch (error: any) {
    // В случае ошибки отправляем статус 500 и сообщение об ошибке
    res
      .status(500)
      .json({ message: `Error retrieving teams: ${error.message}` });
  }
};
