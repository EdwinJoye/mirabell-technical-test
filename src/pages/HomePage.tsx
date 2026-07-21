import { Avatar, Card, Stack, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import edwinPhoto from "~/assets/edwin-photo.png";

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-[7%] flex justify-center px-4"
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
              I built this streaming platform with React, TypeScript, Mantine UI, and the TMDb API.
              It includes a full movie catalog with search, genre filtering, infinite scroll, and an
              admin analytics dashboard.
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
  );
}
