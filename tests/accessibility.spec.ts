import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/accountability",
  "/cases",
  "/corrections",
  "/ethics-lab",
  "/ethics-lab/responsibility",
  "/evidence",
  "/login",
  "/methodology",
  "/presentation",
  "/research",
  "/reset-password",
  "/reset-password/update",
  "/signup",
  "/technology",
  "/timeline",
];

for (const route of publicRoutes) {
  test(`${route} has no WCAG 2.1 A/AA accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await page.locator("body").waitFor();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations.map(({ id, impact, help, nodes }) => ({
        id,
        impact,
        help,
        elements: nodes.map(({ target }) => target),
      })),
    ).toEqual([]);
  });
}
