import ProductCard from "./product-card";
import { Product } from "@/app/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductList = ({ data, title,limit }: { data: Product[]; title?: string,limit?:number}) => {

    const limitedData = limit ? data.slice(0,limit):data;

  return (
    <div className="my-10">
      {title && <h2 className="h2-bold mb-4 text-2xl font-bold">{title}</h2>}
      
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitedData.map((product:Product) => (
            <ProductCard
            key={product.id || product.slug || product.name} 
            product={product}>
             </ProductCard>
            
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;