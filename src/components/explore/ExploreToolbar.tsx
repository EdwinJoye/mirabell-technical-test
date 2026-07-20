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
  categoryDisabled?: boolean;
};

export function ExploreToolbar({
  searchValue,
  onSearchChange,
  categoryValue,
  onCategoryChange,
  categoryOptions,
  categoryDisabled = false,
}: ExploreToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row-reverse sm:items-center sm:justify-between gap-3">
      <Group gap="sm" wrap="nowrap" justify="flex-end" className="w-full sm:w-auto shrink-0">
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
      <div className="flex gap-3 w-full">
        <Select
          placeholder="All"
          data={categoryOptions}
          value={categoryValue}
          onChange={onCategoryChange}
          disabled={categoryDisabled}
          clearable
          className="shrink-0"
          w={{ base: 100, sm: 140 }}
          styles={pillStyles}
        />
        <TextInput
          placeholder="Search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          leftSection={<MagnifyingGlassIcon size={16} />}
          className="flex-1 w-full"
          styles={pillStyles}
        />
      </div>
    </div>
  );
}
