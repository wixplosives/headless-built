import classNames from 'classnames';
import styles from './home-page.module.scss';
import { HeroImage } from './hero-image/hero-image';
import { ROUTES } from '../../router/config';
import { products } from '@wix/stores';
import { useContext, useEffect, useState } from 'react';
import { WixAPIContext } from '../../api/WixAPIContextProvider';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/product-card/product-card';

export interface HomePageProps {
    className?: string;
}

export const HomePage = ({ className }: HomePageProps) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Array<products.Product>>([]);

    const wixApi = useContext(WixAPIContext);

    useEffect(() => {
        wixApi.getPromotedProducts().then((prods) => {
            setProducts(prods);
        });
    }, [wixApi]);

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles['top-banner']}>
                <HeroImage
                    title="Incredible Prices on All Your Favorite Items"
                    topLabel="Best Prices"
                    bottomLabel="Get more for less on selected brands"
                    primaryButtonLabel="Shop Now"
                    topLabelClassName={styles['top-label-highlighted']}
                    onPrimaryButtonClick={() => navigate(ROUTES.products.to())}
                    imageUrl="https://static.wixstatic.com/media/c22c23_e140bfa8cd6f4cb2ac5ee6e204f64073~mv2.jpg"
                />
                <h1>
                    <p>This is a paragraph.</p>Heading 1
                </h1>
            </div>
            {products?.[0]?._id && products?.[1]?._id && (
                <div className={styles['two-hero-images']}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            )}
        </div>
    );
};
