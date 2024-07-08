export function ContactDetails({contact}){
    const demoContact = {name:'John',familyName:'Snow',email:'JohnSnow@gmail.com'}
    const fullname = `${demoContact.name} ${demoContact.familyName}`


    return (
        <div>
            <h1>Contact details</h1>
            <h4>{`${fullname}`}</h4>
            <h4>{demoContact.email}</h4>
        </div>
    )
}