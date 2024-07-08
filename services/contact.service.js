import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CONTACT_KEY = 'contactDB'
_createContacts()

export const contactService = {
    query,
    get,
    remove,
    save,
    getEmptyContact,
}

window.cs = contactService


function query(filterBy = {}) {
    return storageService.query(CONTACT_KEY)
        .then(contacts => {

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                contacts = contacts.filter(contact => regExp.test(contact.vendor))
            }
            if (filterBy.minSpeed) {
                contacts = contacts.filter(contact => contact.speed >= filterBy.minSpeed)
            }
            return contacts
        })
}

function get(contactId) {
    return storageService.get(CONTACT_KEY, contactId)
}

function remove(contactId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(CONTACT_KEY, contactId)
}

function save(contact) {
    if (contact.id) {
        return storageService.put(CONTACT_KEY, contact)
    } else {
        return storageService.post(CONTACT_KEY, contact)
    }
}

function getEmptyContact(name = '', familyName = '', email = '') {
    return { name, familyName, email }
}

// function getDefaultFilter() {
//     return { txt: '', minSpeed: '' }
// }

function _createContacts() {
    let contacts = utilService.loadFromStorage(CONTACT_KEY)
    if (!contacts || !contacts.length) {
        contacts = []
        for (let i = 0; i < 20; i++) {
            contacts.push(_createContact())
        }
    }

    utilService.saveToStorage(CONTACT_KEY, contacts)
}


function _createContact() {
    const contact = getEmptyContact()
    contact._id = utilService.makeId()
    contact.name = utilService.getRandomWord()
    contact.familyName = utilService.getRandomWord()
    contact.email = `${contact.name}${contact.familyName}@gmail.com`
    // contact.email = utilService.getRandomEmail()
    return contact
}

