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
          {user.bio ? <p>{user.bio}</p> : ""}
        </div>
        <hr />
        <div className="profileIntroBottom">
          {user.position && (
            <div className="profileIntroBottomItem">
              <span className="profileIntroBottomItemIcon">
                <BusinessCenter />
              </span>
              <p className="profileIntroBottomItemText">
                {user.position} at{" "}
                <span className="profileIntroBottomItemTextBold">
                  {user.work}
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
                Studied {user.universityField ? `${user.universityField}` : ""}{" "}
                at <span className="profileIntroBottomItemTextBold">{user.university}</span>
              </p>
            </div>
          )}

          {user.school && (
            <div className="profileIntroBottomItem">
              <span className="profileIntroBottomItemIcon">
                <School />
              </span>
              <p className="profileIntroBottomItemText">
                Went to{" "}
                <span className="profileIntroBottomItemTextBold">
                  {user.school}
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
                  {user.lives}
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
                  {user.from}
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
                {user.relationship}
                {/* <span className="profileIntroBottomItemTextBold">
                  Priscilla Chan
                </span> */}
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
