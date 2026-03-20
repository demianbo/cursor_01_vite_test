import { ProductCard } from "@/components";
import type { ProductCardProps } from "@/components";

type DemoProduct = ProductCardProps["product"];

const mockProducts: Array<{
  product: DemoProduct;
  onAddToCart?: () => void;
  inStock?: boolean;
  scenario: string;
}> = [
  // 1. Ideal State: All props fully populated
  {
    product: {
      id: "1",
      title: "Wireless Bluetooth Headphones",
      price: 79.99,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      imageAlt: "Wireless headphones with premium sound",
      rating: 4.5,
      currencyCode: "USD",
    },
    onAddToCart: () => alert("Added: Wireless Bluetooth Headphones"),
    inStock: true,
    scenario: "Ideal State",
  },
  // 2. Missing Optional Data: Omit optional fields
  {
    product: {
      id: "2",
      title: "Minimal Product",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      // imageAlt, rating, currencyCode omitted - fallbacks apply
    },
    onAddToCart: () => alert("Added: Minimal Product"),
    inStock: true,
    scenario: "Missing Optional",
  },
  // 3. Text Overflow: Extremely long title
  {
    product: {
      id: "3",
      title:
        "Premium Ultra Deluxe Professional Grade Wireless Noise-Cancelling Over-Ear Headphones with Extended Battery Life and Premium Leather Ear Cushions for Maximum Comfort During Long Listening Sessions",
      price: 349.99,
      imageUrl:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
      imageAlt: "Premium headphones",
      rating: 5,
      currencyCode: "USD",
    },
    onAddToCart: () => alert("Added: Long title product"),
    inStock: true,
    scenario: "Text Overflow",
  },
  // 4. State Variation: Out of stock (inStock: false)
  {
    product: {
      id: "4",
      title: "Limited Edition Watch",
      price: 199.99,
      imageUrl:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
      imageAlt: "Limited edition watch",
      rating: 4.2,
      currencyCode: "USD",
    },
    onAddToCart: () => alert("Added"),
    inStock: false,
    scenario: "Out of Stock",
  },
  // 5. State Variation: No callback (button disabled)
  {
    product: {
      id: "5",
      title: "Coming Soon Item",
      price: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      imageAlt: "Placeholder for upcoming product",
      rating: 0,
      currencyCode: "USD",
    },
    // onAddToCart omitted - button disabled
    inStock: true,
    scenario: "No Add Handler",
  },
  // 6. Different currency
  {
    product: {
      id: "6",
      title: "Designer Sunglasses",
      price: 89.5,
      imageUrl:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      imageAlt: "Designer sunglasses",
      rating: 4.8,
      currencyCode: "EUR",
    },
    onAddToCart: () => alert("Added: Designer Sunglasses"),
    inStock: true,
    scenario: "EUR Currency",
  },
];

export function ProductDemoPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            ProductCard Component Showcase
          </h1>
          <p className="mt-2 text-gray-600">
            Responsive grid demonstrating UI resilience across different data
            conditions and edge cases.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map(({ product, onAddToCart, inStock, scenario }) => (
            <div key={product.id} className="flex flex-col">
              <span className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                {scenario}
              </span>
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                inStock={inStock}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
