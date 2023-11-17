import './profileEvents.css';
import { Cake } from "@mui/icons-material";

export default function ProfileEvents() {
  return (
    <div className="profileEvents">
      <div className="profileEventItem">
        <div className="profileEventItemTop">
          <img
            src="/assets/images/image1.jpg"
            alt=""
            className="profileEventImg"
          />
          <span className="profileEventIcon">
            <Cake />
          </span>
        </div>
        <div className="profileEventItemBottom">
          <h3 className="profileEventTitle">Aurelia was born</h3>
          <span className="profileEventDate">March 24</span>
        </div>
      </div>
      <div className="profileEventItem">
        <div className="profileEventItemTop">
          <img
            src="/assets/images/image1.jpg"
            alt=""
            className="profileEventImg"
          />
          <span className="profileEventIcon">
            <Cake />
          </span>
        </div>
        <div className="profileEventItemBottom">
          <h3 className="profileEventTitle">Aurelia was born</h3>
          <span className="profileEventDate">March 24</span>
        </div>
      </div>
    </div>
  );
}
