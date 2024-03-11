import classNames from 'classnames';
import styles from './home-page.module.scss';
import { HeroImage } from './hero-image/hero-image';
import { ROUTES } from '../../router/config';
import { products } from '@wix/stores';
import { useContext, useEffect, useState } from 'react';
import { WixAPIContext } from '../../api/WixAPIContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/product-card/product-card';
import { BlocksRenderer } from '../../blocks/blocks-renderer';
import { type items } from '@wix/data';
import { SingleSectionRenderer } from '../../_codux/board-wrappers/section-wrapper-real-data';
import { SinglePageRenderer } from '../../_codux/board-wrappers/dynamic-page-wrapper-real-data';
export interface HomePageProps {
    className?: string;
}

export const HomePage = ({ className }: HomePageProps) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Array<products.Product>>([]);
    const [pages, setPages] = useState<Array<{ _id: string }>>([]);
    const [pageData, setPageData] = useState<Array<items.DataItem>>([]);

    const wixApi = useContext(WixAPIContext);

    useEffect(() => {
        wixApi.getPromotedProducts().then((prods) => {
            setProducts(prods);
        });
        wixApi.getPages().then((pages) => {
            setPages(pages.items as any);
        });
    }, [wixApi]);

    useEffect(() => {
        if (pages.length > 0) {
            wixApi.getPageData(pages[0]._id).then((data) => {
                setPageData(data.items);
            });
        }
    }, [pages, wixApi]);

    return (
        <div className={classNames(styles.root, className)}>
            <SinglePageRenderer />

            <div className={styles['hero-paragraph']}>
                <HeroImage
                    title="Incredible Prices on All Your Favorite Items"
                    topLabel="Best Prices"
                    bottomLabel="Get more for less on selected brands"
                    primaryButtonLabel="Shop Now"
                    topLabelClassName={styles['top-label-highlighted']}
                    onPrimaryButtonClick={() => navigate(ROUTES.products.to())}
                />
                <h1 className={styles['hero-title']}>
                    Heading 1<p className={styles.HPprgrp}>This is a paragraph.</p>
                </h1>
            </div>
            <div className={styles.cardsLayout}>
                {products.map((product) =>
                    product._id && product.name ? (
                        <Link to={ROUTES.product.to(product._id)} key={product._id}>
                            <ProductCard
                                imageUrl={product.media?.items?.at(0)?.image?.url}
                                name={product.name}
                                price={product.price ?? undefined}
                            />
                        </Link>
                    ) : null
                )}
            </div>
        </div>
    );
};
