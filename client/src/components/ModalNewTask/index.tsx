import Modal from "@/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

/**
 * Пропсы компонента ModalNewTask
 * @param isOpen - Флаг, определяющий открыто ли модальное окно
 * @param onClose - Функция для закрытия модального окна
 * @param id - Опциональный ID проекта (если создаем задачу внутри проекта)
 */
type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

/**
 * Компонент модального окна для создания новой задачи
 * Позволяет пользователю заполнить все необходимые поля для создания задачи
 */
const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  // Мутация для создания новой задачи
  const [createTask, { isLoading }] = useCreateTaskMutation();

  // Состояния для всех полей формы
  const [title, setTitle] = useState(""); // Заголовок задачи
  const [description, setDescription] = useState(""); // Описание задачи
  const [status, setStatus] = useState<Status>(Status.ToDo); // Статус задачи
  const [priority, setPriority] = useState<Priority>(Priority.Backlog); // Приоритет задачи
  const [tags, setTags] = useState(""); // Теги задачи
  const [startDate, setStartDate] = useState(""); // Дата начала
  const [dueDate, setDueDate] = useState(""); // Дата окончания
  const [authorUserId, setAuthorUserId] = useState(""); // ID автора
  const [assignedUserId, setAssignedUserId] = useState(""); // ID назначенного пользователя
  const [projectId, setProjectId] = useState(""); // ID проекта (если не передан через пропсы)

  /**
   * Обработчик отправки формы
   * Форматирует даты и отправляет запрос на создание задачи
   */
  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: id !== null ? Number(id) : Number(projectId),
    });
  };

  /**
   * Проверяет валидность формы
   * @returns {boolean} - true если форма валидна, false если нет
   */
  const isFormValid = () => {
    return title && authorUserId && !(id !== null || projectId);
  };

  // Стили для элементов формы
  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      {/* Форма создания задачи */}
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Поле ввода заголовка задачи */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Поле ввода описания задачи */}
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Секция с выпадающими списками статуса и приоритета */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          {/* Выпадающий список статуса задачи */}
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>
          {/* Выпадающий список приоритета задачи */}
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>
        {/* Поле ввода тегов */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Секция с датами начала и окончания */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          {/* Дата начала задачи */}
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {/* Дата окончания задачи */}
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {/* Поле ввода ID автора */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        {/* Поле ввода ID назначенного пользователя */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {/* Поле ввода ID проекта (отображается только если id не передан через пропсы) */}
        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="ProjectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        {/* Кнопка создания задачи */}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
