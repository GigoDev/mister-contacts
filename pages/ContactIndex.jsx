import { ContactFilter } from "../cmps/ContactFilter.jsx"
import { ContactList } from "../cmps/ContactList.jsx"
import { contactService } from "../services/contact.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadContacts, removeContact, saveContact } from '../store/actions/contact.actions.js'


const { useEffect, useState } = React
const { useSelector } = ReactRedux
const { useSearchParams } = ReactRouterDOM


export function ContactIndex() {

    const contacts = useSelector(storeState => storeState.contacts)
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = contactService.getFilterFromSearchParams(searchParams)
    const [filterBy, setFilterBy] = useState(defaultFilter)


    useEffect(() => {
        setSearchParams(filterBy)

        loadContacts(filterBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load cars')
            })

    }, [filterBy])

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
            <ContactFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <ContactList
                contacts={contacts}
                onRemoveContact={onRemoveContact} />
        </section>
    )
}