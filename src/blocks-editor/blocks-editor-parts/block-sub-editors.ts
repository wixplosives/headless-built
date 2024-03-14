import { BlockEditor } from './block-editor-types';

export const blockEditors: Record<string, BlockEditor> = {
    hero: {
        icon: '🦸',
        title: 'Hero',
        description: 'A hero block',
        defaultData: {
            title: 'Title',
            text: 'Text',
            image: 'Image',
            url: 'URL',
            tags: ['tag1', 'tag2'],
        },
    },
    paragraph: {
        icon: '📝',
        title: 'Paragraph',
        description: 'A paragraph block',
        defaultData: {
            text: 'Text',
        },
    },
};
