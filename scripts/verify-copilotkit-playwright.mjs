import { chromium } from "playwright";

const APP_URL = "http://127.0.0.1:3000";
const SCREENSHOT_PATH = "D:/DEV/COURSES/fork-AI-Programming-03-2026/assets/copilotkit-e2e.png";
const PROMPT = "Say hello in one short sentence and mention today's date.";

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 980 },
});

page.on("console", (message) => {
  console.log(`[browser:${message.type()}] ${message.text()}`);
});

page.on("pageerror", (error) => {
  console.log(`[pageerror] ${error.message}`);
});

try {
  await page.goto(APP_URL, { waitUntil: "domcontentloaded" });
  const input = page.getByRole("textbox", { name: "Type a message..." });
  await input.fill(PROMPT);
  await input.press("Enter");

  await page.waitForFunction(
    () =>
      Array.from(document.querySelectorAll("[data-copilot-message-role='assistant']")).some(
        (element) => Boolean(element.textContent?.trim()),
      ),
    { timeout: 45000 },
  );

  const responseText = await page.evaluate(() => {
    const assistantMessages = Array.from(
      document.querySelectorAll("[data-copilot-message-role='assistant']"),
    );
    const lastMessage = assistantMessages.at(-1);
    return lastMessage?.textContent?.trim() ?? "";
  });
  console.log(`ASSISTANT_RESPONSE=${responseText}`);

  await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });

  if (!responseText) {
    throw new Error("Assistant response was empty");
  }
} finally {
  await browser.close();
}
