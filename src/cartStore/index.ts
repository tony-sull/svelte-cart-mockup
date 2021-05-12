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

function createStore(initialState: CartState = defaultState()) {
    const store = writable(initialState)

    const { update, set, subscribe } = store

    const reset = () => set(defaultState())

    const itemsCount = () => derived(store, getItemsCount)
    const totalPrice = () => derived(store, getTotalPrice)

    return {
        subscribe,
        update,
        reset,
        itemsCount,
        totalPrice
    }
}

export const cartStore = createStore()
