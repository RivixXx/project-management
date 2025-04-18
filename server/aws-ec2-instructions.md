# Инструкции по настройке EC2

## 1. Подключение к EC2 через EC2 Instance Connect
(Используйте веб-интерфейс AWS для подключения к вашему инстансу)

## 2. Установка Node Version Manager (nvm) и Node.js

- **Переключение на суперпользователя и установка nvm:**
  ```bash
  # Переключаемся на root пользователя для установки системных компонентов
  sudo su -
  ```

  ```bash
  # Скачиваем и устанавливаем nvm (Node Version Manager)
  # nvm позволяет легко управлять разными версиями Node.js
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  ```

- **Активация nvm:**
  ```bash
  # Активируем nvm в текущей сессии
  . ~/.nvm/nvm.sh
  ```

- **Установка последней версии Node.js:**
  ```bash
  # Устанавливаем последнюю стабильную версию Node.js
  nvm install node
  ```

- **Проверка установки Node.js и npm:**
  ```bash
  # Проверяем версию Node.js
  node -v
  ```

  ```bash
  # Проверяем версию npm (менеджер пакетов)
  npm -v
  ```

## 3. Установка Git

- **Обновление системы и установка Git:**
  ```bash
  # Обновляем все системные пакеты
  sudo yum update -y
  ```

  ```bash
  # Устанавливаем Git
  sudo yum install git -y
  ```

- **Проверка версии Git:**
  ```bash
  # Проверяем успешность установки Git
  git --version
  ```

- **Клонирование репозитория с GitHub:**
  ```bash
  # Клонируем ваш проект с GitHub
  git clone [ваша-ссылка-на-github]
  ```

- **Переход в директорию проекта и установка зависимостей:**
  ```bash
  # Переходим в директорию проекта
  cd project-management
  ```

  ```bash
  # Переходим в директорию сервера
  cd server
  ```

  ```bash
  # Устанавливаем все npm зависимости
  npm i
  ```

- **Создание файла окружения и настройка порта:**
  ```bash
  # Создаем .env файл с настройкой порта 80 (стандартный HTTP порт)
  echo "PORT=80" > .env
  ```

- **Запуск приложения:**
  ```bash
  # Запускаем приложение в режиме разработки
  npm run dev
  ```

## 4. Установка pm2 (Менеджер процессов для Node.js)

- **Глобальная установка pm2:**
  ```bash
  # Устанавливаем pm2 глобально для управления Node.js процессами
  npm i pm2 -g
  ```

- **Создание конфигурационного файла pm2 (в директории server):**
  ```javascript
  // Конфигурация для pm2
  module.exports = {
    apps: [{
      name: 'inventory-management',  // Имя приложения
      script: 'npm',                 // Команда для запуска
      args: 'run dev',              // Аргументы команды
      env: {
        NODE_ENV: 'development',     // Окружение
        ENV_VAR1: 'environment-variable', // Дополнительные переменные окружения
      }
    }],
  };
  ```

- **Редактирование конфигурационного файла:**
  ```bash
  # Открываем файл для редактирования в редакторе nano
  nano ecosystem.config.js
  ```

- **Настройка автозапуска pm2:**
  ```bash
  # Настраиваем автоматический перезапуск pm2 при перезагрузке системы
  sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER --hp $(eval echo ~$USER)
  ```

- **Запуск приложения через pm2:**
  ```bash
  # Запускаем приложение используя конфигурацию pm2
  pm2 start ecosystem.config.js
  ```

**Полезные команды pm2:**

- **Остановка всех процессов:**
  ```bash
  # Останавливает все запущенные процессы
  pm2 stop all
  ```

- **Удаление всех процессов:**
  ```bash
  # Удаляет все процессы из управления pm2
  pm2 delete all
  ```

- **Проверка статуса процессов:**
  ```bash
  # Показывает текущий статус всех процессов
  pm2 status
  ```

- **Мониторинг процессов:**
  ```bash
  # Открывает интерактивный монитор процессов
  pm2 monit
  ```

### Важные замечания:
1. Убедитесь, что у вас настроены правила безопасности EC2 (Security Groups) для доступа к порту 80
2. Рекомендуется настроить SSL/TLS для безопасного HTTPS соединения
3. В продакшн окружении следует использовать более безопасные настройки окружения
4. Регулярно обновляйте систему и зависимости для безопасности
