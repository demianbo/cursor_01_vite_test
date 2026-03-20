export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    imageAlt?: string;
    rating?: number;
    currencyCode?: string;
  };
  onAddToCart?: () => void;
  inStock?: boolean;
}

function formatPrice(amount: number, currencyCode = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${filled ? "text-amber-400" : "text-gray-200"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, rating));
  const fullStars = Math.round(clamped);

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < fullStars} />
      ))}
    </div>
  );
}

export function ProductCard({ product, onAddToCart, inStock = true }: ProductCardProps) {
  const rating = product.rating ?? 0;
  const canAddToCart = inStock && onAddToCart;

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {!inStock && (
          <span
            className="absolute left-3 top-3 rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-white"
            aria-label="Out of stock"
          >
            Out of Stock
          </span>
        )}
        <img
          src={product.imageUrl}
          alt={product.imageAlt ?? product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={400}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-medium text-gray-900 sm:text-lg">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          {rating > 0 ? (
            <StarRating rating={rating} />
          ) : (
            <span className="text-sm text-gray-400" aria-hidden="true">
              No rating
            </span>
          )}
        </div>

        <p className="mt-2 text-lg font-semibold text-gray-900">
          {formatPrice(product.price, product.currencyCode)}
        </p>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={onAddToCart}
            disabled={!canAddToCart}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-indigo-600"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
