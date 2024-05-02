import React from 'react';
import { TypographieFuseButton } from '../../styles';
import { Button, Spinner, Typographie } from 'mobsya-theme';
import { useTranslation } from 'react-i18next';

export const LoadingScreen = ({
  loading,
  retry,
  times,
  onRetry,
}: {
  loading: boolean;
  retry: boolean;
  times: number;
  onRetry: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {loading && !retry ? (
        <>
          <Typographie variant="paragraph">{t('firsUse_st1_loadingParagraph')}</Typographie>
          <Typographie variant="paragraph">{t('firsUse_st1_loadingParagraphTimes', { times })}</Typographie>
        </>
      ) : (
        <Typographie variant="paragraph">Connection failed</Typographie>
      )}
      <br />
      {loading && !retry ? (
        <Spinner name="dual-ring" size={150} />
      ) : (
        <div>
          <Button variant="contained" size="small" onClick={onRetry} bgcolor="#452AB6">
            <TypographieFuseButton variant="graphics" color="#fff" style={{ fontWeight: '600' }} size="1.6rem">
              Retry
            </TypographieFuseButton>
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
