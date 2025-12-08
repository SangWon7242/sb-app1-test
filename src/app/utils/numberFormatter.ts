export function getNumberParam(id: string): number | null {
  const parseId = parseInt(id, 10);

  return isNaN(parseId) || parseId <= 0 ? null : parseId;
}
