import { Crypto } from "../model/CryptoModel"

export const removePossibleDuplicateItems = (currentArr: Crypto[], newArr: Crypto[]) => {
    const newArray = [...currentArr]
    newArr.forEach((newItem: Crypto) => {
        const possibleDuplicate = currentArr.find((item: Crypto) => item.id === newItem.id)
        if (!possibleDuplicate) {
            newArray.push(newItem)
        }
    })
    return newArray
}