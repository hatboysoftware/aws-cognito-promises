import { get, getAWSConfig, getUser } from './config';
import { CognitoIdentityCredentials } from 'aws-sdk';

export default function() {

  return new Promise((resolve, reject) => {
      const user = getUser();
      user.getSession((err, session) => {
          if (err) {
              reject(err);
          }

          let endpoint = 'cognito-idp.' + getAWSConfig().region + '.amazonaws.com/' + get().UserPoolId;
          let params = {}
          params['IdentityPoolId'] = get().IdentityPoolId
          params.Logins = {}
          params.Logins[endpoint] = session.getIdToken().getJwtToken()
          getAWSConfig().credentials = new CognitoIdentityCredentials(params)
          getAWSConfig().credentials.refresh((err) => {
            if (err) {
              reject(err);
            } else {
              resolve()
            }
          });
      });
    // config.credentials.refresh(err => {
    //   if (err) {
    //     reject(err)
    //   } else {
    //     resolve()
    //   }
    // })
  })
}
