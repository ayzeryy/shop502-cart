export type ParsedInput =
  | { type: "bye" }
  | { type: "update"; productId: string; quantityDelta: number }
  | { type: "invalid" };

export function parseInput(raw: string): ParsedInput {
  const trimmed = raw.trim();

  if (trimmed.toLowerCase() === "bye") {
    return { type: "bye" };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length !== 2) {
    return { type: "invalid" };
  }

  const [productId, quantityRaw] = parts;
  if (!productId || quantityRaw === undefined) {
    return { type: "invalid" };
  }

  const quantityDelta = Number(quantityRaw);
  if (!Number.isInteger(quantityDelta) || quantityDelta === 0) {
    return { type: "invalid" };
  }

  return { type: "update", productId, quantityDelta };
}
