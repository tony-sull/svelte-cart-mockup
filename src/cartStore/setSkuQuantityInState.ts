import type { CartState } from '.'

export function setSkuQuantityInState(sku: string, quantity: number) {
    return function(state: CartState) {
        return {
            ...state,
            items: state.items.map(item => {
                return item.sku === sku
                    ? { ...item, quantity }
                    : item
            })
        }
    }
}