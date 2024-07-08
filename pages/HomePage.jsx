import { contactService } from "../services/contact.service.js"
const { NavLink } = ReactRouterDOM


export function HomePage() {


    return (
        <section>
            <h2>
                Home page2
            </h2 >
            <NavLink to="/contact" >Contacs</NavLink>
        </section >
    )
}