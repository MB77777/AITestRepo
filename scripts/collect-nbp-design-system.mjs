import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../frontend/node_modules/playwright/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "docs", "nbp-design-system-artifacts");
const screenshotDir = path.join(outDir, "screenshots");
const assetDir = path.join(repoRoot, "assets", "nbp");

await fs.mkdir(screenshotDir, { recursive: true });
await fs.mkdir(assetDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

const dismissConsent = async (page) => {
  const labels = [
    "Akceptuj",
    "Zaakceptuj",
    "Accept",
    "Zgadzam się",
    "Przejdź do serwisu",
  ];

  for (const label of labels) {
    const button = page.getByRole("button", { name: new RegExp(label, "i") }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      await page.waitForTimeout(750);
      return;
    }
  }
};

const normalizeFileName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "section";

const desktopContext = await browser.newContext({
  viewport: { width: 1600, height: 1200 },
  locale: "pl-PL",
  colorScheme: "light",
});
const page = await desktopContext.newPage();

await page.goto("https://nbp.pl/", { waitUntil: "networkidle", timeout: 120000 });
await dismissConsent(page);
await page.waitForTimeout(1500);

await page.screenshot({
  path: path.join(screenshotDir, "nbp-home-desktop-full.png"),
  fullPage: true,
});
await page.screenshot({
  path: path.join(screenshotDir, "nbp-home-desktop-viewport.png"),
});

const sectionData = await page.evaluate(() => {
  const visibleSections = Array.from(
    document.querySelectorAll("header, main section, footer, [class*='hero'], [class*='banner']")
  )
    .map((el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const heading = el.querySelector("h1, h2, h3, h4, h5, h6");
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        classes: Array.from(el.classList),
        text: (heading?.textContent || el.getAttribute("aria-label") || "").trim(),
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        backgroundColor: style.backgroundColor,
      };
    })
    .filter((entry) => entry.rect.width > 200 && entry.rect.height > 80);

  return visibleSections.slice(0, 12);
});

for (const section of sectionData) {
  await page.screenshot({
    path: path.join(
      screenshotDir,
      `${String(section.rect.y).padStart(5, "0")}-${normalizeFileName(section.text || section.tag)}.png`
    ),
    clip: {
      x: Math.max(0, section.rect.x),
      y: Math.max(0, section.rect.y),
      width: Math.min(section.rect.width, 1600),
      height: Math.min(section.rect.height, 2000),
    },
  }).catch(() => {});
}

const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  locale: "pl-PL",
  colorScheme: "light",
});
const mobilePage = await mobileContext.newPage();
await mobilePage.goto("https://nbp.pl/", { waitUntil: "networkidle", timeout: 120000 });
await dismissConsent(mobilePage);
await mobilePage.waitForTimeout(1000);
await mobilePage.screenshot({
  path: path.join(screenshotDir, "nbp-home-mobile-viewport.png"),
});

