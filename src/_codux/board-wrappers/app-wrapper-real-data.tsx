import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { WixAPIContextProvider } from '../../api/WixAPIContextProvider';
import { routes } from '../../router/routes';

export function AppWrapperRealData() {
    const router = createMemoryRouter(routes);

    return (
        <WixAPIContextProvider>
            <RouterProvider router={router} />
        </WixAPIContextProvider>
    );
}
