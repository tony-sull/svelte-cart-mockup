declare type StoreBrandID = string

declare type StoreBrand = {
    name: string
    id: StoreBrandID
}

declare type StoreItem = {
    brand: StoreBrandID
    name: string
    options?: StoreItemOption[]
}

declare type StoreItemOption = {
    name: string
    value: string
}

declare type ItemVariant = {
    name: string
    item: StoreItemId
    options: ItemVariantOption[]
    price: number
}