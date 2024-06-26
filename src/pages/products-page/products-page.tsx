import classNames from 'classnames';
import styles from './products-page.module.scss';
import { products } from '@wix/stores';
import { useState, useContext, useEffect } from 'react';
import { WixAPIContext } from '../../api/WixAPIContextProvider';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/config';
import { ProductCard } from '../../components/product-card/product-card';

export interface ProductsPageProps {
    className?: string;
}

export const ProductsPage = ({ className }: ProductsPageProps) => {
    const [myProducts, setMyProducts] = useState<products.Product[]>([]);

    const wixApi = useContext(WixAPIContext);

    useEffect(() => {
        wixApi.getAllProducts().then((products) => {
            setMyProducts(products);
        });
    }, [wixApi]);
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.title}>All Products</div>
            <div className={styles.gallery}>
                {myProducts.map(
                    (item) =>
                        item._id &&
                        item.name && (
                            <Link to={ROUTES.product.to(item._id)} key={item._id}>
                                <ProductCard
                                    imageUrl={item.media?.items?.at(0)?.image?.url}
                                    name={item.name}
                                    price={item.price ?? undefined}
                                    className={styles.productCard}
                                />
                            </Link>
                        ),
                )}
            </div>
        </div>
    );
};
