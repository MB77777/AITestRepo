const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, "assets", "nbp");
const SCREENSHOTS_DIR = path.join(ASSETS_DIR, "screenshots");
const DATA_DIR = path.join(ASSETS_DIR, "data");
const RAW_JSON_PATH = path.join(DATA_DIR, "nbp-design-audit.json");

for (const dir of [ASSETS_DIR, SCREENSHOTS_DIR, DATA_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadToFile(url, targetPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed for ${url}: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(targetPath, Buffer.from(arrayBuffer));
}

async function safeClickCookieConsent(page) {
  const candidates = [
    "Akceptuj",
    "Akceptuję",
    "Zaakceptuj",
    "Accept",
    "Zgadzam",
    "OK",
  ];

  for (const label of candidates) {
    const locator = page.getByRole("button", { name: new RegExp(label, "i") }).first();
    if (await locator.count()) {
      try {
        await locator.click({ timeout: 2000 });
        return label;
      } catch {}
    }
  }

  return null;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 2200 },
    locale: "pl-PL",
    colorScheme: "light",
  });
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    locale: "pl-PL",
    colorScheme: "light",
  });

  const page = await desktop.newPage();
  const mobilePage = await mobile.newPage();

  try {
    await page.goto("https://nbp.pl/", { waitUntil: "networkidle", timeout: 90000 });
    const cookieAction = await safeClickCookieConsent(page);
    if (cookieAction) {
      await page.waitForTimeout(1000);
    }

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "nbp-home-desktop-above-fold.png"),
      fullPage: false,
    });
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "nbp-home-desktop-full.png"),
      fullPage: true,
    });

    await mobilePage.goto("https://nbp.pl/", { waitUntil: "networkidle", timeout: 90000 });
    await safeClickCookieConsent(mobilePage);
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({
      path: path.join(SCREENSHOTS_DIR, "nbp-home-mobile-above-fold.png"),
      fullPage: false,
    });

    const audit = await page.evaluate(() => {
      const toArray = (list) => Array.from(list || []);
      const normalizeColor = (value) => {
        if (!value || value === "rgba(0, 0, 0, 0)" || value === "transparent") {
          return null;
        }
        return value.trim();
      };
      const pushCount = (map, value) => {
        if (!value) return;
        map[value] = (map[value] || 0) + 1;
      };
      const topEntries = (map, limit = 20) =>
        Object.entries(map)
          .sort((a, b) => b[1] - a[1])
          .slice(0, limit)
          .map(([value, count]) => ({ value, count }));

      const allElements = toArray(document.querySelectorAll("*"));
      const styleSheets = toArray(document.querySelectorAll('link[rel="stylesheet"]')).map((node) => ({
        href: node.href,
        media: node.media || "all",
      }));

      const icons = toArray(document.querySelectorAll('link[rel*="icon"]')).map((node) => ({
        rel: node.rel,
        href: node.href,
        sizes: node.sizes?.value || "",
        type: node.type || "",
      }));

      const rootVars = {};
      const rootStyle = getComputedStyle(document.documentElement);
      for (const name of toArray(rootStyle)) {
        if (name.startsWith("--")) {
          rootVars[name] = rootStyle.getPropertyValue(name).trim();
        }
      }

      const colorCounts = {};
      const backgroundCounts = {};
      const borderCounts = {};
      const shadowCounts = {};
      const radiusCounts = {};
      const transitionCounts = {};
      const fontFamilyCounts = {};
      const fontSizeCounts = {};
      const lineHeightCounts = {};
      const fontWeightCounts = {};
      const classCounts = {};

      for (const el of allElements) {
        const style = getComputedStyle(el);
        pushCount(colorCounts, normalizeColor(style.color));
        pushCount(backgroundCounts, normalizeColor(style.backgroundColor));
        pushCount(borderCounts, normalizeColor(style.borderTopColor));
        pushCount(shadowCounts, style.boxShadow && style.boxShadow !== "none" ? style.boxShadow : null);
        pushCount(radiusCounts, style.borderRadius && style.borderRadius !== "0px" ? style.borderRadius : null);
        pushCount(transitionCounts, style.transitionDuration && style.transitionDuration !== "0s" ? `${style.transitionProperty} | ${style.transitionDuration} | ${style.transitionTimingFunction}` : null);
        pushCount(fontFamilyCounts, style.fontFamily);
        pushCount(fontSizeCounts, style.fontSize);
        pushCount(lineHeightCounts, style.lineHeight);
        pushCount(fontWeightCounts, style.fontWeight);
        for (const cls of el.classList) {
          pushCount(classCounts, cls);
        }
      }

      const selectStyle = (selector) => {
        const node = document.querySelector(selector);
        if (!node) return null;
        const style = getComputedStyle(node);
        return {
          selector,
          tag: node.tagName.toLowerCase(),
          classes: toArray(node.classList),
          text: (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
          styles: {
            color: style.color,
            backgroundColor: style.backgroundColor,
            borderColor: style.borderTopColor,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            textTransform: style.textTransform,
            padding: style.padding,
            margin: style.margin,
            gap: style.gap,
            display: style.display,
            transition: style.transition,
          },
        };
      };

      const selectors = [
        "body",
        "header",
        "nav",
        "main",
        "footer",
        "h1",
        "h2",
        "h3",
        "p",
        "a",
        "button",
        "input",
        ".menu",
        ".elementor-button",
        ".wp-block-button__link",
        ".elementor-widget-image img",
        ".custom-logo",
        ".site-logo img",
      ];

      const componentSamples = selectors.map(selectStyle).filter(Boolean);

      const logoCandidates = toArray(document.images)
        .filter((img) => /logo|nbp/i.test(img.src) || /logo|nbp/i.test(img.alt || ""))
        .map((img) => ({
          src: img.src,
          alt: img.alt || "",
          width: img.naturalWidth,
          height: img.naturalHeight,
          className: img.className || "",
        }));

      const headings = toArray(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        .slice(0, 24)
        .map((node) => {
          const style = getComputedStyle(node);
          return {
            tag: node.tagName.toLowerCase(),
            text: (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 140),
            classes: toArray(node.classList),
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            color: style.color,
          };
        });

      const links = toArray(document.querySelectorAll("a"))
        .slice(0, 24)
        .map((node) => {
          const style = getComputedStyle(node);
          return {
            text: (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
            href: node.href,
            classes: toArray(node.classList),
            color: style.color,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            textDecoration: style.textDecorationLine,
          };
        });

      const buttons = toArray(document.querySelectorAll("button, .elementor-button, .wp-block-button__link"))
        .slice(0, 20)
        .map((node) => {
          const style = getComputedStyle(node);
          return {
            tag: node.tagName.toLowerCase(),
            text: (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
            classes: toArray(node.classList),
            color: style.color,
            backgroundColor: style.backgroundColor,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            padding: style.padding,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            transition: style.transition,
          };
        });

      const metaTheme = document.querySelector('meta[name="theme-color"]')?.content || null;

      return {
        capturedAt: new Date().toISOString(),
        url: location.href,
        title: document.title,
        lang: document.documentElement.lang || null,
        metaTheme,
        cookieBannerAccepted: true,
        bodyClass: document.body.className,
        stylesheets: styleSheets,
        icons,
        rootVars,
        componentSamples,
        logoCandidates,
        headings,
        links,
        buttons,
        topColors: topEntries(colorCounts, 24),
        topBackgrounds: topEntries(backgroundCounts, 24),
        topBorders: topEntries(borderCounts, 20),
        topShadows: topEntries(shadowCounts, 20),
        topRadii: topEntries(radiusCounts, 20),
        topTransitions: topEntries(transitionCounts, 20),
        topFontFamilies: topEntries(fontFamilyCounts, 12),
        topFontSizes: topEntries(fontSizeCounts, 20),
        topLineHeights: topEntries(lineHeightCounts, 20),
        topFontWeights: topEntries(fontWeightCounts, 20),
        topClasses: topEntries(classCounts, 80),
      };
    });

    const favicon = audit.icons[0]?.href || null;
    const logo = audit.logoCandidates[0]?.src || null;

    if (favicon) {
      const faviconPath = path.join(ASSETS_DIR, path.basename(new URL(favicon).pathname) || "favicon.ico");
      await downloadToFile(favicon, faviconPath);
      audit.downloadedFaviconPath = path.relative(ROOT, faviconPath).replaceAll("\\", "/");
    }

    if (logo) {
      const logoUrl = new URL(logo);
      const ext = path.extname(logoUrl.pathname) || ".png";
      const logoPath = path.join(ASSETS_DIR, `logo${ext}`);
      await downloadToFile(logo, logoPath);
      audit.downloadedLogoPath = path.relative(ROOT, logoPath).replaceAll("\\", "/");
    }

    fs.writeFileSync(RAW_JSON_PATH, JSON.stringify(audit, null, 2));
    console.log(JSON.stringify({
      rawJson: path.relative(ROOT, RAW_JSON_PATH),
      favicon: audit.downloadedFaviconPath || null,
      logo: audit.downloadedLogoPath || null,
      screenshotDir: path.relative(ROOT, SCREENSHOTS_DIR),
      title: audit.title,
    }, null, 2));
  } finally {
    await mobile.close();
    await desktop.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
