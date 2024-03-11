import { createBoard } from '@wixc3/react-board';
import { SinglePageRenderer } from '../../board-wrappers/dynamic-page-wrapper-real-data';

export default createBoard({
    name: 'SinglePageRenderer',
    Board: () => <SinglePageRenderer />,
    isSnippet: true,
});