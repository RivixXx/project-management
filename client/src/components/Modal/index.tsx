import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header";
import { X } from "lucide-react";

// Определение типа пропсов для компонента Modal
type Props = {
  children: React.ReactNode;  // Дочерние элементы, которые будут отображаться внутри модального окна
  isOpen: boolean;           // Флаг, определяющий видимость модального окна
  onClose: () => void;      // Функция обратного вызова для закрытия модального окна
  name: string;             // Заголовок модального окна
};

/**
 * Компонент Modal - переиспользуемое модальное окно
 * @param children - Содержимое модального окна
 * @param isOpen - Состояние видимости модального окна
 * @param onClose - Функция для закрытия модального окна
 * @param name - Заголовок модального окна
 */
const Modal = ({ children, isOpen, onClose, name }: Props) => {
  // Если модальное окно закрыто, не рендерим ничего
  if (!isOpen) return null;

  // Используем портал для рендеринга модального окна в конец body
  return ReactDOM.createPortal(
    // Затемненный фон и центрирование содержимого
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      {/* Контейнер модального окна */}
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
        {/* Шапка модального окна с заголовком и кнопкой закрытия */}
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {/* Содержимое модального окна */}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
