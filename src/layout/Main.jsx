import WhiteLogo from "../assets/logo_white.png"

const Main = ({children}) => {
    return(
        <>
            <header className="w-full bg-secondary">
                <img src={WhiteLogo} alt="Logo" />
            </header>
            <main className="w-full">
                {children}
            </main>
        </>
    );
}

export default Main;