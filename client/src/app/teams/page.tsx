"use client";
import { useGetTeamsQuery } from "@/state/api";
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
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

/**
 * @description Кастомный тулбар для таблицы команд, содержащий кнопки фильтрации и экспорта
 * @returns {JSX.Element} Компонент тулбара
 */
const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

/**
 * @description Конфигурация колонок для таблицы команд
 * @type {GridColDef[]}
 */
const columns: GridColDef[] = [
  { field: "id", headerName: "ID Команды", width: 100 },
  { field: "teamName", headerName: "Название команды", width: 200 },
  { field: "productOwnerUsername", headerName: "Владелец продукта", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Менеджер проекта",
    width: 200,
  },
];

/**
 * @description Компонент страницы Teams, отображающий список команд в табличном виде
 * @component
 * @returns {JSX.Element} Компонент страницы Teams
 */
const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError || !teams) return <div>Ошибка при загрузке команд</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Команды" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
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

export default Teams;
