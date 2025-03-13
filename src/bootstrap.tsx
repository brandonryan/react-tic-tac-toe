import { createRoot } from "react-dom/client"
import { App } from "./app"

(() => {
    console.log("Bootstrapping react application.");
    
    const root = document.getElementById("react-ttt-root");
    if (!root) {
        alert("Could not find root div to render react application.");
        return;
    }
    
    createRoot(root).render(<App />);
})();