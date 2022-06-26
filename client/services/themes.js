import request from 'superagent'

const localApiUrl = '/api/v1/themes'

function getAllThemes() {
  return request
    .get(localApiUrl)
    .then(result => result.body)
}

// ADD && DELETE Themes
// NO UPDATES

export default {
  getAllThemes
}
