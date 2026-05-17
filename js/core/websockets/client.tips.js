const socket = new WebSocket("ws://localhost:8080", protocols?);

socket.url; // URL соединения
socket.protocol; // Используемый subprotocol (если указан при создании WebSocket)
socket.readyState; // Текущее состояние соединения 0 — CONNECTING 1 — OPEN 2 — CLOSING 3 — CLOSED
socket.binaryType; // Тип бинарных данных "blob" или "arraybuffer"
socket.bufferedAmount; // Количество байт, ожидающих отправки
socket.extensions; // Используемые расширения протокола

socket.onopen = (event) => {}; // Соединение установлено
socket.onmessage = (event) => {}; // Получено сообщение от сервера
socket.onerror = (error) => {}; // Ошибка соединения
socket.onclose = (event) => {}; // Соединение закрыто

socket.close(code?, reason?); // Закрывает соединение code — статус закрытия (например 1000), reason — причина закрытия
socket.addEventListener(type, listener, options?); // Добавляет обработчик события
socket.removeEventListener(type, listener); // Удаляет обработчик события
socket.dispatchEvent(event); // Вызывает событие вручную
socket.send(data); // Отправляет данные на сервер string, Blob, ArrayBuffer, TypedArray