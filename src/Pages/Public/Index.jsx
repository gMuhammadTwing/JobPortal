import Company from './Company';
import RecentlyUpdatedJobs from './RecentlyUpdatedJobs';
import FeaturedJobs from './FeaturedJobs';
import FeaturedDevelopers from './FeaturedDevelopers';
import FeaturedSkills from './FeaturedSkills';
import Reviews from './Components/Reviews';
import GreatAboutUs from './Components/GreatAboutUs';
import Testimonials from './Components/Testimonials';
import FooterHeader from './Components/FooterHeader';
import SubscribeEmail from './Components/SubscribeEmail';
export default function Index() {
  return (
    <>
      <div className="">
        <Company />
        <RecentlyUpdatedJobs />
        <FeaturedJobs />
        {/* <SubscribeEmail/> */}
        <FooterHeader/>
        {/* <FeaturedDevelopers /> */}
        {/* <FeaturedSkills /> */}
        {/* <GreatAboutUs/> */}
        {/* <Testimonials/> */}

      </div>
    </>
  );
};

