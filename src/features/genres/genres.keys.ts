export const genresKeys = {
  all: ["genres"] as const,
  list: () => [...genresKeys.all, "list"] as const,
};
