function getDisplayPrice(price) {
  if (Number(price) > 0)
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(price))
  return ''
}

export { getDisplayPrice }
