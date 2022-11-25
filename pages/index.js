// import "../styles/routes/Home.scss";

// export default function Home() {
//   return (
//     <div className="LandingPage">
//       New ECell Site<a href="#login">login</a>
//     </div>
//   );
// }

import "./LandingPage.scss";
import { motion } from "framer-motion";
import Session1Illustration from "../Assets/Illustration/Session-1-illustration.svg";
import Session2Illustration from "../Assets/Illustration/Session-2-illustration(to be updated).svg";
import AboutUsSection from "../Components/Home/AboutUsSection/AboutUsSection";
import HeroSection from "../Components/Home/HeroSection/HeroSection";
import Session from "../Components/Home/Session/Session";
import SponsorSection from "../Components/Home/SponsorSection/SponsorSection";
import ThinkTankSection from "../Components/Home/ThinkTankSection/ThinkTankSection";

import AnimationRender from "../Components/Common/AnimationRender/AnimationRender";
import FooterSection from "../Components/Common/Footer/Footer";
import Header from "../Components/Common/Header/Header";
import LandingSectionTexts from "../Components/Common/LandingSectionTexts/LandingSectionTexts";

//import ecelllogo from "../../Assets/icons/logo-ecell.svg";
export default function LandingPage() {
  const sections = [
    <AboutUsSection />,
    <ThinkTankSection />,
    <Session className="SessionWrapper__content--first">
      <LandingSectionTexts
        classifier="Think Tank Session # 1"
        title="E-Cell SNU’s USP"
        content1="It takes us through multiple modules ranging from all aspects of entrepreneurship where the members contribute to the pool through interactive and lively sessions."
      />
      <img
        alt="session"
        className="SessionWrapper__content-container__illustration"
        src={Session1Illustration.src}
      ></img>
    </Session>,
    <Session className="SessionWrapper__content--second">
      <img
        alt="session"
        className="SessionWrapper__content-container__illustration"
        src={Session2Illustration.src}
      ></img>
      <LandingSectionTexts
        classifier="Think Tank Session # 2"
        title="Business Model of Amazon"
        content1=" We dissected the structure of the company through a business canvas model. Most of us barely know the specifics that go into running a company like Customer Relationships, Market Analysis, Marketing, Management, Products and much more"
      />
    </Session>,
    <SponsorSection />,
  ];

  // document.getElementById("root").style.height = "unset";
  // document.getElementsByTagName("body")[0].style.height = "unset";

  return (
    <>
      <section className="LandingPageWrapper">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            delay: 0.6,
            duration: 1.2,
          }}
        >
          <Header
            navItem1="Home"
            navItem2="About Us"
            navItem3="Team"
            navItem4="Think Tank"
            navItem6="Blogs"
            navItem7="Ragnarok '22"
            routeItem1="/"
            routeItem2="#aboutus"
            routeItem3="/teams"
            routeItem4="#thinktank"
            routeItem5="/blogs/archive"
            routeItem6="/blogs"
            routeItem7="/events"
          />
        </motion.div>

        <main>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <HeroSection />
          </motion.div>

          {sections.map((section, index) => (
            <AnimationRender key={index}>{section}</AnimationRender>
          ))}
        </main>
      </section>
      <FooterSection />
    </>
  );
}
