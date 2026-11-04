const card = document.querySelector("#live-card");
const classOutput = document.querySelector("#class-output");
const colorButtons = document.querySelectorAll(".color-option");
const paddingChoice = document.querySelector("#padding-choice");
const roundingChoice = document.querySelector("#rounding-choice");
const copyButton = document.querySelector("#copy-button");
const copyLabel = document.querySelector("#copy-label");
const themeToggle = document.querySelector("#theme-toggle");
const themeToggleLabel = document.querySelector("#theme-toggle-label");
const themeColor = document.querySelector('meta[name="theme-color"]');

const colorClasses = {
    violet: "bg-violet-100",
    mint: "bg-emerald-100",
    peach: "bg-orange-100",
    sky: "bg-sky-100",
};

const paddingClasses = ["p-3", "p-6", "p-10"];
const roundingClasses = ["rounded-lg", "rounded-2xl", "rounded-full"];

function updateCard() {
    const selectedColor = document.querySelector(".color-option.is-selected");
    const classes = [
        colorClasses[selectedColor.dataset.color],
        paddingChoice.value,
        roundingChoice.value,
    ];

    card.classList.remove(...Object.values(colorClasses), ...paddingClasses, ...roundingClasses);
    card.classList.add(...classes);
    classOutput.textContent = classes.join(" ");
}

colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        colorButtons.forEach((option) => {
            const isSelected = option === button;
            option.classList.toggle("is-selected", isSelected);
            option.setAttribute("aria-pressed", String(isSelected));
        });
        updateCard();
    });
});

paddingChoice.addEventListener("change", updateCard);
roundingChoice.addEventListener("change", updateCard);

themeToggle.addEventListener("click", () => {
    const isDark = document.body.dataset.theme !== "dark";
    document.body.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggleLabel.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggle.querySelector(".theme-toggle-icon").textContent = isDark ? "☼" : "☾";
    themeColor.setAttribute("content", isDark ? "#15151d" : "#f8f7f3");
});

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(classOutput.textContent);
        copyLabel.textContent = "Copied!";
    } catch (error) {
        copyLabel.textContent = "Copy unavailable";
        copyButton.title = "Clipboard access is unavailable in this browser or page context.";
        console.error("Could not copy Tailwind classes to the clipboard.", error);
    }

    window.setTimeout(() => {
        copyLabel.textContent = "Copy classes";
        copyButton.removeAttribute("title");
    }, 1800);
});

