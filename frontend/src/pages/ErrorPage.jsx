import { useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError(); 
    console.error(error); 

    return (
        <div className="h-screen w-screen bg-black"> 
            <h1 className="text-red-500"> Oops!</h1>
            <p className="text-red-500"> Sorry, an unexpected error has occurred .</p>
            <p>
                <i className="text-red-500"> {error.statusText || error.message} </i>
            </p>
        </div>
    )
}


export default ErrorPage; 