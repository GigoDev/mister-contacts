const {NavLink} = ReactRouterDOM

export function AppHeader() {
    

    return (
        <header className="app-header">
            <div className="logo">LOGO</div>
            <nav className="nav-links">
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/contact">contacts</NavLink>
                </nav>
            </nav>
        </header>

    )
}