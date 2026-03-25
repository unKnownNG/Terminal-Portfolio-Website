import { registerCommand, getAllCommands } from "./commandRegistry";

// ─── help ─────────────────────────────────────────────
registerCommand({
  name: "help",
  description: "List all available commands",
  execute: () => {
    const commands = getAllCommands();
    return {
      content: (
        <div>
          <p className="text-primary-bright mb-2 text-glow">
            ╭──────────────────────────────────────╮
          </p>
          <p className="text-primary-bright text-glow">
            │ &nbsp;&nbsp;Available Commands &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│
          </p>
          <p className="text-primary-bright mb-3 text-glow">
            ╰──────────────────────────────────────╯
          </p>
          <div className="ml-2 space-y-1">
            {commands.map((cmd) => (
              <div key={cmd.name} className="flex gap-4">
                <span className="text-cyan min-w-[140px] font-semibold">
                  {cmd.name}
                </span>
                <span className="text-comment">{cmd.description}</span>
              </div>
            ))}
          </div>
          <p className="text-comment mt-3 text-sm">
            ── Tip: Use ↑↓ arrows for history, Tab for autocomplete, &apos;clear&apos; to reset ──
          </p>
        </div>
      ),
    };
  },
});

// ─── about ────────────────────────────────────────────
registerCommand({
  name: "about",
  description: "Who am I?",
  execute: () => ({
    content: (
      <div className="space-y-2">
        <p className="text-accent text-glow-accent font-bold text-lg">
          ┌─ About Me ─────────────────────────────────┐
        </p>
        <p className="ml-4 text-foreground">
          Hi, I&apos;m <span className="text-primary-bright font-semibold">Mohammed Daiyaan</span> — a
          systems-oriented engineering student experienced in operating systems,
          programming language development, and embedded systems.
        </p>
        <p className="ml-4 text-foreground">
          Proficient in <span className="text-cyan">C++</span>, <span className="text-cyan">Rust</span>, and
          building low-level software including <span className="text-green">kernels</span> and{" "}
          <span className="text-green">compilers</span>. I&apos;m an open-source contributor
          with strong foundations in computer systems and software engineering.
        </p>
        <p className="ml-4 text-foreground">
          Currently pursuing <span className="text-orange">B.E. in Electronics &amp; Communication Engineering</span> at
          Sri Sai Ram Institute of Technology, Chennai.
        </p>
        <p className="ml-4 text-comment text-sm mt-1">
          &quot;Talk is cheap. Show me the code.&quot; — Linus Torvalds
        </p>
        <p className="text-accent text-glow-accent font-bold">
          └─────────────────────────────────────────────┘
        </p>
      </div>
    ),
  }),
});

