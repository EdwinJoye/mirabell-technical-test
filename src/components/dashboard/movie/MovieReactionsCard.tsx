import { Box, Group, Stack, Text } from "@mantine/core";
import { MinusCircleIcon, ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react";
import { CardIconBadge } from "~/components/dashboard/CardIconBadge";
import type { MovieReactions } from "~/features/dashboard/dashboard.types";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";
import { DashboardCard } from "~/components/dashboard/DashboardCard";

type MovieReactionsCardProps = {
  reactions: MovieReactions;
};

export function MovieReactionsCard({ reactions }: MovieReactionsCardProps) {
  const { likedViewers, dislikedViewers, noReactionViewers } = reactions;
  const totalViewers = likedViewers + dislikedViewers + noReactionViewers;
  const likedRate = Math.round((likedViewers / totalViewers) * 100);
  const dislikedRate = Math.round((dislikedViewers / totalViewers) * 100);
  const noReactionRate = Math.round((noReactionViewers / totalViewers) * 100);

  return (
    <DashboardCard>
      <Stack gap={6} h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <CardIconBadge icon={ThumbsUpIcon} />
            <Text size="sm" c="dimmed" fw={500}>
              Viewer Reactions
            </Text>
          </Group>
          <InfoTooltip label="Shows how viewers reacted to this movie: liked, disliked, or gave no reaction." />
        </Group>

        <Text size="1.5rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {likedRate}% liked
        </Text>
        <Text size="xs" c="dimmed">
          Out of {totalViewers.toLocaleString()} viewers
        </Text>

        <Stack gap="sm" mt="auto">
          <Box
            style={{
              display: "flex",
              height: 14,
              borderRadius: 999,
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
            }}
          >
            <Box style={{ width: `${likedRate}%`, backgroundColor: BRAND_COLOR }} />
            <Box
              style={{ width: `${dislikedRate}%`, backgroundColor: "var(--mantine-color-red-5)" }}
            />
            <Box
              style={{
                width: `${noReactionRate}%`,
                backgroundColor: "var(--mantine-color-dark-3)",
              }}
            />
          </Box>

          <Group gap={12} wrap="nowrap">
            <Group gap={4}>
              <ThumbsUpIcon size={12} color={BRAND_COLOR} />
              <Text size="xs" c="dimmed">
                {likedViewers.toLocaleString()}
              </Text>
            </Group>
            <Group gap={4}>
              <ThumbsDownIcon size={12} color="var(--mantine-color-red-5)" />
              <Text size="xs" c="dimmed">
                {dislikedViewers.toLocaleString()}
              </Text>
            </Group>
            <Group gap={4}>
              <MinusCircleIcon size={12} color="var(--mantine-color-dark-3)" />
              <Text size="xs" c="dimmed">
                {noReactionViewers.toLocaleString()}
              </Text>
            </Group>
          </Group>
        </Stack>
      </Stack>
    </DashboardCard>
  );
}
