export interface Language {
  code: string;
  name: string;
}

export interface Region {
  code: string;
  name: string;
}

export interface LanguageSelectorProps {
  onSelectLanguage: (language: string) => void;
}

export interface RegionSelectorProps {
  onSelectRegion: (language: string) => void;
}
