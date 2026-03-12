import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

function Profile() {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('ads');

  const mockUser = user || {
    name: 'Dilshod',
    email: 'dilshod@example.com',
    phone: '+998 90 123 45 67',
    avatar: 'https://placehold.co/100x100/png?text=D'
  };

  const tabs = [
    { id: 'ads', label: 'My Ads', icon: Package },
    { id: 'favorites', label: t('favorites'), icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-80 shrink-0">
        <div className="bg-card border rounded-2xl p-6 mb-6 shadow-sm flex flex-col items-center">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-24 h-24 rounded-full mb-4 border-4 border-primary/20"
          />
          <h2 className="text-xl font-bold">{mockUser.name}</h2>
          <p className="text-muted-foreground text-sm mb-6">{mockUser.email}</p>

          <button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2 rounded-lg text-sm font-medium transition-colors">
            Edit Profile
          </button>
        </div>

        <nav className="bg-card border rounded-2xl overflow-hidden shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted transition-colors ${
                  activeTab === tab.id ? 'bg-muted text-primary border-l-4 border-l-primary' : 'text-foreground border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 text-destructive hover:bg-destructive/10 transition-colors border-l-4 border-l-transparent"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">{t('logout')}</span>
            </div>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-card border rounded-2xl p-6 min-h-[500px] shadow-sm">
          <h2 className="text-2xl font-bold mb-6 capitalize">{activeTab.replace('-', ' ')}</h2>

          {activeTab === 'ads' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map(i => (
                <ProductCard
                  key={i}
                  product={{
                    id: i + 500,
                    title: `My Item ${i}`,
                    description: "Selling my item. Good condition.",
                    price: "150.00",
                    location: "Tashkent"
                  }}
                />
              ))}

              <div className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer min-h-[300px]">
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-2xl font-bold text-primary">+</div>
                <p className="font-medium">Post a new ad</p>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <ProductCard
                  key={i}
                  product={{
                    id: i + 600,
                    title: `Saved Item ${i}`,
                    description: "Saved this item for later.",
                    price: "450.00",
                    location: "Samarkand"
                  }}
                />
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-md space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" defaultValue={mockUser.name} className="w-full p-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" defaultValue={mockUser.email} className="w-full p-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="tel" defaultValue={mockUser.phone} className="w-full p-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