const concepts = [
    {
        id: "styling",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 01 · THE BIG IDEA",
        title: "Styling with utility classes",
        docsHref: "https://tailwindcss.com/docs/styling-with-utility-classes",
        lead: "Tailwind lets you style an element by combining small, single-purpose classes directly in your markup.",
        explanation: "Each utility does one job: p-6 adds padding, text-xl changes text size, and rounded-xl rounds corners. Put the classes together on the element they style. This keeps the relationship between your markup and design easy to see.",
        tip: "Start with a few classes, then add only what the design needs. Repeated patterns can become reusable components in your framework.",
        code: '<article class="rounded-xl bg-white p-6 shadow-md">\n  <h2 class="text-xl font-bold">A useful card</h2>\n  <p class="mt-2 text-slate-600">Each class does one job.</p>\n</article>',
        baseClasses: "bg-violet-100 p-6 rounded-2xl",
        target: "card",
        options: [
            { label: "Quiet — shadow-sm", classes: "shadow-sm", value: "shadow-sm" },
            { label: "Lifted — shadow-md", classes: "shadow-md", value: "shadow-md" },
            { label: "Extra round — rounded-full", classes: "rounded-full", value: "rounded-full" },
        ],
        previewTitle: "Small classes, together",
        previewCopy: "Every utility has a job.",
        hint: "Pick a utility and notice how it changes just one part of the design.",
    },
    {
        id: "states",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 02 · INTERACTION",
        title: "Hover, focus, and other states",
        docsHref: "https://tailwindcss.com/docs/hover-focus-and-other-states",
        lead: "Style an element differently when someone hovers, focuses, clicks, or when it is disabled.",
        explanation: "A state variant is a prefix followed by a colon. hover:bg-violet-700 applies while the pointer is over an element; focus-visible:outline-2 gives keyboard focus a visible outline. Variants can be combined when a style should apply only in a particular situation.",
        tip: "Do not rely on hover alone. Keyboard users need a clear focus-visible style, and disabled controls should still communicate their state.",
        code: '<button class="rounded-lg bg-violet-600 px-4 py-2\n  text-white hover:bg-violet-700\n  focus-visible:outline-2 focus-visible:outline-offset-2">\n  Save changes\n</button>',
        baseClasses: "bg-violet-100 p-6 rounded-2xl shadow-sm",
        target: "button",
        options: [
            { label: "Hover color — hover:bg-violet-700", classes: "hover:bg-violet-700", value: "hover:bg-violet-700" },
            { label: "Keyboard focus — focus-visible:ring-4", classes: "focus-visible:ring-4", value: "focus-visible:ring-4" },
            { label: "Pressed — active:scale-95", classes: "active:scale-95", value: "active:scale-95" },
        ],
        previewTitle: "Try a state",
        previewCopy: "Hover, focus, or press the button.",
        hint: "The selected variant is added to the button. Try hovering or tabbing to it.",
    },
    {
        id: "responsive",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 03 · RESPONSIVE",
        title: "Responsive design",
        docsHref: "https://tailwindcss.com/docs/responsive-design",
        lead: "Build a layout for small screens first, then add breakpoint variants when the design needs to change at larger widths.",
        explanation: "An unprefixed utility applies at every size. A prefix such as md: applies from that breakpoint upward. For example, grid-cols-1 md:grid-cols-3 starts as one column and becomes three columns on a medium screen.",
        tip: "Breakpoints are minimum widths, not device names. Choose them when your content needs more room, and remember project themes can customize breakpoint values.",
        code: '<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">\n  <article>First card</article>\n  <article>Second card</article>\n  <article>Third card</article>\n</div>',
        baseClasses: "bg-violet-100 p-4 rounded-2xl",
        target: "layout",
        options: [
            { label: "One column — grid-cols-1", classes: "grid grid-cols-1 gap-3", value: "grid grid-cols-1 gap-3" },
            { label: "Two at md: — md:grid-cols-2", classes: "grid grid-cols-1 md:grid-cols-2 gap-3", value: "grid grid-cols-1 md:grid-cols-2 gap-3" },
            { label: "Three at lg: — lg:grid-cols-3", classes: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", value: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" },
        ],
        previewTitle: "Layouts that adapt",
        previewCopy: "Resize the screen to see the columns change.",
        hint: "The layout starts narrow and gains columns at the selected breakpoints.",
    },
    {
        id: "dark",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 04 · THEMING",
        title: "Dark mode",
        docsHref: "https://tailwindcss.com/docs/dark-mode",
        lead: "Use dark: variants to provide an alternate design when a user or the operating system prefers a dark appearance.",
        explanation: "Pair regular utilities with dark: utilities, such as bg-white dark:bg-slate-900. Tailwind’s default dark variant follows the system preference; projects can configure it to respond to a class or data attribute instead.",
        tip: "Check more than the page background: make text, borders, form controls, images, and focus states readable in both themes.",
        code: '<article class="bg-white text-slate-900\n  dark:bg-slate-900 dark:text-white">\n  Works in light and dark themes.\n</article>',
        baseClasses: "p-6 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Light surface — bg-white", classes: "bg-white text-slate-900", value: "bg-white text-slate-900" },
            { label: "Dark surface — bg-slate-900", classes: "bg-slate-900 text-white", value: "bg-slate-900 text-white" },
        ],
        previewTitle: "Light and dark",
        previewCopy: "Choose a surface for the preview.",
        hint: "The header switch changes this page. In Tailwind, dark: follows your project’s configured strategy.",
    },
    {
        id: "theme",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 05 · DESIGN SYSTEM",
        title: "Theme variables",
        docsHref: "https://tailwindcss.com/docs/theme",
        lead: "Define design tokens once, then use the utilities Tailwind creates from those theme variables throughout your project.",
        explanation: "In Tailwind CSS v4, @theme variables define parts of your design system. For example, --color-brand-500 creates color utilities such as bg-brand-500 and text-brand-500. Theme variables are different from ordinary CSS custom properties: they also tell Tailwind which utilities to generate.",
        tip: "Put shared brand colors, fonts, breakpoints, and spacing values in the theme instead of repeating one-off values.",
        code: '@import "tailwindcss";\n\n@theme {\n  --color-brand-500: oklch(0.62 0.19 275);\n  --font-display: "Manrope", sans-serif;\n}\n\n/* Now use bg-brand-500 and font-display */',
        baseClasses: "p-6 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Brand purple — bg-violet-100", classes: "bg-violet-100", value: "bg-violet-100" },
            { label: "Brand mint — bg-emerald-100", classes: "bg-emerald-100", value: "bg-emerald-100" },
            { label: "Brand peach — bg-orange-100", classes: "bg-orange-100", value: "bg-orange-100" },
        ],
        previewTitle: "One token, many places",
        previewCopy: "A theme keeps your design consistent.",
        hint: "The example shows theme setup; select a color to preview a design-token choice.",
    },
    {
        id: "colors",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 06 · COLOR",
        title: "Colors",
        docsHref: "https://tailwindcss.com/docs/colors",
        lead: "Tailwind’s color palette gives you consistent shades for text, backgrounds, borders, rings, and more.",
        explanation: "A utility such as text-blue-600 combines the property (text), color (blue), and shade (600). Use lighter shades for subtle surfaces and darker shades for text that needs contrast. Theme colors can be extended or replaced for a project.",
        tip: "Check contrast between foreground and background, and do not use color as the only way to communicate meaning.",
        code: '<div class="rounded-xl bg-blue-50 p-4">\n  <p class="font-medium text-blue-900">\n    A calm, readable color pairing.\n  </p>\n</div>',
        baseClasses: "p-6 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Violet — bg-violet-100", classes: "bg-violet-100", value: "bg-violet-100" },
            { label: "Mint — bg-emerald-100", classes: "bg-emerald-100", value: "bg-emerald-100" },
            { label: "Peach — bg-orange-100", classes: "bg-orange-100", value: "bg-orange-100" },
            { label: "Sky — bg-sky-100", classes: "bg-sky-100", value: "bg-sky-100" },
        ],
        previewTitle: "Pick a palette",
        previewCopy: "Color utilities can style many properties.",
        hint: "Choose a surface color. Tailwind provides shades for backgrounds, text, borders, and more.",
    },
    {
        id: "custom",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 07 · CUSTOMIZATION",
        title: "Adding custom styles",
        docsHref: "https://tailwindcss.com/docs/adding-custom-styles",
        lead: "Use built-in utilities first, then add custom CSS or custom utilities when your project needs a style that is not already covered.",
        explanation: "Tailwind CSS v4 works alongside regular CSS. Add a one-off rule in a stylesheet, use an arbitrary value such as w-[17rem], or define a reusable utility with @utility. Choose the simplest option that fits how often the style is used.",
        tip: "A one-off can be a custom CSS rule; a repeated pattern is a good candidate for a design token, component, or reusable utility.",
        code: '@import "tailwindcss";\n\n@utility content-auto {\n  content-visibility: auto;\n}\n\n/* Use it like a utility: */\n<div class="content-auto">…</div>',
        baseClasses: "p-6 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Standard — p-6", classes: "bg-violet-100", value: "bg-violet-100" },
            { label: "Custom color — bg-[#f5f0ff]", classes: "bg-[#f5f0ff]", value: "bg-[#f5f0ff]" },
            { label: "Custom width — w-[17rem]", classes: "w-[17rem] bg-violet-100", value: "w-[17rem]" },
        ],
        previewTitle: "Make the right thing reusable",
        previewCopy: "Use a token or utility for repeated styles.",
        hint: "Compare a standard utility with an arbitrary value. The lesson shows a reusable @utility too.",
    },
    {
        id: "detect",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 08 · BUILD PROCESS",
        title: "Detecting classes in source files",
        docsHref: "https://tailwindcss.com/docs/detecting-classes-in-source-files",
        lead: "Tailwind scans your project’s source files for complete class names, then generates CSS for the utilities it finds.",
        explanation: "Class names need to appear as complete strings in scanned source. Building a class like bg-${color}-600 from fragments can hide the final class from the scanner. Map each choice to a complete class name instead. Use @source when files are outside the paths Tailwind scans by default.",
        tip: "If a style is missing in production, check that the source file is scanned and that the complete class name exists in the source.",
        code: '// Keep each possible class as a complete string\nconst colors = {\n  violet: "bg-violet-600",\n  mint: "bg-emerald-600",\n};\n\n// Tailwind CSS v4: include extra source paths\n@source "../packages/ui";',
        baseClasses: "p-6 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Violet — bg-violet-600", classes: "bg-violet-600 text-white", value: "bg-violet-600" },
            { label: "Mint — bg-emerald-600", classes: "bg-emerald-600 text-white", value: "bg-emerald-600" },
        ],
        previewTitle: "Complete class names",
        previewCopy: "Make every possible utility discoverable.",
        hint: "The preview demonstrates the complete static classes from a map.",
    },
    {
        id: "functions",
        category: "CORE CONCEPTS",
        level: "CORE CONCEPT 09 · CSS TOOLING",
        title: "Functions and directives",
        docsHref: "https://tailwindcss.com/docs/functions-and-directives",
        lead: "Tailwind’s CSS functions and directives connect your stylesheet to the build process and help you compose custom styles.",
        explanation: "@theme defines design tokens, @utility registers a custom utility, @apply inlines existing utility styles into a CSS rule, and @variant applies a variant inside CSS. The --spacing() and --alpha() functions help build values from the theme. Which syntax is available depends on the Tailwind version.",
        tip: "Use these in your CSS when they make a stylesheet clearer. For component-specific styling, utility classes directly in markup are often simpler.",
        code: '@import "tailwindcss";\n\n.card {\n  @apply rounded-xl p-6 shadow-md;\n}\n\n@variant dark {\n  .card { background: var(--color-slate-900); }\n}\n\n/* Example: margin: --spacing(4); */',
        baseClasses: "bg-violet-100 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Compact — p-3", classes: "p-3", value: "p-3" },
            { label: "Comfortable — p-6", classes: "p-6", value: "p-6" },
            { label: "Extra roomy — p-10", classes: "p-10", value: "p-10" },
        ],
        previewTitle: "Utilities meet CSS",
        previewCopy: "Compose a reusable style when it helps.",
        hint: "This preview changes a utility. The code example shows CSS-side functions and directives.",
    },
    {
        id: "spacing",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · STARTER",
        title: "Spacing & sizing",
        lead: "Give elements room to breathe. Tailwind’s spacing utilities control padding, margin, gaps, width, and height with a consistent scale.",
        explanation: "Padding is space inside an element. Margin is space outside it. The default spacing scale grows in 0.25rem steps: p-4 is 1rem (16px when the root font size is 16px), while p-6 is 1.5rem.",
        tip: "Use gap-* to space children in a layout. Use p-* for room inside a box and m-* when you need room outside it.",
        code: '<div class="rounded-2xl bg-violet-100 p-6">\n  A little room makes this feel nicer.\n</div>',
        baseClasses: "bg-violet-100 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Compact — p-3", classes: "p-3", value: "p-3" },
            { label: "Comfortable — p-6", classes: "p-6", value: "p-6" },
            { label: "Extra roomy — p-10", classes: "p-10", value: "p-10" },
        ],
        previewTitle: "Room to breathe",
        previewCopy: "Padding adds space inside.",
        hint: "Notice how padding changes the space inside the card.",
    },
    {
        id: "color-palette",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · STARTER",
        title: "Color backgrounds",
        lead: "Color utilities let you style text, backgrounds, and borders. A color name and shade number make the palette easy to scan.",
        explanation: "In bg-violet-100, bg means background, violet is the hue, and 100 is a light shade. Larger shade numbers are usually darker. Pair text and background colors with enough contrast to keep text readable.",
        tip: "Try a pale background with a darker text color. Check contrast, especially for small text.",
        code: '<div class="rounded-2xl bg-violet-100 p-6">\n  <p class="text-violet-900">Hello, color!</p>\n</div>',
        baseClasses: "p-6 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Soft violet — bg-violet-100", classes: "bg-violet-100", value: "bg-violet-100" },
            { label: "Fresh mint — bg-emerald-100", classes: "bg-emerald-100", value: "bg-emerald-100" },
            { label: "Warm peach — bg-orange-100", classes: "bg-orange-100", value: "bg-orange-100" },
            { label: "Clear sky — bg-sky-100", classes: "bg-sky-100", value: "bg-sky-100" },
        ],
        previewTitle: "Choose a color",
        previewCopy: "The shade number changes the tone.",
        hint: "Choose a background and watch the preview change.",
    },
    {
        id: "typography",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · STARTER",
        title: "Typography",
        lead: "Build a clear reading hierarchy with utilities for font size, weight, line height, letter spacing, and text color.",
        explanation: "text-xl changes font size, font-bold changes weight, and leading-6 changes line height. Mix a few utilities to make headings stand out while keeping paragraphs comfortable to read.",
        tip: "Readable text needs more than a size: pay attention to line height, measure, weight, and color contrast.",
        code: '<h2 class="text-2xl font-bold tracking-tight">\n  A clear page heading\n</h2>\n<p class="mt-2 text-sm leading-6 text-slate-600">\n  Easy-to-read supporting text.\n</p>',
        baseClasses: "bg-white p-6 rounded-2xl shadow-sm",
        target: "title",
        options: [
            { label: "Small — text-sm", classes: "text-sm", value: "text-sm" },
            { label: "Regular — text-xl", classes: "text-xl", value: "text-xl" },
            { label: "Big — text-3xl", classes: "text-3xl", value: "text-3xl" },
        ],
        previewTitle: "Words have a voice",
        previewCopy: "Size changes the hierarchy.",
        hint: "Change the heading size to see visual hierarchy.",
    },
    {
        id: "borders",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · STARTER",
        title: "Borders & corners",
        lead: "Use borders to define edges, and rounded utilities to soften corners. A subtle border can separate a card without adding visual weight.",
        explanation: "border adds a line, border-violet-200 picks its color, and rounded-xl controls the corner radius. Combine them to create anything from a crisp panel to a pill-shaped button.",
        tip: "Use rounded-full for pills and circles. For cards, smaller corner radii often feel cleaner and more consistent.",
        code: '<div class="rounded-xl border border-violet-200 p-6">\n  A gentle outline defines this card.\n</div>',
        baseClasses: "bg-white p-6 shadow-sm border border-violet-200",
        target: "card",
        options: [
            { label: "Soft — rounded-lg", classes: "rounded-lg", value: "rounded-lg" },
            { label: "Extra soft — rounded-2xl", classes: "rounded-2xl", value: "rounded-2xl" },
            { label: "Pill — rounded-full", classes: "rounded-full", value: "rounded-full" },
        ],
        previewTitle: "Edges set the mood",
        previewCopy: "Try different corner shapes.",
        hint: "The same card feels different when its corners change.",
    },
    {
        id: "shadows",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · STARTER",
        title: "Shadows",
        lead: "Shadows suggest depth and help important surfaces stand out from the page.",
        explanation: "shadow-sm, shadow-md, and shadow-xl are ready-made shadow sizes. A little shadow is usually enough for a card; stronger shadows work better for elements floating above the page.",
        tip: "Use shadows intentionally. Too many strong shadows make a page feel noisy.",
        code: '<article class="rounded-2xl bg-white p-6 shadow-md">\n  This card sits just above the page.\n</article>',
        baseClasses: "bg-white p-6 rounded-2xl",
        target: "card",
        options: [
            { label: "Quiet — shadow-sm", classes: "shadow-sm", value: "shadow-sm" },
            { label: "Lifted — shadow-md", classes: "shadow-md", value: "shadow-md" },
            { label: "Floating — shadow-xl", classes: "shadow-xl", value: "shadow-xl" },
        ],
        previewTitle: "Add a little depth",
        previewCopy: "A shadow lifts a surface.",
        hint: "Compare how much each shadow lifts the card.",
    },
    {
        id: "flexbox",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · LAYOUT",
        title: "Flexbox",
        lead: "Flexbox is a simple way to arrange items in a row or column and align them inside a container.",
        explanation: "flex turns an element into a flex container. flex-col stacks its children vertically; flex-row places them side by side. items-center aligns across the row, while justify-between spreads items along it.",
        tip: "Put layout utilities on the parent. They arrange the children inside it.",
        code: '<div class="flex items-center justify-between gap-4">\n  <span>Logo</span>\n  <button>Menu</button>\n</div>',
        baseClasses: "bg-violet-100 p-4 rounded-2xl",
        target: "layout",
        options: [
            { label: "Stack — flex-col", classes: "flex flex-col items-start gap-3", value: "flex flex-col items-start gap-3" },
            { label: "Row — flex-row", classes: "flex flex-row items-center gap-3", value: "flex flex-row items-center gap-3" },
            { label: "Spread out — justify-between", classes: "flex flex-row items-center justify-between gap-2", value: "flex flex-row items-center justify-between gap-2" },
        ],
        previewTitle: "Arrange the pieces",
        previewCopy: "Flexbox changes their direction.",
        hint: "Switch between a vertical stack and a horizontal row.",
    },
    {
        id: "grid",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · LAYOUT",
        title: "Grid",
        lead: "CSS Grid makes it easy to place content in rows and columns. Tailwind utilities help you choose the number of columns and the space between them.",
        explanation: "grid creates a grid container. grid-cols-2 gives it two equal columns, and gap-3 creates space between the cells. Grid is a great fit for galleries, dashboards, and card collections.",
        tip: "Start with one column for small screens, then add a breakpoint such as md:grid-cols-2 when there is room.",
        code: '<div class="grid grid-cols-1 gap-4 md:grid-cols-2">\n  <article>First card</article>\n  <article>Second card</article>\n</div>',
        baseClasses: "bg-violet-100 p-4 rounded-2xl",
        target: "layout",
        options: [
            { label: "One column — grid-cols-1", classes: "grid grid-cols-1 gap-3", value: "grid grid-cols-1 gap-3" },
            { label: "Two columns — grid-cols-2", classes: "grid grid-cols-2 gap-3", value: "grid grid-cols-2 gap-3" },
            { label: "Three columns — grid-cols-3", classes: "grid grid-cols-3 gap-2", value: "grid grid-cols-3 gap-2" },
        ],
        previewTitle: "Make a little grid",
        previewCopy: "Grid gives you columns.",
        hint: "Try two columns; the demo items flow into the grid.",
    },
    {
        id: "responsive-extra",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · RESPONSIVE",
        title: "Responsive grid practice",
        lead: "Make one layout adapt to different screen sizes. Tailwind is mobile-first: unprefixed utilities apply everywhere, and breakpoint prefixes add changes for wider screens.",
        explanation: "grid-cols-1 is the starting layout. md:grid-cols-2 switches to two columns at the medium breakpoint and above. Read a responsive class as “when the screen is at least this wide, apply this style.”",
        tip: "Start with the narrow-screen layout, then add only the breakpoint changes that your design needs.",
        code: '<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">\n  <!-- cards adapt as the screen grows -->\n</div>',
        baseClasses: "bg-violet-100 p-4 rounded-2xl",
        target: "layout",
        options: [
            { label: "Always one column", classes: "grid grid-cols-1 gap-3", value: "grid grid-cols-1 gap-3" },
            { label: "Two columns from md:", classes: "grid grid-cols-1 md:grid-cols-2 gap-3", value: "grid grid-cols-1 md:grid-cols-2 gap-3" },
            { label: "Three columns from lg:", classes: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", value: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" },
        ],
        previewTitle: "Layouts that adapt",
        previewCopy: "Resize the screen and inspect the classes.",
        hint: "The preview changes columns when its viewport reaches each breakpoint.",
    },
    {
        id: "states-extra",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · INTERACTION",
        title: "Interactive button practice",
        lead: "Add a state prefix to apply a style only while an element is hovered, focused, pressed, or disabled.",
        explanation: "hover:bg-violet-700 changes the background only while the pointer is over the element. focus-visible:outline-2 shows a clear focus ring for people navigating with a keyboard.",
        tip: "Try tabbing to buttons on your own page. Every interactive control needs a visible keyboard focus state.",
        code: '<button class="bg-violet-600 text-white\n  hover:bg-violet-700\n  focus-visible:outline-2">\n  Save changes\n</button>',
        baseClasses: "bg-violet-100 p-6 rounded-2xl shadow-sm",
        target: "button",
        options: [
            { label: "Change color — hover:bg-violet-700", classes: "hover:bg-violet-700", value: "hover:bg-violet-700" },
            { label: "Lift up — hover:-translate-y-1", classes: "hover:-translate-y-1", value: "hover:-translate-y-1" },
            { label: "Press down — active:scale-95", classes: "active:scale-95", value: "active:scale-95" },
        ],
        previewTitle: "Interactive by design",
        previewCopy: "Hover or click the button below.",
        hint: "The selected state utility is added to the button. Hover or press it.",
    },
    {
        id: "dark-extra",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · THEMING",
        title: "Dark theme practice",
        lead: "Use a dark: variant to provide alternate colors when your project is in dark mode.",
        explanation: "A class such as dark:bg-slate-900 pairs with a normal light-mode background. The dark variant responds to your project’s dark-mode strategy; this learning site also has a theme switch in the header.",
        tip: "Dark mode needs more than inverting colors. Check text contrast, borders, shadows, and muted text in both themes.",
        code: '<article class="bg-white text-slate-900\n  dark:bg-slate-900 dark:text-white">\n  Looks good in either theme.\n</article>',
        baseClasses: "p-6 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Light surface", classes: "bg-white text-slate-900", value: "bg-white text-slate-900" },
            { label: "Dark surface", classes: "bg-slate-900 text-white", value: "bg-slate-900 text-white" },
        ],
        previewTitle: "Light and dark",
        previewCopy: "Use the header switch to change the page theme.",
        hint: "This preview switches surface colors. Your project controls when dark: activates.",
    },
    {
        id: "arbitrary-extra",
        category: "MORE TO EXPLORE",
        level: "EXTRA CONCEPT · ADVANCED",
        title: "Arbitrary value practice",
        lead: "When a design needs a value that is not on the default scale, square brackets let you use a specific value directly.",
        explanation: "Classes such as w-[13rem] or bg-[#f5f0ff] are called arbitrary values. Prefer Tailwind’s standard scale for consistency; use a custom value when it solves a real design need.",
        tip: "If you repeat the same custom value, consider defining it as a reusable design token in your Tailwind theme.",
        code: '<div class="w-[13rem] bg-[#f5f0ff] p-6">\n  A deliberate custom value.\n</div>',
        baseClasses: "bg-violet-100 p-6 rounded-2xl shadow-sm",
        target: "card",
        options: [
            { label: "Default width — w-40", classes: "w-40", value: "w-40" },
            { label: "Custom width — w-[13rem]", classes: "w-[13rem]", value: "w-[13rem]" },
            { label: "Custom color — bg-[#f5f0ff]", classes: "bg-[#f5f0ff]", value: "bg-[#f5f0ff]" },
        ],
        previewTitle: "Sometimes custom fits",
        previewCopy: "Use a one-off value with square brackets.",
        hint: "The live class output shows the complete arbitrary-value utility.",
    },
];

