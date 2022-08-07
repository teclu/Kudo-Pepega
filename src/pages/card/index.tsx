import React from 'react';
import { Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import type { Location, NavigateFunction } from 'react-router';

import type { CardDetails, CardMessage } from '../../_shared/types';
import { GOOGLE_DOCS_URL } from '../../_shared/constants';
import { ROOT_PATH } from '../../container/routing';
import AddToCardModal from './components/AddToCardModal';
import CardInformationModal from './components/CardInformationModal';
import CardMessages from './components/CardMessages';
import SlideshowModal from './components/SlideshowDrawer';
import fetchCardMessages from '../../_shared/utilities/fetchCardMessages';
import fireNotification from '../../_shared/utilities/notification';
import useWidth from '../../_shared/utilities/useWidth';

import s from './s.module.scss';

const Card = (): JSX.Element => {
  const [cardDetails, setCardDetails] = React.useState<CardDetails>();
  const [cardMessages, setCardMessages] = React.useState<Array<CardMessage>>(
    [],
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const { isXsWidth, isSmWidth, isLgWidth, isXlWidth } = useWidth();

  const cardViewOnlyUrl: string = React.useMemo((): string => {
    if (cardDetails) {
      return `${window.location.origin}/card?title=${encodeURI(
        cardDetails.title,
      )}&spreadsheetId=${encodeURI(cardDetails.spreadsheetId)}`;
    }
    return '';
  }, [cardDetails]);

  const cardEditableUrl: string = React.useMemo((): string => {
    if (cardDetails?.formId && cardDetails?.formEntryParameters) {
      return `${cardViewOnlyUrl}&formId=${encodeURI(
        cardDetails.formId,
      )}&formEntryParameters=${encodeURI(cardDetails.formEntryParameters)}`;
    }
    return '';
  }, [cardViewOnlyUrl]);

  const formUrl: string = React.useMemo((): string => {
    if (cardDetails?.formId) {
      return `${GOOGLE_DOCS_URL}/forms/d/e/${cardDetails.formId}/viewform`;
    }
    return '';
  }, [cardDetails?.formId]);

  const spreadsheetUrl: string = React.useMemo((): string => {
    if (cardDetails) {
      return `${GOOGLE_DOCS_URL}/spreadsheets/d/${cardDetails.spreadsheetId}`;
    }
    return '';
  }, [cardDetails?.spreadsheetId]);

  /*
   * Initiapse Card Details.
   */
  React.useEffect((): void => {
    const query: URLSearchParams = new URLSearchParams(location.search);
    const title: string | null = query.get('title');
    const formId: string | null = query.get('formId');
    const formEntryParameters: string | null = query.get('formEntryParameters');
    const spreadsheetId: string | null = query.get('spreadsheetId');

    // Initialise the Card with valid URL Query Parameters.
    if (title && spreadsheetId) {
      setCardDetails({
        title,
        formId: formId ?? '',
        formEntryParameters: formEntryParameters ?? '',
        spreadsheetId,
      });
      return;
    }
    // Redirect back to root page.
    else {
      fireNotification({
        message: 'Invalid Card Configuration',
        type: 'error',
      });
      navigate(ROOT_PATH.path);
    }
  }, [location]);

  const getCardMessages = async (): Promise<void> => {
    if (cardDetails) {
      setIsLoading(true);
      try {
        const messages: Array<CardMessage> = await fetchCardMessages(
          `${spreadsheetUrl}/gviz/tq?tqx=out:csv`,
        );
        setCardMessages(messages);
        setIsLoading(false);
      } catch (error) {
        fireNotification({
          message: 'Fetch Error',
          description: String(error),
          type: 'error',
        });
        navigate(ROOT_PATH.path);
      }
    }
  };

  React.useEffect((): void => {
    getCardMessages();
  }, [cardDetails]);

  return (
    <div>
      <div className={s.cardHeader}>
        <div className={s.cardTitle}>{cardDetails?.title}</div>
        <div>
          <CardInformationModal
            cardViewOnlyUrl={cardViewOnlyUrl}
            cardEditableUrl={cardEditableUrl}
            formUrl={formUrl}
            spreadsheetUrl={spreadsheetUrl}
          />
        </div>
      </div>
      <div className={s.cardActionButtonsContainer}>
        {formUrl && (
          <AddToCardModal
            formUrl={formUrl}
            formEntryParameters={cardDetails?.formEntryParameters || '0,0'}
            isXsWidth={isXsWidth}
            isSmWidth={isSmWidth}
            onDoneClickCallback={getCardMessages}
          />
        )}
        <SlideshowModal cardMessages={cardMessages} />
      </div>
      {isLoading ? (
        <div className={s.spinner}>
          <Spin size="large" />
        </div>
      ) : (
        <CardMessages
          cardMessages={cardMessages}
          isLgWidth={isLgWidth}
          isXlWidth={isXlWidth}
        />
      )}
    </div>
  );
};

export default Card;
