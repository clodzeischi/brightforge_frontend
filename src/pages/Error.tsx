import {useRouteError} from "react-router";

export const Error = () => {
    const error = useRouteError();

    const message =
        typeof error === "object" && error !== null && "message" in error
            ? (error as { message?: string }).message
            : "Unknown error";

    return (
        <div className={'m-3'}>
            <h4>Error:</h4>
            <p>{message}</p>
        </div>
    )
}