import { getAWSConfig } from './config';

export default function(email, code) {
  return new Promise((resolve, reject) => {
    getAWSConfig().credentials.refresh(err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
