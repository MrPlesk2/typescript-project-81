# Генератор форм на Typescript

[![hexlet-check](https://github.com/MrPlesk2/typescript-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/MrPlesk2/typescript-project-81/actions)
[![CI](https://github.com/MrPlesk2/typescript-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/MrPlesk2/typescript-project-81/actions/workflows/ci.yml)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/programs/typescript
Как это должно работать: https://files.hexlet.app/a/100lcl

## Стек

- TypeScript
- Node.js

## Установка

<!-- Опишите установку: клонирование, зависимости, переменные окружения -->

```bash
git clone https://github.com/MrPlesk2/typescript-project-81.git
cd typescript-project-81
npm install
```

## Использование

```typescript
import HexletCode from "@hexlet/code";

const template = { name: "rob", job: "hexlet", gender: "m" };
const form = HexletCode.formFor(template, { method: "post" }, (f) => {
  f.input("name", { class: "user-input" });
  f.input("job", { as: "textarea", rows: 50 });
  f.submit("Wow");
});

console.log(form);
// <form method="post" action="#"><label for="name">Name</label><input name="name" type="text" value="rob" class="user-input"><label for="job">Job</label><textarea cols="20" rows="50" name="job">hexlet</textarea><input type="submit" value="Wow"></form>
```

Проверка типов и сборка пакета:

```bash
npm run typecheck
npm run build
```

Проверка качества и тесты:

```bash
make lint
make test
make test-coverage
```

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
