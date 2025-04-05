"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

/**
 * Компонент Search - отвечает за функционал поиска по задачам, проектам и пользователям
 * Включает в себя поле ввода с debounce эффектом и отображение результатов поиска
 */
const Search = () => {
  // Состояние для хранения поискового запроса
  const [searchTerm, setSearchTerm] = useState("");

  // Получаем результаты поиска с помощью хука useSearchQuery
  // Запрос выполняется только если длина поискового запроса >= 3 символов
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  // Создаем функцию с debounce эффектом для предотвращения частых запросов
  // Задержка 500мс между вводом и отправкой запроса
  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  // Очищаем debounce при размонтировании компонента
  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Поиск" />
      {/* Поле ввода для поиска */}
      <div>
        <input
          type="text"
          placeholder="Поиск..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      {/* Секция с результатами поиска */}
      <div className="p-5">
        {/* Отображение состояния загрузки */}
        {isLoading && <p>Загрузка...</p>}
        {/* Отображение ошибки */}
        {isError && <p>Произошла ошибка при получении результатов поиска.</p>}
        {/* Отображение результатов поиска */}
        {!isLoading && !isError && searchResults && (
          <div>
            {/* Секция с найденными задачами */}
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2>Задачи</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {/* Секция с найденными проектами */}
            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2>Проекты</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* Секция с найденными пользователями */}
            {searchResults.users && searchResults.users?.length > 0 && (
              <h2>Пользователи</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
