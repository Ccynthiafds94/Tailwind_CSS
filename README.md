# Tiny Tailwind School

Tiny Tailwind School is a beginner-friendly, interactive introduction to Tailwind CSS. It explains how utility classes style HTML elements, shows common class patterns, and lets you experiment with live previews.

## What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework. Instead of writing a new CSS selector for every component, you combine small, named utility classes directly on the HTML element that needs styling. For example:

```html
<div class="rounded-xl bg-violet-100 p-6 shadow-sm">
  A softly colored card with padding, rounded corners, and a shadow.
</div>
```

Each class applies a focused style: `p-6` adds padding, `bg-violet-100` sets a background color, `rounded-xl` rounds the corners, and `shadow-sm` adds a subtle shadow. Classes can be combined to build a complete design. Prefixes such as `md:` and `hover:` apply utilities only at a particular screen size or interaction state.

## Get started

This is a static website and does not require a package installation or build step.

1. Open `index.html` in a browser, or serve the project folder with a local static server such as the VS Code Live Server extension.
2. Use the lesson navigation to select a concept.
3. Change the lesson preview options or use the card builder to see how class changes affect the design and generated class list.

The page loads Tailwind CSS from its browser CDN and fonts from Google Fonts, so an internet connection is needed for those resources. The browser CDN is convenient for learning and prototypes; for production, use the Tailwind installation and build process recommended for your framework and Tailwind version.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page content, Tailwind utility classes, CDN setup, and the inline Tailwind theme configuration. |
| `style.css` | Project-specific visual styling, component styles, layout details, and responsive adjustments. |
| `app.js` | Lesson data and interactive behavior for navigation, search, previews, theme switching, and copying classes. |

## Page guide

| Page area | What it contains |
| --- | --- |
| Header and hero | Site navigation, theme toggle, introduction, and a sample styled card. |
| Basic idea strip | A compact example showing `p-4`, `bg-violet-100`, and `rounded-xl` together. |
| Concept explorer | Searchable navigation for 15 lessons. Selecting a lesson updates its explanation, class breakdown, example, and interactive preview. |
| Tiny lessons | Visual introductions to padding, background colors, and rounded corners. |
| Advanced lessons | Responsive design, interactive states, Flexbox, Grid, dark mode, arbitrary values, and class reuse, plus a responsive product-card example. |
| Practice challenges | Small exercises for applying responsive, focus, group-hover, and dark-mode utilities. |
| Card builder | Controls for selecting a card color, padding, and corner style. The preview and class string update together. |
| Footer and next step | A short recap and links for returning to the top of the page. |

## Tailwind setup in this project

The `<head>` of `index.html` loads Tailwind with `https://cdn.tailwindcss.com`. The inline `tailwind.config` extends the default theme with:

- `font-sans` set to DM Sans and `font-display` set to Manrope.
- `ink`, `muted`, and `violet-100`, `violet-600`, and `violet-700` color tokens.
- Class-based dark mode (`darkMode: "class"`). The JavaScript theme toggle adds or removes `dark` on the `<body>`.

The page combines Tailwind utilities with semantic classes from `style.css`. For example, `grid`, `gap-6`, and `pt-[38px]` are Tailwind utilities, while `hero` and `hero-copy` are project-defined CSS classes. The semantic classes provide the page's visual identity and component-specific styling; the utilities provide convenient layout and design helpers in the markup.

## Tailwind class guide

The examples below are used in the page markup, lesson content, or interactive previews. Tailwind's default scale and available utilities can vary by version and configuration.

### Layout and alignment

| Classes | What they do | Where they are used |
| --- | --- | --- |
| `block`, `inline-flex`, `flex`, `grid` | Choose an element's display/layout behavior. | Text and buttons in the preview; navigation and controls; page sections and lesson grids. |
| `flex-col`, `items-center`, `items-start`, `justify-between`, `place-items-center` | Set a flex direction or align/position children. | Preview content, header, lesson layout, and builder preview. |
| `grid-cols-1`, `grid-cols-2`, `grid-cols-3` | Set the number of grid columns. | Concept cards, advanced lesson cards, and responsive examples. |
| `min-[621px]:grid-cols-2`, `min-[851px]:grid-cols-3`, `max-[850px]:...` | Apply a layout utility at a custom minimum or maximum viewport width. | The hero, concept strip, documentation workspace, and responsive grids. |
| `gap-2`, `gap-3`, `gap-6`, `gap-8` | Add space between flex or grid children. | Header controls, preview content, page sections, and card grids. |
| `overflow-hidden` | Clip content that extends beyond the element's box. | The card builder container. |

### Spacing and sizing

