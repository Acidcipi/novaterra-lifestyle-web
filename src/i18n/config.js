//===============================================
//🌍 CONFIGURACIÓN INTERNACIONAL EXPANDIDA
//===============================================
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones base
import esTranslations from './locales/es.json';

//===============================================
//🔒 CONFIGURACIÓN DE SEGURIDAD EXPANDIDA
//===============================================
// Lista expandida de idiomas soportados (12 idiomas principales)
const SUPPORTED_LANGUAGES = [
  'es', 'en', 'ru', 'ro', 'pl', 'uk',  // Originales
  'mk', 'de', 'fr', 'it', 'pt', 'nl'  // Nuevos
];

// Función validadora mejorada
const validateLanguage = (lang) => {
  return SUPPORTED_LANGUAGES.includes(lang) ? lang : 'es';
};

//===============================================
//🇬🇧 TRADUCCIONES INGLÉS
//===============================================
const enTranslations = {
  nav: {
    properties: "Properties",
    experiences: "Experiences",
    services: "Services",
    contact: "Contact",
    login: "Login"
  },
  hero: {
    title: "Discover Cantabria",
    subtitle: "Exclusive properties and premium experiences",
    cta: "Explore Properties"
  },
  auth: {
    loginTitle: "Access your account",
    registerTitle: "Create account",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    loginButton: "Login",
    registerButton: "Register",
    switchToRegister: "Don't have an account? Register",
    switchToLogin: "Already have an account? Login",
    errors: {
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      passwordRequired: "Password is required",
      passwordWeak: "Password must be at least 8 characters",
      confirmPasswordRequired: "You must confirm your password",
      passwordMismatch: "Passwords do not match",
      submitError: "Error processing request. Please try again."
    }
  },
  common: {
    close: "Close",
    loading: "Loading...",
    error: "Error"
  }
};

//===============================================
//🇷🇺 TRADUCCIONES RUSO
//===============================================
const ruTranslations = {
  nav: {
    properties: "Недвижимость",
    experiences: "Опыт",
    services: "Услуги",
    contact: "Контакты",
    login: "Войти"
  },
  hero: {
    title: "Откройте Кантабрию",
    subtitle: "Эксклюзивная недвижимость и премиум опыт",
    cta: "Посмотреть недвижимость"
  },
  auth: {
    loginTitle: "Войти в аккаунт",
    registerTitle: "Создать аккаунт",
    email: "Электронная почта",
    password: "Пароль",
    confirmPassword: "Подтвердить пароль",
    loginButton: "Войти",
    registerButton: "Регистрация",
    switchToRegister: "Нет аккаунта? Зарегистрироваться",
    switchToLogin: "Уже есть аккаунт? Войти",
    errors: {
      emailRequired: "Email обязателен",
      emailInvalid: "Введите правильный email",
      passwordRequired: "Пароль обязателен",
      passwordWeak: "Пароль должен содержать минимум 8 символов",
      confirmPasswordRequired: "Подтвердите пароль",
      passwordMismatch: "Пароли не совпадают",
      submitError: "Ошибка обработки запроса. Попробуйте снова."
    }
  },
  common: {
    close: "Закрыть",
    loading: "Загрузка...",
    error: "Ошибка"
  }
};

//===============================================
//🇷🇴 TRADUCCIONES RUMANO
//===============================================
const roTranslations = {
  nav: {
    properties: "Proprietăți",
    experiences: "Experiențe",
    services: "Servicii",
    contact: "Contact",
    login: "Autentificare"
  },
  hero: {
    title: "Descoperă Cantabria",
    subtitle: "Proprietăți exclusive și experiențe premium",
    cta: "Explorează proprietățile"
  },
  auth: {
    loginTitle: "Accesează contul",
    registerTitle: "Creează cont",
    email: "Email",
    password: "Parolă",
    confirmPassword: "Confirmă parola",
    loginButton: "Autentificare",
    registerButton: "Înregistrare",
    switchToRegister: "Nu ai cont? Înregistrează-te",
    switchToLogin: "Ai deja cont? Autentifică-te",
    errors: {
      emailRequired: "Email-ul este obligatoriu",
      emailInvalid: "Introduceți o adresă de email validă",
      passwordRequired: "Parola este obligatorie",
      passwordWeak: "Parola trebuie să aibă cel puțin 8 caractere",
      confirmPasswordRequired: "Trebuie să confirmați parola",
      passwordMismatch: "Parolele nu se potrivesc",
      submitError: "Eroare la procesarea cererii. Încercați din nou."
    }
  },
  common: {
    close: "Închide",
    loading: "Se încarcă...",
    error: "Eroare"
  }
};

