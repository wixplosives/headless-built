import { currentCart } from '@wix/ecom';
import { OAuthStrategy, createClient } from '@wix/sdk';
import { collections, items } from '@wix/data';
import { products } from '@wix/stores';
import React, { FC, useMemo } from 'react';
import { blockRenderers } from '../blocks/blocks';

// const refreshToken = JSON.parse(Cookies.get(WIX_REFRESH_TOKEN) || '{}');

function getWixClient() {
    return createClient({
        modules: {
            products,
            currentCart,
            collections,
            items,
        },
        auth: OAuthStrategy({
            clientId: '3b03f31c-e5fc-4251-a9b8-4a2f749042b4',
            // tokens: { refreshToken, accessToken: { value: '', expiresAt: 0 } },
        }),
    });
}
const rendererToTableName = {
    hero: 'HeroSectionData',
    paragraph: 'Paragraphs',
};

function getWixApi(wixClient: ReturnType<typeof getWixClient>) {
    return {
        getAllProducts: async () => {
            return (await wixClient.products.queryProducts().find()).items;
        },
        getPromotedProducts: async () => {
            return (await wixClient.products.queryProducts().limit(4).find()).items;
        },
        getProduct: async (id: string | undefined) => {
            return id
                ? (await wixClient.products.queryProducts().eq('_id', id).limit(1).find()).items[0]
                : undefined;
        },
        getCart: () => {
            return wixClient.currentCart.getCurrentCart();
        },
        updateCartItemQuantity: (id: string | undefined | null, quantity: number) => {
            return wixClient.currentCart.updateCurrentCartLineItemQuantity([
                {
                    _id: id || undefined,
                    quantity,
                },
            ]);
        },
        removeItemFromCart: (id: string) => {
            return wixClient.currentCart.removeLineItemsFromCurrentCart([id]);
        },
        addToCart: (id: string) => {
            return wixClient.currentCart.addToCurrentCart({
                lineItems: [
                    {
                        catalogReference: {
                            catalogItemId: id,
                            appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        },
                        quantity: 1,
                    },
                ],
            });
        },
        getPages: () => {
            return wixClient.items.queryDataItems({ dataCollectionId: 'Pages' }).find();
        },
        getPageData: (id: string) => {
            return wixClient.items
                .queryDataItems({
                    dataCollectionId: 'blocks',
                    includeReferencedItems: ['hero', 'paragraph'],
                    returnTotalCount: true,
                    consistentRead: true,
                })
                .eq('Pages_content', id)
                .find();
        },
        getBlocksOfType: (type: keyof typeof blockRenderers, limit = 50, skip = 0) => {
            return wixClient.items
                .queryDataItems({
                    dataCollectionId: rendererToTableName[type],
                    returnTotalCount: true,
                    consistentRead: true,
                })
                .skip(skip)
                .limit(limit)
                .find();
        },
    };
}

export type WixAPI = ReturnType<typeof getWixApi>;

export const WixAPIContext = React.createContext<ReturnType<typeof getWixApi>>(
    {} as ReturnType<typeof getWixApi>
);

export const WixAPIContextProvider: FC<{ children: React.ReactElement }> = ({ children }) => {
    const wixClient = useMemo(() => {
        return getWixClient();
    }, []);

    const api = useMemo(() => {
        return getWixApi(wixClient);
    }, [wixClient]);

    return <WixAPIContext.Provider value={api}>{children}</WixAPIContext.Provider>;
};
