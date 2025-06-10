export type Language = 'sq' | 'en';

export interface Translations {
  navigation: {
    home: string;
    services: string;
    store: string;
    gamingZone: string;
    portfolio: string;
    aboutUs: string;
    support: string;
    fixYourStuff: string;
    login: string;
    register: string;
    dashboard: string;
    logout: string;
  };
  services: {
    pcConfigurator: {
      title: string;
      description: string;
    };
    ps5Configurator: {
      title: string;
      description: string;
    };
    gamingCenter: {
      title: string;
      description: string;
    };
    aiDevelopment: {
      title: string;
      description: string;
    };
    printing3d: {
      title: string;
      description: string;
    };
    pcOptimization: {
      title: string;
      description: string;
    };
    fixYourStuff: {
      title: string;
      description: string;
    };
    store: {
      title: string;
      description: string;
    };
  };
  store: {
    easyMailIn: {
      title: string;
      description: string;
    };
    giftCards: {
      title: string;
      description: string;
    };
    accounts: {
      title: string;
      description: string;
    };
  };
  common: {
    addToCart: string;
    buyNow: string;
    customize: string;
    learnMore: string;
    contactUs: string;
    viewAll: string;
    search: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    price: string;
    quantity: string;
    total: string;
    subtotal: string;
    tax: string;
    shipping: string;
    discount: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    companyName: string;
    slogan: string;
    quickLinks: string;
    contact: string;
    followUs: string;
    newsletter: string;
    newsletterPlaceholder: string;
    subscribe: string;
    allRightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  auth: {
    login: {
      title: string;
      email: string;
      password: string;
      rememberMe: string;
      forgotPassword: string;
      submit: string;
      noAccount: string;
      signUp: string;
    };
    register: {
      title: string;
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      acceptTerms: string;
      submit: string;
      haveAccount: string;
      signIn: string;
    };
  };
  dashboard: {
    welcome: string;
    overview: string;
    orders: string;
    repairs: string;
    configurations: string;
    support: string;
    profile: string;
    settings: string;
  };
  petabyteCertified: {
    title: string;
    description: string;
  };
}

const sq: Translations = {
  navigation: {
    home: 'Ballina',
    services: 'Shërbimet',
    store: 'Dyqani',
    gamingZone: 'Zona e Lojërave',
    portfolio: 'Portofoli',
    aboutUs: 'Rreth Nesh',
    support: 'Mbështetje',
    fixYourStuff: 'Rregullo Pajisjet',
    login: 'Hyr',
    register: 'Regjistrohu',
    dashboard: 'Paneli',
    logout: 'Dil',
  },
  services: {
    pcConfigurator: {
      title: 'Konfigurues PC',
      description: '3 konfigurime kryesore që mund të personalizohen me komponentët që shtojmë nga paneli i administratorit',
    },
    ps5Configurator: {
      title: 'Konfigurues Kontrolleri PS5',
      description: 'Konfigurues hap pas hapi për kontrollerin PS5 që mund të personalizohet me komponentët nga paneli i administratorit',
    },
    gamingCenter: {
      title: 'Zgjidhje për Qendra Lojërash',
      description: 'Faqe për konfigurimin e qendrave të lojërave dhe harduerit dhe gjithçka tjetër për qendrën e lojërave',
    },
    aiDevelopment: {
      title: 'Zhvillim Web & Mobile me AI',
      description: 'Maksimizojmë performancën e zhvillimit me fuqinë e AI duke krijuar faqe interneti dhe sisteme të nivelit të lartë',
    },
    printing3d: {
      title: 'Studio Printimi 3D',
      description: 'Shfaqje e aftësive tona të printimit 3D dhe një formë për të bërë biznes',
    },
    pcOptimization: {
      title: 'Optimizim PC',
      description: 'Këshilla për optimizimin e PC-së dhe shërbime me pagesë',
    },
    fixYourStuff: {
      title: 'Rregullo Pajisjet Tuaja',
      description: 'Tutoriale se si të rregulloni elektronikën me rregullime të thjeshta',
    },
    store: {
      title: 'Dyqani',
      description: 'Dyqan ku do të vendosim për shitje të gjitha artikujt që kemi',
    },
  },
  store: {
    easyMailIn: {
      title: 'Dërgo me Postë',
      description: 'Lejon përdoruesit të dërgojnë riparime ku aplikojnë për riparim dhe ne u dërgojmë një kuti',
    },
    giftCards: {
      title: 'Kartela Dhuratë',
      description: 'Blini kartela dhuratë Steam dhe PSN',
    },
    accounts: {
      title: 'Hapje Llogarish',
      description: 'Blini llogari si Steam ose PSN direkt nga ne',
    },
  },
  common: {
    addToCart: 'Shto në Shportë',
    buyNow: 'Bli Tani',
    customize: 'Personalizo',
    learnMore: 'Mëso Më Shumë',
    contactUs: 'Na Kontaktoni',
    viewAll: 'Shiko të Gjitha',
    search: 'Kërko',
    loading: 'Duke ngarkuar...',
    error: 'Gabim',
    success: 'Sukses',
    cancel: 'Anulo',
    save: 'Ruaj',
    delete: 'Fshij',
    edit: 'Modifiko',
    back: 'Mbrapa',
    next: 'Tjetër',
    previous: 'I Mëparshëm',
    submit: 'Dërgo',
    price: 'Çmimi',
    quantity: 'Sasia',
    total: 'Totali',
    subtotal: 'Nëntotali',
    tax: 'Taksa',
    shipping: 'Transporti',
    discount: 'Zbritje',
  },
  hero: {
    title: 'Fuqizojmë Eksperiencën Tuaj Teknologjike',
    subtitle: 'Nga konfigurimi i PC-ve deri te riparimi i pajisjeve, ne jemi partneri juaj i teknologjisë',
    cta: 'Eksploro Shërbimet',
  },
  footer: {
    companyName: 'Petabyte Tech',
    slogan: 'Teknologjia e Bërë e Thjeshtë',
    quickLinks: 'Lidhje të Shpejta',
    contact: 'Kontakt',
    followUs: 'Na Ndiqni',
    newsletter: 'Buletini',
    newsletterPlaceholder: 'Email-i juaj',
    subscribe: 'Abonohu',
    allRightsReserved: 'Të gjitha të drejtat e rezervuara',
    privacyPolicy: 'Politika e Privatësisë',
    termsOfService: 'Kushtet e Shërbimit',
  },
  auth: {
    login: {
      title: 'Hyr në Llogari',
      email: 'Email',
      password: 'Fjalëkalimi',
      rememberMe: 'Më Mbaj Mend',
      forgotPassword: 'Harruat Fjalëkalimin?',
      submit: 'Hyr',
      noAccount: 'Nuk keni llogari?',
      signUp: 'Regjistrohu',
    },
    register: {
      title: 'Krijo Llogari',
      name: 'Emri',
      email: 'Email',
      password: 'Fjalëkalimi',
      confirmPassword: 'Konfirmo Fjalëkalimin',
      acceptTerms: 'Pranoj kushtet e shërbimit',
      submit: 'Regjistrohu',
      haveAccount: 'Keni një llogari?',
      signIn: 'Hyr',
    },
  },
  dashboard: {
    welcome: 'Mirësevini',
    overview: 'Përmbledhje',
    orders: 'Porositë',
    repairs: 'Riparimet',
    configurations: 'Konfigurimet',
    support: 'Mbështetje',
    profile: 'Profili',
    settings: 'Cilësimet',
  },
  petabyteCertified: {
    title: 'Petabyte e Certifikuar',
    description: 'Kjo është marka jonë e besimit që përdoret në të gjithë faqen tonë dhe produktet tona',
  },
};

const en: Translations = {
  navigation: {
    home: 'Home',
    services: 'Services',
    store: 'Store',
    gamingZone: 'Gaming Zone',
    portfolio: 'Portfolio',
    aboutUs: 'About Us',
    support: 'Support',
    fixYourStuff: 'Fix Your Stuff',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    logout: 'Logout',
  },
  services: {
    pcConfigurator: {
      title: 'PC Configurator',
      description: '3 Main builds that can be customized on components that we add from admin panel',
    },
    ps5Configurator: {
      title: 'PS5 Controller Configurator',
      description: 'Step by Step PS5 controller configurator that can be customized from admin panel',
    },
    gamingCenter: {
      title: 'Gaming Center Solutions',
      description: 'Landing page about the setup of gaming centers and hardware for gaming center',
    },
    aiDevelopment: {
      title: 'AI Enhanced Web & Mobile Development',
      description: 'Maximize development performance with AI creating top level websites and systems',
    },
    printing3d: {
      title: '3D Printing Studio',
      description: 'Showcase about our 3D printing capabilities and a form for doing business',
    },
    pcOptimization: {
      title: 'PC Optimization',
      description: 'Tips for PC optimization and paid services',
    },
    fixYourStuff: {
      title: 'Fix Your Stuff',
      description: 'Tutorials on how to fix electronics with simple fixes',
    },
    store: {
      title: 'Store',
      description: 'Store where we will put for sale all items we have',
    },
  },
  store: {
    easyMailIn: {
      title: 'Easy Mail-In',
      description: 'Allows users to send in repairs where they apply for repair and we post them a box',
    },
    giftCards: {
      title: 'Gift Cards',
      description: 'Buy Steam and PSN gift cards',
    },
    accounts: {
      title: 'Account Opening',
      description: 'Buy accounts like Steam or PSN directly from us',
    },
  },
  common: {
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    customize: 'Customize',
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    viewAll: 'View All',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total',
    subtotal: 'Subtotal',
    tax: 'Tax',
    shipping: 'Shipping',
    discount: 'Discount',
  },
  hero: {
    title: 'Empowering Your Tech Experience',
    subtitle: 'From PC configuration to device repair, we are your technology partner',
    cta: 'Explore Services',
  },
  footer: {
    companyName: 'Petabyte Tech',
    slogan: 'Technology Made Simple',
    quickLinks: 'Quick Links',
    contact: 'Contact',
    followUs: 'Follow Us',
    newsletter: 'Newsletter',
    newsletterPlaceholder: 'Your email',
    subscribe: 'Subscribe',
    allRightsReserved: 'All rights reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  auth: {
    login: {
      title: 'Login to Account',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember Me',
      forgotPassword: 'Forgot Password?',
      submit: 'Login',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
    },
    register: {
      title: 'Create Account',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      acceptTerms: 'I accept the terms of service',
      submit: 'Register',
      haveAccount: 'Have an account?',
      signIn: 'Sign In',
    },
  },
  dashboard: {
    welcome: 'Welcome',
    overview: 'Overview',
    orders: 'Orders',
    repairs: 'Repairs',
    configurations: 'Configurations',
    support: 'Support',
    profile: 'Profile',
    settings: 'Settings',
  },
  petabyteCertified: {
    title: 'Petabyte Certified',
    description: 'This is our mark of trust used throughout our website and products',
  },
};

export const translations = {
  sq,
  en,
};

export const getTranslation = (lang: Language): Translations => {
  return translations[lang] || translations.sq;
};