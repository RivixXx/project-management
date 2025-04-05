import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

/**
 * Интерфейс пропсов для компонента UserCard
 * @typedef {Object} Props
 * @property {User} user - Объект пользователя, содержащий информацию для отображения
 */
type Props = {
  user: User;
};

/**
 * Компонент для отображения карточки пользователя
 * @param {Props} props - Пропсы компонента
 * @param {User} props.user - Объект с данными пользователя
 * @returns {JSX.Element} Карточка пользователя с фото профиля и информацией
 */
const UserCard = ({ user }: Props) => {
  return (
    // Контейнер карточки с flexbox-разметкой и стилями
    <div className="flex items-center rounded border p-4 shadow">
      {/* Условный рендеринг изображения профиля */}
      {user.profilePictureUrl && (
        <Image
          src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/p1.jpeg`}
          alt="фото профиля"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      {/* Контейнер для информации о пользователе */}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
