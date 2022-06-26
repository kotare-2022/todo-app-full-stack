import request from 'superagent'

const localApiUrl = '/api/v1/importance_levels'

function getAllImportanceLevels() {
  return request
    .get(localApiUrl)
    .then(result => result.body)
}

// NO ADD/DELETE/UPDATES

export default {
  getAllImportanceLevels
}