//===============================================
//🇵🇱 TRADUCCIONES POLACO
//===============================================
const plTranslations = {
  nav: {
    properties: "Nieruchomości",
    experiences: "Doświadczenia",
    services: "Usługi",
    contact: "Kontakt",
    login: "Zaloguj"
  },
  hero: {
    title: "Odkryj Kantabrię",
    subtitle: "Ekskluzywne nieruchomości i premium doświadczenia",
    cta: "Przeglądaj nieruchomości"
  },
  auth: {
    loginTitle: "Zaloguj się",
    registerTitle: "Utwórz konto",
    email: "Email",
    password: "Hasło",
    confirmPassword: "Potwierdź hasło",
    loginButton: "Zaloguj",
    registerButton: "Zarejestruj",
    switchToRegister: "Nie masz konta? Zarejestruj się",
    switchToLogin: "Masz już konto? Zaloguj się",
    errors: {
      emailRequired: "Email jest wymagany",
      emailInvalid: "Wprowadź prawidłowy adres email",
      passwordRequired: "Hasło jest wymagane",
      passwordWeak: "Hasło musi mieć co najmniej 8 znaków",
      confirmPasswordRequired: "Musisz potwierdzić hasło",
      passwordMismatch: "Hasła się nie zgadzają",
      submitError: "Błąd przetwarzania żądania. Spróbuj ponownie."
    }
  },
  common: {
    close: "Zamknij",
    loading: "Ładowanie...",
    error: "Błąd"
  }
};

//===============================================
//🇺🇦 TRADUCCIONES UCRANIANO
//===============================================
const ukTranslations = {
  nav: {
    properties: "Нерухомість",
    experiences: "Досвід",
    services: "Послуги",
    contact: "Контакти",
    login: "Увійти"
  },
  hero: {
    title: "Відкрийте Кантабрію",
    subtitle: "Ексклюзивна нерухомість та преміум досвід",
    cta: "Переглянути нерухомість"
  },
  auth: {
    loginTitle: "Увійти в акаунт",
    registerTitle: "Створити акаунт",
    email: "Електронна пошта",
    password: "Пароль",
    confirmPassword: "Підтвердити пароль",
    loginButton: "Увійти",
    registerButton: "Реєстрація",
    switchToRegister: "Немає акаунту? Зареєструватися",
    switchToLogin: "Вже є акаунт? Увійти",
    errors: {
      emailRequired: "Email обов'язковий",
      emailInvalid: "Введіть правильний email",
      passwordRequired: "Пароль обов'язковий",
      passwordWeak: "Пароль повинен містити мінімум 8 символів",
      confirmPasswordRequired: "Підтвердіть пароль",
      passwordMismatch: "Паролі не збігаються",
      submitError: "Помилка обробки запиту. Спробуйте знову."
    }
  },
  common: {
    close: "Закрити",
    loading: "Завантаження...",
    error: "Помилка"
  }
};

//===============================================
//🇲🇰 TRADUCCIONES MACEDONIO (NUEVO)
//===============================================
const mkTranslations = {
  nav: {
    properties: "Недвижности",
    experiences: "Искуства",
    services: "Услуги",
    contact: "Контакт",
    login: "Најави се"
  },
  hero: {
    title: "Откријте ја Кантабрија",
    subtitle: "Ексклузивни недвижности и премиум искуства",
    cta: "Истражете недвижности"
  },
  auth: {
    loginTitle: "Пристапете на вашата сметка",
    registerTitle: "Создајте сметка",
    email: "Е-пошта",
    password: "Лозинка",
    confirmPassword: "Потврдете лозинка",
    loginButton: "Најави се",
    registerButton: "Регистрирај се",
    switchToRegister: "Немате сметка? Регистрирајте се",
    switchToLogin: "Веќе имате сметка? Најавете се",
    errors: {
      emailRequired: "Е-поштата е задолжителна",
      emailInvalid: "Внесете валидна е-пошта",
      passwordRequired: "Лозинката е задолжителна",
      passwordWeak: "Лозинката мора да има најмалку 8 карактери",
      confirmPasswordRequired: "Мора да ја потврдите лозинката",
      passwordMismatch: "Лозинките не се совпаѓаат",
      submitError: "Грешка при обработка. Обидете се повторно."
    }
  },
  common: {
    close: "Затвори",
    loading: "Се вчитува...",
    error: "Грешка"
  }
};

