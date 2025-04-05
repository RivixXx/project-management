import React from "react";

/**
 * Интерфейс пропсов для компонента Header
 * @interface Props
 * @property {string} name - Текст заголовка
 * @property {any} [buttonComponent] - Опциональный компонент кнопки, который будет отображен справа
 * @property {boolean} [isSmallText] - Флаг для уменьшенного размера текста (по умолчанию false)
 */
type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

/**
 * Компонент заголовка, который отображает текст и опциональную кнопку
 * @param {Props} props - Пропсы компонента
 * @returns {JSX.Element} Компонент заголовка
 */
const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    // Контейнер с отступом снизу и выравниванием элементов
    <div className="mb-5 flex w-full items-center justify-between">
      {/* Заголовок с условным применением стилей размера текста */}
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>
      {/* Рендер опционального компонента кнопки */}
      {buttonComponent}
    </div>
  );
};

export default Header;