const conceptNav = document.querySelector("#concept-nav");
const conceptButtons = [...document.querySelectorAll(".concept-link")];
const conceptSearch = document.querySelector("#concept-search");
const lessonCategory = document.querySelector("#lesson-category");
const lessonLevel = document.querySelector("#lesson-level");
const lessonTitle = document.querySelector("#lesson-title");
const lessonLead = document.querySelector("#lesson-lead");
const officialDocLink = document.querySelector("#official-doc-link");
const lessonExplanation = document.querySelector("#lesson-explanation");
const lessonTip = document.querySelector("#lesson-tip");
const lessonCode = document.querySelector("#lesson-code");
const classBreakdown = document.querySelector("#class-breakdown");
const conceptOption = document.querySelector("#concept-option");
const conceptOptionLabel = document.querySelector("#concept-option-label");
const conceptHint = document.querySelector("#concept-hint");
const conceptPreview = document.querySelector("#concept-preview");
const conceptDemoContent = document.querySelector("#concept-demo-content");
const previewTitle = document.querySelector("#preview-title");
const previewCopy = document.querySelector("#preview-copy");
const conceptClassOutput = document.querySelector("#concept-class-output");
const previousConcept = document.querySelector("#previous-concept");
const nextConcept = document.querySelector("#next-concept");
const exampleCopy = document.querySelector("#example-copy");
let activeConceptIndex = 0;
let activeOptionIndex = 1;

