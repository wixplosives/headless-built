import classNames from 'classnames';
import styles from './header.module.scss';
import { ROUTES } from '../../router/config';
import { Cart } from '../cart/cart';
import { Link } from 'react-router-dom';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { WixAPIContext } from '../../api/WixAPIContextProvider';
import { type items } from '@wix/data';
export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const [pages, setPages] = useState<Array<items.DataItem>>([]);
    const wixApi = useContext(WixAPIContext);
    useEffect(() => {
        wixApi.getPages().then((pages) => {
            setPages(pages.items as any);
        });
    }, [wixApi]);

    return (
        <div className={classNames(styles.root, className)}>
            <Link to="/" className={styles.logo}>
                LOGO
            </Link>
            <div className={styles.menu}>
                <Link to="/" className={CommonStyles_module.primaryButton}>
                    Home
                </Link>
                <Link to={ROUTES.products.to()} className={CommonStyles_module.primaryButton}>
                    Products
                </Link>
                <Link to={ROUTES.about.to()} className={CommonStyles_module.primaryButton}>
                    About
                </Link>
                <Cart />
                {pages.map((page) => (
                    <Link
                        key={page._id}
                        to={page.data?.route}
                        className={CommonStyles_module.primaryButton}
                    >
                        {page.data?.pageName}
                    </Link>
                ))}
            </div>
        </div>
    );
};
