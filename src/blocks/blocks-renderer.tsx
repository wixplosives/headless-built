import { blockRenderers } from './blocks';
import { type items } from '@wix/data';
type BlockData = {
    [key in keyof typeof blockRenderers]: any;
};
interface BlocksRendererProps {
    blocks: items.DataItem[];
}

export const BlocksRenderer = ({ blocks }: BlocksRendererProps) => {
    return (
        <>
            {blocks.map((block, index) => {
                const data = block.data as BlockData;
                if (!data) {
                    return <div>no block data</div>;
                }
                for (const [key, Renderer] of Object.entries(blockRenderers)) {
                    if (data[key as keyof typeof blockRenderers]) {
                        return (
                            <Renderer key={index} {...data[key as keyof typeof blockRenderers]} />
                        );
                    }
                }
                return <div>unknown block</div>;
            })}
        </>
    );
};
