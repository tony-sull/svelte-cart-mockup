import type { CartState } from '.'

export function removeSkuFromState(sku: string) {
    return function(state: CartState) {
        return {
            ...state,
            items: state.items.filter(item => item.sku !== sku)
        }
    }
}
