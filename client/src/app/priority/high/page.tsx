import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

/**
 * @description Компонент страницы для отображения задач с высоким приоритетом
 * @component High
 * @returns {JSX.Element} Компонент ReusablePriorityPage с установленным приоритетом High
 */

// Используем переиспользуемый компонент для отображения задач,
// передавая ему параметр Priority.High для фильтрации задач по приоритету

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default Urgent;
