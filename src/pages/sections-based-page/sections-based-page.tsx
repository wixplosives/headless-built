import { useParams } from 'react-router-dom';
import { RouteParams } from '../../router/config';
import { useAsync } from '../../hooks/use-async';
import { WixAPIContext } from '../../api/WixAPIContextProvider';
import { useContext } from 'react';
import { BlocksRenderer } from '../../blocks/blocks-renderer';

export const SectionsBasedPage = () => {
    const { uri } = useParams<RouteParams['/:uri']>();
    const api = useContext(WixAPIContext);

    const pageData = useAsync(() => {
        return api.getPageDataByUri(uri || '');
    }, [uri]);
    return <BlocksRenderer blocks={pageData?.items || []} />;
};
