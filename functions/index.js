const functions = require('firebase-functions');
const admin =require('firebase-admin');

admin.initializeApp(functions.config().firebase);

/*exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});*/


const createNotification = (notification) => 
{
    return admin.firestore().collection('notifications').add(notification).then(doc => console.log('notification added'))
}

exports.projectCreated = functions.firestore.document('/projects/{projectId}').onCreate( doc => 
    {
        const project = doc.data();
        const notification = {
            content:'added a project',
            user :`${project.authorFirstName} ${project.authorLastName}`,
            time:admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
    })

exports.projectDelete = functions.firestore.document('/projects/{projectId}').onDelete( doc => 
    {
        const project = doc.data();
        const notification = {
            content:'deleted a project',
            user :`${project.authorFirstName} ${project.authorLastName}`,
            time:admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
    })

exports.userSigned = functions.auth.user().onCreate( user => 
    {
        return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
            const newUser = doc.data();
            const notification = {
                content : 'joined the team',
                user :`${newUser.firstName} ${newUser.lastName}`,
                time:admin.firestore.FieldValue.serverTimestamp()
            }

            return createNotification(notification);
        });         
    })
