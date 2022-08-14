import React, { createContext } from 'react';

import { CardDetails, CardMessage } from './types';

export const CardDetailsContext: React.Context<CardDetails> =
  createContext<CardDetails>({});

export const CardMessagesContext: React.Context<CardMessage[]> = createContext<
  CardMessage[]
>([]);
