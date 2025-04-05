import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Контроллер для получения списка всех проектов
 * @param req - объект запроса Express
 * @param res - объект ответа Express
 */
export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Получаем все проекты из базы данных
    const projects = await prisma.project.findMany();
    // Отправляем список проектов клиенту
    res.json(projects);
  } catch (error: any) {
    // В случае ошибки отправляем статус 500 и сообщение об ошибке
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

/**
 * Контроллер для создания нового проекта
 * @param req - объект запроса Express, содержащий данные проекта в теле
 * @param res - объект ответа Express
 */
export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Извлекаем данные проекта из тела запроса
  const { name, description, startDate, endDate } = req.body;
  
  try {
    // Создаем новый проект в базе данных
    const newProject = await prisma.project.create({
      data: {
        name,        // Название проекта
        description, // Описание проекта
        startDate,   // Дата начала
        endDate,     // Дата окончания
      },
    });
    // Отправляем созданный проект клиенту со статусом 201 (Created)
    res.status(201).json(newProject);
  } catch (error: any) {
    // В случае ошибки отправляем статус 500 и сообщение об ошибке
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};
