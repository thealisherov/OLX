import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../api/client';

function Home() {
  const { t } = useTranslation();

  // Mock data fetching or real if API is up
  const { data: categories, isLoading: catsLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const res = await api.get('/categories/');
        return res.data;
      } catch {
        return [
          { id: 1, name: 'Electronics', slug: 'electronics' },
          { id: 2, name: 'Vehicles', slug: 'vehicles' },
          { id: 3, name: 'Real Estate', slug: 'real-estate' },
          { id: 4, name: 'Jobs', slug: 'jobs' },
        ];
      }
    }
  });

  const { data: products, isLoading: prodsLoading } = useQuery({
    queryKey: ['recent-products'],
    queryFn: async () => {
      try {
        const res = await api.get('/products/');
        return res.data;
      } catch {
        return Array.from({ length: 8 }).map((_, i) => ({
          id: i + 1,
          title: `Sample Product ${i + 1}`,
          description: 'This is a great product that you will love.',
          price: (Math.random() * 1000).toFixed(2),
          location: 'Tashkent'
        }));
      }
    }
  });

  return (
    <div className="space-y-12">
      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t('categories')}</h2>
        {catsLoading ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-32 w-32 shrink-0 bg-secondary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {categories?.map(category => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group flex flex-col items-center justify-center h-32 w-32 shrink-0 bg-card border rounded-xl hover:border-primary hover:shadow-md transition-all snap-start"
              >
                <div className="h-12 w-12 bg-secondary rounded-full mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-center px-2">{category.name}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recent Ads Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t('recent_ads')}</h2>
        {prodsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square bg-secondary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
