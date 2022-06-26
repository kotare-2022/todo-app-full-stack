const terminalLogger = (request, response, next) => {
  const log = (...msg) => console.log(...msg)

  log('Method: ', request.method)
  log('Path: ', request.path)
  log('Query: ', request.query)
  log('Body: ', request.body)
  log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send('resource not found')
}

const errorHandler = (err, request, response, next) => {
  console.error(err.message)
  response.status(500).json({message: err.message})
}

module.exports = {
  terminalLogger,
  unknownEndpoint,
  errorHandler
}