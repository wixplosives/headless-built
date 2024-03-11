import { WixAPIContext, WixAPIContextProvider } from '../../api/WixAPIContextProvider';
import { blockRenderers } from '../../blocks/blocks';
import { useContext, useState } from 'react';
import { useAsync } from '../../hooks/use-async';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import BlockWrapperRealData_module from './section-wrapper-real-data.module.scss';
export function SectionWrapper() {
    return (
        <WixAPIContextProvider>
            <SingleSectionRenderer />
        </WixAPIContextProvider>
    );
}

const blocks = Object.keys(blockRenderers);

export function SingleSectionRenderer() {
    const [selectedBlock, setSelectedBlock] = useState<keyof typeof blockRenderers>('hero');
    const [blockIdx, setSelectedBlockIdx] = useState(0);
    const api = useContext(WixAPIContext);
    const Component = blockRenderers[selectedBlock];
    const blocksData = useAsync(
        () => api.getBlocksOfType(selectedBlock, 1, blockIdx),
        [selectedBlock, blockIdx]
    );
    if (!Component) {
        return <div> unknown block</div>;
    }
    const actualSelected = blocksData?.items[0];
    const totalItems = blocksData?.totalCount;
    return (
        <div>
            <div className={BlockWrapperRealData_module.controls}>
                <label>Select block to render</label>
                <DropdownMenu modal>
                    <DropdownMenuTrigger
                        className={BlockWrapperRealData_module.blockSelectorTarget}
                    >
                        {selectedBlock}
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuContent>
                            {blocks.map((block) => (
                                <DropdownMenuItem
                                    key={block}
                                    onSelect={() => {
                                        setSelectedBlockIdx(0);
                                        setSelectedBlock(block as keyof typeof blockRenderers);
                                    }}
                                >
                                    {block}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
                <div className={BlockWrapperRealData_module.paging}>
                    <button
                        className={BlockWrapperRealData_module.pagingBtn}
                        onClick={() => {
                            setSelectedBlockIdx(Math.max(0, blockIdx - 1));
                        }}
                        disabled={blockIdx < 1}
                    >
                        {'<'}
                    </button>
                    showing {blockIdx} of {totalItems} {selectedBlock} sections
                    <button
                        className={BlockWrapperRealData_module.pagingBtn}
                        onClick={() => {
                            setSelectedBlockIdx(Math.min((totalItems || 1) - 1, blockIdx + 1));
                        }}
                        disabled={blockIdx > (totalItems || 1) - 1}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
            <div>
                {!blocksData ? (
                    'loading'
                ) : blocksData.items.length === 0 ? (
                    'no items'
                ) : !actualSelected ? (
                    'item not found'
                ) : (
                    <div>
                        <Component {...(actualSelected.data as any)} />
                    </div>
                )}
            </div>
        </div>
    );
}
