import { useMemo } from 'react';

import { GOOGLE_DOCS_URL } from '../constants';
import { CardDetails, CardUrls } from '../types';

export const getCardDetails = (search: string): CardDetails => {
  const query: URLSearchParams = new URLSearchParams(search);

  const title: string = query.get('title') ?? '';

  const formId: string = query.get('formId') ?? '';

  const formEntryParameters: string = query.get('formEntryParameters') ?? '';

  const spreadsheetId: string = query.get('spreadsheetId') ?? '';

  return { title, formId, formEntryParameters, spreadsheetId };
};

export const getCardUrls = ({
  title,
  formId,
  formEntryParameters,
  spreadsheetId,
}: CardDetails): CardUrls => {
  const cardViewOnlyUrl: string | undefined = useMemo(():
    | string
    | undefined => {
    if (!!title && !!spreadsheetId) {
      return `${window.location.origin}/card?title=${encodeURI(
        title,
      )}&spreadsheetId=${encodeURI(spreadsheetId)}`;
    }
    return undefined;
  }, [title, spreadsheetId]);

  const cardEditableUrl: string | undefined = useMemo(():
    | string
    | undefined => {
    if (!!cardViewOnlyUrl && !!formId && !!formEntryParameters) {
      return `${cardViewOnlyUrl}&formId=${encodeURI(
        formId,
      )}&formEntryParameters=${encodeURI(formEntryParameters)}`;
    }
    return undefined;
  }, [cardViewOnlyUrl, formEntryParameters]);

  const formUrl: string | undefined = useMemo((): string | undefined => {
    if (formId) {
      return `${GOOGLE_DOCS_URL}/forms/d/e/${formId}/viewform`;
    }
    return undefined;
  }, [formId]);

  const spreadsheetUrl: string | undefined = useMemo((): string | undefined => {
    if (spreadsheetId) {
      return `${GOOGLE_DOCS_URL}/spreadsheets/d/${spreadsheetId}`;
    }
    return undefined;
  }, [spreadsheetId]);

  return { cardViewOnlyUrl, cardEditableUrl, formUrl, spreadsheetUrl };
};
