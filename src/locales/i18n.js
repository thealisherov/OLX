import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "categories": "Categories",
      "favorites": "Favorites",
      "profile": "Profile",
      "login": "Login",
      "logout": "Logout",
      "search_placeholder": "Search for items...",
      "recent_ads": "Recent Ads",
      "post_ad": "Post Ad",
      "price": "Price",
      "contact_seller": "Contact Seller",
      "language": "Language",
      "theme": "Theme",
      "no_products": "No products found."
    }
  },
  ru: {
    translation: {
      "home": "Главная",
      "categories": "Категории",
      "favorites": "Избранное",
      "profile": "Профиль",
      "login": "Войти",
      "logout": "Выйти",
      "search_placeholder": "Поиск объявлений...",
      "recent_ads": "Свежие объявления",
      "post_ad": "Подать объявление",
      "price": "Цена",
      "contact_seller": "Связаться с продавцом",
      "language": "Язык",
      "theme": "Тема",
      "no_products": "Товары не найдены."
    }
  },
  uz: {
    translation: {
      "home": "Asosiy",
      "categories": "Kategoriyalar",
      "favorites": "Sevimlilar",
      "profile": "Profil",
      "login": "Kirish",
      "logout": "Chiqish",
      "search_placeholder": "E'lonlarni qidirish...",
      "recent_ads": "Yangi e'lonlar",
      "post_ad": "E'lon berish",
      "price": "Narxi",
      "contact_seller": "Sotuvchi bilan bog'lanish",
      "language": "Til",
      "theme": "Mavzu",
      "no_products": "Mahsulotlar topilmadi."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
