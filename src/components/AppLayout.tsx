import {Outlet} from "react-router";
import {NavBar} from "./NavBar.tsx";

export const AppLayout = () => {
    return (
        <>
            <NavBar/>
            <main>
                <Outlet />
            </main>
        </>
    )
}