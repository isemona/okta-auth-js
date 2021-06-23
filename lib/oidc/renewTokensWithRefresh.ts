/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */
import { AuthSdkError } from '../errors';
import { getOAuthUrls } from './util/oauth';
import { isSameRefreshToken, updateRefreshToken } from './util/refreshToken';
import { OktaAuth, TokenParams, RefreshToken, Tokens } from '../types';
import { handleOAuthResponse } from './handleOAuthResponse';
import { postRefreshToken } from './endpoints/token';

export async function renewTokensWithRefresh(
  sdk: OktaAuth,
  tokenParams: TokenParams,
  refreshTokenObject: RefreshToken
): Promise<Tokens> {
  const { clientId } = sdk.options;
  if (!clientId) {
    throw new AuthSdkError('A clientId must be specified in the OktaAuth constructor to renew tokens');
  }

  const renewTokenParams: TokenParams = Object.assign({}, tokenParams, {
    clientId,
  });
  const tokenResponse = await postRefreshToken(sdk, renewTokenParams, refreshTokenObject);
  const urls = getOAuthUrls(sdk, tokenParams);
  const { tokens } = await handleOAuthResponse(sdk, renewTokenParams, tokenResponse, urls);

  // Support rotating refresh tokens
  const { refreshToken } = tokens;
  if (refreshToken && !isSameRefreshToken(refreshToken, refreshTokenObject)) {
    updateRefreshToken(sdk, refreshToken);
  }

  return tokens;
}
