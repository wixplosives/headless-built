import { useParams } from 'react-router-dom';
import { RouteParams } from '../../router/config';
import { useAsync } from '../../hooks/use-async';
import { WixAPIContext } from '../../api/WixAPIContextProvider';
import { useContext } from 'react';
import { BlocksEditor } from '../../blocks-editor/blocks-editor';

export const SectionsBasedEditor = () => {
    const { uri } = useParams<RouteParams['/edit/:uri']>();
    const api = useContext(WixAPIContext);

    const pageData = useAsync(() => {
        return api.getPageDataByUri(uri || '');
    }, [uri]);
    return <BlocksEditor blocks={pageData?.items || []} />;
};
