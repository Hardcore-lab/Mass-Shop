# Mass-Shop

<p align="center">
  <a href="#русский">Русский</a> | <a href="#english">English</a>
</p>

## Русский

Интернет-магазин спортивного питания и товаров для бодибилдинга на базе
[EverShop](https://evershop.io/) с кастомной темой Eve.

### Возможности

- каталог товаров и категорий;
- карточки товаров;
- витрина на главной странице;
- корзина и оформление заказа;
- административная панель EverShop;
- интерфейс на русском языке;
- цены в рублях;
- кастомные хлебные крошки.

### Технологии

- Node.js;
- EverShop 1.2;
- PostgreSQL;
- React;
- SCSS;
- Tailwind CSS.

### Требования

- Node.js 18 или новее;
- npm;
- PostgreSQL;
- доступ к базе данных PostgreSQL.

### Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/Hardcore-lab/Mass-Shop.git
   cd Mass-Shop
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Создайте `.env` в корне проекта:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mass_shop
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_SSLMODE=false
   PORT=3000
   ```

   Файл `.env` исключён из Git через `.gitignore`. Не публикуйте реальные
   пароли и другие секреты.

4. Инициализируйте EverShop и базу данных:

   ```bash
   npm run setup
   ```

5. Соберите проект:

   ```bash
   npm run build
   ```

6. Запустите магазин:

   ```bash
   npm start
   ```

По умолчанию приложение доступно по адресу `http://localhost:3000`.

Для разработки с автоматическим обновлением:

```bash
npm run dev
```

### Команды npm

| Команда | Назначение |
| --- | --- |
| `npm run setup` | Установка EverShop и подготовка базы данных |
| `npm run build` | Сборка приложения |
| `npm start` | Запуск собранного приложения |
| `npm run dev` | Запуск в режиме разработки |
| `npm run start:debug` | Запуск с отладочным режимом |
| `npm run user:create` | Создание пользователя админ-панели |
| `npm run user:changePassword` | Смена пароля пользователя |

### Структура проекта

```text
.
├── config/              # Общие настройки магазина
├── extensions/          # Расширения EverShop
├── schema               # Схема базы данных
├── themes/eve/          # Кастомная тема магазина
├── evershop.config.js   # Конфигурация темы и модулей
├── package.json         # Зависимости и команды npm
└── package-lock.json    # Зафиксированные версии зависимостей
```

### Конфигурация магазина

Основные настройки находятся в `config/default.json`:

- тема: `eve`;
- валюта: RUB;
- символ валюты: ₽;
- положение символа: после суммы.

Дополнительные настройки модулей находятся в `evershop.config.js`.

### Конфигурация базы данных

Подключение к PostgreSQL задаётся переменными окружения:

- `DB_HOST`;
- `DB_PORT`;
- `DB_NAME`;
- `DB_USER`;
- `DB_PASSWORD`;
- `DB_SSLMODE`.

Порт приложения задаётся переменной `PORT`.

### Разработка темы

Файлы темы Eve находятся в `themes/eve/`:

- `themes/eve/pages/all/` — общий макет, меню, логотип и подвал;
- `themes/eve/pages/homepage/` — главная страница;
- `themes/eve/components/` — переиспользуемые компоненты;
- `themes/eve/css/` — глобальные стили;
- `themes/eve/public/` — изображения темы.

---

## English

An e-commerce store for sports nutrition and bodybuilding products built with
[EverShop](https://evershop.io/) and a custom Eve theme.

### Features

- product catalog and categories;
- product pages;
- homepage storefront;
- shopping cart and checkout;
- EverShop administration panel;
- Russian-language interface;
- RUB currency support;
- custom breadcrumbs.

### Technology stack

- Node.js;
- EverShop 1.2;
- PostgreSQL;
- React;
- SCSS;
- Tailwind CSS.

### Requirements

- Node.js 18 or newer;
- npm;
- PostgreSQL;
- access to a PostgreSQL database.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hardcore-lab/Mass-Shop.git
   cd Mass-Shop
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mass_shop
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_SSLMODE=false
   PORT=3000
   ```

   The `.env` file is excluded from Git through `.gitignore`. Never commit
   real passwords or any other secrets.

4. Initialize EverShop and the database:

   ```bash
   npm run setup
   ```

5. Build the project:

   ```bash
   npm run build
   ```

6. Start the store:

   ```bash
   npm start
   ```

The application is usually available at `http://localhost:3000`.

For development with automatic rebuilding:

```bash
npm run dev
```

### npm commands

| Command | Purpose |
| --- | --- |
| `npm run setup` | Install EverShop and prepare the database |
| `npm run build` | Build the application |
| `npm start` | Start the built application |
| `npm run dev` | Start in development mode |
| `npm run start:debug` | Start with debugging enabled |
| `npm run user:create` | Create an administration user |
| `npm run user:changePassword` | Change an administration user's password |

### Project structure

```text
.
├── config/              # Shared store settings
├── extensions/          # EverShop extensions
├── schema               # Database schema
├── themes/eve/          # Custom store theme
├── evershop.config.js   # Theme and module configuration
├── package.json         # Dependencies and npm commands
└── package-lock.json    # Locked dependency versions
```

### Store configuration

The main settings are located in `config/default.json`:

- theme: `eve`;
- currency: RUB;
- currency symbol: ₽;
- symbol position: after the amount.

Additional module settings are configured in `evershop.config.js`.

### Database configuration

Database connection settings are provided through environment variables:

- `DB_HOST`;
- `DB_PORT`;
- `DB_NAME`;
- `DB_USER`;
- `DB_PASSWORD`;
- `DB_SSLMODE`.

The application port is configured with `PORT`.

### Theme development

The Eve theme files are located in `themes/eve/`:

- `themes/eve/pages/all/` — shared layout, menu, logo, and footer;
- `themes/eve/pages/homepage/` — homepage;
- `themes/eve/components/` — reusable components;
- `themes/eve/css/` — global styles;
- `themes/eve/public/` — theme images.
