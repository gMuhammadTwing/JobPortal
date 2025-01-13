import PersonalInformation from "./PersonalInformation";
import Summary from "./Summary";
import Experience from "./Experience";
import Skills from "./Skills";
import Education from "./Education";
import Projects from "./Projects";
export default function Index() {
    return (
        <>
            <div className="mb-5 pb-15">
                <PersonalInformation />
                <Summary />
                <Education />
                <Skills />
                <Experience />
                <Projects />
            </div>
        </>
    );
}
