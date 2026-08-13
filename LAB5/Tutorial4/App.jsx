import Header from "./components/Header";
import Navbar from "./components/Navbar";
import WelcomeSection from "./components/WelcomeSection";
import CourseList from "./components/CourseList";
import Footer from "./components/Footer";

import "./App.css";

function App() {

    return (
        <>
            <Header />

            <Navbar />

            <main>
                <WelcomeSection />

                <CourseList />
            </main>

            <Footer />
        </>
    );
}

export default App;