import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/lib/configs/react-query.config";
import { theme } from "~/lib/theme/theme";
import { AppRouter } from "./AppRouter";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme="dark">
        <AppRouter />
      </MantineProvider>
    </QueryClientProvider>
  );
}
