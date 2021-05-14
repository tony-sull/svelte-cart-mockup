import { derived, Readable, writable } from 'svelte/store'
import { addItemToState } from './addItemToState'
import { getDiscountAmount } from './getDiscountAmount'
import { getItemsCount } from './getItemsCount'
import { getTotalPrice } from './getTotalPrice'
import { removeSkuFromState } from './removeSkuFromState'
import { setSkuQuantityInState } from './setSkuQuantityInState'
import type { Writable } from 'svelte/store'

export type CartItem = {
    sku: string
    brand: string
    title: string
    description: string
    quantity: number
    itemPrice: number
    image?: string
}

export type PercentDiscount = {
    title: string
    description: string
    discountPercent: number
}

export type AmountDiscount = {
    title: string
    description: string
    discountAmount: number
}

export type Discount = PercentDiscount | AmountDiscount

export function isPercentDiscount(discount: Discount): discount is PercentDiscount {
    return 'discountPercent' in discount
}

export function isAmountDiscount(discount: Discount): discount is AmountDiscount {
    return 'discountAmount' in discount
}

export type CartState = {
    items: CartItem[],
    discount?: Discount
}

function defaultState(): CartState {
    return {
        items: [],
        discount: undefined
    }
}

export interface CartStore extends Writable<CartState> {
    reset(): void
    addItem(item: CartItem): void
    removeSku(sku: string): void
    setSkuQuantity(sku: string, quantity: number): void
    itemsCount(): Readable<number>
    totalPrice(): Readable<number>
    discountAmount(): Readable<number>
}

export function createCartStore(initialState: CartState = defaultState()): CartStore {
    const store = writable(initialState)

    const { update, set, subscribe } = store

    const reset = () => set(defaultState())
    const removeSku = (sku: string) => update(removeSkuFromState(sku))
    const setSkuQuantity = (sku: string, quantity: number) => update(setSkuQuantityInState(sku, quantity))
    const addItem = (item: CartItem) => update(addItemToState(item))
    const itemsCount = () => derived(store, getItemsCount)
    const totalPrice = () => derived(store, getTotalPrice)
    const discountAmount = () => derived(store, getDiscountAmount)

    return {
        subscribe,
        update,
        set,
        reset,
        addItem,
        removeSku,
        setSkuQuantity,
        itemsCount,
        totalPrice,
        discountAmount
    }
}
