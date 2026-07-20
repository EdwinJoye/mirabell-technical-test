import { Group, Select, TextInput } from "@mantine/core";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

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
    <Group gap="md" wrap="wrap">
      <Select
        placeholder="All"
        data={categoryOptions}
        value={categoryValue}
        onChange={onCategoryChange}
        clearable
        w={160}
      />
      <TextInput
        placeholder="Search"
        value={searchValue}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
        leftSection={<MagnifyingGlassIcon size={16} />}
        className="flex-1 min-w-50"
      />
    </Group>
  );
}
