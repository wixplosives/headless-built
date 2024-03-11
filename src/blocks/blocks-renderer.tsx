import { blockRenderers } from './blocks';
import { type items } from '@wix/data';
import { processImageUrl } from './utils';
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

                const compType = Object.keys(data).filter((key) => key in blockRenderers)[0];
                const Component = blockRenderers[compType as keyof typeof blockRenderers];
                const props = data[compType as keyof typeof data];

                const sanitizedProps = Object.entries(props).reduce((acc, [key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        acc[key] = JSON.stringify(value);
                    } else {
                        if (key === 'image') {
                            console.log(value);
                            acc[key] = processImageUrl(JSON.stringify(value));
                        } else {
                            acc[key] = value;
                        }
                    }
                    return acc;
                }, {} as any);

                if (!Component) {
                    return <div> unknown block</div>;
                }

                return <Component key={index} {...sanitizedProps} />;
            })}
        </>
    );
};
