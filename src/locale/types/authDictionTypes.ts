type LeftRegisterType = {
  onboarding: string;
};

export interface leftSideDictionType {
  goBack: string;
  spaceTogether: string;
  register: LeftRegisterType;
}

export interface AuthSettingDictionType {
  dialog: {
    title: string;
    description: string;
    button: {
      save: string;
      cancel: string;
    };
    language: {
      title: string;
      kiny: string;
      en: string;
    };
    theme: {
      title: string;
      dark: string;
      light: string;
    };
  };
}
