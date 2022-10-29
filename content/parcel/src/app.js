// import "/src/index.css";
// following doesn't work in sandpack
// import lesson from "bundle-text:./lesson.html";
// so we use fs instead
import fs from "fs";
import "./tailwind.config";
const sourceCode = fs.readFileSync(__dirname + "/lesson.html", "utf8");

const app = document.createElement("div");
app.innerHTML = sourceCode;
// app.innerHTML = lesson;
root.appendChild(app);
