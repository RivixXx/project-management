// Импорт необходимых зависимостей для работы с задачами, датами и изображениями
import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

// Определение типа props для компонента
type Props = {
  task: Task;
};

/**
 * Компонент TaskCard - отображает карточку задачи со всеми её деталями
 * @param {Task} task - объект задачи, содержащий всю информацию
 */
const TaskCard = ({ task }: Props) => {
  return (
    // Основной контейнер карточки с поддержкой светлой и темной темы
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {/* Секция вложений - отображает прикрепленные файлы, если они есть */}
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}

      {/* Основная информация о задаче */}
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags || "No tags"}
      </p>

      {/* Даты начала и окончания задачи */}
      <p>
        <strong>Start Date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>

      {/* Информация о создателе и исполнителе задачи */}
      <p>
        <strong>Author:</strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;
