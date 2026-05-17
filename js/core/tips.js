// Общие проверки чисел
isNaN(value)                  // true, если значение NaN
isFinite(value)               // true, если конечное число

// Loops
for (let i = 0; i < 10; i++) {} // выполняется заданное количество раз
for (let key in obj) {} // перебирает ключи (свойства) объекта
for (let value of iterable) {} // перебирает значения итерируемого объекта (массив, строка, Map, Set)
while (condition) {} // выполняется, пока условие true
do {} while (condition); // выполняется хотя бы один раз, затем пока условие true
break                            // выйти из цикла
continue                         // пропустить текущую итерацию
return                           // выйти из функции с результатом
throw error                      // выброс исключения
try { ... } catch (e) { ... }    // обработка ошибок

// String
str.length                    // длина строки
str.at(pos)                   // символ по индексу (поддерживает отрицательные)
str.charAt(i)                 // символ по индексу (старый способ)
str.charCodeAt(i)             // код символа UTF-16
str.codePointAt(i)            // код символа Unicode (эмодзи)

str.slice(start, end?)        // часть строки (поддерживает отрицательные)
str.substring(start, end?)    // часть строки (не поддерживает отрицательные)
str.substr(start, length)     // часть строки фиксированной длиной (устарел)

str.indexOf(substr, pos?)     // первое вхождение или -1
str.lastIndexOf(substr, pos?) // последнее вхождение или -1
str.includes(substr, pos?)    // true, если содержит подстроку
str.startsWith(substr, pos?)  // true, если начинается с подстроки
str.endsWith(substr, len?)    // true, если заканчивается подстрокой
str.search(regexp)            // индекс совпадения по RegExp или -1
str.match(regexp)             // массив совпадений или null
str.matchAll(regexp)          // итератор совпадений (ES2020)

str.toLowerCase()             // в нижний регистр
str.toUpperCase()             // в верхний регистр
str.trim()                    // убрать пробелы по краям
str.trimStart()               // убрать пробелы слева
str.trimEnd()                 // убрать пробелы справа
str.repeat(n)                 // повторить n раз
str.padStart(len, padStr)     // дополнить слева
str.padEnd(len, padStr)       // дополнить справа

str.replace(substr, newStr)   // заменить первое совпадение
str.replaceAll(substr, newStr)// заменить все совпадения
str.split(separator, limit?)  // разбить строку в массив
str.concat(str2, str3…)       // соединить строки

// Number
parseInt(str, radix?)         // целое число из строки
parseFloat(str)               // число с плавающей точкой из строки
num.toString(base)            // строка в системе счисления base
num.toFixed(n)                // округление до n знаков, строка

// Math
Math.floor(x)                 // округление вниз
Math.ceil(x)                  // округление вверх
Math.round(x)                 // округление до ближайшего целого
Math.trunc(x)                 // отбросить дробную часть
Math.random()                 // число от 0 до 1
Math.max(a, b, …)             // наибольшее
Math.min(a, b, …)             // наименьшее
Math.pow(n, power)            // n^power
Math.abs(x)                   // модуль числа
Math.sign(x)                  // -1, 0, 1

Math.sqrt(x)                  // квадратный корень
Math.cbrt(x)                  // кубический корень
Math.hypot(a, b, …)           // √(a²+b²+…)

Math.log(x)                   // ln(x)
Math.log10(x)                 // log10(x)
Math.log2(x)                  // log2(x)
Math.exp(x)                   // e^x

Math.sin(x)               // синус (x в радианах)
Math.cos(x)               // косинус
Math.tan(x)               // тангенс
Math.asin(x)              // арксинус
Math.acos(x)              // арккосинус
Math.atan(x)              // арктангенс
Math.atan2(y, x)          // арктангенс y/x с учетом четверти

Math.E                    // число e ≈ 2.718
Math.PI                   // число π ≈ 3.14159
Math.SQRT2                // √2
Math.SQRT1_2              // 1/√2
Math.LN2                  // ln(2)
Math.LN10                 // ln(10)
Math.LOG2E                // log2(e)
Math.LOG10E               // log10(e)

// Array
arr.length                    // длина массива
arr.push(item)                // добавить в конец
arr.pop()                     // удалить последний
arr.unshift(item)             // добавить в начало
arr.shift()                   // удалить первый
arr.splice(start, del?, ...it)// удалить/заменить/вставить
arr.slice(start, end?)        // часть массива (копия)
arr.concat(arr2, …)           // объединение массивов

arr.forEach(fn)               // перебор без возврата
arr.map(fn)                   // новый массив с результатами
arr.filter(fn)                // отфильтрованные элементы
arr.reduce(fn, init)          // свёртка слева направо
arr.reduceRight(fn, init)     // свёртка справа налево
arr.some(fn)                  // true, если хотя бы один элемент проходит проверку
arr.every(fn)                 // true, если все элементы проходят проверку
arr.find(fn)                  // первый элемент по условию
arr.findIndex(fn)             // индекс первого по условию
arr.flat(depth=1)             // разворачивает вложенные массивы
arr.flatMap(fn)               // map + flat(1)

arr.indexOf(item, from?)      // индекс первого вхождения
arr.lastIndexOf(item, from?)  // индекс последнего
arr.includes(item, from?)     // true, если найден

