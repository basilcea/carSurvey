import { MouseEventHandler } from "react"

interface IError {
    error: any,
    resetErrorBoundary: MouseEventHandler<HTMLButtonElement>
}
export default function ErrorFallBack ({error, resetErrorBoundary}: IError ) {
    return (
        <div role="alert">
            <p>Something went Wrong !</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}> Try again</button>
        </div>
    )

}