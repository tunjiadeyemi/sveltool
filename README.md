# 🔧 Sveltool

A powerful collection of interactive Svelte components for building modern web applications. Sveltool provides drag-and-drop functionality, magnification tools, note-taking capabilities, and advanced UI components with built-in styling.

[![npm version](https://badge.fury.io/js/@tunjiadeyemi%2Fsveltool.svg)](https://www.npmjs.com/package/@tunjiadeyemi/sveltool)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Interactive Components**: Drag-and-drop, resizable, and interactive UI elements
- 🔍 **Magnifier Tool**: Zoom and magnify content with customizable lens
- 📝 **Notepad Component**: Draggable notepad with persistent storage
- 📊 **Graph Selector**: Interactive graph selection component
- 📏 **Line Reader**: Customizable line reading tool with background colors
- 🎨 **Built-in Styling**: Pre-styled with Tailwind CSS
- 🚀 **Svelte 5 Ready**: Built for the latest Svelte version
- 📦 **TypeScript Support**: Full TypeScript support included

## 📦 Installation

```bash
npm install @tunjiadeyemi/sveltool
```

```bash
yarn add @tunjiadeyemi/sveltool
```

```bash
pnpm add @tunjiadeyemi/sveltool
```

## 🚀 Quick Start

### Basic Usage

```svelte
<script>
  import { Notepad, Magnifier, LineReader } from '@tunjiadeyemi/sveltool';
  // Styles are automatically included
</script>

<!-- Draggable Notepad -->
<Notepad open={true} />

<!-- Magnifier with custom zoom -->
<Magnifier open={true} zoom={2} lensSize={250}>
  <p>Your content to magnify goes here...</p>
</Magnifier>

<!-- Line Reader with blue background -->
<LineReader backgroundColor="blue" />
```

### Manual Style Import (if needed)

If styles don't load automatically, you can import them manually:

```javascript
import '@tunjiadeyemi/sveltool/styles';
```

## 📚 Components

### 🗒️ Notepad

A draggable notepad component with persistent storage.

```svelte
<script>
  import { Notepad } from '@tunjiadeyemi/sveltool';

  let isOpen = true;

  function handleClose() {
    isOpen = false;
  }
</script>

<Notepad
  open={isOpen}
  handleClose={handleClose}
/>
```

**Props:**

- `open` (boolean): Controls visibility of the notepad
- `handleClose` (function): Callback function when close button is clicked

### 🔍 Magnifier

Interactive magnification tool with draggable lens.

```svelte
<script>
  import { Magnifier } from '@tunjiadeyemi/sveltool';
</script>

<Magnifier
  open={true}
  zoom={3}
  lensSize={200}
  borderRadius={50}
>
  <img src="your-image.jpg" alt="Content to magnify" />
  <p>Any content can be magnified...</p>
</Magnifier>
```

**Props:**

- `open` (boolean): Controls visibility of the magnifier
- `zoom` (number): Magnification level (default: 2)
- `lensSize` (number): Size of the magnification lens in pixels (default: 250)
- `borderRadius` (number): Border radius of the lens as percentage (default: 10)

### 📏 LineReader

Customizable line reading tool with draggable and resizable functionality.

```svelte
<script>
  import { LineReader } from '@tunjiadeyemi/sveltool';
</script>

<LineReader backgroundColor="rgba(255, 255, 0, 0.3)" />
```

**Props:**

- `backgroundColor` (string): Background color of the reading line

### 📊 GraphSelector

Interactive graph selection component for data visualization.

```svelte
<script>
  import { GraphSelector } from '@tunjiadeyemi/sveltool';
</script>

<GraphSelector />
```

### 🎯 RaySelector

Advanced ray selection tool for precise interactions.

```svelte
<script>
  import { RaySelector } from '@tunjiadeyemi/sveltool';
</script>

<RaySelector />
```

## 🎨 Styling

Sveltool comes with built-in Tailwind CSS styling. The styles are automatically included when you import any component.

### Custom Styling

You can override the default styles by targeting the component classes:

```css
/* Override notepad styles */
.sveltool-notepad {
  /* Your custom styles */
}

/* Override magnifier styles */
.magnifier-lens {
  /* Your custom styles */
}
```

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

1. Clone the repository:

```bash
git clone https://github.com/tunjiadeyemi/sveltool.git
cd sveltool
```

2. Install dependencies:

```bash
npm install
```

### Development Commands

#### 🚀 For Regular Development

```bash
npm run dev
```

Use this when working on components without adding new Tailwind CSS classes.

#### ⚡ For Development with New Styles (Recommended)

```bash
npm run dev:full
```

**This is the recommended command for development!** It automatically:

- ✅ Watches for CSS changes and rebuilds Tailwind automatically
- ✅ Runs the development server
- ✅ Auto-reloads when you add new Tailwind classes

#### 🎨 Manual CSS Commands

```bash
# Build CSS once (when you add new Tailwind classes)
npm run build:css

# Watch and rebuild CSS automatically
npm run build:css:watch
```

#### 📦 Package for Distribution

```bash
npm run package
```

Automatically builds CSS before packaging the library.

### Development Workflow

#### Option A: Automated (Recommended)

```bash
# Single command that handles everything
npm run dev:full
```

#### Option B: Manual Control

```bash
# Terminal 1: Watch CSS changes
npm run build:css:watch

# Terminal 2: Run dev server
npm run dev
```

### Adding New Components

1. **Create your component** in `src/lib/components/YourComponent.svelte`
2. **Use Tailwind classes** freely in your component
3. **If using `npm run dev:full`** → CSS rebuilds automatically ✨
4. **If using `npm run dev`** → Run `npm run build:css` when you add new classes
5. **Export your component** in `src/lib/index.ts`
6. **Test in the demo** by importing in `src/routes/+page.svelte`

7. Open [http://localhost:5174](http://localhost:5174) to view the demo

### Building

Build the library:

```bash
npm run package
```

Build and preview:

```bash
npm run build
npm run preview
```

### Testing

Run type checking:

```bash
npm run check
```

Run continuous type checking:

```bash
npm run check:watch
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](#contributing-guidelines) below.

### Contributing Guidelines

1. **Fork the repository** and create your feature branch from `main`
2. **Install dependencies**: `npm install`
3. **Start development** with automated CSS building: `npm run dev:full`
4. **Make your changes** in the `src/lib/components/` directory
5. **Add/update tests** if applicable
6. **Run type checking**: `npm run check`
7. **Build the library**: `npm run package` (CSS builds automatically)
8. **Test your changes** in the demo app
9. **Commit your changes** with descriptive commit messages
10. **Push to your fork** and submit a pull request

### Development Workflow

```bash
# 1. Start development with auto CSS building
npm run dev:full

# 2. Create a new component
touch src/lib/components/MyNewComponent.svelte

# 3. Export it in the main index
# Add to src/lib/index.ts

# 4. Add TypeScript types if needed
# Add to src/lib/types/index.ts

# 5. Test your component in the demo
# Edit src/routes/+page.svelte
# (CSS rebuilds automatically when you save!)

# 6. Build and test
npm run package
```

### 📋 Quick Reference - Available Commands

| Command                   | Purpose                                        | When to Use                          |
| ------------------------- | ---------------------------------------------- | ------------------------------------ |
| `npm run dev`             | Standard development server                    | Working without new Tailwind classes |
| `npm run dev:full`        | **Recommended:** Dev server + auto CSS rebuild | Adding new components/styles         |
| `npm run build:css`       | Build CSS once                                 | After adding new Tailwind classes    |
| `npm run build:css:watch` | Watch and rebuild CSS                          | Manual control over CSS building     |
| `npm run package`         | Build library for distribution                 | Before publishing/testing            |
| `npm run check`           | TypeScript type checking                       | Before committing                    |

### Component Development Guidelines

- Use **TypeScript** for all component props
- Include **JSDoc comments** for all props
- Follow **Svelte 5** best practices
- Use **Tailwind CSS** for styling
- Ensure components are **accessible**
- Add **proper event handling**
- Include **error boundaries** where needed

### Code Style

- Use **Prettier** for formatting
- Follow **ESLint** rules
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep **components small** and focused

## 📝 Changelog

### v0.0.1 (Current)

- Initial release
- Added Notepad component with drag functionality
- Added Magnifier component with zoom controls
- Added LineReader component with customizable background
- Added GraphSelector and RaySelector components
- Integrated Tailwind CSS styling
- TypeScript support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tunji Adeyemi**

- Website: [https://tunny.netlify.app/](https://tunny.netlify.app/)
- GitHub: [@tunjiadeyemi](https://github.com/tunjiadeyemi)
- Email: tvnji01@gmail.com

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Vite](https://vitejs.dev/)

## 📞 Support

If you have any questions or need help:

1. Check the [documentation](#components) above
2. Look through [existing issues](https://github.com/tunjiadeyemi/sveltool/issues)
3. Create a [new issue](https://github.com/tunjiadeyemi/sveltool/issues/new) if needed

---

Made with ❤️ by [Tunji Adeyemi](https://tunny.netlify.app/)
