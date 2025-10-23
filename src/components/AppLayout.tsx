import {Outlet} from "react-router";
import {NavBar} from "./NavBar.tsx";

export const AppLayout = () => {
    return (
        <>
            <NavBar color='secondary' expand='md' />
            <main>
                <Outlet />
            </main>
        </>
    )
}