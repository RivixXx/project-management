// Константа с базовыми классами для стилизации таблицы данных
export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

// Функция для генерации стилей Material-UI DataGrid с поддержкой темной темы
export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    // Стили для заголовков колонок
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : ""}`,
      // Стили для строк заголовков
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
        borderColor: `${isDarkMode ? "#2d3135" : ""}`,
      },
    },
    // Стили для иконок кнопок
    "& .MuiIconbutton-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    // Стили для компонента пагинации
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    // Стили для иконки выбора в пагинации
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    // Убираем границы у ячеек
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    // Стили для строк таблицы
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "e5e7eb"}`,
    },
    // Общие стили для границ компонента
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "#2d3135" : "e5e7eb"}`,
    },
  };
};
