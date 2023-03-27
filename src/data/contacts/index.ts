export const dataContacts = {
    contacts: '/data/contacts/contacts.json',
}

interface IPlace {
    city: string,
    street: string,
    building: string,
}

export interface IContactsResponse {
    phone: string,
    place: IPlace,
}