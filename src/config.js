import AWS, { CognitoIdentityCredentials } from 'aws-sdk'
import AWSCognito, { CognitoUserPool } from 'amazon-cognito-identity-js'

let appConfig
let userPool

export const set = config => {
  appConfig = config

  AWS.config.update({
      region: appConfig.region
  })

  AWS.config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
  })

  userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId
  })
}

export const get = () => {
  return appConfig
}

export const getUserPool = () => {
  return userPool
}

export const getUser = () => {
  return userPool.getCurrentUser()
}

export const getAWSConfig = () => {
  return AWS.config
}
