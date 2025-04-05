// Импорт необходимых зависимостей
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Создание экземпляра Prisma для работы с базой данных
const prisma = new PrismaClient();

/**
 * Функция для очистки всех существующих данных из базы
 * @param orderedFileNames - Массив имен файлов в порядке их обработки
 */
async function deleteAllData(orderedFileNames: string[]) {
  // Преобразование имен файлов в имена моделей Prisma
  // Например: "user.json" -> "User"
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  // Последовательное удаление данных из каждой модели
  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

/**
 * Основная функция заполнения базы данных тестовыми данными
 */
async function main() {
  // Путь к директории с файлами тестовых данных
  const dataDirectory = path.join(__dirname, "seedData");

  // Определение порядка загрузки данных
  // Порядок важен из-за зависимостей между таблицами
  const orderedFileNames = [
    "team.json",          // Сначала команды
    "project.json",       // Затем проекты
    "projectTeam.json",   // Связи между проектами и командами
    "user.json",          // Пользователи
    "task.json",         // Задачи
    "attachment.json",    // Вложения
    "comment.json",       // Комментарии
    "taskAssignment.json", // Назначения задач
  ];

  // Очистка существующих данных перед заполнением
  await deleteAllData(orderedFileNames);

  // Последовательная загрузка данных из каждого файла
  for (const fileName of orderedFileNames) {
    // Формирование полного пути к файлу с данными
    const filePath = path.join(dataDirectory, fileName);
    // Чтение и парсинг JSON-данных из файла
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    // Получение имени модели из имени файла
    const modelName = path.basename(fileName, path.extname(fileName));
    // Получение доступа к соответствующей модели Prisma
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      // Создание записей в базе данных для каждого объекта из JSON
      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }
}

// Запуск процесса заполнения базы данных
main()
  .catch((e) => console.error(e))
  // Закрытие соединения с базой данных после завершения
  .finally(async () => await prisma.$disconnect());
