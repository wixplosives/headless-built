import { createBoard } from '@wixc3/react-board';
import { SectionWrapper } from '../../board-wrappers/dynamic-page-wrapper-real-data';

export default createBoard({
    name: 'SinglePageRenderer',
    Board: () => <SectionWrapper />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 829,
        windowWidth: 934,
    },
});