function classListFor(concept, option) {
    return [...new Set([...concept.baseClasses.split(" "), ...option.classes.split(" ")].filter(Boolean))];
}

function renderConcept(index) {
    activeConceptIndex = index;
    activeOptionIndex = Math.min(1, concepts[index].options.length - 1);
    const concept = concepts[index];

    conceptButtons.forEach((button) => {
        const isActive = button.dataset.topic === concept.id;
        button.classList.toggle("is-active", isActive);
        if (isActive) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    lessonCategory.textContent = concept.category;
    lessonLevel.textContent = concept.level;
    lessonTitle.textContent = concept.title;
    lessonLead.textContent = concept.lead;
    officialDocLink.hidden = !concept.docsHref;
    if (concept.docsHref) officialDocLink.href = concept.docsHref;
    lessonExplanation.textContent = concept.explanation;
    lessonTip.textContent = concept.tip;
    lessonCode.textContent = concept.code;
    conceptOptionLabel.textContent = `Try ${concept.title.toLowerCase()}`;
    conceptHint.textContent = concept.hint;
    previewTitle.textContent = concept.previewTitle;
    previewCopy.textContent = concept.previewCopy;

    conceptOption.replaceChildren(...concept.options.map((option, optionIndex) => {
        const element = document.createElement("option");
        element.value = String(optionIndex);
        element.textContent = option.label;
        return element;
    }));
    conceptOption.value = String(activeOptionIndex);

    previousConcept.disabled = index === 0;
    nextConcept.disabled = index === concepts.length - 1;
    previousConcept.querySelector("strong").textContent = concepts[index - 1]?.title || "Start here";
    nextConcept.querySelector("strong").textContent = concepts[index + 1]?.title || "You’re all caught up";
    updateConceptPreview();
}

function explainUtility(utility) {
    const baseUtility = utility.split(":").pop();
    if (baseUtility.includes("[") && baseUtility.includes("]")) return "uses a custom one-off value";
    if (baseUtility.startsWith("bg-")) return "sets the background color";
    if (baseUtility.startsWith("p-")) return "adds inside spacing (padding)";
    if (baseUtility.startsWith("rounded-")) return "rounds the corners";
    if (baseUtility.startsWith("shadow")) return "adds a shadow";
    if (baseUtility === "border") return "adds a border";
    if (baseUtility.startsWith("text-")) return "styles text size or color";
    if (baseUtility.startsWith("grid-cols-")) return "sets the number of grid columns";
    if (baseUtility === "grid" || baseUtility === "flex") return "chooses a layout system";
    if (baseUtility.startsWith("gap-")) return "sets space between items";
    if (baseUtility.startsWith("items-")) return "aligns items across the layout";
    if (baseUtility.startsWith("justify-")) return "distributes items along the layout";
    if (baseUtility.startsWith("w-") || baseUtility.startsWith("h-")) return "sets the element size";
    return "a small, focused style instruction";
}

function updateConceptPreview() {
    const concept = concepts[activeConceptIndex];
    const option = concept.options[activeOptionIndex];
    const classes = classListFor(concept, option);
    const breakdownClasses = [...new Set(classes)];

    conceptPreview.className = "concept-demo-card";
    conceptDemoContent.className = "concept-demo-content";
    document.querySelector("#preview-title").className = "concept-demo-title";
    document.querySelector("#preview-copy").className = "concept-demo-copy";
    document.querySelector("#concept-demo-button").className = "concept-demo-button";

    if (concept.target === "layout") {
        conceptPreview.classList.add(...concept.baseClasses.split(" "));
        conceptDemoContent.classList.add(...option.classes.split(" "));
    } else if (concept.target === "title") {
        conceptPreview.classList.add(...concept.baseClasses.split(" "));
        document.querySelector("#preview-title").classList.add(...option.classes.split(" "));
    } else if (concept.target === "button") {
        conceptPreview.classList.add(...concept.baseClasses.split(" "));
        document.querySelector("#concept-demo-button").classList.add(...option.classes.split(" "));
    } else {
        conceptPreview.classList.add(...classes);
    }

    conceptPreview.classList.toggle("concept-preview-dark", concept.id.startsWith("dark") && activeOptionIndex === 1);
    conceptClassOutput.textContent = concept.target === "layout" || concept.target === "title" || concept.target === "button"
        ? option.classes
        : classes.join(" ");

    classBreakdown.replaceChildren(...breakdownClasses.map((word) => {
        const row = document.createElement("div");
        row.className = "breakdown-row";
        const name = document.createElement("code");
        name.textContent = word;
        const description = document.createElement("span");
        description.textContent = explainUtility(word);
        row.append(name, description);
        return row;
    }));
}

conceptButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const index = concepts.findIndex((concept) => concept.id === button.dataset.topic);
        if (index !== -1) renderConcept(index);
    });
});

