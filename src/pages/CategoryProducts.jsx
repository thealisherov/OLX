import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import api from '../api/client';

function CategoryProducts() {
  const { slug } = useParams();
  const { t } = useTranslation();

  const { data: products, isLoading } = useQuery({
    queryKey: ['category-products', slug],
    queryFn: async () => {
      try {
        const res = await api.get(`/categories/${slug}/products/`);
        return res.data;
      } catch {
        // Fallback for demonstration
        return Array.from({ length: 6 }).map((_, i) => ({
          id: i + 100,
          title: `${slug.toUpperCase()} Item ${i + 1}`,
          description: `Great deal in ${slug}`,
          price: (Math.random() * 500).toFixed(2),
          location: 'Samarkand'
        }));
      }
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 capitalize text-primary">{slug.replace('-', ' ')} {t('categories')}</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-secondary/30 rounded-2xl border border-dashed">
          <p className="text-xl">{t('no_products')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
