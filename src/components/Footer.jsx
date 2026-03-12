import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OLX Clone. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">{t('home')}</a>
            <a href="#" className="hover:text-primary transition-colors">{t('categories')}</a>
            <a href="#" className="hover:text-primary transition-colors">Help & Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
