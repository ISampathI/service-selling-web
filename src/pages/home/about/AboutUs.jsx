import React, { useContext, useEffect } from "react";
import "./aboutus.scss";
import about1 from "../../../assets/img/about/about1.png";
import about2 from "../../../assets/img/about/about2.png";
import about3 from "../../../assets/img/about/about3.png";
import about4 from "../../../assets/img/about/about4.png";
import about5 from "../../../assets/img/about/about5.png";
import about6 from "../../../assets/img/about/about6.png";
import about7 from "../../../assets/img/about/about7.png";
import about8 from "../../../assets/img/about/about8.png";
import Footer from "../../../layouts/Footer";
import figure1 from "../../../assets/img/developers/figure1.png"
import figure2 from "../../../assets/img/developers/figure2.png"
import figure3 from "../../../assets/img/developers/figure3.png"
import figure4 from "../../../assets/img/developers/figure4.png"
import figure5 from "../../../assets/img/developers/figure5.png"
import { ChangeHeaderNavColorContext } from "../../../helper/Context";

function AboutUs() {
  const { changeHeaderNavColor, setChangeHeaderNavColor } = useContext(
    ChangeHeaderNavColorContext
  );
  useEffect(() => {
    setChangeHeaderNavColor(true);
  }, []);
  return (
    <div className="AboutUs">
      <div className="aboutus-wrapper">
        <div className="title">
          About <span>Us</span>
        </div>
        <div className="about-us">
          <div className="row">
            <img src={about1} alt="" />
            <p>
              Hire Now is a service-selling platform connecting talented
              individuals with people seeking to hire top-notch services.
              Whether you're a business owner or an individual in need of
              professional services, this platform offers an efficient solution
              for all your hiring needs. This platform is built on the
              principles of convenience, reliability, and affordability,
              ensuring that our clients receive the best possible experience.
            </p>
          </div>
          <div className="row">
            <p>
              At Hire Now, we understand the importance of standing out in a
              competitive market. That's why this logo is designed with a unique
              and modern aesthetic that incorporates both round and square
              shapes. The logo cleverly incorporates the letters "H" and "N" to
              represent the name of this platform, and the green color conveys a
              sense of growth, progress, and prosperity.
            </p>
            <img src={about2} alt="" />
          </div>
          <div className="row">
            <img src={about3} alt="" />
            <p>
              Our mission is to provide a platform that connects clients with
              the best professionals in their respective fields, ensuring that
              projects are completed to the highest standards within budget and
              on time. With Hire Now, clients can rest assured that they will
              receive top-notch services from the most qualified professionals
              in the industry.
            </p>
          </div>
          <div className="title">
            Our <span>Logo Design</span>
          </div>
          <div className="our-logo">
            <div className="logo-line">
              <img src={about4} alt="" />
              <img src={about5} alt="" />
              <img src={about6} alt="" />
            </div>
            <div className="logo-line">
              <img src={about7} alt="" />
              <img src={about8} alt="" />
            </div>
          </div>
          <div className="team" id="team">
            <div className="title">
              Our <span>Team</span>
            </div>
            <div className="sub-text">
              Our Hire Now team comprises of experienced and highly skilled
              professionals committed to delivering exceptional results.
            </div>
            <div className="team-members-list">
              <div className="member">
                <img className="proPic" src={figure1} alt="" />
                <div className="name">Chandrasiri RDPS</div>
                <div className="age">23 Years</div>
                <div className="role">Front end Developer</div>
              </div>
              <div className="member">
                <img className="proPic" src={figure2} alt="" />
                <div className="name">Pathirana PNK</div>
                <div className="age">24 Years</div>
                <div className="role">Back end Developer</div>
              </div>
              <div className="member">
                <img className="proPic" src={figure3} alt="" />
                <div className="name">Waduge IM</div>
                <div className="age">24 Years</div>
                <div className="role">UI UX Designer</div>
              </div>
              <div className="member">
                <img className="proPic" src={figure4} alt="" />
                <div className="name">Dinesh MV</div>
                <div className="age">24 Years</div>
                <div className="role">Database Engineer</div>
              </div>
              <div className="member">
                <img className="proPic" src={figure5} alt="" />
                <div className="name">Jayasekara BR</div>
                <div className="age">24 Years</div>
                <div className="role">Mobile App Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
