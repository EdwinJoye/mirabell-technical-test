import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/lib/configs/react-query.config";
import { AppRouter } from "./AppRouter";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">
        <AppRouter />
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  );
}
