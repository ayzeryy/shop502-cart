import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import type { CarItem } from "../models/CarItem";
import {
  askName,
  greet,
  renderCart,
  renderEmptyCart,
  renderProductNotFound,
  sayGoodbye,
} from "./messages";
import { parseInput } from "./parseInput";

export type Io = {
  write: (message: string) => void;
  read: (prompt?: string) => Promise<string>;
  close: () => void;
};

export function createReadlineIo(): Io {
  const rl = readline.createInterface({ input, output });

  return {
    write: (message: string) => {
      output.write(`${message}\n`);
    },
    read: async () => rl.question("> "),
    close: () => rl.close(),
  };
}

export async function runTui(io: Io = createReadlineIo()): Promise<void> {
  const items = new Map<string, number>();

  io.write(askName());
  const name = (await io.read()).trim();
  io.write(greet(name));

  while (true) {
    const raw = await io.read();
    const parsed = parseInput(raw);

    if (parsed.type === "bye") {
      io.write(sayGoodbye());
      break;
    }

    if (parsed.type === "invalid") {
      continue;
    }

    const current = items.get(parsed.productId);

    if (current === undefined && parsed.quantityDelta < 0) {
      io.write(renderProductNotFound(parsed.productId));
      continue;
    }

    const nextQuantity = (current ?? 0) + parsed.quantityDelta;

    if (nextQuantity <= 0) {
      items.delete(parsed.productId);
      io.write(
        items.size === 0 ? renderEmptyCart() : renderCart(toCarItems(items)),
      );
      continue;
    }

    items.set(parsed.productId, nextQuantity);
    io.write(renderCart(toCarItems(items)));
  }

  io.close();
}

function toCarItems(items: Map<string, number>): CarItem[] {
  return Array.from(items.entries()).map(([id, quantity]) => ({
    product: { id, name: id, price: 0 },
    quantity,
  }));
}
