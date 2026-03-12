import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

function ProductCard({ product }) {
  return (
    <div className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image || 'https://placehold.co/400x400/png?text=No+Image'}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-5 w-5 text-muted-foreground hover:text-red-500 cursor-pointer" />
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-bold text-lg text-primary">${product.price}</span>
          <span className="text-xs text-muted-foreground">{product.location || 'Tashkent'}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
