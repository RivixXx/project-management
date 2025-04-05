# Создание полноценной панели управления проектами

[![Обучающее видео](https://img.youtube.com/vi/KAV8vo7hGAo/0.jpg)](https://www.youtube.com/watch?v=KAV8vo7hGAo)

Этот репозиторий содержит код для подробного руководства по созданию Панели управления проектами с использованием Next.js, Node.js и сервисов AWS.
Следуйте [видео-руководству на YouTube](https://www.youtube.com/watch?v=KAV8vo7hGAo) для получения подробных инструкций по настройке, конфигурации и развертыванию.

## Присоединяйтесь к нашему сообществу

Для обсуждения и поддержки этого приложения присоединяйтесь к нашему [сообществу в Discord](https://discord.com/channels/1070200085440376872/1082900634442940416/threads/1282730219488280576).

## Технологический стек

- **Frontend**: Next.js, Tailwind CSS, Redux Toolkit, Redux Toolkit Query, Material UI Data Grid
- **Backend**: Node.js с Express, Prisma (PostgreSQL ORM)
- **База данных**: PostgreSQL, управляемая через PgAdmin
- **Облачные сервисы**: AWS EC2, AWS RDS, AWS API Gateway, AWS Amplify, AWS S3, AWS Lambda, AWS Cognito

## Начало работы

### Предварительные требования

Убедитесь, что у вас установлены следующие инструменты:

- Git
- Node.js
- npm (Node Package Manager)
- PostgreSQL ([скачать](https://www.postgresql.org/download/))
- PgAdmin ([скачать](https://www.pgadmin.org/download/))

### Шаги установки

1. Клонируйте репозиторий:
   `git clone [git url]`
   `cd project-management`

2. Установите зависимости для клиентской и серверной части:
   `cd client`
   `npm i`
   `cd ..`
   `cd server`
   `npm i`

3. Настройте базу данных:
   `npx prisma generate`
   `npx prisma migrate dev --name init`
   `npm run seed`

4. Настройте переменные окружения:

- `.env` для настроек сервера (PORT, DATABASE_URL)
- `.env.local` для настроек клиента (NEXT_PUBLIC_API_BASE_URL)

5. Запустите проект:
   `npm run dev`

## Дополнительные ресурсы

### Репозитории кода и файлы конфигурации

- [Полный код проекта на GitHub](https://github.com/ed-roh/project-management)
- [Конфигурация Tailwind CSS](https://github.com/ed-roh/project-management/blob/master/client/tailwind.config.ts)
- [Настройка Redux Toolkit](https://github.com/ed-roh/project-management/blob/master/client/src/app/redux.tsx)
- [Файлы начального заполнения базы данных](https://github.com/ed-roh/project-management/tree/master/server/prisma/seedData)
- [Файлы изображений](https://github.com/ed-roh/project-management/tree/master/client/public)
- [Файл globals.css (для копирования диаграмм Ганта)](https://github.com/ed-roh/project-management/blob/master/client/src/app/globals.css)
- [Инструкция по настройке AWS EC2](https://github.com/ed-roh/project-management/blob/master/server/aws-ec2-instructions.md)

### Диаграммы и модели

- [Диаграмма модели данных](https://lucid.app/lucidchart/877dec2c-db89-4f7b-9ce0-80ce88b6ee37/edit)
- [Диаграмма архитектуры AWS](https://lucid.app/lucidchart/62c20695-d936-4ee7-9a53-ceef7aef8127/edit)
- [Диаграмма потока AWS Cognito](https://lucid.app/lucidchart/9e17e28e-6fe5-41df-b04b-b378fa21eb8f/edit)

### Команды управления базой данных

- Команда для сброса ID в базе данных:
  ```sql
  SELECT setval(pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id'), coalesce(max(id)+1, 1), false) FROM "[DATA_MODEL_NAME_HERE]";
  ```

Проставь коментарии в коде по стандартам JSDoc, плюс прокомментируй сложные моменты в данном компаненте, применяй изменения с помощью более умной модели. Если есть что перевести на русский, сделай это. показав изменения
