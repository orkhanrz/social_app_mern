import "./profileIntro.css";

import {
  BusinessCenter,
  Favorite,
  Home,
  LocationOn,
  RssFeed,
  School,
} from "@mui/icons-material";

export default function ProfileIntro({ user }) {
  return (
    <div className="profileIntro card">
      <div className="profileIntroContainer pd-8">
        <div className="profileIntroTop">
          <h3>Intro</h3>
          {user.quote ? user.quote : ""}
        </div>
        <hr />
        <div className="profileIntroBottom">
          {user.position && (
            <div className="profileIntroBottomItem">
              <span className="profileIntroBottomItemIcon">
                <BusinessCenter />
              </span>
              <p className="profileIntroBottomItemText">
                Founder and CEO at{" "}
                <span className="profileIntroBottomItemTextBold">Meta</span>
              </p>
            </div>
          )}

          {user.work && (
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
          )}

          {user.university && (
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
          )}

          {user.lives && (
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
          )}

          {user.from && (
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
          )}

          {user.relationship && (
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
          )}

          <div className="profileIntroBottomItem">
            <span className="profileIntroBottomItemIcon">
              <RssFeed />
            </span>
            <p className="profileIntroBottomItemText">
              Followed by{" "}
              <span className="profileIntroBottomItemTextBold">
                {user.followers.length} people
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
