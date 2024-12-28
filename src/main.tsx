import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import "./index.css";

import { HomeRoute } from "@/routes/home";
import { ContactRoute } from "@/routes/contact";
import { Layout } from "@/components/shared/layout";
import { TasksRoute } from "@/routes/tasks";
import { TaskIdRoute } from "@/routes/tasks-id";
import { Toaster } from "@/components/ui/sonner";
import { CounterRoute } from "@/routes/counter-route";
import { DataFetchExample } from "./routes/data-fetch-example";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomeRoute />} />
          <Route path="/contact" element={<ContactRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/tasks">
            <Route index element={<TasksRoute />} />
            <Route path=":id" element={<TaskIdRoute />} />
          </Route>

          <Route path="/counter" element={<CounterRoute />} />
          <Route path="/data-fetch-example" element={<DataFetchExample />} />
        </Route>
      </Routes>
    </BrowserRouter>

    <Toaster />
  </StrictMode>
);
