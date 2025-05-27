// ---------- START of Simple Mapping ---------------
const getPathSimpleMappingBefore = (objType: string) => {
  if (objType === 'hello') {
    return '/one'
  }
  if (objType === 'goodbye') {
    return '/two'
  }
  return '/three'
}

const mapping: Record<string, string> = {
  hello: '/one',
  goodbye: '/two',
}
const getPathSimpleMappingAfter = (objType: string) => {
  return mapping[objType] ?? '/three'
}
// ---------- END of Simple Mapping ---------------
// ---------- START of Action Mapping -------------
const getPathActionMappingBefore = (objType: string) => {
  // TODO: Implement
}
const getPathActionMappingAfter = (objType: string) => {
  // TODO: Implement
}
// ---------- END of Action Mapping ----------------
// ---------- START of High-Order functions --------
type ItemType = { check: boolean; count: number }
const testIterationBefore = (items: ItemType[]) => {
  const newItems = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.check) {
      newItems.push({ ...item, count: item.count + 10 })
    }
  }
  return newItems
}

const testIterationAfter = (items: ItemType[]) => {
  return items.filter((item) => item.check).map((item) => ({ ...item, count: item.count + 10 }))
}
// ---------- END of High-Order functions ----------
// ---------- START of Strategy --------------------

abstract class PaymentMethod {
  abstract process(amount: number): string
}

class CreditCardPayment extends PaymentMethod {
  process(amount: number): string {
    return `Processing $${amount} via credit card`
  }
}
class BitcoinPayment extends PaymentMethod {
  process(amount: number): string {
    return `Processing $${amount} via Bitcoin`
  }
}
const paymentMethods = {
  credit: new CreditCardPayment(),
  bitcoin: new BitcoinPayment(),
}

const processPayment = (amount: number, type: 'credit' | 'bitcoin') => {
  return paymentMethods[type].process(amount)
}
