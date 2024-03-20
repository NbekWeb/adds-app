function formatAmount(amount) {
  return amount
    .toString()
    .replace(/\D/g, '')
    .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
}

export default formatAmount