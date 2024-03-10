import { blockRenderers } from './blocks';

interface BlockData {
    type: keyof typeof blockRenderers;
    props: any;
}
interface BlocksRendererProps {
    blocks: BlockData[];
}

export const BlocksRenderer = ({ blocks }: BlocksRendererProps) => {
    return (
        <>
            {blocks.map((block, index) => {
                const Component = blockRenderers[block.type];
                if (!Component) {
                    return <div> unknown block</div>;
                }
                return <Component key={index} {...block.props} />;
            })}
        </>
    );
};
