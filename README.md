# Terminal Portfolio Website 🐧

A terminal-themed portfolio website inspired by Linux kernel boot sequences and systems programming. Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS** to simulate a complete system boot experience with an interactive shell interface.

## 🚀 Vision

This project embodies the journey toward kernel development and systems programming. Instead of a traditional portfolio, visitors experience booting into a custom Linux system with a fully-functional terminal shell – a fitting representation of someone passionate about low-level systems, kernel development, and understanding how computers actually work at their core.

## ✨ Features

### **Realistic Boot Sequence** (`BootSequence.tsx`)
Simulates an authentic Linux boot experience:
- 🔧 **UEFI Firmware** - Secure Boot initialization with hardware detection
- 🖥️ **Hardware Abstraction** - CPU, memory, and GPU detection logs
- 🐧 **GRUB Bootloader** - Kernel image and initramfs loading
- 🔌 **Kernel Initialization** - Real kernel boot logs with timestamps
- ⚙️ **systemd Services** - Service startup sequence (NetworkManager, PipeWire, Hyprland compositor, D-Bus)
- 🔐 **Login Sequence** - TTY login prompt with animated terminal startup
- 📊 **Progress Bar** - Smooth gradient progress indicator during boot

### **Interactive Terminal Shell** (`Terminal.tsx`)
A fully-functional shell interface once booted:
- **Custom Prompt** - Beautiful colored prompt with glow effects (`daiyaan@portfolio:~$`)
- **Command History** - Arrow key navigation through command history (↑/↓)
- **Tab Completion** - Auto-complete supported commands
- **Window Frame** - macOS-style window chrome with close/minimize buttons
- **Status Bar** - Shows command count, encoding, and cursor position
- **Real Commands** - Execute portfolio commands:
  - `help` - Show available commands
  - `about` - About the developer
  - `skills` - Technical skills
  - `projects` - Portfolio projects
  - `experience` - Work experience
  - `education` - Educational background
  - `achievements` - Awards & achievements
  - `contact` - Contact information
  - `neofetch` - System info (neofetch-style)
  - `ls`, `clear`, `history`, `whoami`, `uname`, `date`, `pwd`

### **Design & Aesthetics**
- 🎨 **Custom Color Scheme** - Vibrant cyber-inspired palette with glow effects
- ✨ **Text Glow Effects** - Neon text glow for immersive terminal feel
- 🎬 **Framer Motion Animations** - Smooth transitions and line-by-line animations
- 📱 **Responsive Design** - Mobile-optimized terminal experience
- 🌙 **Dark Mode** - Beautiful dark terminal aesthetic

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework | 16.1.6 |
| **React** | UI library | 19.2.3 |
| **TypeScript** | Type safety | 5.x |
| **Tailwind CSS** | Styling | 4.x |
| **Framer Motion** | Animations | 12.36.0 |
| **Vercel Analytics** | Analytics | 2.0.1 |

### Language Composition
- **TypeScript** - 91.6% (core logic & components)
- **CSS** - 7.2% (custom terminal styles)
- **JavaScript** - 1.2% (configuration files)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main entry point with boot phase control
│   └── layout.tsx            # App layout & global styles
├── components/
│   ├── BootSequence.tsx       # Realistic Linux boot simulation
│   └── Terminal.tsx           # Interactive command shell
└── lib/
    └── commands/
        ├── commandRegistry.ts # Command execution system
        └── commands.ts        # Command implementations
```

## 🎮 Getting Started

### Prerequisites
- Node.js 18+ with npm/yarn/pnpm
- Modern browser with ES6 support

### Installation

```bash
# Clone the repository
git clone https://github.com/unKnownNG/Terminal-Portfolio-Website.git
cd Terminal-Portfolio-Website

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. The page will hot-reload as you edit files.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 💡 Key Components

### BootSequence Component
Creates an authentic boot experience with:
- Typed boot line system with different message types (BIOS, kernel, systemd, OK, info, warning, login, ASCII)
- Staggered animations for realistic timing
- Progress bar tracking
- Auto-scrolling terminal
- ASCII art logo display

```tsx
// Example boot line structure
interface BootLine {
  text: string;
  type: "bios" | "kernel" | "systemd" | "ok" | "info" | "warning" | "login" | "ascii";
  delay: number;
}
```

### Terminal Component
Provides interactive shell with:
- Real-time command input with custom cursor
- Command history management
- Output rendering system
- Tab completion logic
- Keyboard shortcuts (Ctrl+L for clear, arrow keys for history)

## 🎯 Kernel Development Inspiration

This portfolio reflects a deep passion for:
- 🔢 **Low-level Systems** - Understanding boot processes and kernel initialization
- 🐧 **Linux Kernel** - UEFI, bootloaders, systemd, and kernel architecture
- 📚 **Systems Programming** - Building close to the metal with C/Assembly/Rust
- ⚙️ **Hardware Interaction** - CPU, memory management, device drivers
- 🚀 **Performance** - Writing efficient, optimized code

The boot sequence display demonstrates knowledge of real Linux boot procedures, making it more than just a portfolio – it's a technical statement about aspirations in systems programming.

## 📈 Features Roadmap

- [ ] Interactive command-line arguments
- [ ] File system simulation with `cat`, `ls`, `mkdir`
- [ ] ASCII art gallery command
- [ ] Real-time system stats display
- [ ] Dark/Light theme toggle
- [ ] Terminal themes customization
- [ ] Save/download terminal session
- [ ] Voice command integration (Easter egg)

## 🎨 Customization

### Adding New Commands

1. Edit `src/lib/commands/commands.ts`:
```tsx
export const registerCommand = (name: string, handler: CommandHandler) => {
  // Command logic here
};
```

2. Commands automatically appear in `help` and tab completion

### Changing Boot Sequence

Edit `BOOT_LINES` array in `src/components/BootSequence.tsx` to customize boot messages, timing, and hardware details.

### Theming

Tailwind configuration is in `tailwind.config.ts`. Modify colors for the terminal palette.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📧 Contact

**Daiyaan** (@unKnownNG)

- Portfolio: [Website]([http://localhost:3000](https://terminal-portfolio-website-green.vercel.app/))
- GitHub: [@unKnownNG](https://github.com/unKnownNG)
- Type `contact` in the terminal for more information!

---

**Built with ❤️ for the kernel dev community**
