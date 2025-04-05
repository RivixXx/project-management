import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

/**
 * @description Компонент страницы для отображения задач с низким приоритетом
 * @component Low
 * @returns {JSX.Element} Компонент ReusablePriorityPage с установленным приоритетом Low
 */
      
// Используем переиспользуемый компонент для отображения задач,
// передавая ему параметр Priority.Low для фильтрации задач по приоритету

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Urgent;
