import * as faker from 'faker'

const db = {
    users: {},
    addresses: {}
}
export default db

export const randomNumber = (from, to) =>
    Math.floor(Math.random() * (to - from + 1) + from)

export const seedAddresses = (count = 1000) => {
    
    let nextId = 0
    const addresses = {}
    
    while (nextId < count) {
        
        nextId++
        
        let country = faker.locales[faker.locale].address.default_country

        if (country && Array.isArray(country))
            country = country[0]
        else
            country = 'United States of America'
        
        addresses[nextId] = {
            id: nextId,
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zipCode: faker.address.zipCode(),
            country,
        }
        
    }
    
    //console.log('addresses sample', JSON.stringify(this.addresses.slice(0, 2), null, 4))
    
    db.addresses = addresses
    
}

export const seedUsers = (count = 1000) => {
    
    let nextId = 0
    const users = {}
    const addresses = Object.keys(db.addresses)
    
    while (nextId < count) {
        
        nextId++
        
        const addressId = addresses.shift()
        const dob = faker.date.past(50, new Date('Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)'))
        const gender = randomNumber(0, 1)
        
        users[nextId] = {
            
            id: nextId,
            
            email: faker.internet.email(),
            password: 'password',
            
            firstName: faker.name.firstName(gender),
            lastName: faker.name.lastName(gender),
            dob: new Date(dob.getFullYear(), dob.getMonth(), dob.getDate()),
            gender,
            
            address: db.addresses[addressId],
            phone: faker.phone.phoneNumber().replace(/-|\(|\)/ig, '')
            
        }
        
    }
    
    //console.log('users sample', JSON.stringify(this.users.slice(0, 2), null, 4))
    
    db.users = users
    
}

export const initDatabase = () => {
    
    seedAddresses()
    seedUsers()
    
    console.log(`initDatabase: generated entities
    ${Object.keys(db.users).length} Users
    ${Object.keys(db.addresses).length} Addresses
    
    ${JSON.stringify(Object.values(db.users)[0], null, 4)}
    `)
    
}

