const { registerForEvent } = require('../../SQL/EventQueries/RegisterForEvent');
const { findByAttribute } = require('../../SQL/AuthQueries/FindExistingEntity');

module.exports.EventRegistration = async(req, res) => {
    try {
        const { userID, eventID } = req.body;
        
        console.log(userID);

        const existingUser = await findByAttribute('guest', 'id', userID);

        if(!existingUser.length) {
            console.log("Error: No existing user found");
            res.send({ message : "No user found"});
            return;
        }

        const existingEvent = await findByAttribute('event', 'id', eventID);

        if(!existingEvent.length) {
            console.log("Error: No event found");
            res.send({ message : "No event found"});
            return;
        }

        const successfulEventRegistration = await registerForEvent(userID, eventID);

        console.log("Successful event registration: ", successfulEventRegistration);

        res.status(200)
           .send({ 
                message : 'Event registration successful',
                registrationRecord : successfulEventRegistration
            });
        
    } catch(error) {
        console.error(error)
        res.status(500)
            .send({ message : 'Internal server error' });
        throw error;
    }


}