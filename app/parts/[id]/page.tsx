
import ProductDetail from './ProductDetail';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <ProductDetail productId={id} />;
}
