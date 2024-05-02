import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  BackgroundLabelContainer,
  ButtonSelect,
  LabelContainer,
  LanguageOption,
  ModalContent,
  ModalOverlay,
  SelectContainer,
} from './styles';

import { LanguageSelectorProps } from './types';
import { useTranslation } from 'react-i18next';
import { useTraductions } from '@/hooks/useTraductions';

export const LanguageSelector = ({ onSelectLanguage }: LanguageSelectorProps) => {
  const { set, language, i18nLangue, languages } = useTraductions();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const onClickLanguage = (_language: { code: any; name: any }) => {
    onSelectLanguage(_language.code);
    set(_language.code);
    handleCloseModal();
  };

  useEffect(() => {
    onSelectLanguage(language);
  }, [onSelectLanguage]);

  return (
    <SelectContainer>
      <BackgroundLabelContainer>
        <LabelContainer>{t('common_language')}</LabelContainer>
      </BackgroundLabelContainer>
      <ButtonSelect onClick={handleOpenModal}>
        <span>{Object.values(languages).find((lang) => lang.code === i18nLangue)?.name}</span>
        <span style={{ transform: 'scaleY(0.5)' }}>▼</span>
      </ButtonSelect>
      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {languages.map((_language, index) => (
              <LanguageOption
                key={_language.code}
                onClick={() => onClickLanguage(_language)}
                isLast={index === languages.length - 1}
              >
                {_language.name}
              </LanguageOption>
            ))}
          </ModalContent>
        </ModalOverlay>
      )}
    </SelectContainer>
  );
};
