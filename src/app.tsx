import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import "@/index.css";

import { HomeRoute } from "@/routes/home";
import { ContactRoute } from "@/routes/contact";
import { Layout } from "@/components/shared/layout";
import { TasksRoute } from "@/routes/tasks";
import { TaskIdRoute } from "@/routes/tasks-id";
import { CounterRoute } from "@/routes/counter-route";
import { FetcherRoute } from "@/routes/fetcher";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <>
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
            <Route path="/fetcher" element={<FetcherRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  );
}
