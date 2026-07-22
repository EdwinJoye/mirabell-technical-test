import { Button } from "@mantine/core";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { buttonHoverVars } from "~/lib/theme/hover";

export function DownloadButton() {
  return (
    <Button variant="filled" color="dark.9" c="white" radius="xl" style={buttonHoverVars()}>
      <DownloadSimpleIcon size={18} className="sm:mr-2" />
      <span className="hidden sm:inline">Download</span>
    </Button>
  );
}
