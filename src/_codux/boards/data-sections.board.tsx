import { createBoard } from '@wixc3/react-board';
import { SectionWrapper } from '../board-wrappers/section-wrapper-real-data';

export default createBoard({
    name: 'Data Sections',
    Board: () => <SectionWrapper />,
    isSnippet: false,
    environmentProps: {
        canvasWidth: 629,
    },
});
