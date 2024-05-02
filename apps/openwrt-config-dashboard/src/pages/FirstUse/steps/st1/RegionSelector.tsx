import React, { useEffect, useRef, useState } from 'react';
import {
  BackgroundLabelContainer,
  ButtonSelect,
  LabelContainer,
  LanguageOption,
  ModalContent,
  ModalOverlay,
  SelectContainer,
} from './styles';

import { useTranslation } from 'react-i18next';

export const RegionSelector = ({ onSelectRegion }: { onSelectRegion: (regionCode: string) => void }) => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Switzerland');
  const regions = [
    { code: 'CH', name: 'Switzerland' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'CA', name: 'Canada' },
    { code: 'CN', name: 'China' },
    { code: 'CO', name: 'Colombia' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EG', name: 'Egypt' },
    { code: 'FI', name: 'Finland' },
    { code: 'GR', name: 'Greece' },
    { code: 'HK', name: 'Hong Kong (China)' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'CI', name: 'Ivory Coast' },
    { code: 'JP', name: 'Japan' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MX', name: 'Mexico' },
    { code: 'MA', name: 'Morocco' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NO', name: 'Norway' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RU', name: 'Russia' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'KR', name: 'South Korea' },
    { code: 'ES', name: 'Spain' },
    { code: 'SE', name: 'Sweden' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TR', name: 'Turkiye' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'USA' },
    { code: 'US', name: 'Other' },
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const onClickRegion = (region: { code: any; name: any }) => {
    setSelectedRegion(region.name);
    onSelectRegion(region.code);
    handleCloseModal();
  };

  useEffect(() => {
    onSelectRegion('CH');
  }, [onSelectRegion]);

  return (
    <SelectContainer>
      <BackgroundLabelContainer>
        <LabelContainer>{t('common_country')}</LabelContainer>
      </BackgroundLabelContainer>
      <ButtonSelect onClick={handleOpenModal}>
        <span>{t(selectedRegion)}</span>
        <span style={{ transform: 'scaleY(0.5)' }}>▼</span>
      </ButtonSelect>
      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {regions.map((region, index) => (
              <LanguageOption
                key={region.code}
                onClick={() => onClickRegion(region)}
                isLast={index === regions.length - 1}
              >
                {t(region.name)}
              </LanguageOption>
            ))}
          </ModalContent>
        </ModalOverlay>
      )}
    </SelectContainer>
  );
};
