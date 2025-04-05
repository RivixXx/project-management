import Header from "@/components/Header";
import React from "react";

/**
 * Компонент Settings - отображает страницу настроек пользователя
 * с информацией о профиле, включая имя пользователя, email, команду и роль
 */
const Settings = () => {
  // Объект с данными пользователя 
  const userSettings = {
    username: "Михаил",
    email: "mikhail.navicon@example.com",
    teamName: "Технический отдел",
    roleName: "Технический специалист",
  };

  // Стили для элементов формы
  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className="p-8">
      {/* Заголовок страницы */}
      <Header name="Настройки" />
      
      {/* Контейнер для полей настроек */}
      <div className="space-y-4">
        {/* Блок с именем пользователя */}
        <div>
          <label className={labelStyles}>Имя пользователя</label>
          <div className={textStyles}>{userSettings.username}</div>
        </div>
        
        {/* Блок с email пользователя */}
        <div>
          <label className={labelStyles}>Электронная почта</label>
          <div className={textStyles}>{userSettings.email}</div>
        </div>
        
        {/* Блок с названием команды */}
        <div>
          <label className={labelStyles}>Отдел</label>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        
        {/* Блок с ролью пользователя */}
        <div>
          <label className={labelStyles}>Должность</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
