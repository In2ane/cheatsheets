# esbuild

esbuild — это бандлер и транспилятор для JavaScript/TypeScript, написанный на Go. Отличается экстремально высокой скоростью сборки по сравнению с webpack, rollup и другими аналогами.
Отсутствует HMR
Есть встроенный анализ бандла

## CLI

```bash
# === Входные/выходные файлы ===
--bundle              # инлайнит все импортированные модули в бандл, чтоб можно было запускать его без node_modules
--splitting           # включает code splitting (только для формата esm)
--outfile=<path>      # путь к выходному файлу
--outdir=<path>       # папка для бандла
--outbase=<path>      # базовая директория для вычисления выходных путей
--allow-overwrite     # разрешает перезаписывать входные файлы
--out-extension:.js=.mjs  # переопределяет расширение выходных файлов
--public-path=<url>   # публичный путь для assets (используется в css url())
--entry-names=<tmpl>  # шаблон имён для entry-файлов (например [dir]/[name]-[hash])
--chunk-names=<tmpl>  # шаблон имён для чанков
--asset-names=<tmpl>  # шаблон имён для assets

# === Разрешение модулей ===
--external:<pkg>      # исключает модуль из бандла (например --external:react)
--packages=external   # исключает все npm-пакеты из бандла
--alias:<old>=<new>   # заменяет импорт одного модуля на другой
--loader:<ext>=<type> # задаёт загрузчик для файлов с указанным расширением
--resolve-extensions  # список расширений для разрешения импортов
--main-fields         # поля package.json для разрешения модулей
--conditions          # условия для exports в package.json

# === TypeScript ===
--tsconfig=<path>     # путь к tsconfig.json

# === Подстановки ===
--inject:<file>       # автоматически импортирует файл в каждый модуль
--banner:js=<str>     # добавляет строку в начало js-файлов
--footer:js=<str>     # добавляет строку в конец js-файлов
--define:VAR=VALUE    # заменяет идентификатор на значение при сборке
--pure:<fn>           # помечает вызов функции как side-effect free
--keep-names          # сохраняет оригинальные имена функций и классов (для .name)

# === Source maps ===
--sourcemap           # генерирует sourcemap (linked по умолчанию)
--sourcemap=inline    # встраивает sourcemap в файл как base64
--sourcemap=external  # генерирует отдельный .map файл без ссылки из бандла
--sourcemap=both      # и встраивает, и создаёт отдельный файл
--sources-content=false  # убирает исходный код из sourcemap
--source-root=<url>   # задаёт sourceRoot в sourcemap

# === Юридические комментарии ===
--legal-comments=none      # удаляет все юридические комментарии
--legal-comments=inline    # оставляет юридические комментарии внутри файла
--legal-comments=eof       # переносит юридические комментарии в конец файла
--legal-comments=linked    # выносит в отдельный файл со ссылкой
--legal-comments=external  # выносит в отдельный файл без ссылки

# === Платформа и формат ===
--format=iife         # оборачивает код в самовызывающуюся функцию (для браузера)
--format=cjs          # CommonJS формат (для Node.js)
--format=esm          # ES modules формат
--global-name=<name>  # имя глобальной переменной для iife-формата
--target=<env>        # целевое окружение (es2020, node16, chrome80 и т.д.)
--platform=browser    # настраивает сборку для браузера (по умолчанию)
--platform=node       # настраивает сборку для Node.js
--platform=neutral    # нейтральная платформа без предположений

# === Минификация ===
--minify              # включает все виды минификации
--minify-whitespace   # удаляет лишние пробелы
--minify-identifiers  # сокращает имена переменных
--minify-syntax       # упрощает синтаксис (например, складывает строки)
--mangle-props=<re>   # переименовывает свойства объектов, совпадающие с regexp
--mangle-quoted       # применяет mangle к строковым ключам
--reserve-props=<re>  # исключает свойства из mangle по regexp
--charset=utf8        # разрешает вывод не-ASCII символов без экранирования
--line-limit=<n>      # переносит строки длиннее n символов

# === Tree shaking и аннотации ===
--tree-shaking=true   # принудительно включает tree shaking
--ignore-annotations  # игнорирует аннотации /*#__PURE__*/ и "sideEffects"

# === Удаление кода ===
--drop:console        # удаляет все вызовы console.*
--drop:debugger       # удаляет все операторы debugger
--drop-labels=<list>  # удаляет блоки кода с указанными метками

# === JSX ===
--jsx=transform       # преобразует JSX в JS-вызовы (по умолчанию)
--jsx=preserve        # оставляет JSX как есть
--jsx=automatic       # использует новый JSX runtime (React 17+)
--jsx-factory=<fn>    # функция для создания JSX-элементов (по умолчанию React.createElement)
--jsx-fragment=<fn>   # компонент для JSX-фрагментов (по умолчанию React.Fragment)
--jsx-import-source=<pkg>  # пакет для автоматического JSX runtime
--jsx-dev             # использует jsxDEV вместо jsx (для development)
--jsx-side-effects    # отключает пометку JSX как side-effect free

# === Метаданные ===
--metafile=<path>     # записывает метаданные сборки в JSON-файл

# === Логирование ===
--color=true          # включает цветной вывод
--log-level=verbose   # уровень логирования (verbose/debug/info/warning/error/silent)
--log-limit=<n>       # максимальное количество сообщений в логе
```

