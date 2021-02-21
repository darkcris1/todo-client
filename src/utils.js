function uuid(prefix = '', date = true) {
  let counter = 0
  return () => {
    return `${date ? Date.now().toString(16) : ''}${prefix}${counter++}`
  }
}
export const uid = uuid('TODO')