//===============================================
//🇩🇪 TRADUCCIONES ALEMÁN
//===============================================
const deTranslations = {
  nav: {
    properties: "Immobilien",
    experiences: "Erlebnisse",
    services: "Dienstleistungen",
    contact: "Kontakt",
    login: "Anmelden"
  },
  hero: {
    title: "Entdecke Kantabrien",
    subtitle: "Exklusive Immobilien und Premium-Erlebnisse",
    cta: "Immobilien erkunden"
  },
  auth: {
    loginTitle: "Auf Ihr Konto zugreifen",
    registerTitle: "Konto erstellen",
    email: "E-Mail",
    password: "Passwort",
    confirmPassword: "Passwort bestätigen",
    loginButton: "Anmelden",
    registerButton: "Registrieren",
    switchToRegister: "Noch kein Konto? Registrieren",
    switchToLogin: "Bereits ein Konto? Anmelden",
    errors: {
      emailRequired: "E-Mail ist erforderlich",
      emailInvalid: "Bitte geben Sie eine gültige E-Mail ein",
      passwordRequired: "Passwort ist erforderlich",
      passwordWeak: "Passwort muss mindestens 8 Zeichen haben",
      confirmPasswordRequired: "Sie müssen Ihr Passwort bestätigen",
      passwordMismatch: "Passwörter stimmen nicht überein",
      submitError: "Fehler bei der Verarbeitung. Bitte versuchen Sie es erneut."
    }
  },
  common: {
    close: "Schließen",
    loading: "Wird geladen...",
    error: "Fehler"
  }
};

//===============================================
//🇫🇷 TRADUCCIONES FRANCÉS
//===============================================
const frTranslations = {
  nav: {
    properties: "Propriétés",
    experiences: "Expériences",
    services: "Services",
    contact: "Contact",
    login: "Se connecter"
  },
  hero: {
    title: "Découvrez la Cantabrie",
    subtitle: "Propriétés exclusives et expériences premium",
    cta: "Explorer les propriétés"
  },
  auth: {
    loginTitle: "Accédez à votre compte",
    registerTitle: "Créer un compte",
    email: "E-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    loginButton: "Se connecter",
    registerButton: "S'inscrire",
    switchToRegister: "Pas de compte? S'inscrire",
    switchToLogin: "Déjà un compte? Se connecter",
    errors: {
      emailRequired: "L'e-mail est requis",
      emailInvalid: "Veuillez saisir un e-mail valide",
      passwordRequired: "Le mot de passe est requis",
      passwordWeak: "Le mot de passe doit contenir au moins 8 caractères",
      confirmPasswordRequired: "Vous devez confirmer votre mot de passe",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      submitError: "Erreur de traitement. Veuillez réessayer."
    }
  },
  common: {
    close: "Fermer",
    loading: "Chargement...",
    error: "Erreur"
  }
};

//===============================================
//🇮🇹 TRADUCCIONES ITALIANO
//===============================================
const itTranslations = {
  nav: {
    properties: "Proprietà",
    experiences: "Esperienze",
    services: "Servizi",
    contact: "Contatto",
    login: "Accedi"
  },
  hero: {
    title: "Scopri la Cantabria",
    subtitle: "Proprietà esclusive ed esperienze premium",
    cta: "Esplora proprietà"
  },
  auth: {
    loginTitle: "Accedi al tuo account",
    registerTitle: "Crea account",
    email: "E-mail",
    password: "Password",
    confirmPassword: "Conferma password",
    loginButton: "Accedi",
    registerButton: "Registrati",
    switchToRegister: "Non hai un account? Registrati",
    switchToLogin: "Hai già un account? Accedi",
    errors: {
      emailRequired: "L'e-mail è obbligatoria",
      emailInvalid: "Inserisci un'e-mail valida",
      passwordRequired: "La password è obbligatoria",
      passwordWeak: "La password deve contenere almeno 8 caratteri",
      confirmPasswordRequired: "Devi confermare la password",
      passwordMismatch: "Le password non corrispondono",
      submitError: "Errore di elaborazione. Riprova."
    }
  },
  common: {
    close: "Chiudi",
    loading: "Caricamento...",
    error: "Errore"
  }
};

