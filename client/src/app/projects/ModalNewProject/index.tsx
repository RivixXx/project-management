import Modal from "@/components/Modal";
import { useCreateProjectMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Компонент модального окна для создания нового проекта
 * @param {boolean} isOpen - Состояние видимости модального окна
 * @param {Function} onClose - Функция закрытия модального окна
 */
const ModalNewProject = ({ isOpen, onClose }: Props) => {
  // Хук мутации для создания проекта, возвращает функцию создания и состояние загрузки
  const [createProject, { isLoading }] = useCreateProjectMutation();
  
  // Состояния для управления формой
  const [projectName, setProjectName] = useState(""); // Название проекта
  const [description, setDescription] = useState(""); // Описание проекта
  const [startDate, setStartDate] = useState(""); // Дата начала проекта
  const [endDate, setEndDate] = useState(""); // Дата окончания проекта

  /**
   * Обработчик отправки формы
   * Форматирует даты и отправляет запрос на создание проекта
   */
  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  };

  /**
   * Проверка валидности формы
   * @returns {boolean} - Все ли обязательные поля заполнены
   */
  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  // Стили для всех полей ввода с поддержкой темной темы
  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      {/* Форма с обработкой отправки и предотвращением стандартного поведения браузера */}
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Сетка для полей выбора дат с адаптивной версткой */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {/* Кнопка отправки с состояниями загрузки и валидации */}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
