// Указываем, что это клиентский компонент
"use client";

// Импорт необходимых зависимостей и компонентов
import { useGetUsersQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

// Кастомный компонент панели инструментов для DataGrid
// Содержит кнопки фильтрации и экспорта
const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2"> 
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

// Определение колонок для таблицы пользователей
const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Имя пользователя", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Фото профиля",
    width: 100,
    // Кастомный рендер ячейки для отображения аватара пользователя
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

// Основной компонент страницы пользователей
const Users = () => {
  // Получаем данные о пользователях с помощью RTK Query
  const { data: users, isLoading, isError } = useGetUsersQuery();
  // Получаем текущую тему из Redux store
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Обработка состояний загрузки и ошибок
  if (isLoading) return <div>Загрузка...</div>;
  if (isError || !users) return <div>Ошибка при получении данных пользователей</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      {/* Контейнер для таблицы с фиксированной высотой */}
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;
