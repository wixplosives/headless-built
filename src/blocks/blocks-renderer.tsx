import { blockRenderers } from './blocks';
import { type items } from '@wix/data';
interface BlockData {
    type: keyof typeof blockRenderers;
    props: any;
}
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
                const Component = blockRenderers[data.type];
                if (!Component) {
                    return <div> unknown block</div>;
                }
                return <Component key={index} {...data.props} />;
            })}
        </>
    );
};
