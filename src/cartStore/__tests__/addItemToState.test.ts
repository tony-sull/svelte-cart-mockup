import { addItemToState } from '../addItemToState'
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

describe('addItemToState', () => {
    test('should be a function', () => {
        expect(addItemToState).toBeInstanceOf(Function)
    })

    test('should return a function', () => {
        expect(addItemToState(testItems[0])).toBeInstanceOf(Function)
    })

    test('should add an item to the items array', () => {
        const item = testItems[0]
        const state: CartState = {
            items: []
        }

        const result = addItemToState(item)(state)

        expect(result.items).toEqual([ item ])
    })

    test('should maintain existing items', () => {
        const [item, ...items] = testItems
        const state: CartState = {
            items
        }

        const result = addItemToState(item)(state)

        expect(result.items).toEqual([ ...items, item ])
    })
})