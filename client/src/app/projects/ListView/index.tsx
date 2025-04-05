import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

/**
 * Компонент ListView - отображает список задач проекта в виде сетки карточек
 * @param id - идентификатор проекта
 * @param setIsModalNewTaskOpen - функция для открытия/закрытия модального окна создания задачи
 */
const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  // Получение данных о задачах с помощью RTK Query
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  // Отображение состояния загрузки
  if (isLoading) return <div>Loading...</div>;
  // Отображение ошибки при неудачном запросе
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    // Основной контейнер с отступами
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        {/* Компонент заголовка с кнопкой добавления задачи */}
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      {/* Сетка карточек задач с адаптивной версткой */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {/* Маппинг массива задач в компоненты TaskCard */}
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
