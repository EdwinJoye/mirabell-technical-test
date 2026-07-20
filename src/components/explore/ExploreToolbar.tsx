import { ActionIcon, Avatar, Group, Select, TextInput } from "@mantine/core";
import { BellIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

const pillStyles = {
  input: {
    backgroundColor: "var(--mantine-color-dark-6)",
    border: "none",
    borderRadius: 9999,
  },
};

type ExploreToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categoryValue: string | null;
  onCategoryChange: (value: string | null) => void;
  categoryOptions: { value: string; label: string }[];
};

export function ExploreToolbar({
  searchValue,
  onSearchChange,
  categoryValue,
  onCategoryChange,
  categoryOptions,
}: ExploreToolbarProps) {
  return (
    <Group justify="space-between" wrap="wrap" gap="md">
      <Group gap="md" className="flex-1 min-w-0">
        <Select
          placeholder="All"
          data={categoryOptions}
          value={categoryValue}
          onChange={onCategoryChange}
          clearable
          w={140}
          styles={pillStyles}
        />
        <TextInput
          placeholder="Search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          leftSection={<MagnifyingGlassIcon size={16} />}
          className="flex-1 min-w-50"
          styles={pillStyles}
        />
      </Group>
      <Group gap="sm">
        <ActionIcon
          c="dimmed"
          size="lg"
          aria-label="Notifications"
          style={{ backgroundColor: "var(--mantine-color-dark-6)", borderRadius: 9999 }}
        >
          <BellIcon size={20} />
        </ActionIcon>
        <Avatar radius="xl" aria-label="Profil utilisateur" />
      </Group>
    </Group>
  );
}
