import { useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError(); 
    console.error(error); 

    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center"> 
            <h1 className="text-red-500 text-6xl p-3"> Oops!!</h1>
            <p className="text-red-500 text-5xl p-4"> Sorry, an unexpected error has occurred .</p>
            <p>
                <i className="text-blue-500 text-5xl p-5"> {'Error Message: ' + error.statusText || error.message} </i>
            </p>
        </div>
    )
}


export default ErrorPage; 