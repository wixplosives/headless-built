import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { FakeWixAPIContextProvider } from '../fakeData/FakeWixAPIContextProvider';

export function ComponentWrapper(props: { children: React.ReactNode }) {
    const router = createMemoryRouter([
        {
            path: '/',
            element: props.children,
        },
    ]);
    return (
        <FakeWixAPIContextProvider>
            <RouterProvider router={router} />
        </FakeWixAPIContextProvider>
    );
}
