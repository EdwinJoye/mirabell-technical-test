import { Avatar, Menu } from "@mantine/core";
import { GearIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import avatarUrl from "~/assets/avatar.jpg";

export function AvatarMenu() {
  return (
    <Menu position="bottom-end" shadow="md" width={200} radius="md">
      <Menu.Target>
        <Avatar src={avatarUrl} radius="xl" alt="User profile" className="cursor-pointer" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<UserIcon size={16} />}>Profile</Menu.Item>
        <Menu.Item leftSection={<GearIcon size={16} />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<SignOutIcon size={16} />} color="red">
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
