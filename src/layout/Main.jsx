const Main = ({children}) => {
    return(
        <>
            <header className="w-full bg-color-secondary">
                <img src="../assets/GLOBALTECH 2.png" alt="Logo" />
            </header>
            <main className="w-">
                {children}
            </main>
        </>
    );
}

export default Main;