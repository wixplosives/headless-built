import { createBoard } from '@wixc3/react-board';
import { PageWrapper } from '../../../board-wrappers/page-wrapper';
import { ProductsPage } from '../../../../pages/products-page/products-page';

export default createBoard({
    name: 'Products Page',
    Board: () => (
        <PageWrapper>
            <ProductsPage />
        </PageWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
    },
});
