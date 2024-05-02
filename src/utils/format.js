export const getCurrentMonth = () => {
  var date = new Date()
  var month = '0' + (date.getMonth() + 1)
  return date.getFullYear() + '-' + month.slice(-2)
}

export const getCurrentDate = () => new Date().toISOString().split('T')[0]

export const getCurrence = (value = 0) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}

export const formatDate = dateValue => {
  let [year, month, day] = dateValue.split('-')
  return `${day}/${month}/${year}`
}
