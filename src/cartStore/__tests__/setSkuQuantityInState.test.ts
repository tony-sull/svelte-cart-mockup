import { setSkuQuantityInState } from '../setSkuQuantityInState'
import type { CartState } from '..'

const testItems = [
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

describe('setSkuQuantityInState', () => {
    test('should be a function', () => {
        expect(setSkuQuantityInState).toBeInstanceOf(Function)
    })

    test('should return a function', () => {
        expect(setSkuQuantityInState('test-123', 10)).toBeInstanceOf(Function)
    })

    test('should not throw for an empty state', () => {
        const state: CartState = {
            items: []
        }

        expect(() => setSkuQuantityInState('test-123', 10)(state)).not.toThrow()
    })

    test('should update a known SKU', () => {
        const item = testItems[0]
        const state: CartState = {
            items: [ item ]
        }

        const result = setSkuQuantityInState(item.sku, 10)(state)

        expect(result.items).toEqual([
            {
                ...item,
                quantity: 10
            }
        ])
    })

    test('should not update other SKUs', () => {
        const state: CartState = {
            items: testItems
        }

        const result = setSkuQuantityInState(testItems[1].sku, 10)(state)

        expect(result.items).toEqual([
            testItems[0],
            {
                ...testItems[1],
                quantity: 10
            }
        ])
    })

    test('should ignore unknown SKUs', () => {
        const state: CartState = {
            items: testItems
        }

        const result = setSkuQuantityInState('test-123', 10)(state)

        expect(result.items).toEqual(testItems)
    })
})