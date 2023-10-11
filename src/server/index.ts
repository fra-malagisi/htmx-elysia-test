import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
const pug = require("pug");

const app = new Elysia().use(cors());

app.get("/styles.css", () => Bun.file("dist/styles.css"));
app.get("/", () => {
  const html = pug.renderFile("public/pages/home.pug", {
    nationalities: [
      { value: "", text: "-- Select a nationality" },
      { value: "au", text: "Australian" },
      { value: "br", text: "Brazilian" },
      { value: "ca", text: "Canadian" },
      { value: "ch", text: "Swiss" },
      { value: "de", text: "German" },
      { value: "dk", text: "Danish" },
      { value: "es", text: "Spanish" },
      { value: "fi", text: "Finnish" },
      { value: "fr", text: "French" },
      { value: "gb", text: "British" },
      { value: "ie", text: "Irish" },
      { value: "in", text: "Indian" },
      { value: "ir", text: "Iranian" },
      { value: "mx", text: "Mexican" },
      { value: "nl", text: "Dutch" },
      { value: "no", text: "Norwegian" },
      { value: "nz", text: "New Zealander" },
      { value: "rs", text: "Serbian" },
      { value: "tr", text: "Turkish" },
      { value: "ua", text: "Ukrainian" },
      { value: "us", text: "American" },
    ],
    genders: [
      { value: "", text: "-- Select a gender" },
      { value: "male", text: "Male" },
      { value: "female", text: "Female" },
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

app.post(
  "/random-user",
  async ({ body }) => {
    console.log(body);
    const url = new URL("https://randomuser.me/api/1.4");
    const params = new URLSearchParams();
    params.append("gender", body.gender);
    params.append("nat", body.nationality);
    url.search = params.toString();
    const response = await fetch(url.toString());
    const data = await response.json();
    const user = data.results[0];
    const html = pug.renderFile("public/components/random-user.pug", {
      name: `${user.name.title}. ${user.name.first} ${user.name.last}`,
      email: user.email,
      picture: user.picture.large,
    });
    return new Response(html, { headers: { "Content-Type": "text/html" } });
  },
  {
    body: t.Object({
      gender: t.String(),
      nationality: t.String(),
    }),
  },
);

app.listen(8080);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
