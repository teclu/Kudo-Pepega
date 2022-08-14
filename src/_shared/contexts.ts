import { createContext } from 'react';

import { CardDetails } from './types';

export const CardDetailsContext: React.Context<CardDetails> =
  createContext<CardDetails>({});
