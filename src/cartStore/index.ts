import { derived, writable } from 'svelte/store'
import { getItemsCount } from './getItemsCount'
import { getTotalPrice } from './getTotalPrice'

type CartItem = {
    sku: string
    brand: string
    title: string
    description: string
    quantity: number
    itemPrice: number
}

export type CartState = {
    items: CartItem[]
}

function defaultState(): CartState {
    return {
        items: []
    }
}

export function createCartStore(initialState: CartState = defaultState()) {
    const store = writable(initialState)

    const { update, set, subscribe } = store

    const reset = () => set(defaultState())

    const itemsCount = () => derived(store, getItemsCount)
    const totalPrice = () => derived(store, getTotalPrice)
    const removeSku = (sku: string) => update(state => {
        return {
            ...state,
            items: state.items.filter(item => item.sku !== sku)
        }
    })
    const setSkuQuantity = (sku: string, quantity: number) => update(state => {
        return {
            ...state,
            items: state.items.map(item => {
                return item.sku === sku
                    ? { ...item, quantity }
                    : item
            })
        }
    })
    const addItem = (item: CartItem) => update(state => {
        return {
            ...state,
            items: state.items.concat(item)
        }
    })

    return {
        subscribe,
        update,
        reset,
        addItem,
        removeSku,
        setSkuQuantity,
        itemsCount,
        totalPrice
    }
}
