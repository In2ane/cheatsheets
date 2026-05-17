# Создание экземпляра маршрутизатора

Экземпляр маршрутизатора создается путем вызова функции createRouter()

```ts
createRouter({
  routes, // Массив маршрутов приложения (path, component, children и т.д.)
  history, // Стратегия работы с URL: createWebHistory / createWebHashHistory / createMemoryHistory
  linkActiveClass?, // CSS-класс для <router-link> применяется если маршрут активен (частичное совпадение)
  linkExactActiveClass?, // CSS-класс для <router-link> применяется только при точном совпадении маршрута
  scrollBehavior?, // Управляет прокруткой при навигации: (to, from, savedPosition) => position
  parseQuery?, // Кастомный парсер query-строки URL string -> object
  stringifyQuery? // Кастомная сериализация query-параметров object -> string
})
```

Что делает этот плагин:

Глобальная регистрация компонентов RouterView и RouterLink.
Добавление глобальных параметров $router и $route.
Включение composables useRouter() и useRoute().
Запуск маршрутизатора для разрешения начального маршрута.