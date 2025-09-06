# JSON Data Viewer

A powerful, real-time JSON data viewer with tree visualization and formatted display. Built with Next.js, React, and TypeScript.

## 🚀 Features

- **Real-time JSON Processing**: Instant parsing and validation as you type or paste
- **Dual View Modes**:
  - Tree View with collapsible folders and item counts
  - Formatted JSON view with syntax highlighting
- **Interactive Tree Navigation**:
  - Click to expand/collapse JSON objects and arrays
  - Visual hierarchy with proper indentation
  - Item count display for arrays and objects
  - Color-coded data types
- **Dark Theme**: Optimized dark interface for comfortable viewing
- **Resizable Panels**: Adjust input/output panel sizes to your preference
- **Error Handling**: Clear error messages for invalid JSON
- **Copy Functionality**: One-click copy of formatted JSON
- **Responsive Design**: Works on desktop and mobile devices

## 🎯 Live Demo

Visit the live application: [JSON Data Viewer](https://dtducas.github.io/data-viewer/)

## 🛠️ Technologies Used

- **Next.js 15** - React framework with static export
- **React 19** - UI library with modern hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Resizable Panels** - Interactive panel resizing

## 🏃‍♂️ Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/DTDucas/data-viewer.git
cd data-viewer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

This creates an optimized static export in the `out` directory.

## 📖 Usage

1. **Input JSON**: Paste or type your JSON data in the left panel
2. **Real-time Validation**: See instant feedback on JSON validity
3. **Choose View Mode**: Switch between Tree View and Formatted view
4. **Navigate Data**:
   - In Tree View: Click arrows to expand/collapse objects and arrays
   - Use "Expand All" / "Collapse All" buttons for bulk operations
5. **Copy Results**: Click the copy button to copy formatted JSON

## 🎨 Tree View Features

- **Color-coded Types**:
  - 🟢 Strings (emerald)
  - 🔵 Numbers (blue)
  - 🟣 Booleans (purple)
  - ⚫ Null values (gray)
  - 🟠 Arrays (orange)
  - 🔴 Objects (rose)

- **Interactive Elements**:
  - Expandable/collapsible nodes
  - Item count indicators
  - Hover effects
  - Smooth animations

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup GitHub Pages Deployment

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The workflow will automatically deploy on push to main branch

## 👨‍💻 Author

**Duong Tran Quang (DTDucas)**

- Email: <baymax.contact@gmail.com>
- GitHub: [@DTDucas](https://github.com/DTDucas)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/DTDucas/data-viewer/issues).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