// ─── skills ───────────────────────────────────────────
registerCommand({
  name: "skills",
  description: "Technical skills & expertise",
  execute: () => ({
    content: (
      <div className="space-y-2">
        <p className="text-green text-glow-green font-bold">
          ⚡ Technical Skills
        </p>
        <div className="ml-2 space-y-1">
          {[
            { category: "Languages", items: "Python, C++, JavaScript, TypeScript, MATLAB" },
            { category: "Frameworks", items: "React, Next.js, Node.js, Tailwind CSS" },
            { category: "Databases", items: "MySQL, MongoDB" },
            { category: "Tools", items: "Git, Linux, ROS2, STM32, Docker" },
            { category: "Low-Level", items: "x86 Assembly, GCC, QEMU, LLVM, Bootloaders" },
            { category: "Systems", items: "Kernel Development, Compilers, Embedded Systems, OS Internals" },
          ].map((skill) => (
            <div key={skill.category} className="flex">
              <span className="text-cyan min-w-[120px] font-semibold">
                {skill.category}
              </span>
              <span className="text-comment">│</span>
              <span className="text-foreground ml-2">{skill.items}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  }),
});

// ─── projects ─────────────────────────────────────────
registerCommand({
  name: "projects",
  description: "Notable projects & contributions",
  execute: () => ({
    content: (
      <div className="space-y-3">
        <p className="text-yellow font-bold">📂 Projects</p>
        {[
          {
            name: "Custom Operating System from Scratch",
            desc: "Designed and implemented a minimal OS from scratch including a custom bootloader in Assembly and a C-based kernel. Implemented VGA text-mode drivers, memory handling, and a basic CLI running on an emulated x86 machine.",
            tech: "C, x86 Assembly, GCC, QEMU",
            link: "github.com/unKnownNG/Custom-OS",
          },
          {
            name: "Custom Programming Language (Compiler)",
            desc: "Designed and implemented a custom programming language with lexical analysis, parsing, and an execution engine. Built core compiler components — tokenization, AST generation, and runtime evaluation.",
            tech: "C++, LLVM",
            link: "github.com/unKnownNG/Custom-Programming-Language",
          },
          {
            name: "CodeNovel — AI-Powered Code Learning Platform",
            desc: "Built a web platform for reading and understanding AI-generated code. Designed a backend data model using Supabase/PostgreSQL with AI-assisted schema generation. Integrated AI summarization for complex code snippets.",
            tech: "TypeScript, Next.js, Supabase, PostgreSQL, AI APIs",
            link: "github.com/unKnownNG/Code-Novel",
          },
        ].map((project) => (
          <div key={project.name} className="ml-2">
            <p className="text-primary-bright font-semibold">
              ▸ {project.name}
            </p>
            <p className="text-foreground ml-4 text-sm">{project.desc}</p>
            <p className="text-comment ml-4 text-sm">
              Tech: <span className="text-orange">{project.tech}</span>
              &nbsp;&nbsp;│&nbsp;&nbsp;
              <span className="text-cyan">{project.link}</span>
            </p>
          </div>
        ))}
      </div>
    ),
  }),
});

// ─── experience ───────────────────────────────────────
registerCommand({
  name: "experience",
  description: "Work & contribution history",
  execute: () => ({
    content: (
      <div className="space-y-3">
        <p className="text-accent text-glow-accent font-bold">
          💼 Experience
        </p>
        {[
          {
            role: "Software Engineering Intern",
            company: "CVRDE, DRDO",
            location: "Chennai",
            period: "May 2025 — Dec 2025",
            details: [
              "Designed and developed a custom MATLAB-based GUI application for scientific data visualization and analysis used by DRDO researchers.",
              "Replicated and optimized key functionality of a proprietary software tool, creating a cost-effective internal alternative.",
              "Improved workflow efficiency for data analysis through interactive visualization and simplified user interaction.",
            ],
          },
          {
            role: "Control Systems Engineer",
            company: "Ad Astra Rover Team",
            location: "Chennai",
            period: "Oct 2024 — Sep 2025",
            details: [
              "Developed embedded control software for rover subsystems using STM32 and Arduino microcontrollers.",
              "Integrated hardware sensors and actuators with ROS2-based control pipelines for autonomous rover operations.",
              "Collaborated in a multidisciplinary robotics team to design and test embedded and control system components.",
            ],
          },
        ].map((exp) => (
          <div key={exp.role + exp.company} className="ml-2">
            <p>
              <span className="text-green font-semibold">{exp.role}</span>
              <span className="text-comment"> @ </span>
              <span className="text-orange">{exp.company}</span>
              <span className="text-comment"> — {exp.location}</span>
            </p>
            <p className="text-comment text-sm ml-4">{exp.period}</p>
            {exp.details.map((detail, i) => (
              <p key={i} className="text-foreground ml-6 text-sm">
                • {detail}
              </p>
            ))}
          </div>
        ))}

        <p className="text-accent text-glow-accent font-bold mt-3">
          🌐 Open Source Contributions
        </p>
        {[
          {
            project: "Optuna (v4.5.0, v4.6.0)",
            desc: "Refactored backend modules to standardize return types; contribution included in official release notes.",
          },
          {
            project: "Layer5 (Cloud Native Computing Foundation)",
            desc: "Contributed code and documentation improvements to cloud-native open-source projects in a global contributor environment.",
          },
        ].map((oss) => (
          <div key={oss.project} className="ml-2">
            <p>
              <span className="text-primary-bright font-semibold">▸ {oss.project}</span>
            </p>
            <p className="text-foreground ml-4 text-sm">• {oss.desc}</p>
          </div>
        ))}
      </div>
    ),
  }),
});

// ─── education ────────────────────────────────────────
registerCommand({
  name: "education",
  description: "Educational background",
  execute: () => ({
    content: (
      <div className="space-y-2">
        <p className="text-cyan text-glow-cyan font-bold">🎓 Education</p>
        <div className="ml-2">
          <p className="text-primary-bright font-semibold">
            Bachelor of Engineering — Electronics &amp; Communication Engineering
          </p>
          <p className="text-comment text-sm ml-4">
            Sri Sai Ram Institute of Technology, Chennai • 2023 — 2027
          </p>
          <p className="text-foreground text-sm ml-4">
            CGPA: <span className="text-green font-semibold">8.16</span>
          </p>
        </div>
      </div>
    ),
  }),
});

// ─── achievements ─────────────────────────────────────
registerCommand({
  name: "achievements",
  description: "Competitions & rankings",
  execute: () => ({
    content: (
      <div className="space-y-2">
        <p className="text-yellow font-bold">🏆 Achievements</p>
        <div className="ml-2 space-y-1">
          <p className="text-foreground text-sm">
            • Ranked in the <span className="text-green font-semibold">top 5%</span> with a global rank
            of <span className="text-green font-semibold">3300</span> in Codeforces Div. 2
          </p>
          <p className="text-foreground text-sm">
            • Participated in the <span className="text-cyan">University Rover Challenge 2025</span> and
            the <span className="text-cyan">International Rover Challenge 2025</span>
          </p>
        </div>
      </div>
    ),
  }),
});

// ─── contact ──────────────────────────────────────────
registerCommand({
  name: "contact",
  description: "How to reach me",
  execute: () => ({
    content: (
      <div className="space-y-2">
        <p className="text-accent text-glow-accent font-bold">
          📬 Contact Information
        </p>
        <div className="ml-2 space-y-1">
          {[
            { label: "Email", value: "mohammeddaiyaan2005@gmail.com", icon: "📧" },
            { label: "GitHub", value: "github.com/unKnownNG", icon: "🐙" },
            { label: "LinkedIn", value: "linkedin.com/in/mohammed-daiyaan-6791a7276", icon: "🔗" },
            { label: "Location", value: "Chennai, India", icon: "📍" },
            { label: "Phone", value: "+91 7867922818", icon: "📱" },
          ].map((item) => (
            <div key={item.label} className="flex gap-2">
              <span>{item.icon}</span>
              <span className="text-cyan min-w-[90px]">{item.label}</span>
              <span className="text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
        <p className="text-comment text-sm mt-2 ml-2">
          ── Feel free to reach out! I&apos;m always open to collaboration ──
        </p>
      </div>
    ),
  }),
});

// ─── neofetch ─────────────────────────────────────────
registerCommand({
  name: "neofetch",
  description: "System info card",
  execute: () => ({
    content: (
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* ASCII Art */}
        <pre className="text-primary text-glow text-xs leading-tight">
{`     .--.      
    |o_o |     
    |:_/ |     
   //   \\ \\   
  (|     | )  
 /'\\_   _/\`\\  
 \\___)=(___/  `}
        </pre>
        {/* System Info */}
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-primary-bright font-bold">daiyaan</span>
            <span className="text-foreground">@</span>
            <span className="text-accent font-bold">portfolio</span>
          </p>
          <p className="text-comment">─────────────────</p>
          <p>
            <span className="text-cyan">OS</span>
            <span className="text-foreground">: Arch Linux x86_64</span>
          </p>
          <p>
            <span className="text-cyan">Kernel</span>
            <span className="text-foreground">: 6.8.0-custom</span>
          </p>
          <p>
            <span className="text-cyan">Shell</span>
            <span className="text-foreground">: portfolio-sh 1.0.0</span>
          </p>
          <p>
            <span className="text-cyan">WM</span>
            <span className="text-foreground">: Hyprland</span>
          </p>
          <p>
            <span className="text-cyan">User</span>
            <span className="text-foreground">: Mohammed Daiyaan</span>
          </p>
          <p>
            <span className="text-cyan">Role</span>
            <span className="text-foreground">: Systems Engineer / OS Dev</span>
          </p>
          <p>
            <span className="text-cyan">Location</span>
            <span className="text-foreground">: Chennai, India</span>
          </p>
          <p>
            <span className="text-cyan">Languages</span>
            <span className="text-foreground">: C++, Python, TS, MATLAB</span>
          </p>
          <div className="flex gap-1 mt-2">
            {["bg-red", "bg-orange", "bg-yellow", "bg-green", "bg-cyan", "bg-primary", "bg-accent"].map((color) => (
              <span key={color} className={`inline-block w-4 h-4 rounded-sm ${color}`} />
            ))}
          </div>
        </div>
      </div>
    ),
  }),
});

// ─── ls ───────────────────────────────────────────────
registerCommand({
  name: "ls",
  description: "List directory contents",
  execute: (args) => {
    const showAll = args.includes("-la") || args.includes("-a") || args.includes("-al");
    const files = [
      { name: "about.md", color: "text-foreground" },
      { name: "skills.sh", color: "text-green" },
      { name: "projects/", color: "text-primary-bright" },
      { name: "experience.log", color: "text-foreground" },
      { name: "education.txt", color: "text-foreground" },
      { name: "contact.json", color: "text-yellow" },
      { name: "achievements.md", color: "text-orange" },
      { name: "resume.pdf", color: "text-accent" },
    ];
    const hiddenFiles = [
      { name: ".", color: "text-primary-bright" },
      { name: "..", color: "text-primary-bright" },
      { name: ".config/", color: "text-primary-bright" },
      { name: ".ssh/", color: "text-primary-bright" },
      { name: ".gitconfig", color: "text-foreground" },
    ];

    const allFiles = showAll ? [...hiddenFiles, ...files] : files;

    return {
      content: (
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {allFiles.map((f) => (
            <span key={f.name} className={`${f.color} ${f.name.endsWith("/") ? "font-bold" : ""}`}>
              {f.name}
            </span>
          ))}
        </div>
      ),
    };
  },
});

// ─── clear ────────────────────────────────────────────
registerCommand({
  name: "clear",
  description: "Clear the terminal",
  execute: () => ({ content: "__CLEAR__" }),
});

// ─── history ──────────────────────────────────────────
registerCommand({
  name: "history",
  description: "Show command history",
  execute: () => ({ content: "__HISTORY__" }),
});

// ─── uname ────────────────────────────────────────────
registerCommand({
  name: "uname",
  description: "Print system information",
  execute: (args) => {
    if (args.includes("-a")) {
      return {
        content: (
          <span className="text-foreground">
            Linux portfolio 6.8.0-custom #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux
          </span>
        ),
      };
    }
    return {
      content: <span className="text-foreground">Linux</span>,
    };
  },
});

// ─── whoami ───────────────────────────────────────────
registerCommand({
  name: "whoami",
  description: "Print current user",
  execute: () => ({
    content: (
      <span className="text-green text-glow-green">daiyaan</span>
    ),
  }),
});

// ─── cat ──────────────────────────────────────────────
registerCommand({
  name: "cat",
  description: "Display file contents",
  usage: "cat <filename>",
  execute: (args) => {
    const file = args.join(" ");
    if (file === "resume.pdf") {
      return {
        content: (
          <div className="space-y-1">
            <p className="text-yellow">
              📄 resume.pdf — Opening resume...
            </p>
            <p className="text-comment text-sm">
              (In a real deployment, this would download/open the resume PDF)
            </p>
          </div>
        ),
      };
    }
    if (file === "about.md") {
      return {
        content: (
          <span className="text-comment">
            Hint: Run the <span className="text-cyan">about</span> command for my bio!
          </span>
        ),
      };
    }
    if (!file) {
      return {
        content: <span className="text-red">cat: missing operand</span>,
      };
    }
    return {
      content: (
        <span className="text-red">cat: {file}: No such file or directory</span>
      ),
    };
  },
});

// ─── pwd ──────────────────────────────────────────────
registerCommand({
  name: "pwd",
  description: "Print working directory",
  execute: () => ({
    content: <span className="text-foreground">/home/daiyaan/portfolio</span>,
  }),
});

// ─── date ─────────────────────────────────────────────
registerCommand({
  name: "date",
  description: "Display current date/time",
  execute: () => ({
    content: (
      <span className="text-foreground">{new Date().toString()}</span>
    ),
  }),
});

// ─── sudo ─────────────────────────────────────────────
registerCommand({
  name: "sudo",
  description: "Execute as superuser",
  execute: () => ({
    content: (
      <div className="space-y-1">
        <p className="text-red font-bold">
          ⚠ Permission denied.
        </p>
        <p className="text-accent text-sm">
          Nice try! But you&apos;re already exploring as root 😏
        </p>
        <p className="text-comment text-sm">
          This incident will be reported.
        </p>
      </div>
    ),
  }),
});

// ─── echo ─────────────────────────────────────────────
registerCommand({
  name: "echo",
  description: "Display a line of text",
  execute: (args) => ({
    content: <span className="text-foreground">{args.join(" ")}</span>,
  }),
});

export {};