const analysis = await page.evaluate(async () => {
  const rgbaToHex = (value) => {
    const match = value.match(/\d+(\.\d+)?/g);
    if (!match || match.length < 3) return null;
    const [r, g, b] = match.slice(0, 3).map(Number);
    return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
  };

  const pick = (selector) => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const style = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    return {
      selector,
      tag: node.tagName.toLowerCase(),
      id: node.id || null,
      classes: Array.from(node.classList),
      text: (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 180),
      rect: {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
      styles: {
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        borderRadius: style.borderRadius,
        border: style.border,
        boxShadow: style.boxShadow,
        textTransform: style.textTransform,
        transition: style.transition,
      },
    };
  };

  const interestingSelectors = [
    "body",
    "header",
    "header a",
    "main h1",
    "main h2",
    "main p",
    "button",
    "a[role='button']",
    ".btn",
    ".button",
    ".wp-block-button__link",
    "input",
    "select",
    "footer",
  ];

  const allElements = Array.from(document.querySelectorAll("body *"));
  const sample = allElements.filter((el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });

  const colors = new Map();
  const shadows = new Set();
  const radii = new Set();
  const borders = new Set();
  const fontFamilies = new Set();
  const fontSizes = new Set();
  const fontWeights = new Set();
  const lineHeights = new Set();
  const letterSpacings = new Set();
  const transitions = new Set();
  const animations = new Set();
  const zIndexes = new Set();
  const classFrequency = new Map();

  for (const el of sample) {
    const style = getComputedStyle(el);
    const colorKeys = [
      style.color,
      style.backgroundColor,
      style.borderTopColor,
      style.borderRightColor,
      style.borderBottomColor,
      style.borderLeftColor,
    ];
    for (const color of colorKeys) {
      const hex = rgbaToHex(color);
      if (!hex) continue;
      colors.set(hex, (colors.get(hex) || 0) + 1);
    }
    if (style.boxShadow && style.boxShadow !== "none") shadows.add(style.boxShadow);
    if (style.borderRadius && style.borderRadius !== "0px") radii.add(style.borderRadius);
    if (style.border && style.border !== "0px none rgb(0, 0, 0)") borders.add(style.border);
    if (style.fontFamily) fontFamilies.add(style.fontFamily);
    if (style.fontSize) fontSizes.add(style.fontSize);
    if (style.fontWeight) fontWeights.add(style.fontWeight);
    if (style.lineHeight) lineHeights.add(style.lineHeight);
    if (style.letterSpacing && style.letterSpacing !== "normal") letterSpacings.add(style.letterSpacing);
    if (style.transition && style.transition !== "all") transitions.add(style.transition);
    if (style.animationName && style.animationName !== "none") {
      animations.add(`${style.animationName} | ${style.animationDuration} | ${style.animationTimingFunction}`);
    }
    if (style.zIndex && style.zIndex !== "auto") zIndexes.add(style.zIndex);

    for (const cls of el.classList) {
      classFrequency.set(cls, (classFrequency.get(cls) || 0) + 1);
    }
  }

  const rootVars = {};
  const rootStyle = getComputedStyle(document.documentElement);
  for (const prop of Array.from(rootStyle)) {
    if (prop.startsWith("--")) {
      rootVars[prop] = rootStyle.getPropertyValue(prop).trim();
    }
  }

  const styleSheets = Array.from(document.styleSheets).map((sheet) => {
    const href = sheet.href || "inline";
    let ruleCount = null;
    let sampleRules = [];

    try {
      const rules = Array.from(sheet.cssRules || []);
      ruleCount = rules.length;
      sampleRules = rules.slice(0, 10).map((rule) => rule.cssText.slice(0, 220));
    } catch (error) {
      sampleRules = [`inaccessible: ${String(error)}`];
    }

    return { href, ruleCount, sampleRules };
  });

  const fontFaceRules = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules || [])) {
        if (rule.constructor.name === "CSSFontFaceRule") {
          fontFaceRules.push(rule.cssText);
        }
      }
    } catch {}
  }

  const media = Array.from(document.images).map((img) => ({
    alt: img.alt || null,
    src: img.currentSrc || img.src || null,
    width: img.naturalWidth || null,
    height: img.naturalHeight || null,
    classes: Array.from(img.classList),
  }));

  const logoCandidate =
    media.find((img) => /logo|nbp/i.test(`${img.alt || ""} ${img.src || ""}`)) ||
    null;

  const navLinks = Array.from(document.querySelectorAll("header a, nav a"))
    .slice(0, 20)
    .map((a) => ({
      text: (a.textContent || "").trim().replace(/\s+/g, " "),
      href: a.href,
      classes: Array.from(a.classList),
    }));

  const buttons = Array.from(document.querySelectorAll("button, .btn, .button, a[role='button'], .wp-block-button__link"))
    .slice(0, 20)
    .map((el) => {
      const style = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
        classes: Array.from(el.classList),
        styles: {
          color: style.color,
          backgroundColor: style.backgroundColor,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          padding: style.padding,
          borderRadius: style.borderRadius,
          border: style.border,
          boxShadow: style.boxShadow,
        },
      };
    });

  return {
    meta: {
      title: document.title,
      url: location.href,
      lang: document.documentElement.lang || null,
      bodyClasses: Array.from(document.body.classList),
    },
    rootVars,
    styleSheets,
    fontFaceRules,
    colorUsage: Array.from(colors.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)
      .map(([hex, count]) => ({ hex, count })),
    shadows: Array.from(shadows).slice(0, 20),
    radii: Array.from(radii).slice(0, 20),
    borders: Array.from(borders).slice(0, 20),
    fontFamilies: Array.from(fontFamilies).slice(0, 20),
    fontSizes: Array.from(fontSizes).sort((a, b) => parseFloat(a) - parseFloat(b)),
    fontWeights: Array.from(fontWeights).sort((a, b) => parseFloat(a) - parseFloat(b)),
    lineHeights: Array.from(lineHeights).slice(0, 20),
    letterSpacings: Array.from(letterSpacings).slice(0, 20),
    transitions: Array.from(transitions).slice(0, 20),
    animations: Array.from(animations).slice(0, 20),
    zIndexes: Array.from(zIndexes).slice(0, 20),
    topClasses: Array.from(classFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 80)
      .map(([className, count]) => ({ className, count })),
    selectorSnapshots: interestingSelectors.map(pick).filter(Boolean),
    navLinks,
    buttons,
    media: media.slice(0, 50),
    logoCandidate,
  };
});

let logoOutput = null;
if (analysis.logoCandidate?.src) {
  const url = analysis.logoCandidate.src;
  const response = await page.request.get(url);
  if (response.ok()) {
    const buffer = Buffer.from(await response.body());
    const extension = path.extname(new URL(url).pathname) || ".bin";
    const logoPath = path.join(assetDir, `nbp-logo${extension}`);
    await fs.writeFile(logoPath, buffer);
    logoOutput = {
      sourceUrl: url,
      localPath: logoPath,
      alt: analysis.logoCandidate.alt,
    };
  }
}

await fs.writeFile(
  path.join(outDir, "nbp-analysis.json"),
  JSON.stringify({ collectedAt: new Date().toISOString(), logoOutput, sectionData, analysis }, null, 2),
  "utf8"
);

await mobileContext.close();
await desktopContext.close();
await browser.close();

console.log(JSON.stringify({ outDir, screenshotDir, assetDir, logoOutput }, null, 2));
