import { ContactPreview } from "./ContactPreview.jsx"
const { Link } = ReactRouterDOM

export function ContactList({ contacts, onRemoveContact }) {
    
    return (
        <ul className="contact-list">
            {contacts.map(contact =>
                <li key={contact._id}>
                    <ContactPreview contact={contact} />
                    <section>
                        <button onClick={() => onRemoveContact(contact._id)}>Remove</button>
                        {/* <button><Link to={`/contact/${contact._id}`}>Details</Link></button>
                        <button><Link to={`/contact/edit/${contact._id}`}>Edit</Link></button> */}
                    </section>
                </li>

            )}
        </ul>
    )
}