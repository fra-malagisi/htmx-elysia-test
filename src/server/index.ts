import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
const pug = require("pug");

const app = new Elysia().use(cors());

app.get("/styles.css", () => Bun.file("dist/styles.css"));
app.get("/", () => {
  const html = pug.renderFile("public/pages/home.pug");
  return new Response(html, { headers: { "Content-Type": "text/html" } });
});

app.get("/random-user", async () => {
  const response = await fetch("https://randomuser.me/api/1.4");
  const data = await response.json();
  const user = data.results[0];
  console.log(user);
  const html = pug.renderFile("public/components/random-user.pug", {
    name: `${user.name.title}. ${user.name.first} ${user.name.last}`,
    email: user.email,
    picture: user.picture.large,
  });
  return new Response(html, { headers: { "Content-Type": "text/html" } });
});

app.listen(8080);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
