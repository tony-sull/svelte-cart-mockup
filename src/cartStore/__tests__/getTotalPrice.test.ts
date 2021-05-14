import type { CartState } from '..'
import { getTotalPrice } from '../getTotalPrice'

test('should return 0 for an empty cart', () => {
    const state: CartState = { items: [] }

    const result = getTotalPrice(state)
    expect(result).toBe(0)
})

test('should return the total price of a single cart item', () => {
    const state: CartState = {
        items: [
            {
                sku: 'overside-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            }
        ]
    }

    const result = getTotalPrice(state)
    expect(result).toBe(150)
})

test('should return the total price of multiple cart items', () => {
    const state: CartState = {
        items: [
            {
                sku: 'overside-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            },
            {
                sku: 'undersize-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Undersize Blazer',
                description: 'Black, size: 36',
                quantity: 3,
                itemPrice: 60
            }
        ]
    }

    const result = getTotalPrice(state)
    expect(result).toBe(330)
})

test('should ignore items with an invalid quantity', () => {
    const state: CartState = {
        items: [
            {
                sku: 'overside-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            },
            {
                sku: 'undersize-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Undersize Blazer',
                description: 'Black, size: 36',
                quantity: -3,
                itemPrice: 60
            }
        ]
    }

    const result = getTotalPrice(state)
    expect(result).toBe(150)
})

test('should remove percent off discounts', () => {
    const state: CartState = {
        items: [
            {
                sku: 'overside-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            },
            {
                sku: 'undersize-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Undersize Blazer',
                description: 'Black, size: 36',
                quantity: 3,
                itemPrice: 60
            }
        ],
        discount: {
            title: '10% off',
            description: 'New customer discount',
            discountPercent: 10
        }
    }

    const result = getTotalPrice(state)
    expect(result).toBe(297)
})

test('should remove amount off discounts', () => {
    const state: CartState = {
        items: [
            {
                sku: 'overside-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            },
            {
                sku: 'undersize-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Undersize Blazer',
                description: 'Black, size: 36',
                quantity: 3,
                itemPrice: 60
            }
        ],
        discount: {
            title: '50 SEK off',
            description: 'New customer discount',
            discountAmount: 50
        }
    }

    const result = getTotalPrice(state)
    expect(result).toBe(280)
})