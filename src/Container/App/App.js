import Logo from "../../Component/Logo/Logo"
import SignIn from "../../Component/SignIn/SignIn"
import UrlSubmitForm from "../UrlSubmitForm/UrlSubmitForm"
import Footer from "../../Component/Footer/Footer"
import ParticlesBg from 'particles-bg'
import './App.css';

function App() {
  return (
    <>
      <ParticlesBg type="cobweb" bg={true} />
      <SignIn />
      <Logo />
      <UrlSubmitForm />
      <Footer />
    </>

  );
}

export default App;
