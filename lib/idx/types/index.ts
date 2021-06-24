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
 */


import { InteractOptions } from '../interact';
import { APIError, Tokens } from '../../types';
import { IdxTransactionMeta } from '../../types/Transaction';
import { IdxMessage, IdxOption, IdxActions } from './idx-js';

export { IdxMessage } from './idx-js';
export { AuthenticationOptions } from '../authenticate';
export { RegistrationOptions } from '../register';
export { PasswordRecoveryOptions } from '../recoverPassword';
export { CancelOptions } from '../cancel';

export enum IdxStatus {
  SUCCESS,
  PENDING,
  FAILURE,
  TERMINAL,
  CANCELED,
}

type Input = {
  name: string;
  required?: boolean;
}

export type NextStep = {
  name: string;
  type?: string;
  canSkip?: boolean;
  inputs?: Input[];
  options?: IdxOption[];
}

export enum IdxFeature {
  PASSWORD_RECOVERY,
  REGISTRATION,
  SOCIAL_IDP,
}

export interface IdxTransaction {
  status: IdxStatus;
  tokens?: Tokens;
  nextStep?: NextStep;
  actions?: IdxActions;
  messages?: IdxMessage[];
  error?: APIError;
  meta?: IdxTransactionMeta;
  enabledFeatures?: IdxFeature[];
  availableSteps?: NextStep[];
}

export type IdxOptions = InteractOptions;

export type Authenticator = {
  type: string;
  methodType?: string;
  phoneNumber?: string;
};
