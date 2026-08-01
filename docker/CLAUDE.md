# Docker — роадмап и прогресс

`[██░░░░░░░░░░░░░░░░░░]` **10%**

Легенда и правила ведения — в [корневом CLAUDE.md](../CLAUDE.md).

## Карта заметок

| Файл | О чём |
|---|---|
| [docker.md](docker.md) | Базовые понятия — заготовка |
| [docker-compose.md](docker-compose.md) | Пусто |
| [examples/Dockerfile](examples/Dockerfile) | Пример образа |

## Роадмап

### Основы

- 🟡 Контейнеры vs виртуальные машины, зачем нужен Docker
- 🟡 Образы, слои, кэш сборки
- 🟡 Базовые команды: `run`, `ps`, `stop`, `rm`, `images`, `pull`
- ⬜ Жизненный цикл контейнера, `exec`, `logs`, `inspect`

### Dockerfile

- ⬜ Инструкции: `FROM`, `RUN`, `COPY` vs `ADD`, `WORKDIR`, `CMD` vs `ENTRYPOINT`
- ⬜ `.dockerignore`, порядок слоёв и кэширование
- ⬜ Multi-stage build
- ⬜ Оптимизация размера: alpine, distroless, статические бинарники
- ⬜ `ARG` vs `ENV`, сборочные аргументы
- ⬜ `HEALTHCHECK`, `restart` policy
- ⬜ Запуск от non-root пользователя

### Хранение и сеть

- ⬜ Тома: volume, bind mount, tmpfs
- ⬜ Сети: bridge, host, none, DNS между контейнерами
- ⬜ Проброс портов

### docker-compose

- ⬜ Структура `compose.yaml`, сервисы, зависимости
- ⬜ `depends_on`, `healthcheck`, порядок запуска
- ⬜ Профили, переопределение через override-файлы
- ⬜ Переменные окружения, `.env`, секреты

### Эксплуатация

- ⬜ Реестры: Docker Hub, приватные, `push` / `pull`, теги
- ⬜ Отладка: почему контейнер падает, exit codes
- ⬜ Docker в CI/CD, сборка и публикация образов
- ⬜ Ограничение ресурсов, безопасность, сканирование образов

### Практика

- ⬜ Собрать образ Go-сервиса (multi-stage)
- ⬜ Поднять связку приложение + PostgreSQL через compose
- ⬜ Локальное окружение разработки с hot reload

## Журнал изучения

| Дата | Тема | Что вышло |
|---|---|---|
| — | Первое знакомство | [docker.md](docker.md) |
| 2026-08-01 | Заведён роадмап | Этот файл |

## Открытые вопросы / долги

- [docker-compose.md](docker-compose.md) пустой.
- [docker.md](docker.md) — 13 строк, нужен нормальный проход по основам.
