import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  allowSynchronousEvents: true, // Разрешает эмитить события синхронно. true — вызываются сразу в текущем event loop. false — через setImmediate().
  autoPong: true, // Автоматически отвечает на ping фреймы pong-ом.
  maxPayload: 100 * 1024 * 1024, // Максимальный размер входящего сообщения (в байтах). Обычно ставят 1–2MB максимум.
  skipUTF8Validation: false, // Отключает проверку на корректность UTF-8 для текстовых сообщений.
  perMessageDeflate: false, // Включает сжатие сообщений. true — меньше трафика, но больше CPU и возможные memory spikes.
  handleProtocols: null, // Функция выбора subprotocol при handshake.
  clientTracking: true, // Хранит подключённых клиентов в wss.clients (Set).
  closeTimeout: CLOSE_TIMEOUT, // Таймаут (мс) ожидания корректного закрытия соединения.
  verifyClient: null, // Устаревающий способ авторизации на этапе handshake.
  noServer: false, // Не создаёт HTTP сервер. Используется при ручном server.on("upgrade").
  backlog: null, // Размер очереди TCP pending соединений. Почти никогда не трогают.
  server: null, // Существующий HTTP сервер (http.createServer). Если указан — WebSocket работает поверх него.
  host: null, // IP-адрес для bind (например "0.0.0.0"). Если null — используется значение по умолчанию.
  path: null, // Ограничивает endpoint WebSocket (например "/ws").
  port: null, // Порт для bind, если не используется server.
  WebSocket, // Кастомная реализация WebSocket (редкий случай). Обычно не трогается.
  ...options // Позволяет переопределить любые параметры извне.
})

wss.clients // Set всех активных WebSocket-соединений (если clientTracking: true). Используется для broadcast. Тип: Set<WebSocket>.
wss.options // Объект конфигурации, с которым был создан сервер.
wss.path // Путь (endpoint), на котором сервер принимает WS-соединения.

wss.addListener(event, listener) // Alias для wss.on().
wss.on(event, listener) // Регистрирует обработчик события ("connection", "close", "error" и др).
wss.once(event, listener) // Обработчик выполнится один раз и автоматически удалится.
wss.off(event, listener) // Alias для removeListener().
wss.removeListener(event, listener) // Удаляет конкретный listener.
wss.removeAllListeners(event?) // Удаляет все listeners для указанного события или вообще все, если event не указан.
wss.emit(event, ...args) // Вручную вызывает событие.
wss.eventNames() // Возвращает массив названий зарегистрированных событий.
wss.listeners(event) // Возвращает массив текущих обработчиков события.
wss.rawListeners(event) // Возвращает оригинальные listeners (включая обёртки once).
wss.listenerCount(event) // Возвращает количество обработчиков для события.
wss.getMaxListeners() // Возвращает текущий лимит listeners (по умолчанию 10).
wss.setMaxListeners(n) // Устанавливает лимит listeners. Нужно, если появляется warning о memory leak.
wss.prependListener(event, listener) // Добавляет обработчик В НАЧАЛО списка listeners.
wss.prependOnceListener(event, listener) // То же самое, но выполнится один раз и удалится.
wss.address() // Возвращает адрес, на котором слушает сервер.
wss.close(callback?) // Закрывает сервер и все соединения.
wss.handleUpgrade(request, socket, head, callback) // Ручная обработка HTTP upgrade (если noServer: true).
wss.shouldHandle(request) // Проверяет, должен ли сервер принять upgrade-запрос.

wss.on("connection", (ws) => {
  ws.readyState // Текущее состояние соединения. // 0 CONNECTING // 1 OPEN // 2 CLOSING // 3 CLOSED
  ws.OPEN; ws.CLOSED; ws.CLOSING; ws.CONNECTING // Константы состояний (числовые значения).
  ws.protocol // Выбранный subprotocol (если использовался при handshake).
  ws.extensions // Активированные WebSocket extensions (например permessage-deflate).
  ws.bufferedAmount // Количество байт, ожидающих отправки. Используется для контроля backpressure.
  ws.binaryType // Тип бинарных данных: "nodebuffer", "arraybuffer", "fragments".

  ws.send(data, options?, callback?) // Отправляет сообщение клиенту.
  ws.close(code?, reason?) // Корректно закрывает соединение.
  ws.terminate() // Немедленно разрывает соединение без handshake.
  ws.ping(data?, mask?, callback?) // Отправляет ping-фрейм клиенту.
  ws.pong(data?, mask?, callback?) // Отправляет pong вручную (если autoPong: false).
  ws.on("message", (data, isBinary) => {}) // Срабатывает при получении сообщения.
  ws.on("close", (code, reason) => {}) // Соединение закрыто.
  ws.on("error", (err) => {}) // Ошибка сокета.
  ws.on("ping", (data) => {}) // Получен ping от клиента.
  ws.on("pong", (data) => {}) // Получен pong от клиента.
  ws.on("open", () => {}) // На сервере почти не используется (актуально на клиенте).

  ws.on(event, listener) // Подписка на событие.
  ws.once(event, listener) // Одноразовый listener.
  ws.off(event, listener) // Удаляет listener.
  ws.removeListener(event, listener) // Удаляет конкретный обработчик.
  ws.removeAllListeners(event?) // Удаляет все listeners.
  ws.emit(event, ...args) // Вручную вызывает событие.
  ws.listenerCount(event) // Количество listeners.
  ws.setMaxListeners(n) // Устанавливает лимит listeners.
  ws.getMaxListeners() // Возвращает лимит listeners.
  ws.prependListener(event, listener) // Добавляет listener в начало очереди.
  ws.prependOnceListener(event, listener) // То же самое, но одноразовый.
  ws.rawListeners(event) // Возвращает массив raw listeners.
  ws.eventNames() // Список событий, на которые есть подписки.
});