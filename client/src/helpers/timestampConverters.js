const getDaySent = (timestamp) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(timestamp).toLocaleDateString("en-US", options)
}

const getTimeSent = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString("en-US")
}

export {getDaySent, getTimeSent}