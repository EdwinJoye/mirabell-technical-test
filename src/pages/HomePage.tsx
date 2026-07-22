import { Avatar, Box, Card, Stack, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import edwinPhoto from "~/assets/edwin-photo.png";
import { NavbarToggleButton } from "~/components/ui/NavbarToggleButton";

export function HomePage() {
  return (
    <>
      <Box pos="fixed" top={16} left={16} style={{ zIndex: 9998 }}>
        <NavbarToggleButton />
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center min-h-svh px-4 sm:min-h-0 sm:items-stretch sm:mt-[7%]"
      >
        <Card
          shadow="lg"
          padding="xl"
          radius="lg"
          withBorder
          className="w-full md:w-[70%]"
          style={{
            backgroundColor: "var(--mantine-color-dark-6)",
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Stack align="center" gap="xl">
            <Avatar
              src={edwinPhoto}
              size={150}
              radius="50%"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
            <Stack align="center" gap="md">
              <Title order={1} ta="center" c="white">
                Hello!
              </Title>
              <Text size="lg" ta="center" maw={600} c="white">
                Welcome to my technical test for <strong>Mirabell Studio</strong>.
              </Text>
              <Text size="md" c="dimmed" ta="center" maw={600}>
                I built this streaming platform with React, TypeScript, Mantine UI, and the TMDb
                API. It includes a full movie catalog with search, genre filtering, infinite scroll,
                and an admin analytics dashboard.
              </Text>
              <Text size="md" ta="center" fw={500} c="brand.6">
                I hope you enjoy exploring it ✨
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                Enjoy your visit,
                <br />
                <strong>Edwin Joye</strong>
              </Text>
            </Stack>
          </Stack>
        </Card>
      </motion.div>
    </>
  );
}
