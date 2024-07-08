import { ContactList } from "../cmps/ContactList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadContacts, removeContact, saveContact } from '../store/actions/contact.actions.js'
import { contactService } from "../services/contact.service.js"

const { Link, useNavigate} = ReactRouterDOM


const { useEffect } = React
const { useSelector } = ReactRedux

export function ContactIndex() {
    const navigate = useNavigate()
    const contacts = useSelector(storeState => storeState.contacts)

    useEffect(() => {

        loadContacts()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load cars')
            })

    }, [])

    function onRemoveContact(contactId) {
        if (!confirm('are you sure you want to delete contact?')) return
        removeContact(contactId)
            .then(() => showSuccessMsg('Contact removed'))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove contact')
            })

    }

    function onAddContact() {
        const contact = contactService.getEmptyContact()
        console.log('contact:', contact)
        saveContact(contact)
            .then((savedContact) => {
                console.log('savedContact:', savedContact)
                navigate(`/contact/edit${savedContact._id}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot add contact')
            })
    }


    if (!contacts) return <div>Loading...</div>
    return (
        <section className="contact-index">
            <h2>Contacts List </h2>
            <button><Link to="/contact/edit">Add</Link></button>
            <ContactList
                contacts={contacts}
                onRemoveContact={onRemoveContact} />
        </section>
    )
}