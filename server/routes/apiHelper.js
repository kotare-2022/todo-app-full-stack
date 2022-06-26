const terminalLogger = (request, response, next) => {
  const log = (...msg) => console.log(...msg)

  log('Method: ', request.method)
  log('Path: ', request.path)
  log('Query: ', request.query)
  log('Body: ', request.body)
  log('---')
  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send('resource not found')
}

module.exports = {
  terminalLogger,
  unknownEndpoint
}