//===============================================
//🇵🇹 TRADUCCIONES PORTUGUÉS
//===============================================
const ptTranslations = {
  nav: {
    properties: "Propriedades",
    experiences: "Experiências",
    services: "Serviços",
    contact: "Contato",
    login: "Entrar"
  },
  hero: {
    title: "Descubra a Cantábria",
    subtitle: "Propriedades exclusivas e experiências premium",
    cta: "Explorar propriedades"
  },
  auth: {
    loginTitle: "Acesse sua conta",
    registerTitle: "Criar conta",
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirmar senha",
    loginButton: "Entrar",
    registerButton: "Registrar",
    switchToRegister: "Não tem conta? Registre-se",
    switchToLogin: "Já tem conta? Entre",
    errors: {
      emailRequired: "E-mail é obrigatório",
      emailInvalid: "Digite um e-mail válido",
      passwordRequired: "Senha é obrigatória",
      passwordWeak: "A senha deve ter pelo menos 8 caracteres",
      confirmPasswordRequired: "Você deve confirmar sua senha",
      passwordMismatch: "As senhas não coincidem",
      submitError: "Erro no processamento. Tente novamente."
    }
  },
  common: {
    close: "Fechar",
    loading: "Carregando...",
    error: "Erro"
  }
};

//===============================================
//🇳🇱 TRADUCCIONES HOLANDÉS
//===============================================
const nlTranslations = {
  nav: {
    properties: "Eigendommen",
    experiences: "Ervaringen",
    services: "Diensten",
    contact: "Contact",
    login: "Inloggen"
  },
  hero: {
    title: "Ontdek Cantabrië",
    subtitle: "Exclusieve eigendommen en premium ervaringen",
    cta: "Verken eigendommen"
  },
  auth: {
    loginTitle: "Toegang tot uw account",
    registerTitle: "Account aanmaken",
    email: "E-mail",
    password: "Wachtwoord",
    confirmPassword: "Wachtwoord bevestigen",
    loginButton: "Inloggen",
    registerButton: "Registreren",
    switchToRegister: "Geen account? Registreer",
    switchToLogin: "Al een account? Inloggen",
    errors: {
      emailRequired: "E-mail is vereist",
      emailInvalid: "Voer een geldig e-mailadres in",
      passwordRequired: "Wachtwoord is vereist",
      passwordWeak: "Wachtwoord moet minstens 8 karakters hebben",
      confirmPasswordRequired: "U moet uw wachtwoord bevestigen",
      passwordMismatch: "Wachtwoorden komen niet overeen",
      submitError: "Verwerkingsfout. Probeer opnieuw."
    }
  },
  common: {
    close: "Sluiten",
    loading: "Laden...",
    error: "Fout"
  }
};

//===============================================
//🛠️ DETECTOR DE IDIOMA PERSONALIZADO
//===============================================
const customDetector = {
  name: 'novaterraDetector',
  lookup: () => {
    const storedLang = localStorage.getItem('novaterra-language');
    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
      return storedLang;
    }
    
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang;
    }
    
    return 'es';
  },
  cacheUserLanguage: (lng) => {
    if (SUPPORTED_LANGUAGES.includes(lng)) {
      localStorage.setItem('novaterra-language', lng);
    }
  }
};

//===============================================
//⚙️ INICIALIZACIÓN DEL SISTEMA I18N
//===============================================
i18n
  .use({
    type: 'languageDetector',
    detect: customDetector.lookup,
    init: () => {},
    cacheUserLanguage: customDetector.cacheUserLanguage
  })
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: esTranslations },
      en: { translation: enTranslations },
      ru: { translation: ruTranslations },
      ro: { translation: roTranslations },
      pl: { translation: plTranslations },
      uk: { translation: ukTranslations },
      mk: { translation: mkTranslations }, // MACEDONIO
      de: { translation: deTranslations }, // ALEMÁN
      fr: { translation: frTranslations }, // FRANCÉS
      it: { translation: itTranslations }, // ITALIANO
      pt: { translation: ptTranslations }, // PORTUGUÉS
      nl: { translation: nlTranslations }  // HOLANDÉS
    },
    
    fallbackLng: 'es',
    lng: validateLanguage(customDetector.lookup()),
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: true,
      formatSeparator: ',',
      format: (value, format) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      }
    },
    
    react: {
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: false,
      transKeepBasicHtmlNodesFor: [],
      useSuspense: true
    },
    
    load: 'languageOnly',
    cleanCode: true,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'novaterra-language',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode']
    }
  });

//===============================================
//🔧 FUNCIÓN HELPER MEJORADA
//===============================================
export const changeLanguageSafely = (newLang) => {
  const validLang = validateLanguage(newLang);
  if (validLang !== newLang) {
    console.warn(`Idioma ${newLang} no soportado, usando ${validLang}`);
  }
  return i18n.changeLanguage(validLang);
};

//===============================================
//📤 EXPORTACIONES
//===============================================
export { SUPPORTED_LANGUAGES };
export default i18n;