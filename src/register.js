import { getUserPool } from './config'

export default function(username, password, attributes) {
  const userPool = getUserPool();

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributes, null, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
