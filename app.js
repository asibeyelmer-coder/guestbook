const SUPABASE_URL = "https://wdjggdqnrytjmagetpdx.supabase.co";

const SUPABASE_KEY = "sb_publishable_-NHHDpg06nKBBFugwV783w_ft3EhPnI";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected successfully!");
async function loadMessages() {
    const { data, error } = await supabaseClient
        .from("messages")
        .select("*");

    if (error) {
        console.error("Error loading messages:", error);
    } else {
        console.log("Messages from Supabase:", data);
const messagesList = document.getElementById("messagesList");

    messagesList.innerHTML = "";

    if (data.length === 0) {
        messagesList.textContent = "No messages yet.";
    } else {
               data.forEach(function(message) {
            const paragraph = document.createElement("p");
            paragraph.textContent = message.content;
            messagesList.appendChild(paragraph);
        });
    }
  }
}

loadMessages();
document.getElementById("messageForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const message = document.getElementById("message").value.trim();

    if (message === "") {
        alert("Please enter a message.");
        return;
    }

    const { error } = await supabaseClient
        .from("messages")
        .insert([{ content: message }]);

    if (error) {
        console.error("Error posting message:", error);
        alert("Failed to post message.");
    } else {
        console.log("Message saved successfully!");
        document.getElementById("message").value = "";
        loadMessages();
    }
});
document.getElementById("githubLogin").addEventListener("click", async function() {
    console.log("GitHub login button clicked!");
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: window.location.origin + window.location.pathname
        }
    });

    console.log("GitHub OAuth result:", data, error);

    if (error) {
        console.error("GitHub login error:", error);
        alert("Failed to sign in with GitHub.");
    }
});