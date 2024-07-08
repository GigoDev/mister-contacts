const { useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { contactService } from "../services/contact.service.js"

export function ContactDetails(){
    // const demoContact = {name:'John',familyName:'Snow',email:'JohnSnow@gmail.com'}
    // const fullname = `${demoContact.name} ${demoContact.familyName}`
    const [contact, setContact] = useState(null)
    const { contactId } = useParams()

    useEffect(() => {
        contactService.get(contactId)
            .then(contact  => setContact(contact))
    }, [contactId])
    
    
    if (!contact) return <div>Loading...</div>
    const fullname = `${contact.name} ${contact.familyName}`
    return (
        <section className="contact-details">
            <h1>Contact details</h1>
            <h4 className="name">{`${fullname}`}</h4>
            <h4 className="email">{demoContact.email}</h4>
            <button ><Link to="/">Back</Link></button>
        </section>
    )
}

{/* <Route path="/contact/:contactId" element={<ContactDetails />} /> */}