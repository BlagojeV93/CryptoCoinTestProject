import { FormatedCrypto } from "../model/CryptoModel"

export const removePossibleDuplicateItems = (currentArr: FormatedCrypto[], newArr: FormatedCrypto[]) => {
    const newArray = [...currentArr]
    newArr.forEach((newItem: FormatedCrypto) => {
        const possibleDuplicate = currentArr.find((item: FormatedCrypto) => item.id === newItem.id)
        if (!possibleDuplicate) {
            newArray.push(newItem)
        }
    })
    return newArray
}