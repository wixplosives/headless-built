import { WixAPIContext, WixAPIContextProvider } from '../../api/WixAPIContextProvider';
import { blockRenderers } from '../../blocks/blocks';
import { useContext, useState } from 'react';
import { useAsync } from '../../hooks/use-async';
import { items } from '@wix/data';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import BlockWrapperRealData_module from './dynamic-page-wrapper-real-data.module.scss';
import { BlocksRenderer } from '../../blocks/blocks-renderer';
import { SiteContentWrapper } from '../../components/site-wrapper/site-wrapper';
import { ComponentWrapper } from './component-wrapper';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { BlocksEditor } from '../../blocks-editor/blocks-editor';
export function SectionWrapper() {
    const router = createMemoryRouter([
        {
            path: '*',
            element: <SinglePageRenderer />,
        },
    ]);
    return (
        <WixAPIContextProvider>
            <RouterProvider router={router} />
        </WixAPIContextProvider>
    );
}

export function SinglePageRenderer() {
    const api = useContext(WixAPIContext);
    const [selectedPage, setSelectedPage] = useState<items.DataItem>();
    const [isEditing, setIsEditing] = useState(false);
    const pagesData = useAsync(() => api.getPages(), []);
    const renderedPage = selectedPage || pagesData?.items[0];
    const pageData = useAsync(() => {
        if (!renderedPage?._id) {
            return null;
        }
        return api.getPageData(renderedPage?._id);
    }, [selectedPage, renderedPage?._id]);

    if (!pagesData) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            <div className={BlockWrapperRealData_module.controls}>
                <label>Select page to render</label>
                <DropdownMenu modal>
                    <DropdownMenuTrigger
                        className={BlockWrapperRealData_module.blockSelectorTarget}
                    >
                        {renderedPage?.data?.pageName}
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuContent>
                            {pagesData.items.map((page) => (
                                <DropdownMenuItem
                                    key={page._id}
                                    onSelect={() => {
                                        setSelectedPage(page);
                                    }}
                                >
                                    {page.data?.pageName}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
                <label>Mode</label>
                <DropdownMenu modal>
                    <DropdownMenuTrigger
                        className={BlockWrapperRealData_module.blockSelectorTarget}
                    >
                        {isEditing ? 'Editing' : 'Viewing'}
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onSelect={() => {
                                    setIsEditing(true);
                                }}
                            >
                                Editing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => {
                                    setIsEditing(false);
                                }}
                            >
                                Viewing
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
            </div>
            <div className={BlockWrapperRealData_module.siteWrapper}>
                {!pagesData ? (
                    'loading'
                ) : pagesData.items.length === 0 ? (
                    'no pages found'
                ) : !pageData ? (
                    'page not found'
                ) : (
                    <SiteContentWrapper>
                        {isEditing ? (
                            <BlocksEditor blocks={pageData.items} />
                        ) : (
                            <BlocksRenderer blocks={pageData.items} />
                        )}
                    </SiteContentWrapper>
                )}
            </div>
        </div>
    );
}
