import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";

const app = new Elysia().use(cors()).use(staticPlugin());

app.get("/styles.css", () => Bun.file("dist/styles.css"));
app.get("/", () => Bun.file("dist/index.html"));

app.get("/random-user", async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const user = data.results[0];
  const html = `
        <h1 class="bg-red-500">Hello, ${user.name.first}!</h1>
  `;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
});

app.listen(8080);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
