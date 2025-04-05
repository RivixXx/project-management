"use client"; // Указывает Next.js, что это клиентский компонент

// Импорт необходимых зависимостей и компонентов
import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";    // Заголовок проекта
import Board from "../BoardView";      // Компонент для отображения канбан-доски
import List from "../ListView";        // Компонент для отображения списка задач
import Timeline from "../TimelineView"; // Компонент для отображения временной шкалы
import Table from "../TableView";      // Компонент для отображения таблицы задач
import ModalNewTask from "@/components/ModalNewTask"; // Модальное окно создания задачи

// Определение типа входных параметров компонента
type Props = {
  params: { id: string }; // ID проекта из URL
};

// Основной компонент страницы проекта
const Project = ({ params }: Props) => {
  // Получаем ID проекта из параметров
  const { id } = params;

  // Состояние для отслеживания активной вкладки (Board, List, Timeline, Table)
  const [activeTab, setActiveTab] = useState("Board");

  // Состояние для управления видимостью модального окна создания задачи
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Модальное окно создания новой задачи */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />

      {/* Заголовок проекта с переключателем видов */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Условный рендеринг компонентов в зависимости от выбранной вкладки */}
      
      {/* Канбан-доска */}
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

      {/* Список задач */}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

      {/* Временная шкала */}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

      {/* Табличное представление */}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
