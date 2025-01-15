// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAq_KSV4qfTP1XB4-EG6kXGFzvxYWFxkFI",
    authDomain: "newjeansweb.firebaseapp.com",
    databaseURL: "https://newjeansweb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "newjeansweb",
    storageBucket: "newjeansweb.appspot.com",
    messagingSenderId: "124751544214",
    appId: "1:124751544214:web:43eeaaf9fd220f721aa7b7"
};

const app = firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Realtime Database
const database = firebase.database();

// Handle sign-up
document.getElementById('submitSignUp').addEventListener('click', function (e) {
    e.preventDefault();

    const username = document.getElementById('uname2').value.trim();
    const fullname = document.getElementById('fullname').value.trim();
    const age = document.getElementById('age').value.trim();
    const password = document.getElementById('pword2').value;

    // Validate input fields
    if (username === '' || fullname === '' || age === '' || password.length < 8) {
        alert('All fields are required and password must be at least 8 characters long.', 'signUpMessage');
        return;
    }

    // Check if username is unique
    const userRef = database.ref('users/' + username);
    userRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            alert('Username already exists. Please choose a different one.', 'signUpMessage');
        } else {
            // Store user data in Firebase
            userRef.set({
                fullname: fullname,
                age: age,
                password: password
            }).then(() => {
                alert('Sign-up successful! Redirecting to Log In...', 'signUpMessage');
                setTimeout(() => {
                    document.getElementById('signup').style.display = 'none';
                    document.getElementById('signIn').style.display = 'block';
                }, 2000);
            }).catch((error) => {
                alert('Error during sign-up: ' + error.message, 'signUpMessage');
            });
        }
    }).catch((error) => {
        alert('Error checking username: ' + error.message, 'signUpMessage');
    });
});

// Handle log-in
document.getElementById('submitSignIn').addEventListener('click', function (e) {
    e.preventDefault();

    const username = document.getElementById('uname1').value.trim();
    const password = document.getElementById('pword1').value;

    // Validate input fields
    if (username === '' || password === '') {
        alert('Username and password are required.', 'signInMessage');
        return;
    }

    const userRef = database.ref('users/' + username);
    userRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.password === password) {
                // Redirect to homepage if credentials are correct
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password.', 'signInMessage');
            }
        } else {
            alert('Invalid username or password.', 'signInMessage');
        }
    }).catch((error) => {
        alert('Error during log-in: ' + error.message, 'signInMessage');
    });
});