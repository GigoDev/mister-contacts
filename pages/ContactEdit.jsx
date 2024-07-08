import { contactService } from "../services/contact.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveContact } from '../store/actions/contact.actions.js'


const { useState, useEffect } = React
const { useSelector } = ReactRedux
const { useNavigate, useParams } = ReactRouterDOM

export function ContactEdit() {

    const [contactToEdit, setContactToEdit] = useState(contactService.getEmptyContact())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.contactId) loadContact()
    }, [])

    function loadContact() {
        contactService.get(params.contactId)
            .then(setContactToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setContactToEdit(prevContactToEdit => ({ ...prevContactToEdit, [field]: value }))
    }

    function onSaveContact(ev) {
        ev.preventDefault()
        saveContact(contactToEdit)
            .then((savedContact) => {
                navigate('/contact')
                showSuccessMsg(`Contact Saved (id: ${savedContact._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save contact')
                console.log('err:', err)
            })
    }

    const {  email, name, familyName } = contactToEdit

    return (
        <section className="contact-edit">
            <form onSubmit={onSaveContact} >

                <label htmlFor="email">email:</label>
                <input onChange={handleChange} value={email} type="text" name="email" id="email" />

                <label htmlFor="name">name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="familyName">familyName:</label>
                <input onChange={handleChange} value={familyName} type="text" name="familyName" id="familyName" />


                <button>Save</button>
            </form>
        </section>
    )
}