| Classes | What they do | Where they are used |
| --- | --- | --- |
| `p-4`, `p-6`, `p-10` | Add padding on all sides. The number refers to Tailwind's spacing scale. | Lesson cards and the card builder; the builder lets you switch between these values. |
| `px-4`, `px-6`, `py-2`, `py-6` | Add horizontal or vertical padding. | Buttons, cards, and footer. |
| `mt-6`, `mb-[90px]`, `pt-[38px]`, `pb-12` | Add margin or padding on a particular side. Bracketed values are one-off arbitrary values. | Footer spacing and section/hero spacing. |
| `mx-auto` | Center a block horizontally when its width allows it. | Main page sections and the concept preview card. |
| `w-full`, `max-w-xl`, `min-w-0`, `min-h-48` | Set width constraints or minimum dimensions. | Interactive preview, lesson columns, and builder preview stage. |
| `h-[76px]` | Set a height to a specific arbitrary value. | Header height on larger screens. |

### Color and typography

| Classes | What they do | Where they are used |
| --- | --- | --- |
| `bg-white`, `bg-violet-100`, `bg-violet-600` | Set background colors. The violet shades are extended in the inline theme configuration. | White content cards, practice previews, and buttons. |
| `text-ink`, `text-white`, `text-sm`, `text-xl` | Set text color or font size. `text-ink` is a project theme token. | Body copy, lesson previews, and buttons. |
| `font-sans`, `font-display`, `font-semibold`, `font-extrabold` | Select a font family or weight. | Body text, headings, and preview content. |
| `leading-6`, `tracking-tight` | Adjust line height and letter spacing. | Advanced examples and the class bank. |

### Borders, corners, and effects

| Classes | What they do | Where they are used |
| --- | --- | --- |
| `border`, `border-t` | Add a border or a top border. | Lesson cards, builder, controls, and footer. |
| `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full` | Round corners, from a small radius to a pill/circle shape. | Buttons, cards, and builder previews; the builder lets you change the selected corner utility. |
| `shadow-sm`, `shadow-lg` | Add a subtle or larger shadow. | Interactive concept preview and advanced examples. |

### Responsive and interaction variants

| Pattern | What it means | Example in the project |
| --- | --- | --- |
| `min-[621px]:...`, `max-[620px]:...` | Apply a utility only at the given custom viewport width range. | The page adjusts its spacing and columns for narrow and wider screens. |
| `md:...`, `lg:...` | Apply a utility at Tailwind's medium or large breakpoint and above. | Advanced lesson examples demonstrate responsive text and grids. |
| `hover:bg-violet-700` | Change the background while the pointer hovers over the element. | The interactive preview button and state lesson. |
| `focus-visible:outline-2`, `focus-visible:outline-offset-2` | Show a keyboard-visible focus outline. | The preview button and accessibility examples. |
| `active:scale-95` | Slightly scale an element while it is pressed. | Interactive-state lesson example. |
| `dark:bg-slate-900`, `dark:text-white` | Apply styles when class-based dark mode is active. | Dark-mode lesson example; the header theme toggle switches the page theme. |
| `group`, `group-hover:translate-x-1` | Let a child respond to a state on a parent marked `group`. | Advanced composition lesson example. |
| `w-[37px]`, `bg-[#f5f0ff]` | Use a specific arbitrary width or color value. | Arbitrary-values lesson example. |

Prefixes go before the utility and are separated by a colon. For example, `md:hover:bg-violet-700` means: apply the darker violet background from the medium breakpoint upward, while the element is hovered.

## Interactive behavior

`app.js` contains the lesson definitions and page behavior:

- Selecting a concept or searching the lesson list updates the lesson content, code example, and preview choices.
- The concept preview applies a selected utility to its target and displays the class being demonstrated.
- The card builder combines a complete background class with the selected padding and corner classes. It updates the preview and displayed class string.
- The theme button toggles the `dark` class and updates its accessible label, pressed state, icon, and browser theme color.
- Copy buttons use the browser Clipboard API. Clipboard access may require a secure context, such as HTTPS or localhost.

Some utility classes are assembled by JavaScript at runtime. The hidden `.class-bank` in `index.html` keeps the supported choices as complete class names in the document. Its explanatory HTML comment is:

```html
<!-- Keep runtime-selected Tailwind utilities in the document for the browser CDN. -->
```

This is a helper for this page's CDN-based examples, not a required pattern for every Tailwind project. In a production build, ensure the configured Tailwind source detection can see complete class names used dynamically.

## Notes for adapting the project

- Keep dynamically chosen class names as complete strings (for example, map a color choice to `"bg-violet-100"`). Constructing class names from fragments can prevent build-time source detection from finding the final utility.
- When changing the color or spacing options in `app.js`, make sure each complete utility is available to the Tailwind setup and update the displayed preview/class string consistently.
- The visual styles in `style.css` are separate from Tailwind. Add or adjust semantic component styles there when a design needs more than composing existing utilities.
- This project has no automated test or build scripts; validate changes by opening the page in a browser and exercising the lesson controls, theme toggle, and card builder.
