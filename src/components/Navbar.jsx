import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Search, User } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
            OLX Clone
          </Link>
          <div className="hidden md:flex relative w-96">
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full bg-secondary text-secondary-foreground rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-secondary rounded-lg px-2 py-1">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              className="bg-transparent text-sm focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
            </select>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label={t('theme')}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 hover:text-primary transition-colors">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">{t('profile')}</span>
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium hover:text-destructive transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <button className="text-sm font-medium hover:text-primary transition-colors">
              {t('login')}
            </button>
          )}

          <Link
            to="/post"
            className="hidden sm:block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {t('post_ad')}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
