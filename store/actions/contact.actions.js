import { contactService } from "../../services/contact.service.js"
import { REMOVE_CONTACT, SET_CONTACTS, store } from "../store.js"

export function loadContacts() {
    return contactService.query()
        .then((contacts) => {
            store.dispatch({ type: SET_CONTACTS, contacts })
        })
        .catch(err => {
            console.log('contact action -> Cannot load contacts', err)
            throw err
        })
}

export function removeContact(contactId) {
    return contactService.remove(contactId)
        .then(() => {
            store.dispatch({ type: REMOVE_CONTACT, contactId })
        })
        .catch(err => {
            console.log('contact action -> Cannot remove contact', err)
            throw err
        })
}

