<div align="center">

# ReceiptCarbon

**Mobile app that scans grocery receipts to calculate real-time carbon footprint and suggest eco-friendly swaps.**

![React Native](https://img.shields.io/badge/React%20Native-333?style=flat-square) ![Firebase](https://img.shields.io/badge/Firebase-333?style=flat-square) ![OpenAI Vision API](https://img.shields.io/badge/OpenAI%20Vision%20API-333?style=flat-square)
![Utility Tool](https://img.shields.io/badge/Utility-Tool-success?style=flat-square)
![Type](https://img.shields.io/badge/Type-Mobile%20App-blue?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-7%2F10-brightgreen?style=flat-square)

</div>

---

## Problem

Climate-conscious consumers cannot easily track the environmental impact of their daily food purchases.

## Who Is This For?

Eco-conscious millennials, climate activists, zero-waste practitioners

## Features

- **OCR receipt scanning**
- **Carbon database lookup per item**
- **Alternative product suggestions**
- **Weekly impact tracking**

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React Native | Core dependency |
| Firebase | Core dependency |
| OpenAI Vision API | Core dependency |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

1. Clone the repository
```bash
git clone https://github.com/malikmuhammadsaadshafiq-dev/mvp-receiptcarbon.git
cd mvp-receiptcarbon
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npx expo start
```

4. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## Usage Guide

### Core Workflows

**1. OCR receipt scanning**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**2. Carbon database lookup per item**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time

**3. Alternative product suggestions**
   - Navigate to the relevant section in the app
   - Follow the on-screen prompts to complete the action
   - Results are displayed in real-time


## Quality Assurance

| Test | Status |
|------|--------|
| Has state management | ✅ Pass |
| Has form/input handling | ✅ Pass |
| Has click handlers (2+) | ⚠️ Needs attention |
| Has demo data | ⚠️ Needs attention |
| Has loading states | ✅ Pass |
| Has user feedback | ✅ Pass |
| No placeholder text | ✅ Pass |
| Has CRUD operations | ✅ Pass |
| Has empty states | ✅ Pass |
| Has responsive layout | ⚠️ Needs attention |

**Overall Score: 7/10**

## Project Structure

```
├── App.tsx                # Entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── assets/               # Images & fonts
└── src/
    ├── components/       # Reusable UI components
    ├── screens/          # App screens
    └── utils/            # Helper functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — use freely for personal and commercial projects.

---

<div align="center">

**Built autonomously by [Openclaw MVP Factory](https://github.com/malikmuhammadsaadshafiq-dev/Openclaw)** — an AI-powered system that discovers real user needs and ships working software.

</div>
