<!-- ═══════════ ANIMATED HEADER ═══════════ -->

# 💰 Finance Dashboard

<div align="center">
<!-- ═══════════ TYPING ANIMATION ═══════════ -->

<br/>

<!-- ═══════════ BADGES ═══════════ -->
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
&nbsp;
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
&nbsp;
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br/>

![Repo Size](https://img.shields.io/github/repo-size/Umangpandey75/finance-dashboard?style=flat-square&color=6AD3F7&label=Repo+Size)
&nbsp;
![Last Commit](https://img.shields.io/github/last-commit/Umangpandey75/finance-dashboard?style=flat-square&color=58A6FF&label=Last+Commit)
&nbsp;
![License](https://img.shields.io/github/license/Umangpandey75/finance-dashboard?style=flat-square&color=27AE60)
&nbsp;
![Stars](https://img.shields.io/github/stars/Umangpandey75/finance-dashboard?style=social)
&nbsp;
![Forks](https://img.shields.io/github/forks/Umangpandey75/finance-dashboard?style=social)

</div>

---

## 🌊 What is Finance Dashboard?

**Finance Dashboard** is a modern, intuitive personal finance management application. Built with **React** and **Tailwind CSS**, it empowers you to track your income, monitor your expenses, and gain powerful financial insights through a beautiful UI.

Whether you're budgeting for the month, analyzing spending trends, or managing daily transactions — **Finance Dashboard** has you covered.

> *"Track. Analyze. Grow. — Take control of your financial future."*

### ✨ Core Philosophy
- 🎯 **Simplicity first** — elegant UI, zero clutter
- ⚡ **Speed** — lightning-fast performance with Vite
- 🔌 **Extensibility** — scalable React architecture and components

---

## 🚀 Features

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 📊 **Advanced Analytics** | Monthly trend and spending category charts via Recharts | ✅ Active |
| 💸 **Transaction Management** | Full CRUD capabilities for tracking daily expenses and income | ✅ Active |
| 🛡️ **Role-Based Access** | Switch between Admin (Full Access) and Viewer (Read-only) | ✅ Active |
| 🌙 **Dark Mode Support** | Seamless toggle between Light and Dark themes | ✅ Active |
| 📥 **Data Export** | Download your financial data securely as CSV or JSON | ✅ Active |
| 📱 **Responsive Design** | Optimized for Desktop, Tablet, and Mobile views | ✅ Active |

</div>

---

## 🛠️ Tech Stack

<div align="center">

### 💻 Frontend Core
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### 🎨 Styling & UI
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-F472B6?style=for-the-badge)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge)

### 🔧 Tools & DevOps
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

</div>

---

## 🗂️ Project Structure

```
📦 finance-dashboard/
├── 📁 src/
│   ├── 📁 components/      ← UI components (NavBar, Charts, Transactions)
│   ├── 📁 context/         ← Global state management (AppContext)
│   ├── 📁 utils/           ← Calculation and formatting helpers
│   ├── 📁 data/            ← Mock transaction data
│   └── 📄 App.jsx          ← Root component and routing
├── 📄 package.json         ← Project dependencies and scripts
├── 📄 tailwind.config.js   ← Tailwind CSS configuration
└── 📄 vite.config.js       ← Vite bundler configuration
```

---

## ⚙️ Architecture Overview

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background":         "#0a0e1a",
    "primaryColor":       "#1a1a2e",
    "primaryTextColor":   "#6AD3F7",
    "primaryBorderColor": "#58A6FF",
    "lineColor":          "#58A6FF",
    "secondaryColor":     "#16213e",
    "tertiaryColor":      "#0f3460",
    "fontFamily":         "Fira Code, monospace"
  }
}}%%
flowchart LR
    A["👤 User Actions"] --> B["UI Components\nReact Context"]
    B --> C{"State Management"}
    C --> D["Local Storage\nPersistence"]
    C --> E["Dynamic Rendering"]
    E --> F["📊 Interactive Charts\nRecharts"]
    E --> G["📝 Transaction Table"]
    E --> H["💡 Financial Insights"]
