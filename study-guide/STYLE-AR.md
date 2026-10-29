# Arabic style guide (Study Guide + Project Guides)

The Arabic text is for Ibrahem himself: Egyptian Arabic, written the way you'd explain it to a friend who is also a developer. Technical terms stay in English. Applies to every `ar:` string in `study-guide/data/` and `project-guides/data/`.

## 1. Short sentences
- One idea per sentence. End it with a full stop.
- Don't use «؛». Split into two sentences, or link with «و»، «فـ»، «علشان»، «بس»، «يعني».
- A bullet holds one idea. If it needs three sentences, it's fine — but three short ones.

## 2. Start with Arabic, not with code
- The sentence starts with an Arabic subject or verb; the code comes inside it.
  - ✗ «الـ new Promise(executor) بيشغّل الـ executor sync على طول.»
  - ✓ «أول ما تكتب <code>new Promise(executor)</code>، الـ executor بيشتغل على طول.»
- Don't open a sentence with two English words in a row.

## 3. «الـ» with English terms
- Use «الـ» once, before a term used as a name: «الـ cache»، «الـ event loop».
- Don't stack English terms joined by «الـ». Use «بتاع / بتاعة / بتوع» instead.
  - ✗ «و APIs الـ components»
  - ✓ «والـ API بتاع كل component»
- Plurals stay English when the term is English: «الـ components»، not «الكومبوننتس».

## 4. Egyptian verbs and words
| Instead of | Write |
|---|---|
| هذا / هذه / ذلك | ده / دي / كده |
| الذي / التي | اللي |
| لماذا / كيف / متى / أين | ليه / إزاي / إمتى / فين |
| يجب / لا يمكن / سوف | لازم / مينفعش / هـ |
| عندما / إذا / أيضًا / فقط | لما / لو / كمان / بس |
| لكن (in the middle of speech) | بس |
- Use the active voice and name who does the action: «React بيتجاهله»، not «بيتجاهل».

## 5. Don't translate terms word for word
- Keep the English term when the Arabic translation sounds strange: «polite live region»، not «live region مؤدب».
- Fixed words for the whole site:

| Concept | Write |
|---|---|
| paint (the browser draws pixels) | الرسم |
| render (React calls components) | render |
| user | اليوزر |
| server / browser | السيرفر / المتصفح |
| data | الداتا |
| request / response | request / response |
| cost / trade-off | التمن / trade-off |

## 6. Order of an explanation
1. What it is, in one line.
2. How it works, in steps (first, then, then).
3. What it means in practice (يعني…).
4. The example or the exception.

## 7. Keep as is
- Code, API names, numbers, links and `<code>`/`<b>` tags.
- Meaning: rewriting the Arabic never changes the facts. If the English and Arabic disagree, the English is checked first.

## Progress (2026-10-29)
- Done: every deep-dive file (`deep-*.js`), and the basics for JavaScript, React, Hooks, JS output, live coding and system design.
- Left: the other study-guide basics and the 10 project-guide files. See the count with `node study-guide/tools/ar-style.js stats` (it flags «؛» and sentences over ~170 characters).
- How: `node study-guide/tools/ar-style.js list <file>` → write a fixes file (`[[old, new], …]` with `String.raw`) → `apply <file> <fixes.js>` → run the checkers → commit per batch.
