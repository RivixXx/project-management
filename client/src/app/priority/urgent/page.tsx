import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

/**
 * @description Компонент страницы для отображения задач с высоким приоритетом
 * @component Urgent
 * @returns {JSX.Element} Компонент ReusablePriorityPage с установленным приоритетом Urgent
 */

// Используем переиспользуемый компонент для отображения задач,
// передавая ему параметр Priority.Urgent для фильтрации задач по приоритету
const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;