```

---

## 🚦 Quick Start

### Prerequisites

```bash
# Make sure you have Node.js installed (v18+ recommended)
node --version

# You can use npm or yarn
npm --version
```

### 🖥️ Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Umangpandey75/finance-dashboard.git

# 2. Navigate to the project directory
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## 🎮 How to Use

<div align="center">

```
  Step 1             Step 2              Step 3              Step 4
     🌐                 📝                  📊                  📥
Open Dashboard  → Add Transaction  → Analyze Spending  →  Export Data
  Home Page        Fill the Form     View the Charts     CSV or JSON
```

</div>

### 🔑 Key Interactions

| Action | Description |
|---------|--------|
| **Add Transaction** | Admin role: click 'Add' and log income/expense |
| **Switch Role** | Toggle between Admin & Viewer in the Navbar |
| **Toggle Theme** | Switch Dark/Light mode using the Sun/Moon icon |
| **Filter Data** | Use search or month filters in the Transactions view |
| **Export** | Download all records directly to your local machine |

---

## 📸 Interface Preview

<div align="center">

> 🌙 **Dark-themed financial UI** — minimalist, clean, and focused on data

```
┌──────────────────────────────────────────┐
│                                          │
│   💰 Finance Dashboard      [🌙] [👤]  │
│                                          │
│   ┌────────────┐ ┌────────────┐          │
│   │ 💼 Balance │ │ 📉 Expense │          │
│   │   $4,200   │ │   $1,100   │          │
│   └────────────┘ └────────────┘          │
│                                          │
│          [ 📊  Spending Chart ]          │
│                                          │
│   Recent Transactions:                   │
│   🟢 Salary          +$3000              │
│   🔴 Groceries       -$150               │
│                                          │
└──────────────────────────────────────────┘
```

**Background:** `#1a1a2e` &nbsp;|&nbsp; **Card:** `#16213e` &nbsp;|&nbsp; **Text:** `#ffffff`

</div>

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Here's how you can help:

```bash
# 1. Fork the repository on GitHub
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m '✨ Add AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request 🎉
```

### 💡 Ideas for Contribution
- [ ] 🌍 Multi-currency support
- [ ] 📈 Additional advanced chart types
- [ ] 🔌 Backend integration (Node.js/Express)
- [ ] 🔐 User authentication (Firebase/Auth0)
- [ ] 📅 Recurring transactions system

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Author

<div align="center">

### **Umang Pandey**
*Frontend Developer · React Enthusiast · UI/UX Designer*

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:umangpandey.co@gmail.com)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/umang-pandey-01b486273)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Umangpandey75)
&nbsp;
[![Portfolio](https://img.shields.io/badge/Portfolio-6AD3F7?style=for-the-badge&logo=vercel&logoColor=black)](https://umangpandey.vercel.app)

*"Query the data. Build the insight. Ship the WOW. ✨"*

</div>

---

## ⭐ Show Your Support

If **Finance Dashboard** helped you manage your finances better, please give it a ⭐ — it means the world!

<div align="center">

[![Star this repo](https://img.shields.io/badge/⭐_Star_this_repo-FFD700?style=for-the-badge)](https://github.com/Umangpandey75/finance-dashboard/stargazers)
&nbsp;
[![Fork this repo](https://img.shields.io/badge/🍴_Fork_it-58A6FF?style=for-the-badge)](https://github.com/Umangpandey75/finance-dashboard/fork)
&nbsp;
[![Share on Twitter](https://img.shields.io/badge/Share_on_Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/intent/tweet?text=Check+out+Finance-Dashboard+by+%40Umangpandey75!+%F0%9F%92%B0%F0%9F%93%88&url=https://github.com/Umangpandey75/finance-dashboard)

</div>
---
<!-- ═══════════ FOOTER WAVE ═══════════ -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f3460,40:16213e,70:1a1a2e,100:0d1117&height=120&section=footer" width="100%"/>

<div align="center">

*Made with ❤️ by [Umang Pandey](https://github.com/Umangpandey75) · © 2026 Finance Dashboard*

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Umangpandey75.finance-dashboard&left_color=1F6FEB&right_color=6AD3F7&left_text=Visitors)
</div>
