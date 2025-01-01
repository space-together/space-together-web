type LeftRegisterType = {
  description: string;
};

export interface leftSideDictionType {
  goBack: string;
  spaceTogether: string;
  register: LeftRegisterType;
  onboarding: LeftRegisterType;
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

export type authRegisterFormDiction = {
  name: string;
  email: string;
  role: string;
  gender: {
    label: string;
    male: string;
    female: string;
    other: string;
  };
  password: string;
  button: string;
};

export type authLoginFormDiction = {
  email: string;
  password: string;
  button: string;
};

export type authOnboardingFormDiction = {
  image: string;
  phone: string;
  age: string;
  username: string;
  role: string;
  gender: {
    label: string;
    male: string;
    female: string;
    other: string;
  };
  button: string;
};
