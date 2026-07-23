import type { Product } from "../models/Product";

// Local CartItem type to avoid missing-module import errors
interface CartItem {
    product: Product;
    quantity: number;
}

class Cart {

    private items: CartItem[] = [];

    public addProduct(product: Product, quantity: number = 1): void {

        const existing = this.items.find(
            item => item.product.id === product.id
        );

        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({
                product,
                quantity
            });
        }

    }

    public removeProduct(productId: Product['id']): void {

        this.items = this.items.filter(
            item => item.product.id !== productId
        );

    }


    public updateQuantity(productId: Product['id'], quantity: number): void {

        const item = this.items.find(
            item => item.product.id === productId
        );

        if (!item) {
            return;
        }

        item.quantity = quantity;

    }

    public clear(): void {
        this.items = [];
    }

    public getItems(): CartItem[] {
        return this.items;
    }

    public getTotal(): number {

        return this.items.reduce((total, item) => {

            return total + item.product.price * item.quantity;

        }, 0);

    }

}