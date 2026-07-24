import { execSync } from "child_process";
try {
  execSync("npx next build", { stdio: "inherit" });
  process.exit(0);
} catch (e) {
  process.exit(1);
}