## JS API
```ts
import {
  analyzeMetafile,      // анализирует metafile и возвращает читаемый отчёт (async)
  analyzeMetafileSync,  // синхронная версия analyzeMetafile
  build,                // запускает сборку (async)
  buildSync,            // синхронная версия build
  context,              // создаёт контекст сборки для watch/serve режимов
  formatMessages,       // форматирует сообщения об ошибках/предупреждениях (async)
  formatMessagesSync,   // синхронная версия formatMessages
  initialize,           // инициализирует wasm-версию esbuild (для браузера)
  stop,                 // останавливает дочерний процесс esbuild (освобождает ресурсы)
  transform,            // трансформирует код без разрешения импортов (async)
  transformSync,        // синхронная версия transform
  version,              // версия esbuild в виде строки (например "0.20.0")
} from 'esbuild'

interface BuildOptions {
  // === Входные файлы ===
  entryPoints?: (string | { in: string; out: string })[] | Record<string, string>
  // точки входа; можно указать несколько файлов или маппинг in -> out
  stdin?: StdinOptions // позволяет передать код напрямую вместо файла на диске

  // === Основные опции ===
  bundle?: boolean// инлайнит все импортированные модули в бандл, чтоб можно было запускать его без node_modules
  splitting?: boolean // включает code splitting — общий код выносится в отдельные чанки (только для format: 'esm')
  write?: boolean // если false, результат возвращается в памяти и не записывается на диск (по умолчанию true)
  allowOverwrite?: boolean // разрешает перезаписывать входные файлы выходными
  absWorkingDir?: string // абсолютный путь рабочей директории; влияет на разрешение относительных путей
  preserveSymlinks?: boolean // не разрешает символические ссылки; использует путь симлинка вместо реального пути

  // === Выходные файлы ===
  outfile?: string // путь к единственному выходному файлу (несовместимо с outdir при нескольких entryPoints)
  outdir?: string // папка для бандла; используется при нескольких точках входа
  outbase?: string // базовая директория для вычисления структуры папок в outdir
  outExtension?: { [ext: string]: string } // переопределяет расширения выходных файлов (например { '.js': '.mjs' })
  entryNames?: string // шаблон имён для entry-файлов (например '[dir]/[name]-[hash]')
  chunkNames?: string // шаблон имён для автоматически создаваемых чанков при splitting
  assetNames?: string // шаблон имён для обрабатываемых asset-файлов
  publicPath?: string // префикс публичного URL для assets, используемых в CSS url()

  // === Разрешение модулей ===
  external?: string[] // список модулей, исключённых из бандла (останутся как import/require)
  packages?: 'bundle' | 'external' // 'external' — исключает все npm-пакеты из бандла автоматически
  alias?: Record<string, string> // заменяет импорт одного модуля на другой (например { 'react': 'preact/compat' })
  loader?: { [ext: string]: Loader } // задаёт загрузчик для файлов с указанным расширением
  // Loader: 'js' | 'jsx' | 'ts' | 'tsx' | 'css' | 'json' | 'text' | 'base64' | 'file' | 'dataurl' | 'binary' | 'copy' | 'default' | 'empty' | 'local-css' | 'global-css'
  resolveExtensions?: string[] // порядок расширений для автоматического разрешения импортов без расширения
  mainFields?: string[] // поля package.json для разрешения главного файла пакета (например ['module', 'main'])
  conditions?: string[] // условия для поля exports в package.json (например ['require', 'node'])
  nodePaths?: string[] // дополнительные пути для разрешения модулей (аналог переменной NODE_PATH в Node.js)

  // === TypeScript ===
  tsconfig?: string // путь к tsconfig.json (по умолчанию ищет ближайший tsconfig.json)
  tsconfigRaw?: string | {
    compilerOptions?: {
      alwaysStrict?: boolean
      // включает strict mode и добавляет "use strict" в каждый файл
      baseUrl?: string
      // базовая директория для разрешения путей (используется вместе с paths)
      experimentalDecorators?: boolean
      // включает поддержку декораторов в старом стиле (stage 2)
      importsNotUsedAsValues?: 'remove' | 'preserve' | 'error'
      // поведение при импорте типов (устарело, заменено verbatimModuleSyntax)
      jsx?: 'preserve' | 'react-native' | 'react' | 'react-jsx' | 'react-jsxdev'
      // режим обработки JSX в TypeScript
      jsxFactory?: string
      // функция для создания JSX-элементов (по умолчанию React.createElement)
      jsxFragmentFactory?: string
      // компонент для JSX-фрагментов (по умолчанию React.Fragment)
      jsxImportSource?: string
      // пакет-источник для автоматического JSX runtime
      paths?: Record<string, string[]>
      // маппинг алиасов путей (например { '@/*': ['./src/*'] })
      preserveValueImports?: boolean
      // запрещает удалять импорты значений (устарело, заменено verbatimModuleSyntax)
      strict?: boolean
      // включает набор строгих проверок TypeScript
      target?: string
      // целевая версия JS для TypeScript (влияет на useDefineForClassFields)
      useDefineForClassFields?: boolean
      // использует Object.defineProperty вместо присваивания для полей классов
      verbatimModuleSyntax?: boolean
      // заменяет importsNotUsedAsValues + preserveValueImports;
      // удаляет только явные import type, остальные оставляет как есть
    }
  }

  // === Платформа и формат ===
  platform?: 'browser' | 'node' | 'neutral'
  // 'browser' — по умолчанию, настраивает mainFields и defines для браузера
  // 'node'    — настраивает сборку для Node.js, внешние built-in модули
  // 'neutral' — без предположений о среде выполнения
  format?: 'iife' | 'cjs' | 'esm'
  // 'iife' — immediately invoked function expression, для браузерных скриптов
  // 'cjs'  — CommonJS, для Node.js (require/module.exports)
  // 'esm'  — ES modules (import/export)
  globalName?: string // имя глобальной переменной при format: 'iife' (например 'MyLib')
  target?: string | string[] // целевое окружение для транспиляции (es2020, node16, chrome80, safari14 и т.д.)
  supported?: Record<string, boolean> // принудительно переопределяет поддержку конкретных JS-фич для target

  // === Source maps ===
  sourcemap?: boolean | 'linked' | 'inline' | 'external' | 'both'
  // true/'linked' — создаёт отдельный .map файл со ссылкой из бандла
  // 'inline'      — встраивает sourcemap в файл как base64 data URL
  // 'external'    — создаёт отдельный .map файл без ссылки из бандла
  // 'both'        — и встраивает, и создаёт отдельный файл
  sourceRoot?: string // задаёт поле sourceRoot в sourcemap (URL-префикс путей к исходникам)
  sourcesContent?: boolean // если false, не включает исходный код в sourcemap (уменьшает размер)

  // === Минификация ===
  minify?: boolean// включает все три вида минификации (whitespace + identifiers + syntax)
  minifyWhitespace?: boolean // удаляет лишние пробелы, переносы строк и комментарии
  minifyIdentifiers?: boolean // сокращает имена локальных переменных и функций до коротких символов
  minifySyntax?: boolean // упрощает синтаксис (складывает строки, упрощает условия и т.д.)
  lineLimit?: number // вставляет перенос строки после примерно n символов (для читаемости минифицированного кода)
  charset?: 'ascii' | 'utf8'
  // 'utf8'  — разрешает вывод не-ASCII символов как есть (меньше размер)
  // 'ascii' — экранирует все не-ASCII символы через \uXXXX (по умолчанию)
  mangleProps?: RegExp // переименовывает свойства объектов, имена которых совпадают с regexp
  reserveProps?: RegExp // исключает свойства из mangleProps по regexp
  mangleQuoted?: boolean // применяет mangle к строковым ключам (например obj['foo'])
  mangleCache?: Record<string, string | false> // позволяет передавать и получать кеш маппинга переименований для mangle

  // === Tree shaking и аннотации ===
  treeShaking?: boolean // принудительно включает или отключает удаление неиспользуемого кода
  ignoreAnnotations?: boolean // игнорирует аннотации /*#__PURE__*/ и поле "sideEffects" в package.json
  pure?: string[] // помечает вызовы указанных функций как side-effect free (как /*#__PURE__*/)

  // === Удаление кода ===
  drop?: ('console' | 'debugger')[]
  // 'console'  — удаляет все вызовы методов console.*
  // 'debugger' — удаляет все операторы debugger
  dropLabels?: string[]// удаляет блоки кода, помеченные указанными JS-метками (label statements)

  // === Подстановки ===
  define?: { [key: string]: string } // заменяет идентификаторы на константы при сборке 
  // (например { 'process.env.NODE_ENV': '"production"' })
  inject?: string[] // автоматически импортирует экспорты указанных файлов в каждый модуль
  banner?: { [type: string]: string } // добавляет произвольную строку в начало файлов указанного типа
  footer?: { [type: string]: string } // добавляет произвольную строку в конец файлов указанного типа

  // === JSX ===
  jsx?: 'transform' | 'preserve' | 'automatic'
  // 'transform'  — преобразует JSX в вызовы jsxFactory (по умолчанию)
  // 'preserve'   — оставляет JSX как есть в выходном файле
  // 'automatic'  — использует новый JSX runtime (React 17+, автоимпорт jsx из jsxImportSource)
  jsxFactory?: string // функция для создания JSX-элементов (по умолчанию React.createElement)
  jsxFragment?: string // компонент для JSX-фрагментов (по умолчанию React.Fragment)
  jsxImportSource?: string // пакет для автоматического JSX runtime при jsx: 'automatic'
  jsxDev?: boolean // использует jsxDEV вместо jsx из runtime (добавляет отладочную информацию)
  jsxSideEffects?: boolean // отключает пометку JSX-выражений как side-effect free (если JSX имеет побочные эффекты)

  // === Имена ===
  keepNames?: boolean // сохраняет оригинальные значения .name у функций и классов при минификации

  // === Метаданные ===
  metafile?: boolean // генерирует JSON с метаданными о сборке (входные/выходные файлы, размеры, зависимости)
  // результат доступен в build.metafile, анализируется через analyzeMetafile

  // === Плагины ===
  plugins?: Plugin[] // массив плагинов для расширения поведения esbuild (разрешение модулей, загрузчики и т.д.)

  // === Логирование ===
  color?: boolean // включает/отключает ANSI-цвета в выводе
  logLevel?: 'verbose' | 'debug' | 'info' | 'warning' | 'error' | 'silent' // уровень детализации логов:
  // 'verbose' — всё включая внутренние детали
  // 'debug'   — отладочные сообщения
  // 'info'    — информационные сообщения (по умолчанию)
  // 'warning' — только предупреждения и ошибки
  // 'error'   — только ошибки
  // 'silent'  — полное молчание
  logLimit?: number // максимальное количество сообщений лога (по умолчанию 6, 0 — без ограничений)
  logOverride?: Record<string, LogLevel> // переопределяет уровень логирования для конкретных типов сообщений
  legalComments?: 'none' | 'inline' | 'eof' | 'linked' | 'external'
  // управляет юридическими комментариями (содержащими @license, @preserve или начинающимися с /*!):
  // 'none'     — удаляет все
  // 'inline'   — оставляет внутри файла (по умолчанию)
  // 'eof'      — переносит в конец файла
  // 'linked'   — выносит в отдельный .LEGAL.txt со ссылкой из файла
  // 'external' — выносит в отдельный .LEGAL.txt без ссылки
  absPaths?: ('code' | 'log' | 'metafile')[] // использует абсолютные пути вместо относительных в указанных местах вывода
}
```