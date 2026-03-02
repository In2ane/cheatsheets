# 📦 Группировка тестов — describe

## Базовый синтаксис

describe(name, fn) - группирует связанные тесты (test suite).

## Управление выполнением describe

describe.skip(name, fn) → Пропустить весь блок тестов.
describe.skipIf(condition)(name, fn) → Пропустить блок, если условие true.
describe.runIf(condition)(name, fn) → Выполнить блок только если условие true.
describe.only(name, fn) → Запустить только этот блок.
describe.concurrent(name, fn) → Тесты внутри выполняются параллельно.
describe.sequential(name, fn) → Тесты выполняются строго последовательно.
describe.shuffle(name, fn) → Тесты выполняются в случайном порядке.
describe.todo(name) → Заглушка для будущей группы тестов.
describe.each(table)(name, fn) → Создаёт describe для каждого набора данных.
describe.for(values)(name, fn) → Аналог each, но без распаковки массивов аргументов.

# 🧪 Тесты — it / test

## Базовый синтаксис

it(name, fn)/test(name, fn) - определяет один тест.

test.extend(fixtures) → Создание кастомного test с фикстурами.
test.skip(name, fn) → Пропустить тест.
test.skipIf(condition)(name, fn) → Пропустить тест при условии.
test.runIf(condition)(name, fn) → Выполнить тест только если условие true.
test.only(name, fn) → Запустить только этот тест.
test.concurrent(name, fn) → Выполняется параллельно с другими тестами.
test.sequential(name, fn) → Принудительно последовательное выполнение.
test.todo(name) → Тест-заглушка.
test.fails(name, fn) → Ожидается, что тест упадёт.
test.each(table)(name, fn) → Запуск теста для каждого набора данных.
test.for(values)(name, fn) → Аналог each без распаковки аргументов.

# ✅ Проверки — expect

expect(received) - функция сравнения полученного и ожидаемого результата.

## Частые matcher'ы

expect(value).toBe(1) → Строгое сравнение (===)
expect(obj).toEqual({}) → Глубокое сравнение объектов
expect(arr).toContain(3) → Проверка наличия элемента
expect(fn).toThrow() → Проверка выброса ошибки
expect(value).toBeTruthy() → Значение приводится к true
expect(value).toBeFalsy() → Значение приводится к false

## Асинхронные проверки

await expect(promise).resolves.toEqual(data)  
await expect(promise).rejects.toThrow()

# 🔄 Lifecycle Hooks

Используются для подготовки и очистки окружения.

beforeAll(fn) → Выполняется один раз перед всеми тестами в блоке.
beforeEach(fn) → Выполняется перед каждым тестом.
afterEach(fn) → Выполняется после каждого теста.
afterAll(fn) → Выполняется один раз после всех тестов.

# Mocks

vi.mock(path, factory?) Заменяет все импорты модуля по `path` другим модулем через `factory`. Если фабрика не указана, создаётся автоматический мок.
vi.doMock(path, factory?) То же, что `vi.mock`, но может вызываться динамически во время теста, а не только на top-level.
vi.mocked(value, deep?) Для TypeScript: сообщает, что это замоканная функция или объект. `deep = true` для объектов с методами.
vi.importActual(path) Импортирует оригинальный модуль, игнорируя все моки.
vi.importMock(path) Импортирует мок модуля, как его замокали через `vi.mock`.
vi.unmock(path) Убирает мок с модуля и возвращает оригинальный модуль.
vi.doUnmock(path) Динамически снимает мок во время теста.
vi.resetModules() Сбрасывает все модули Vitest, очищает кеш, позволяет переимпортировать их.
vi.dynamicImportSettled(path) Динамически импортирует модуль и возвращает результат `{ status: 'fulfilled' | 'rejected', value | reason }`.