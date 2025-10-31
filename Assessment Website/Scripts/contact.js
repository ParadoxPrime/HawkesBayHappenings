import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
let supabaseUrl = 'https://ucaicakbiuhbsucwxfrs.supabase.co';
let supabaseAPI = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjYWljYWtiaXVoYnN1Y3d4ZnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMTA3OTMsImV4cCI6MjA3NTg4Njc5M30.Y7gMW-7_yslGncBA0DcVfoOsxmPANb0Ged6UaiYTscA';
//Create a connection to backend
let supabase = createClient(supabaseUrl,supabaseAPI);

//Fetch all messages from database
async function getMessageFromDB() {
    //get all messages from messages table
    //SQL syntax, select all messages by descending order
    let {data, error} = await supabase.from('messages').select('*').order('created_at',{ascending:false});
    //error handler
    if (error) {
        alert("Error Fetching Messages: " + error);
        return[];//return empty array
    }
    //when fetched successfully
    return data;
}

//display all messages in 'messages-container' element
async function displayMessages() {
    let messages = await getMessageFromDB();
    let container = document.getElementById('messages-container');
    //if there are no messages
    if (messages.length == 0) {
        container.innerHTML = "<p>No comments yet! Be the first to write in!</p>";
        return;
    }
    //if there are messages
    container.innerHTML = messages.map(msg => `
    <div class="message">
        <strong class="message-title">${msg.name || 'Anonymous'}</strong>
        <!--<span class="message-email">${msg.email}</span>-->
        <em class="message-date">Sent: ${new Date(msg.created_at).toLocaleString()}</em>
        <br>
        <span class="message-content">${msg.message}</span>
        <br>
    </div>`);
}

//------------------------------------------------
// Insert message into the database
async function insertMessageToDB(name, email, message) {
    //Insert a new message into the "messages" table
    const { data, error } = await supabase
        .from('messages')
        .insert([
        { name: name, email: email, message: message }
        ]);
        //Error handling
    if (error) {
        console.error('Error inserting message:', error);
        return null;
    }
    return data;
    }
    
//------------------------------------------------
// Handle form submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    //Prevent the default form submission behavior
    e.preventDefault();

    //Get form values and trim whitespace
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();
    //Basic validation to ensure all fields are filled
    if (!name || !email || !message) {
    document.getAnimationsById('notification').textContent = 'Please fill in all fields.';
    document.getElementById('dialogue-container').showModal();
    return;
    }

    //Insert the message into the database
    insertMessageToDB(name, email, message).then( () => {
        //Display success message and reset the form  
        document.getElementById('notification').textContent = 'Your message has been sent! Thank you';
        document.getElementById('dialogue-container').showModal();
        document.getElementById('contact-form').reset();
        displayMessages();
    })
});
    


//Call and execute functions
displayMessages();