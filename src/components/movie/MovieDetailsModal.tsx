import { Modal } from "@mantine/core";
import { MovieDetailsOverlay } from "~/components/movie/MovieDetailsOverlay";
import type { MovieDetailsOverlayProps } from "~/components/movie/MovieDetailsOverlay";

type MovieDetailsModalProps = Omit<MovieDetailsOverlayProps, "onClose"> & {
  opened: boolean;
  onClose: () => void;
};

export function MovieDetailsModal({ opened, onClose, ...overlayProps }: MovieDetailsModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      padding={0}
      radius="lg"
      withCloseButton={false}
      centered
      zIndex={300}
    >
      <MovieDetailsOverlay {...overlayProps} onClose={onClose} />
    </Modal>
  );
}
