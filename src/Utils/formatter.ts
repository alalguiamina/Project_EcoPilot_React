export function createEntityFormatter(
  sites: { id: number; name: string }[],
  users: { id: number; role: string }[],
) {
  return function formatField(
    key: string | number | symbol,
    value: any,
  ): string {
    // Format Site ID → Site name
    if (key === "siteId") {
      const site = sites.find((s) => s.id === value);
      return site ? site.name : "—";
    }

    // Format members → list of roles
    if (key === "members" && Array.isArray(value)) {
      return value
        .map((id: number) => {
          const user = users.find((u) => u.id === id);
          return user ? user.role : "Unknown";
        })
        .join(", ");
    }

    return String(value);
  };
}
export default createEntityFormatter;
