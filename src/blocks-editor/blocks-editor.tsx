import { blockRenderers } from '../blocks/blocks';
import { type items } from '@wix/data';
import { NewBlockButton } from './blocks-editor-parts/new-block-button';
import { useMemo, useReducer } from 'react';
import React from 'react';
import { blockEditors } from './blocks-editor-parts/block-sub-editors';
import { ReactComponent as EditSvg } from './icons/edit.svg';
import { ReactComponent as DeleteSvg } from './icons/delete.svg';
import { ReactComponent as MoveUpSvg } from './icons/move-up.svg';
import { ReactComponent as MoveDownSvg } from './icons/move-down.svg';
import BlocksEditor_module from './blocks-editor.module.scss';
type BlockData = {
    [key in keyof typeof blockRenderers]: any;
};
interface BlocksEditorProps {
    blocks: items.DataItem[];
}

const BlockRenderer = ({ block }: { block: items.DataItem }) => {
    const data = block.data as BlockData;
    if (!data) {
        return <div>no block data</div>;
    }
    for (const [key, Renderer] of Object.entries(blockRenderers)) {
        if (data[key as keyof typeof blockRenderers]) {
            return <Renderer {...data[key as keyof typeof blockRenderers]} />;
        }
    }
    return <div>unknown block</div>;
};

export const BlocksEditor = ({ blocks }: BlocksEditorProps) => {
    const [ver, update] = useReducer((n) => n + 1, 0);
    const overrideMap = useMemo(() => new Map<string, items.DataItem>(), []);
    const newItems = useMemo(() => [] as items.DataItem[], []);
    const allBlocks = useMemo(() => {
        const exisiting = blocks.map((block) => {
            const override = overrideMap.get(block._id!);
            if (override) {
                return { ...block, data: { ...block.data, ...override.data } };
            }
            return block;
        });
        return [...exisiting, ...newItems].sort((a, b) => {
            if (a.data?.ordering === undefined || b.data?.ordering === undefined) {
                return 0;
            }
            return a.data.ordering - b.data.ordering;
        });
    }, [blocks, overrideMap, ver]);

    const addBlock = (type: string, afterBlock?: items.DataItem) => {
        const blockEditor = blockEditors[type];
        if (!blockEditor) {
            return;
        }
        const idx = afterBlock ? allBlocks.indexOf(afterBlock) : -1;
        const ordering = afterBlock ? (afterBlock?.data?.ordering || 0) + 1 : 0;
        const newBlock = {
            data: { [type]: blockEditor.defaultData, ordering },
        };
        for (let i = idx + 1; i < allBlocks.length; i++) {
            const block = allBlocks[i];
            if (block.data?.ordering === undefined) {
                continue;
            }
            if (block._id) {
                const currentOverride = overrideMap.get(block._id) || { data: {} };
                overrideMap.set(block._id, {
                    ...currentOverride,
                    data: { ...currentOverride.data, ordering: block.data.ordering + 1 },
                });
            } else {
                block.data.ordering++;
            }
        }
        newItems.push(newBlock);
        update();
    };

    return (
        <div>
            <div>
                {overrideMap.size} blocks changed, {newItems.length} items added{' '}
                <button>save</button>
            </div>
            <NewBlockButton addBlock={addBlock} />
            {allBlocks.map((block, index) => {
                return (
                    <div key={index}>
                        <div className={BlocksEditor_module.blockActions}>
                            <EditSvg className={BlocksEditor_module.actionIcon} />
                            <MoveUpSvg className={BlocksEditor_module.actionIcon} />
                            <MoveDownSvg className={BlocksEditor_module.actionIcon} />
                            <DeleteSvg className={BlocksEditor_module.actionIcon} />
                        </div>
                        <BlockRenderer key={index} block={block} />
                        <NewBlockButton addBlock={addBlock} afterBlock={block} />
                    </div>
                );
            })}
        </div>
    );
};
