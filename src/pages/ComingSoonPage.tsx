import { Box, Text, Title } from "@mantine/core";
import { WrenchIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ComingSoonPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          void navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <Box className="min-h-svh flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center gap-8"
      >
        <motion.div
          animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Box
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(79, 217, 196, 0.1)",
              border: "2px solid rgba(79, 217, 196, 0.4)",
              boxShadow: "0 0 40px rgba(79, 217, 196, 0.2)",
            }}
          >
            <WrenchIcon size={48} color="var(--mantine-color-brand-6)" />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <Title order={1} c="white" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Coming Soon
          </Title>
          <Text size="md" c="dimmed" maw={400} className="leading-relaxed">
            This page is still under construction. We're working on it!
          </Text>
          <Text size="sm" c="dimmed" className="leading-relaxed">
            Redirecting to home in {countdown}s
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--mantine-color-brand-6)" }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl -z-10"
          style={{ backgroundColor: "rgba(79, 217, 196, 0.05)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </Box>
  );
}
