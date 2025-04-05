import { Project } from "@/state/api";
import React from "react";

/**
 * Интерфейс пропсов для компонента ProjectCard
 * @interface Props
 * @property {Project} project - Объект проекта, содержащий информацию о проекте
 */
type Props = {
  project: Project;
};

/**
 * Компонент ProjectCard - отображает карточку проекта с основной информацией
 * @param {Props} props - Пропсы компонента
 * @returns {JSX.Element} Карточка проекта
 */
const ProjectCard = ({ project }: Props) => {
  return (
    // Контейнер карточки с тенью и закругленными углами
    <div className="rounded border p-4 shadow">
      {/* Название проекта */}
      <h3>{project.name}</h3>
      {/* Описание проекта */}
      <p>{project.description}</p>
      {/* Дата начала проекта */}
      <p>Дата начала: {project.startDate}</p>
      {/* Дата окончания проекта */}
      <p>Дата окончания: {project.endDate}</p>
    </div>
  );
};

export default ProjectCard;
