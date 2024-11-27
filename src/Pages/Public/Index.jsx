import Company from './Company';
import RecentlyUpdatedJobs from './RecentlyUpdatedJobs';
import FeaturedJobs from './FeaturedJobs';
import FeaturedDevelopers from './FeaturedDevelopers';
import FeaturedSkills from './FeaturedSkills';
import Reviews from './Reviews';
export default function Index() {
  return (
    <>
      <div className=" pb-2">
        <Company />
        <RecentlyUpdatedJobs />
        <FeaturedJobs />
        <FeaturedDevelopers />
        <FeaturedSkills />
        <Reviews/>
      </div>
    </>
  );
};

