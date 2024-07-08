const { useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { contactService } from "../services/contact.service.js"

export function ContactDetails() {
    

    const [contact, setContact] = useState(null)
    const { contactId } = useParams()

    useEffect(() => {
        contactService.get(contactId)
            .then(contact => setContact(contact))
            .catch(err => {
                console.log('Had issue in contact details', err)
            })
    }, [contactId])


    if (!contact) return <div>Loading...</div>
    const fullname = `${contact.name} ${contact.familyName}`
    return (
        <section className="contact-details">
            <h1>Contact details</h1>
            <h4 className="name">{`${fullname}`}</h4>
            <h4 className="email">{contact.email}</h4>
            <button ><Link to="/">Main</Link></button>
        </section>
    )
}

