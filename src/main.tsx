import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TaskManagement } from "./task-management";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskManagement />
  </StrictMode>
);
