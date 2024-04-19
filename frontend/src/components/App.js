import { React } from 'react';
import { Header } from './Header';

function App() {
  // State that keeps track of whether the user is logged in
  // Replace this with your actual logic to determine logged-in status
  const isLoggedIn = false;

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      {/* Rest of your application components */}
    </div>
  );
}

export default App;
// FOR ALAIN: implement navbar and buttons for the home page, then make the homepage component, then continue onto the login and registration pages
