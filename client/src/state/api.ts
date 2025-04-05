import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

// Интерфейс для проекта
export interface Project {
  id: number;           // Уникальный идентификатор проекта
  name: string;         // Название проекта
  description?: string; // Описание проекта (опционально)
  startDate?: string;   // Дата начала (опционально)
  endDate?: string;     // Дата окончания (опционально)
}

// Перечисление для приоритетов задач
export enum Priority {
  Urgent = "Urgent",     // Срочный
  High = "High",        // Высокий
  Medium = "Medium",    // Средний
  Low = "Low",         // Низкий
  Backlog = "Backlog", // В бэклоге
}

// Перечисление для статусов задач
export enum Status {
  ToDo = "To Do",                     // К выполнению
  WorkInProgress = "Work In Progress", // В работе
  UnderReview = "Under Review",       // На проверке
  Completed = "Completed",            // Завершено
}

// Интерфейс для пользователя
export interface User {
  userId?: number;            // ID пользователя
  username: string;          // Имя пользователя
  email: string;            // Электронная почта пользователя
  profilePictureUrl?: string; // URL фотографии профиля
  cognitoId?: string;       // Идентификатор в системе AWS Cognito
  teamId?: number;          // ID команды
}

// Интерфейс для вложений
export interface Attachment {
  id: number;           // Идентификатор вложения
  fileURL: string;      // URL файла
  fileName: string;     // Название файла
  taskId: number;       // ID связанной задачи
  uploadedById: number; // ID пользователя, загрузившего файл
}

// Интерфейс для задачи
export interface Task {
  id: number;              // Идентификатор задачи
  title: string;           // Название задачи
  description?: string;    // Подробное описание
  status?: Status;         // Текущий статус
  priority?: Priority;     // Приоритет задачи
  tags?: string;          // Метки
  startDate?: string;      // Дата начала работы
  dueDate?: string;       // Крайний срок выполнения
  points?: number;        // Оценка в story points
  projectId: number;      // ID проекта
  authorUserId?: number;  // ID создателя задачи
  assignedUserId?: number; // ID назначенного исполнителя

  // Связанные сущности
  author?: User;          // Создатель задачи
  assignee?: User;        // Исполнитель задачи
  comments?: Comment[];   // Комментарии к задаче
  attachments?: Attachment[]; // Прикрепленные файлы
}

// Интерфейс для результатов поиска
export interface SearchResults {
  tasks?: Task[];        // Найденные задачи
  projects?: Project[];  // Найденные проекты
  users?: User[];       // Найденные пользователи
}

// Интерфейс для команды
export interface Team {
  teamId: number;                 // Идентификатор команды
  teamName: string;               // Название команды
  productOwnerUserId?: number;    // ID владельца продукта
  projectManagerUserId?: number;  // ID руководителя проекта
}

// Создание API с помощью Redux Toolkit Query
export const api = createApi({
  // Настройка базового запроса
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    // Подготовка заголовков с токеном авторизации
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { accessToken } = session.tokens ?? {};
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  // Определение тегов для кэширования
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  
  // Определение эндпоинтов API
  endpoints: (build) => ({
    // Получение данных авторизованного пользователя
    getAuthUser: build.query({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser();
          const session = await fetchAuthSession();
          if (!session) throw new Error("No session found");
          const { userSub } = session;
          const { accessToken } = session.tokens ?? {};

          const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);
          const userDetails = userDetailsResponse.data as User;

          return { data: { user, userSub, userDetails } };
        } catch (error: any) {
          return { error: error.message || "Could not fetch user data" };
        }
      },
    }),

    // Получение списка проектов
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    // Создание нового проекта
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    // Получение задач проекта
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    // Получение задач пользователя
    getTasksByUser: build.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),

    // Создание новой задачи
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    // Обновление статуса задачи
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),

    // Получение списка пользователей
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    // Получение списка команд
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),

    // Поиск по проектам, задачам и пользователям
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),
  }),
});

// Экспорт хуков для использования API
export const {
  useGetProjectsQuery,        // Получение проектов
  useCreateProjectMutation,   // Создание проекта
  useGetTasksQuery,          // Получение задач
  useCreateTaskMutation,     // Создание задачи
  useUpdateTaskStatusMutation, // Обновление статуса задачи
  useSearchQuery,            // Поиск
  useGetUsersQuery,          // Получение пользователей
  useGetTeamsQuery,          // Получение команд
  useGetTasksByUserQuery,    // Получение задач пользователя
  useGetAuthUserQuery,       // Получение авторизованного пользователя
} = api;
