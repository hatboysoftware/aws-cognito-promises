import {get, getAWSConfig, getUser} from './config'
import refreshCredentials from './refreshCredentials';

export default function() {
  const cognitoUser = getUser()

  if (cognitoUser) {
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err)
        } else {
          let endpoint = 'cognito-idp.' + getAWSConfig().region + '.amazonaws.com/' + get().UserPoolId
          getAWSConfig().credentials.params.Logins[endpoint] = session.getIdToken().getJwtToken();
          refreshCredentials()
              .then(() => {
                  resolve(session)
              })
              .catch((err) => {
                  reject(err)
              })
        }
      })
    })
  } else {
    throw new Error('no cognitiveUser value')
  }
}
