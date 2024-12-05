import PersonalInformation from "../../Components/JobSeeker/PersonalInformation";
import Summary from "../../Components/JobSeeker/Summary";
import Experience from "../../Components/JobSeeker/Experience";
import Skills from "../../Components/JobSeeker/Skills";
import Education from "../../Components/JobSeeker/Education";
import Projects from "../../Components/JobSeeker/Projects";
export default function Profile() {
    return (
        <>
            <div className="mb-5 pb-15">
                <PersonalInformation />
                <Experience />
                <Skills />
                <Education />
                <Summary />
                <Projects />
            </div>
        </>
    );
}
