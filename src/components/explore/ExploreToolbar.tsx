import {
  ActionIcon,
  Avatar,
  Group,
  Indicator,
  SegmentedControl,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { BellIcon, FilmSlateIcon, MagnifyingGlassIcon, StarIcon } from "@phosphor-icons/react";
import { useState, type ElementType } from "react";
import avatarUrl from "~/assets/avatar.jpg";

const pillStyles = {
  input: {
    backgroundColor: "var(--mantine-color-dark-6)",
    border: "none",
    borderRadius: 9999,
  },
};

type SegmentedItemLabelProps = {
  icon: ElementType;
  label: string;
  iconColor?: string;
};

function SegmentedItemLabel({ icon: Icon, label, iconColor }: SegmentedItemLabelProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Group
      justify="center"
      gap={6}
      wrap="nowrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon size={14} weight="fill" color={iconColor} />
      <Text size="xs" c={isHovered ? "white" : undefined}>
        {label}
      </Text>
    </Group>
  );
}

type ExploreToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categoryValue: string | null;
  onCategoryChange: (value: string | null) => void;
  categoryOptions: { value: string; label: string }[];
  categoryDisabled?: boolean;
  popularValue: string;
  onPopularChange: (value: string) => void;
};

export function ExploreToolbar({
  searchValue,
  onSearchChange,
  categoryValue,
  onCategoryChange,
  categoryOptions,
  categoryDisabled = false,
  popularValue,
  onPopularChange,
}: ExploreToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row-reverse sm:items-center sm:justify-between gap-3">
      <Group gap="sm" wrap="nowrap" justify="flex-end" className="w-full sm:w-auto shrink-0">
        <SegmentedControl
          size="sm"
          data={[
            {
              label: <SegmentedItemLabel icon={FilmSlateIcon} label="All" />,
              value: "all",
            },
            {
              label: (
                <SegmentedItemLabel
                  icon={StarIcon}
                  label="Popular"
                  iconColor="var(--mantine-color-yellow-4)"
                />
              ),
              value: "popular",
            },
          ]}
          value={popularValue}
          onChange={onPopularChange}
          radius="xl"
          styles={{
            root: {
              backgroundColor: "var(--mantine-color-dark-6)",
              borderRadius: 9999,
              height: "2.25rem",
            },
            control: { height: "100%" },
            label: {
              height: "100%",
              display: "flex",
              alignItems: "center",
            },
            indicator: { borderRadius: 9999 },
          }}
        />
        <Indicator label="1" size={16} color="red" offset={4} zIndex={300}>
          <ActionIcon
            c="dimmed"
            size="lg"
            aria-label="Notifications"
            style={{ backgroundColor: "var(--mantine-color-dark-6)", borderRadius: 9999 }}
          >
            <BellIcon size={20} />
          </ActionIcon>
        </Indicator>
        <Avatar src={avatarUrl} radius="xl" alt="User profile" />
      </Group>
      <div className="flex gap-3 w-full">
        <Select
          placeholder="Categories"
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
