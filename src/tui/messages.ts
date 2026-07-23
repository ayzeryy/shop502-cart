import type { CarItem } from "../models/CarItem";

export function askName(): string {
  return "Por favor ingrese su nombre.";
}

export function greet(name: string): string {
  return `Hola ${name}! Que deseas modificar en tu carrito?`;
}

export function askNextAction(): string {
  return "Que más deseas hacer?";
}

export function renderCart(items: CarItem[]): string {
  const lines = items.map(
    (item) => `  - ${item.product.id} con ${item.quantity} unidades`,
  );
  return ["Tu carrito es:", ...lines, askNextAction()].join("\n");
}

export function renderEmptyCart(): string {
  return "Tu carrito está vacío, que más deseas hacer?";
}

export function renderProductNotFound(productId: string): string {
  return `Oops parece que no tienes el producto ${productId} agregado a tu carrito. Que más deseas hacer?`;
}

export function sayGoodbye(): string {
  return "Adiós fue un gusto atenderte!";
}
