import assert from "node:assert/strict";

const base = process.env.ITRAHUB_VERIFY_URL || "http://127.0.0.1:3100";
const routes = ["/", "/login", "/dashboard", "/budget", "/budget/budgets", "/budget/exercices", "/prevision", "/execution"];
let loginHtml;
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route}: HTTP ${response.status}`);
  const html = await response.text();
  assert.ok(html.includes("ITRAHUB"), `${route}: missing application title`);
  if (route === "/login") loginHtml = html;
  console.log(`OK ${route}`);
}

const assets = new Set([...loginHtml.matchAll(/(?:src|href)="([^"<>]*\/_next\/static\/[^"<>]+\.(?:js|css))"/g)].map((match) => match[1]));
assert.ok(assets.size > 0, "No production CSS/JavaScript assets found");
for (const asset of assets) {
  const response = await fetch(new URL(asset, base));
  assert.equal(response.status, 200, `${asset}: HTTP ${response.status}`);
  assert.ok((await response.arrayBuffer()).byteLength > 0, `${asset}: empty asset`);
}
const icon = await fetch(new URL("/icon.svg", base));
assert.equal(icon.status, 200, "Application icon failed");
console.log(`OK ${assets.size} production assets and application icon`);
