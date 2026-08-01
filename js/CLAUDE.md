# JavaScript / TypeScript — роадмап и прогресс

`[███████░░░░░░░░░░░░░]` **34%**

Легенда и правила ведения — в [корневом CLAUDE.md](../CLAUDE.md).

## Прогресс по разделам

| Раздел | Прогресс |
|---|---|
| Core | `[█████████████░░░░░░░]` 64% |
| TypeScript | `[█░░░░░░░░░░░░░░░░░░░]` 7% |
| Node.js | `[████░░░░░░░░░░░░░░░░]` 22% |
| Браузер и сеть | `[███░░░░░░░░░░░░░░░░░]` 13% |
| Vue | `[██████░░░░░░░░░░░░░░]` 30% |
| React | `[░░░░░░░░░░░░░░░░░░░░]` 0% |
| Инструменты сборки | `[████░░░░░░░░░░░░░░░░]` 20% |

## Карта заметок

| Файл | О чём |
|---|---|
| [core/notes.md](core/notes.md) | Объекты, замыкания, прототипы, классы, Promise, модули, генераторы |
| [core/tips.js](core/tips.js) | Рабочие сниппеты к теории |
| [core/websockets/](core/websockets/) | WebSocket: клиент и сервер |
| [node/eventloop.md](node/eventloop.md) | Фазы event loop в Node, microtasks |
| [node/streams.md](node/streams.md) | Readable/Writable/Transform, pipe, pipeline |
| [ts/notes.md](ts/notes.md) | Пусто — ждёт наполнения |
| [frameworks/vue/notes.md](frameworks/vue/notes.md) | Создание проекта, реактивность, computed |
| [frameworks/vue/vue-router/](frameworks/vue/vue-router/) | Маршрутизация |
| [frameworks/vue/vitest/](frameworks/vue/vitest/) | describe/it/expect, моки, хуки |
| [bundlers/esbuild/notes.md](bundlers/esbuild/notes.md) | CLI и JS API esbuild |
| [react/](react/) | Пусто |

## Роадмап

### Core

- ✅ Объекты, ссылки, копирование, `Object.assign`
- ✅ rest / spread
- ✅ Замыкания
- ✅ Декораторы, обёртки функций
- ✅ Заимствование методов, `bind` / `call` / `apply`
- ✅ Стрелочные функции и контекст
- ✅ Прототипы, цепочка прототипов
- ✅ Классы, наследование
- ✅ `Promise`
- ✅ Event Loop в браузере
- ✅ Модули ESM
- ✅ Генераторы
- ✅ Debounce / throttle, Singleton
- 🟡 `async` / `await`, обработка ошибок в асинхронном коде
- ⬜ Типы, приведение типов, `==` vs `===`, ловушки
- ⬜ Деструктуризация
- ⬜ `Map` / `Set` / `WeakMap` / `WeakRef`
- ⬜ `Symbol`, `Proxy`, `Reflect`
- ⬜ Обработка ошибок, кастомные Error
- ⬜ Даты, `Intl`
- ⬜ Регулярные выражения

### TypeScript 🎯 самый большой пробел

- 🟡 `tsconfig.json` — файл есть, разбора нет
- ⬜ Базовые типы, литеральные типы, `unknown` vs `any`
- ⬜ `interface` vs `type`, пересечения и объединения
- ⬜ Дженерики, ограничения
- ⬜ Utility types: `Partial`, `Pick`, `Omit`, `Record`, `ReturnType`
- ⬜ Сужение типов, type guards, `satisfies`
- ⬜ Декларации, `.d.ts`, типизация чужих библиотек

### Node.js

- ✅ Event Loop: 6 фаз, microtasks, `nextTick`
- ✅ Streams: 4 типа, `pipe`, `pipeline`, objectMode
- ⬜ CommonJS vs ESM, разрешение модулей
- ⬜ `fs`, `path`, работа с файловой системой
- ⬜ HTTP-сервер без фреймворка
- ⬜ Express: роутинг, middleware, обработка ошибок
- ⬜ `Buffer`, бинарные данные
- ⬜ `child_process`, `worker_threads`, `cluster`
- ⬜ Переменные окружения, конфигурация, логирование

### Браузер и сеть

- 🟡 WebSockets — есть сниппеты клиента и `ws`, теории почти нет
- ⬜ DOM, делегирование событий
- ⬜ `fetch`, CORS, отмена запросов
- ⬜ Хранилища: localStorage, cookies, IndexedDB

### Vue

- ✅ Способы создания проекта
- 🟡 Реактивность: `ref` / `reactive`
- 🟡 `computed` / `watch`
- 🟡 vue-router — только создание экземпляра
- 🟡 Vitest — основы есть, моки поверхностно
- ⬜ Компоненты: props, emits, v-model
- ⬜ Слоты, включая scoped
- ⬜ Composition API и переиспользуемые композаблы
- ⬜ Жизненный цикл компонента
- ⬜ Pinia

### React

- ⬜ JSX, компоненты, рендеринг
- ⬜ Хуки: `useState`, `useEffect`, `useMemo`, `useCallback`, кастомные
- ⬜ Состояние и контекст, подъём состояния
- ⬜ Роутинг

### Инструменты сборки

- ✅ esbuild: CLI и JS API
- ⬜ Vite: конфиг, плагины, dev-сервер
- ⬜ Webpack: лоадеры, плагины
- ⬜ npm / pnpm, `package.json`, семвер, lock-файлы
- ⬜ ESLint, Prettier

## Журнал изучения

| Дата | Тема | Что вышло |
|---|---|---|
| — | Основы JS: объекты, замыкания, прототипы, классы, Promise, модули, генераторы | [core/notes.md](core/notes.md) |
| — | Event loop в Node | [node/eventloop.md](node/eventloop.md) |
| — | Streams | [node/streams.md](node/streams.md) |
| — | esbuild | [bundlers/esbuild/notes.md](bundlers/esbuild/notes.md) |
| — | Vue, vue-router, Vitest | [frameworks/vue/](frameworks/vue/) |
| 2026-08-01 | Заведён роадмап | Этот файл |

## Открытые вопросы / долги

- [ts/notes.md](ts/notes.md) и [core/websockets/notes.md](core/websockets/notes.md) — почти пустые файлы, рядом лежит код без теории.
- Папка [react/](react/) пустая: либо наполнить, либо убрать из роадмапа.
- В [core/notes.md](core/notes.md) код местами без блоков ``` — при следующем проходе оформить.
