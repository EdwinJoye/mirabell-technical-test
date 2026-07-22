import { ActionIcon, Group, Indicator, SegmentedControl, Select, TextInput } from "@mantine/core";
import { BellIcon, FilmSlateIcon, MagnifyingGlassIcon, StarIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { AvatarMenu } from "~/components/ui/AvatarMenu";
import { NavbarToggleButton } from "~/components/ui/NavbarToggleButton";
import { SegmentedItemLabel } from "~/components/ui/SegmentedItemLabel";
import { segmentedControlStyles } from "~/lib/theme/segmented-control";

const pillStyles = {
  input: {
    backgroundColor: "var(--mantine-color-dark-6)",
    border: "none",
    borderRadius: 9999,
  },
};

const roundIconButtonStyle = {
  backgroundColor: "var(--mantine-color-dark-6)",
  borderRadius: 9999,
};

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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <>
      <div className="hidden sm:flex sm:flex-row-reverse sm:items-center sm:justify-between gap-3">
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
            styles={segmentedControlStyles}
          />
          <Indicator label="1" size={16} color="red" offset={4}>
            <ActionIcon
              c="dimmed"
              size="lg"
              aria-label="Notifications"
              style={roundIconButtonStyle}
            >
              <BellIcon size={20} />
            </ActionIcon>
          </Indicator>
          <AvatarMenu />
        </Group>
        <div className="flex gap-3 w-full">
          <NavbarToggleButton />
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

      <div className="flex sm:hidden flex-col gap-3">
        <Group justify="space-between" wrap="nowrap">
          <NavbarToggleButton />
          <Group gap="sm" wrap="nowrap">
            <Indicator label="1" size={16} color="red" offset={4}>
              <ActionIcon
                c="dimmed"
                size="lg"
                aria-label="Notifications"
                style={roundIconButtonStyle}
              >
                <BellIcon size={20} />
              </ActionIcon>
            </Indicator>
            <AvatarMenu />
          </Group>
        </Group>

        <Group gap="sm" wrap="nowrap">
          <SegmentedControl
            size="sm"
            data={[
              {
                label: <SegmentedItemLabel icon={FilmSlateIcon} label="All" showLabel={false} />,
                value: "all",
              },
              {
                label: (
                  <SegmentedItemLabel
                    icon={StarIcon}
                    label="Popular"
                    iconColor="var(--mantine-color-yellow-4)"
                    showLabel={false}
                  />
                ),
                value: "popular",
              },
            ]}
            value={popularValue}
            onChange={onPopularChange}
            radius="xl"
            styles={segmentedControlStyles}
          />
          <Select
            placeholder="Categories"
            data={categoryOptions}
            value={categoryValue}
            onChange={onCategoryChange}
            disabled={categoryDisabled}
            clearable
            className="flex-1"
            styles={pillStyles}
          />
          {isMobileSearchOpen ? (
            <TextInput
              autoFocus
              placeholder="Search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.currentTarget.value)}
              onBlur={() => {
                if (!searchValue.trim()) {
                  setIsMobileSearchOpen(false);
                }
              }}
              leftSection={<MagnifyingGlassIcon size={16} />}
              className="flex-1"
              styles={pillStyles}
            />
          ) : (
            <ActionIcon
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Search"
              size="lg"
              style={roundIconButtonStyle}
            >
              <MagnifyingGlassIcon size={18} />
            </ActionIcon>
          )}
        </Group>
      </div>
    </>
  );
}
