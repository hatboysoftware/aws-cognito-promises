import { CognitoIdentityCredentials } from 'aws-sdk'
import { get, getUser, getAWSConfig } from './config'

export default function() {
    const cognitoUser = getUser()

    if (cognitoUser) {
        return new Promise((resolve, reject) => {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    reject(err)
                } else {
                    let params = {};
                    let endpoint = 'cognito-idp.' + get().region + '.amazonaws.com/' + get().UserPoolId;
                    params['IdentityPoolId'] = get().IdentityPoolId;
                    params.Logins = {}
                    params.Logins[endpoint] = session.getIdToken().getJwtToken();
                    getAWSConfig().credentials = new CognitoIdentityCredentials(params);
                    getAWSConfig().credentials.refresh((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(getAWSConfig().credentials)
                        }
                    })
                }
            })
        })
    } else {
        throw new Error('no cognitiveUser value')
    }
}
