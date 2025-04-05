/**
 * Переиспользуемая страница для отображения задач по приоритету
 * @module ReusablePriorityPage
 */

"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import {
  Priority,
  Task,
  useGetAuthUserQuery,
  useGetTasksByUserQuery,
} from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";

/**
 * Входные параметры компонента
 * @typedef {Object} Props
 * @property {Priority} priority - Приоритет для фильтрации задач
 */
type Props = {
  priority: Priority;
};

/**
 * Конфигурация колонок для таблицы задач
 * @type {GridColDef[]}
 */
const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Название",
    width: 100,
  },
  {
    field: "description",
    headerName: "Описание",
    width: 200,
  },
  {
    field: "status",
    headerName: "Статус",
    width: 130,
    // Кастомный рендеринг ячейки для статуса с цветовым индикатором
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Приоритет",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Теги",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Дата начала",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Срок выполнения",
    width: 130,
  },
  {
    field: "author",
    headerName: "Автор",
    width: 150,
    // Кастомный рендеринг для отображения имени автора
    renderCell: (params) => params.value.username || "Неизвестно",
  },
  {
    field: "assignee",
    headerName: "Исполнитель",
    width: 150,
    // Кастомный рендеринг для отображения имени исполнителя
    renderCell: (params) => params.value.username || "Не назначен",
  },
];

/**
 * Компонент страницы для отображения задач определенного приоритета
 * Поддерживает два режима отображения: список и таблица
 * 
 * @param {Props} props - Входные параметры компонента
 * @returns {JSX.Element} Отрендеренный компонент
 */
const ReusablePriorityPage = ({ priority }: Props) => {
  // Состояние для переключения между режимами отображения (список/таблица)
  const [view, setView] = useState("list");
  // Состояние для управления модальным окном создания новой задачи
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  // Получение данных текущего пользователя
  const { data: currentUser } = useGetAuthUserQuery({});
  const userId = currentUser?.userDetails?.userId ?? null;
  
  // Получение задач пользователя с помощью RTK Query
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null, // Пропускаем запрос, если нет userId
  });

  // Получение настройки темной темы из Redux store
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Фильтрация задач по выбранному приоритету
  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      {/* Модальное окно для создания новой задачи */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      
      {/* Заголовок страницы с кнопкой добавления задачи */}
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Добавить задачу
          </button>
        }
      />

      {/* Переключатель режимов отображения (список/таблица) */}
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")}
        >
          Список
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("table")}
        >
          Таблица
        </button>
      </div>

      {/* Условный рендеринг содержимого в зависимости от состояния загрузки и выбранного режима */}
      {isLoading ? (
        <div>Загрузка задач...</div>
      ) : view === "list" ? (
        // Отображение задач в виде карточек
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        // Отображение задач в виде таблицы
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
