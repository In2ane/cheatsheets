# Event Loop в Node.js

Когда ты запускаешь `node index.js`:

1. Выполняется весь синхронный код — регистрируются таймеры, промисы, I/O
2. Call stack опустел → дренируется nextTick и Promise queue
3. Event loop стартует и крутится по фазам пока есть что делать
4. Нечего делать → процесс завершается

> Синхронный код выполняется **до** старта event loop — он не является частью ни одной фазы.

---

## Microtask queue — вне фаз, выше всех

Это не фаза event loop, а отдельная очередь с особым приоритетом.

**Порядок внутри microtask queue:**

| Приоритет | Что |
|-----------|-----|
| 1-й | `process.nextTick()` |
| 2-й | `Promise.then()`, `async/await`, `queueMicrotask` |

**Правило:** после каждого выполненного колбэка в любой фазе Node.js полностью дренирует microtask queue (сначала все nextTick, потом все Promise) — и только потом берёт следующий колбэк или переходит в следующую фазу.

```js
setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
process.nextTick(() => console.log('nextTick'));
console.log('sync');

// Вывод:
// sync
// nextTick
// Promise
// setTimeout
```

### Важно про nextTick

`process.nextTick` — это Node.js специфика, в браузере его нет.

Если зарегистрировать nextTick внутри Promise-колбэка — он выполнится до следующего Promise-колбэка:

```js
Promise.resolve().then(() => {
  console.log('promise 1');
  process.nextTick(() => console.log('nextTick внутри promise')); // вклинится сразу
});

Promise.resolve().then(() => console.log('promise 2'));

// Вывод:
// promise 1
// nextTick внутри promise
// promise 2
```

---

## 6 фаз event loop

```
timers → pending callbacks → idle/prepare → poll → check → close callbacks
                                                ↑
                              (между каждым колбэком: nextTick → Promise)
```

### Фаза 1 — timers

Выполняются колбэки `setTimeout` и `setInterval` у которых истёк порог времени.

**Почему таймер срабатывает позже указанного времени:**
- Event loop ещё не дошёл до этой фазы (застрял в poll)
- Синхронный код заблокировал поток
- `setTimeout(fn, 0)` имеет минимальный порог ~1мс
- Перед выполнением дренируется microtask queue

```js
setTimeout(() => console.log('таймер'), 100);

// блокируем поток на 300мс
const start = Date.now();
while (Date.now() - start < 300) {}

// таймер сработает только здесь — через ~300мс, не через 100
```

> `setTimeout` — это *минимальная* задержка, не точная.

### Фаза 2 — pending callbacks

Системные ошибки I/O из предыдущей итерации (например ошибка TCP-соединения). Редко используется напрямую.

### Фазы 3–4 — idle, prepare

Внутреннее использование libuv. Недоступны из JS.

### Фаза 5 — poll ⭐ самая важная

Здесь Node.js получает и выполняет I/O события — чтение файлов, сетевые запросы, HTTP.

Если очередь пуста и нет pending timers — цикл **блокируется здесь** и ждёт новых событий. Именно это делает Node.js эффективным.

### Фаза 6 — check

Выполняются колбэки `setImmediate`.

Всегда после poll — поэтому **внутри I/O-колбэка** `setImmediate` гарантированно сработает раньше `setTimeout(fn, 0)`.

### Фаза 7 — close callbacks

Закрытие сокетов и стримов: `socket.on('close', ...)`.

---

## Отличия от браузера

| | Браузер | Node.js |
|---|---------|---------|
| Внешние API | Web API | libuv (C++) |
| Macrotask | одна очередь | 6 фаз |
| Highest priority | `Promise` | `process.nextTick` |
| `setImmediate` | не стандартизирован | отдельная фаза check |

```
Браузер:  sync → microtasks → macrotask → microtasks → macrotask...

Node.js:  sync → nextTick → Promise → [timers → nextTick → Promise
                                       → poll → nextTick → Promise
                                       → check → ...]
```

---

## Зачем это знать на практике

### 1. Событие успело сработать до обработчика

```js
const EventEmitter = require('events');

function doWork() {
  const emitter = new EventEmitter();
  emitter.emit('done'); // событие эмитится синхронно — обработчика ещё нет
  return emitter;
}

const emitter = doWork();
emitter.on('done', () => console.log('готово')); // никогда не выполнится
```

**Фикс через `process.nextTick`:**

```js
function doWork() {
  const emitter = new EventEmitter();
  process.nextTick(() => emitter.emit('done')); // откладываем до после синхронного кода
  return emitter;
}

const emitter = doWork();
emitter.on('done', () => console.log('готово')); // работает ✓
```

### 2. Синхронный код блокирует все запросы

```js
app.get('/data', (req, res) => {
  const result = heavyCalculation(); // 500мс синхронной работы — все остальные запросы висят
  res.json(result);
});
```

Пока работает синхронный код — event loop заморожен. Решение: выносить тяжёлую работу в worker threads или разбивать через `setImmediate`.

### 3. Тесты падают по непонятным причинам

```js
it('должен вызвать колбэк', () => {
  let called = false;
  fetchData(() => { called = true; });
  expect(called).toBe(true); // падает — колбэк асинхронный, ещё не выполнился
});
```

---

## Шпаргалка — порядок вывода

Если в коде встречаются вместе:

```
1. синхронный код
2. process.nextTick()
3. Promise.then()
4. setImmediate()        ← внутри I/O: всегда раньше setTimeout
5. setTimeout(fn, 0)     ← вне I/O: порядок с setImmediate не гарантирован
```

### Как понять что функция асинхронная

- Принимает колбэк → асинхронная
- Возвращает Promise → асинхронная
- Работает с внешним миром (файлы, сеть, БД, таймеры) → асинхронная
- Только JS внутри (математика, строки, массивы) → синхронная