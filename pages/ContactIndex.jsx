import { ContactList } from "../cmps/ContactList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadContacts, removeContact, saveContact } from '../store/actions/contact.actions.js'


const { useEffect } = React
const { useSelector } = ReactRedux

export function ContactIndex() {

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



    if (!contacts) return <div>Loading...</div>
    return (
        <section className="contact-index">
            <h2>Contacts List</h2>
            <ContactList
                contacts={contacts}
                onRemoveContact={onRemoveContact} />
        </section>
    )
}