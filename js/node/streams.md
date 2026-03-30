# Streams в Node.js

## Зачем нужны

Без стримов весь файл загружается в память целиком:

```js
// ПЛОХО — 2GB файл = 2GB RAM
const file = fs.readFileSync('big-file.mp4');
res.send(file);

// ХОРОШО — в памяти одновременно один chunk (~64KB)
fs.createReadStream('big-file.mp4').pipe(res);
```

Стримы не делают передачу быстрее — они делают **начало ответа быстрее** и **память предсказуемой**.

---

## 4 типа стримов

| Тип | Что делает | Пример |
|-----|-----------|--------|
| Readable | только читаешь | `fs.createReadStream`, `req` |
| Writable | только пишешь | `fs.createWriteStream`, `res` |
| Transform | читаешь → меняешь → пишешь | `zlib.createGzip` |
| Duplex | читаешь и пишешь независимо | TCP сокет, WebSocket |

> Duplex отличается от Transform тем что входные и выходные данные никак не связаны.

---

## pipe

Соединяет readable и writable. Автоматически управляет backpressure:

```js
readable.pipe(writable);

// эквивалентно:
readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk);
  if (!canContinue) {
    readable.pause();
    writable.once('drain', () => readable.resume());
  }
});
```

**Backpressure** — когда readable читает быстрее чем writable успевает записывать. `pipe` приостанавливает readable пока writable не освободится.

---

## pipeline — production замена pipe

`pipe` не propagate ошибки — если один стрим упал, остальные не закрываются автоматически.

```js
const { pipeline } = require('stream/promises');

// ПЛОХО
readable.pipe(transform).pipe(writable);
// если readable упадёт — writable останется открытым

// ХОРОШО
await pipeline(
  fs.createReadStream('file.txt'),
  zlib.createGzip(),
  fs.createWriteStream('file.txt.gz')
);
// любая ошибка — все стримы закрываются автоматически
```

**Правило:** `pipe` для экспериментов, `pipeline` в production всегда.

---

## Режимы Readable стрима

**flowing** — данные текут автоматически:
```js
readable.on('data', (chunk) => { /* обрабатываем */ });
```

**paused** — запрашиваешь chunk вручную когда готов:
```js
readable.on('readable', () => {
  let chunk;
  while ((chunk = readable.read()) !== null) { /* обрабатываем */ }
});
```

**async iteration** — современный способ, paused под капотом:
```js
for await (const chunk of readable) {
  // следующий chunk придёт только когда ты готов
}
```

---

## Свой Readable стрим

Полезно когда нужно генерировать данные кусками — например пагинация из БД:

```js
function createDbStream(pageSize = 100) {
  let cursor = 0;
  let done = false;

  return new Readable({
    objectMode: true,
    async read() {
      if (done) return;

      const rows = await prisma.user.findMany({
        take: pageSize,
        skip: cursor,
      });

      if (rows.length === 0) {
        done = true;
        this.push(null); // конец стрима
        return;
      }

      cursor += rows.length;
      rows.forEach(row => this.push(row));
    }
  });
}

// миллион записей — в памяти одновременно только 100
await pipeline(createDbStream(), transform, res);
```

---

## Свой Transform стрим

```js
const { Transform } = require('stream');

const parseJSON = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    try {
      const lines = chunk.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        this.push(JSON.parse(line));
      }
      callback();
    } catch (err) {
      callback(err);
    }
  }
});
```

---

## objectMode

По умолчанию стримы работают с `Buffer` и `string`. Для JS объектов:

```js
// без objectMode — ошибка
readable.push({ id: 1 }) // ошибка

// с objectMode — ok
new Readable({ objectMode: true })
readable.push({ id: 1 }) // ok
```

---

## Связь с Express

`req` и `res` в Express — это те же Node.js стримы:

```ts
req  // Readable — входящий запрос
res  // Writable — исходящий ответ
```

`res.json()` под капотом:
```js
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify(data)); // пишет в Writable и закрывает
```

Стримы просачиваются наружу когда нужно отдать файл или читать тело запроса вручную:
```ts
// отдать файл кусками
fs.createReadStream('big-file.mp4').pipe(res);

// читать тело до парсера
const chunks: Buffer[] = [];
for await (const chunk of req) chunks.push(chunk);
const body = Buffer.concat(chunks);
```

---

## Частые ошибки

**Синхронные fs операции блокируют event loop:**
```ts
// ПЛОХО
const fd = fs.openSync(filePath, 'r')

// ХОРОШО
const fd = await fs.promises.open(filePath, 'r')
```

**pipe без обработки ошибок:**
```ts
// ПЛОХО — утечка ресурсов при ошибке
readable.pipe(writable);

// ХОРОШО
await pipeline(readable, writable);
```