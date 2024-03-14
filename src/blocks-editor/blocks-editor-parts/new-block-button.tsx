import { useEffect, useRef, useState } from 'react';
import NewBlockButton_module from './new-block-button.module.scss';
import { type items } from '@wix/data';
import { blockEditors } from './block-sub-editors';
export const NewBlockButton = ({
    addBlock,
}: {
    addBlock: (type: string) => void;
    afterBlock?: items.DataItem;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openedMenu = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (openedMenu.current && !openedMenu.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);
    if (!isOpen) {
        return (
            <button className={NewBlockButton_module.root} onClick={() => setIsOpen(true)}>
                new block
            </button>
        );
    }
    return (
        <div className={NewBlockButton_module.root} ref={openedMenu}>
            {Object.entries(blockEditors).map(([name, block]) => (
                <div
                    key={name}
                    onClick={() => {
                        setIsOpen(false);
                        addBlock(name);
                    }}
                    className={NewBlockButton_module.blockItem}
                >
                    {block.icon} {block.title}
                </div>
            ))}
        </div>
    );
};
