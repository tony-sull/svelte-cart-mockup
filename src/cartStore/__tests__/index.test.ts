import { get } from 'svelte/store'
import { createCartStore } from '..'

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

describe('createCartStore', () => {
    test('should be a function', () => {
        expect(createCartStore).toBeInstanceOf(Function)
    })

    test('should default to an empty state', () => {
        const store = createCartStore()
        expect(store).toBeDefined()
    })

    test('should accept initial cart items', () => {
        const store = createCartStore({
            items: testItems
        })

        const state = get(store)

        expect(state.items).toEqual(testItems)
    })
})

describe('cartStore.reset', () => {
    test('should be a function', () => {
        const { reset } = createCartStore()
        expect(reset).toBeInstanceOf(Function)
    })

    test('should not throw for an empty store', () => {
        const { reset } = createCartStore()
        expect(() => reset()).not.toThrow()
    })

    test('should remove all items from the store', () => {
        const store = createCartStore({
            items: testItems
        })

        store.reset()

        const state = get(store)

        expect(state.items).toEqual([])
    })
})

describe('cartStore.addItem', () => {
    test('should be a function', () => {
        const { addItem } = createCartStore()
        expect(addItem).toBeInstanceOf(Function)
    })

    test('should add an item to an empty store', () => {
        const store = createCartStore()
        store.addItem(testItems[0])

        const state = get(store)

        expect(state.items).toEqual([testItems[0]])
    })

    test('should not change existing items', () => {
        const [ item1, item2 ] = testItems
        const store = createCartStore({
            items: [item1]
        })

        store.addItem(item2)

        const state = get(store)

        expect(state.items).toEqual(testItems)
    })
})
