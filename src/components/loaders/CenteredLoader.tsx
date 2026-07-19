import { Center, Loader } from "@mantine/core";

export function CenteredLoader() {
  return (
    <Center className="h-full w-full">
      <Loader />
    </Center>
  );
}
