import "./styles.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
