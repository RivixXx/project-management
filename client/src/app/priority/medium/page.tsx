import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

/**
 * @description Компонент страницы для отображения задач с средним приоритетом
 * @component Medium
 * @returns {JSX.Element} Компонент ReusablePriorityPage с установленным приоритетом Medium
 */

// Используем переиспользуемый компонент для отображения задач,
// передавая ему параметр Priority.Medium для фильтрации задач по приоритету

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Urgent;
