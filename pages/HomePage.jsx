import { contactService } from "../services/contact.service.js"
const { Link, NavLink } = ReactRouterDOM
export function HomePage() {


    return (
        <section>
            <h2>
                Home page2
                <NavLink to="/contact/rrPFPy">Contact</NavLink>
            </h2 >
        </section >
    )
}