import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";
/**
  * @description Компонент страницы для отображения задач в бэклоге
  * @component Backlog
  * @returns {JSX.Element} Компонент ReusablePriorityPage с установленным приоритетом Backlog
*/

// Используем переиспользуемый компонент для отображения задач,
// передавая ему параметр Priority.Backlog для фильтрации задач по приоритету   

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Urgent;
