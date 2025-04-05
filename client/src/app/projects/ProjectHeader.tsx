import Header from "@/components/Header";
import {
  Clock,
  Filter,
  Grid3x3,
  List,
  PlusSquare,
  Share2,
  Table,
} from "lucide-react";
import React, { useState } from "react";
import ModalNewProject from "./ModalNewProject";

// Определение типов пропсов для компонента
type Props = {
  activeTab: string; // Текущая активная вкладка
  setActiveTab: (tabName: string) => void; // Функция для изменения активной вкладки
};

// Основной компонент заголовка проекта
const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  // Состояние для управления модальным окном создания нового проекта
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      {/* Модальное окно создания нового проекта */}
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      
      {/* Верхняя секция с заголовком и кнопкой создания */}
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name="Разработка дизайна продукта"  
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" /> Новый проект
            </button>
          }
        />
      </div>

      {/* Секция с вкладками и инструментами */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        {/* Группа вкладок навигации */}
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Доска"
            icon={<Grid3x3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Список"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Временная шкала"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Таблица"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        
        {/* Группа инструментов (фильтр, поделиться, поиск) */}
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          {/* Поле поиска с иконкой */}
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск задачи"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Определение типов пропсов для компонента вкладки
type TabButtonProps = {
  name: string; // Название вкладки
  icon: React.ReactNode; // Иконка вкладки
  setActiveTab: (tabName: string) => void; // Функция изменения активной вкладки
  activeTab: string; // Текущая активная вкладка
};

// Компонент кнопки вкладки
const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  // Проверка, является ли данная вкладка активной
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
