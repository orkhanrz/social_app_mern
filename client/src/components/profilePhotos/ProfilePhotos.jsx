import "./profilePhotos.css";
import { Link } from "react-router-dom";

export default function ProfilePhotos() {
  return (
    <div className="profilePhotosBottom">
      <Link to="/orkhanrz/photos/1" className="profilePhotosPhoto">
        <img src="/assets/images/image1.jpg" alt="photos item" />
      </Link>
      <Link to="/orkhanrz/photos/1" className="profilePhotosPhoto">
        <img src="/assets/images/image1.jpg" alt="photos item" />
      </Link>
      <Link to="/orkhanrz/photos/1" className="profilePhotosPhoto">
        <img src="/assets/images/image2.jpg" alt="photos item" />
      </Link>
      <Link to="/orkhanrz/photos/1" className="profilePhotosPhoto">
        <img src="/assets/images/image1.jpg" alt="photos item" />
      </Link>
      <Link to="/orkhanrz/photos/1" className="profilePhotosPhoto">
        <img src="/assets/images/image1.jpg" alt="photos item" />
      </Link>
      <Link to="/orkhanrz/photos/1" className="profilePhotosPhoto">
        <img src="/assets/images/image1.jpg" alt="photos item" />
      </Link>
    </div>
  );
}
