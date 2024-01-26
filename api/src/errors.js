//
// This file contains jsons with errors messages and codes
// Error codes:
//  [-1] - unknown internal error
//  [100,199] - action required
//  [200,299] - missing or incorrect data

export const ERR_UNKNOWN_INTERNAL      = { errCode:  -1, err: 'unknown internal error' };

export const ERR_LOGIN_EXPIRED         = { errCode: 100, err: 'login expired' };
export const ERR_ACCOUNT_DONT_EXIST    = { errCode: 101, err: 'account doesn\'t exist' };

export const ERR_MISSING_BODY          = { errCode: 200, err: 'missing body' };
export const ERR_MISSING_FUNC          = { errCode: 201, err: 'missing func' };
export const ERR_INVALID_FUNC          = { errCode: 202, err: 'invalid func' };
export const ERR_MISSING_AUTH_METHOD   = { errCode: 203, err: 'missing auth method' };
export const ERR_INVALID_AUTH_METHOD   = { errCode: 204, err: 'invalid auth method' };
export const ERR_MISSING_AUTH_DATA     = { errCode: 205, err: 'missing auth data' };
export const ERR_INVALID_AUTH_DATA     = { errCode: 206, err: 'invalid auth data' };
export const ERR_MISSING_SESSION_TOKEN = { errCode: 207, err: 'missing sessionToken' };
export const ERR_MISSING_PROFILE_ID    = { errCode: 208, err: 'missing profile id' };
export const ERR_MISSING_RESOURCE_ID   = { errCode: 209, err: 'missing resource id' };