conceptOption.addEventListener("change", () => {
    activeOptionIndex = Number(conceptOption.value);
    updateConceptPreview();
});

conceptSearch.addEventListener("input", () => {
    const query = conceptSearch.value.trim().toLowerCase();
    let visibleCount = 0;
    conceptButtons.forEach((button) => {
        const concept = concepts.find((item) => item.id === button.dataset.topic);
        const matches = `${concept.title} ${concept.category} ${concept.lead}`.toLowerCase().includes(query);
        button.hidden = !matches;
        if (matches) visibleCount += 1;
    });
    [...conceptNav.querySelectorAll(".nav-group-label")].forEach((label) => {
        let next = label.nextElementSibling;
        let hasVisibleConcept = false;
        while (next && !next.classList.contains("nav-group-label")) {
            hasVisibleConcept ||= next.classList.contains("concept-link") && !next.hidden;
            next = next.nextElementSibling;
        }
        label.hidden = !hasVisibleConcept;
    });
    conceptNav.classList.toggle("no-results", visibleCount === 0);
});

conceptSearch.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        conceptSearch.value = "";
        conceptSearch.dispatchEvent(new Event("input"));
    }
});

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLElement
        && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
    if (event.key === "/" && !isTyping && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        conceptSearch.focus();
    }
});

previousConcept.addEventListener("click", () => {
    if (activeConceptIndex > 0) renderConcept(activeConceptIndex - 1);
});

nextConcept.addEventListener("click", () => {
    if (activeConceptIndex < concepts.length - 1) renderConcept(activeConceptIndex + 1);
});

exampleCopy.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(concepts[activeConceptIndex].code);
        exampleCopy.textContent = "Copied!";
    } catch (error) {
        exampleCopy.textContent = "Copy unavailable";
        console.error("Could not copy the lesson example to the clipboard.", error);
    }
    window.setTimeout(() => {
        exampleCopy.textContent = "Copy";
    }, 1800);
});

renderConcept(0);
