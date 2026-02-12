import { Outlet } from "react-router-dom";
import Header from "../components/Main/Header";
import FooterLogo from "../assets/logo.png";

const Main = ({headerType}) => {
    return(
        <div className="bg-dirty-white text-white w-full h-screen flex flex-col items-center overflow-y-auto">
            <Header
                headerOne={headerType === 'header-one'}
                headerTwo={headerType === 'header-two'}
             />
            <main className="w-full flex items-center px-10 pt-5">
                <Outlet />
            </main>

            {headerType === 'header-one' &&
                <footer className="w-full flex items-center justify-center">
                    <img 
                        src={FooterLogo}
                        alt="GlobalTech Assessment and Training Center INC."
                        className="h-12 my-10"
                    />
                </footer>
            }
            
        </div>
    );
}

export default Main;