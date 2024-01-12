//
// This file contains jsons with errors messages and codes
// Error codes:
//  [-1] - unknown internal error
//  [100,199] - action required
//  [200,299] - missing/incorrect data

export const UNKNOWN_INTERNAL_ERROR = { errCode:  -1, err: 'unknown internal error' };
export const LOGIN_EXPIRED          = { errCode: 100, err: 'login expired' };
export const MISSING_BODY           = { errCode: 200, err: 'missing body' };
export const MISSING_FUNC           = { errCode: 201, err: 'missing func (string)' };
export const INVALID_FUNC           = { errCode: 202, err: 'func value is invalis' };
export const MISSING_LOGIN_KEY      = { errCode: 203, err: 'missing login key' };
export const INVALID_TOKEN          = { errCode: 204, err: 'couldn\'t verify token' };
export const MISSING_PROFILE_ID     = { errCode: 205, err: 'missing data.id (string)' };
export const MISSING_RESOURCE_ID    = { errCode: 206, err: 'missing data.id (string)' };