arr.sort(fn?)                 // сортировка (по умолчанию строки)
arr.reverse()                 // разворот
arr.fill(value, start?, end?) // заполнить значением
arr.copyWithin(t, start, end?)// копия внутри массива

arr.join(sep?)                // строка с разделителем
Array.from(obj, mapFn?)       // массив из итерируемого
Array.of(...items)            // массив из аргументов

// Object
let obj = {}                  // пустой объект
let obj2 = Object.create(proto)// создать с прототипом
Object.assign(t, s1, s2…)     // копирует все свойства объектов s1-... в объект t
structuredClone(obj)          // глубокое клонирование

Object.keys(obj)              // массив ключей
Object.values(obj)            // массив значений
Object.entries(obj)           // массив [ключ, значение]
Object.fromEntries(iterable)  // объект из [ключ, значение]

obj.hasOwnProperty(key)       // true, если ключ свой, а не унаследованный от прототипа
key in obj                    // true, если ключ есть (включая прототипы)
delete obj.key                // удалить свойство

Object.defineProperty(obj, k, desc) // определить свойство
Object.defineProperties(obj, props)// несколько свойств
Object.getOwnPropertyDescriptor(obj, k) // описание свойства
Object.getOwnPropertyDescriptors(obj)   // описания всех свойств
Object.getOwnPropertyNames(obj)         // список имён свойств
Object.getOwnPropertySymbols(obj)       // список символов-ключей

Object.preventExtensions(obj) // запрет добавления новых
Object.isExtensible(obj)      // можно ли расширять?
Object.seal(obj)              // запрет добавления/удаления
Object.isSealed(obj)          // запечатан ли объект?
Object.freeze(obj)            // заморозка (без изменений)
Object.isFrozen(obj)          // заморожен ли объект?

Object.getPrototypeOf(obj)    // получить прототип
Object.setPrototypeOf(obj, p) // установить прототип
obj.__proto__                 // старый способ (не использовать)

Object.is(v1, v2)             // строгое равенство (корректно для NaN и -0)

// Map
let map = new Map() // создает структуру данных Map
let map = new Map(Object.entries(obj)) // создает Map из обьекта
let obj = Object.fromEntries(map) // создает обьект из Map
map.set(key, value) // добавление элемента
map.get(key) // получение значения по ключу
map.has(key) // проверка на существование ключа
map.delete(key) // удаление элемента по ключу
map.clear() // очистка Map
map.size() // длина Map
map.keys() // возвращает итерируемый объект по ключам
map.values() // возвращает итерируемый объект по значениям
map.entries() // возвращает итерируемый объект по парам вида [ключ, значение]

// WeakMap
weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)

// Set
new Set(iterable) // создаёт Set, можно указать перебираемый объект со значениями для инициализации
set.add(value) // добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set
set.delete(value) // удаляет значение, возвращает true если value было в множестве на момент вызова, иначе false
set.has(value) // возвращает true, если значение присутствует в множестве, иначе false
set.clear() // удаляет все имеющиеся значения
set.size // возвращает количество элементов в множестве

// WeakSet
weakSet.add(value)
weakSet.delete(value)
weakSet.has(value)

// Function
fn.call(context, ...args) // вызывает функцию с контекстом обьекта, вторым параметром список аргументов
fn.apply(context, args) // вызывает функцию с контекстом обьекта, вторым параметром массив аргументов
fn.bind(context, [arg1], [arg2], ...args); // привязывает контекст переданного обьекта, и начальные параметры

// Promise
Promise.all([promises]) // ожидает выполнения всех промисов и возвращает массив с результатами
Promise.allSettled([promises]) // ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами
Promise.any([promises]) // ожидает первый успешно выполненный промис, который становится его результатом, остальные игнорируются 
Promise.race([promises]) // ожидает первый выполненный промис, который становится его результатом, остальные игнорируются
Promise.resolve(value) // возвращает успешно выполнившийся промис с результатом value
Promise.reject(error) // возвращает промис с ошибкой error

// Export/Import
export method() // именованный экспорт
import { method } from './path.js' // именованный импорт

export default Class // эскпорт по умолчанию
import Class from './path.js' // импорт по умолчанию

import * as methods from './path.js' // импорт всех именованных экспортов
import('./path.js') // динамический импорт, возвращает промис
import.meta // информация о модуле

// Class
class MyClass {
  constructor() {}
  method() {}
  static staticMethod() {}
  get prop() {}
  set prop(val) {}
}
class Child extends Parent { constructor() { super(); } } // наследование
let obj = new MyClass()       // создание экземпляра

// Генераторы
function* gen() { yield value; }
let g = gen()
g.next()                     // {value:..., done:...}
for (let val of gen()) {}    // перебор значений генератора

// Symbol
let sym = Symbol()
Symbol.iterator
Symbol.toStringTag
Symbol.toPrimitive

// Misc
JSON.stringify(obj)
JSON.parse(str)
setTimeout(fn, ms)
clearTimeout(id)
setInterval(fn, ms)
clearInterval(id)
new Date()
date.getFullYear()
date.getMonth()
date.getDate()
date.getTime()
date.toISOString()
console.log(), console.warn(), console.error(), console.table()