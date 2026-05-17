# Multistage build

# Фаза base, по сути прост задает начальные параметры

# берем образ
FROM node:lts-alpine AS base
# задаем рабочую директорию
WORKDIR /var/www/backend
# копируем package.json и package-lock.json в корень рабочей директории
COPY package*.json ./

# Фаза dev

# берем образ из фазы base
FROM base AS dev
# задаем ему env переменную, чтоб была возможность различать сборки в docker compose
ENV NODE_ENV=development
# устанавливаем все зависимости, включая dev
RUN npm ci
# копируем все файлы в корень
COPY . .
# это просто метаданные образа. Он говорит другим разработчикам и инструментам: "приложение внутри контейнера слушает этот порт".
EXPOSE 3000
# запускаем команду 
CMD ["npm", "run", "dev"]

# Фаза build, нужна для prod фазы, чтоб сбилдить проект и потом из прод фазы вязть только папку dist, без src
FROM base AS build

RUN npm ci

COPY . .

RUN npm run build

# Фаза prod
FROM base AS prod

ENV NODE_ENV=production
# исключаем дев зависимости
RUN npm ci --omit=dev
# копируем dist из фазы build
COPY --from=build /var/www/backend/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]