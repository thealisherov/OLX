import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Heart, MessageSquare, Phone, MapPin, Share2 } from 'lucide-react';
import api from '../api/client';

function ProductDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const res = await api.get(`/products/${id}/`);
        return res.data;
      } catch {
        return {
          id,
          title: `Amazing Product ${id}`,
          description: "This is a detailed description of the product. It has many features and benefits. You should definitely consider buying this because it's rare and well priced. The condition is excellent, almost like new.",
          price: "1,299.00",
          location: "Tashkent, Yunusabad District",
          createdAt: new Date().toLocaleDateString(),
          seller: {
            name: "John Doe",
            registered: "Jan 2022"
          },
          images: [null, null, null]
        };
      }
    }
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-96 bg-secondary rounded-2xl w-full max-w-4xl mx-auto" />
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="h-8 bg-secondary rounded w-1/3" />
          <div className="h-6 bg-secondary rounded w-1/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Images & Details */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-[4/3] bg-secondary relative flex items-center justify-center">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-muted-foreground text-lg">No image available</span>
            )}

            <button className="absolute top-4 right-4 p-3 bg-background/80 hover:bg-background rounded-full backdrop-blur transition-colors">
              <Heart className="h-6 w-6 text-muted-foreground hover:text-red-500" />
            </button>
          </div>

          <div className="flex gap-2 p-4 overflow-x-auto bg-muted/30">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="h-20 w-24 shrink-0 bg-secondary rounded-lg border-2 border-transparent hover:border-primary cursor-pointer transition-colors" />
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">{product.title}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {product.location} • Posted {product.createdAt}
            </p>
          </div>

          <h2 className="text-4xl font-extrabold text-primary">${product.price}</h2>

          <div className="pt-6 border-t">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Seller & Actions */}
      <div className="space-y-6">
        <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-6">
          <h3 className="text-xl font-semibold mb-4">Seller Information</h3>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold">
              {product.seller?.name?.[0] || 'S'}
            </div>
            <div>
              <p className="font-semibold text-lg">{product.seller?.name}</p>
              <p className="text-sm text-muted-foreground">On OLX since {product.seller?.registered}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
              <Phone className="h-5 w-5" />
              {t('contact_seller')}
            </button>
            <button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
              <MessageSquare className="h-5 w-5" />
              Message
            </button>
            <button className="w-full border hover:bg-muted text-foreground py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
              <Share2 className="h-5 w-5" />
              Share Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
