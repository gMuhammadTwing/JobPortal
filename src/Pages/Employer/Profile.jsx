import PersonalInformation from "../../Components/Employer/PersonalInformation";
import Summary from "../../Components/Employer/Summary";
import Experience from "../../Components/Employer/Experience";
import Skills from "../../Components/Employer/Skills";
import Education from "../../Components/Employer/Education";
import Projects from "../../Components/Employer/Projects";
export default function Profile() {
    return (
        <>
            <PersonalInformation />
            <Summary />
            <Experience />
            <Skills />
            <Education />
            <Projects/>
        </>
    );
}
