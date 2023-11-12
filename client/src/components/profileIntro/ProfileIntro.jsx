import "./profileIntro.css";

import {
  BusinessCenter,
  Favorite,
  Home,
  LocationOn,
  RssFeed,
  School,
} from "@mui/icons-material";

export default function ProfileIntro() {
  return (
    <div className="profileIntro card">
      <div className="profileIntroContainer pd-8">
        <div className="profileIntroTop">
          <h3>Intro</h3>
          <p>Bringing the world closer together.</p>
        </div>
        <hr />
        <div className="profileIntroBottom">
          <div className="profileIntroBottomItem">
            <span className="profileIntroBottomItemIcon">
              <BusinessCenter />
            </span>
            <p className="profileIntroBottomItemText">
              Founder and CEO at{" "}
              <span className="profileIntroBottomItemTextBold">
                Meta
              </span>
            </p>
          </div>
          <div className="profileIntroBottomItem">
            <span className="profileIntroBottomItemIcon">
              <BusinessCenter />
            </span>
            <p className="profileIntroBottomItemText">
              Works at{" "}
              <span className="profileIntroBottomItemTextBold">
                Chan Zuckerberg Initiative
              </span>
            </p>
          </div>
          <div className="profileIntroBottomItem">
            <span className="profileIntroBottomItemIcon">
              <School />
            </span>
            <p className="profileIntroBottomItemText">
              Studied Computer Science and Psychology at{" "}
              <span className="profileIntroBottomItemTextBold">
                Harvard University
              </span>
            </p>
          </div>
          <div className="profileIntroBottomItem">
            <span className="profileIntroBottomItemIcon">
              <Home />
            </span>
            <p className="profileIntroBottomItemText">
              Lives in{" "}
              <span className="profileIntroBottomItemTextBold">
                Palo Alto, California
              </span>
            </p>
          </div>
          <div className="profileIntroBottomItem">
            <span className="profileIntroBottomItemIcon">
              <LocationOn />
            </span>
            <p className="profileIntroBottomItemText">
              From{" "}
              <span className="profileIntroBottomItemTextBold">
                Dobbs Ferry, New York
              </span>
            </p>
          </div>
          <div className="profileIntroBottomItem">
            <span className="profileIntroBottomItemIcon">
              <Favorite />
            </span>
            <p className="profileIntroBottomItemText">
              Married to{" "}
              <span className="profileIntroBottomItemTextBold">
                Priscilla Chan
              </span>
            </p>
          </div>
          <div className="profileIntroBottomItem">
            <span className="profileIntroBottomItemIcon">
              <RssFeed />
            </span>
            <p className="profileIntroBottomItemText">
              Followed by{" "}
              <span className="profileIntroBottomItemTextBold">
                119,478,068 people
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
