"use client";

import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

/**
 * Константы для определения колонок таблицы задач
 * @type {GridColDef[]}
 */
const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Название", width: 200 },
  { field: "status", headerName: "Статус", width: 150 },
  { field: "priority", headerName: "Приоритет", width: 150 },
  { field: "dueDate", headerName: "Срок", width: 150 },
];

/** Цветовая палитра для графиков */
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

/**
 * Компонент домашней страницы с дашбордом управления проектами
 * Отображает распределение задач по приоритетам, статусы проектов и список задач
 * @component
 * @returns {JSX.Element} Компонент домашней страницы
 */
const HomePage = () => {
  /**
   * Получение списка задач с помощью RTK Query
   * @type {Object}
   * @property {Task[]} data - Массив задач
   * @property {boolean} isLoading - Флаг загрузки
   * @property {boolean} isError - Флаг ошибки
   */
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });

  /**
   * Получение списка проектов с помощью RTK Query
   * @type {Object}
   * @property {Project[]} data - Массив проектов
   * @property {boolean} isLoading - Флаг загрузки
   */
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  /** Получение текущей темы из Redux store */
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Обработка состояний загрузки и ошибок
  if (tasksLoading || isProjectsLoading) return <div>Загрузка...</div>;
  if (tasksError || !tasks || !projects) return <div>Ошибка при получении данных</div>;

  /** 
   * Подсчет количества задач по приоритетам
   * @type {Record<string, number>}
   */
  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );

  /**
   * Преобразование данных о приоритетах для отображения в графике
   * @type {Array<{name: string, count: number}>}
   */
  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  /**
   * Подсчет количества проектов по статусам (завершенные/активные)
   * @type {Record<string, number>}
   */
  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Завершён" : "Активный";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  /**
   * Преобразование данных о статусах проектов для отображения в графике
   * @type {Array<{name: string, count: number}>}
   */
  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  /**
   * Настройка цветов графиков в зависимости от темы
   * @type {{bar: string, barGrid: string, pieFill: string, text: string}}
   */
  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name="Панель управления проектами" />
      {/* Основной контейнер с графиками и таблицей */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* График распределения задач по приоритетам */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Распределение задач по приоритетам
          </h3>
          {/* Столбчатая диаграмма с адаптивным размером */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Круговая диаграмма статусов проектов */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Статусы проектов
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Таблица задач с возможностью выбора */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Ваши задачи
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
