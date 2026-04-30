export function parseId(id: string | string[]): number | null {
  if (Array.isArray(id)) return null;

  const parsedId = Number(id);
  return Number.isNaN(parsedId) ? null : parsedId;
}