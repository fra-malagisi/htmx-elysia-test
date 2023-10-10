import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
const pug = require("pug");

const app = new Elysia().use(cors());

app.get("/styles.css", () => Bun.file("dist/styles.css"));
app.get("/", () => {
  const html = pug.renderFile("public/pages/home.pug", {
    nationalities: [
      { value: "", text: "-- Select a nationality" },
      { value: "AU", text: "Australian" },
      { value: "BR", text: "Brazilian" },
      { value: "CA", text: "Canadian" },
      { value: "CH", text: "Swiss" },
      { value: "DE", text: "German" },
      { value: "DK", text: "Danish" },
      { value: "ES", text: "Spanish" },
      { value: "FI", text: "Finnish" },
      { value: "FR", text: "French" },
      { value: "GB", text: "British" },
      { value: "IE", text: "Irish" },
      { value: "IN", text: "Indian" },
      { value: "IR", text: "Iranian" },
      { value: "MX", text: "Mexican" },
      { value: "NL", text: "Dutch" },
      { value: "NO", text: "Norwegian" },
      { value: "NZ", text: "New Zealander" },
      { value: "RS", text: "Serbian" },
      { value: "TR", text: "Turkish" },
      { value: "UA", text: "Ukrainian" },
      { value: "US", text: "American" },
    ],
  });
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
