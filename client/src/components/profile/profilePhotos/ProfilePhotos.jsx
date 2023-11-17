import "./profilePhotos.css";
import { Link, useParams } from "react-router-dom";

export default function ProfilePhotos({ photos }) {
  const {username} = useParams();

  return (
    <div className="profilePhotosBottom">
      {photos.map((p) => {
        return (
          <Link to={`/${username}/photos/${p._id}`} className="profilePhotosPhoto" key={p._id}>
            <img src={process.env.REACT_APP_BACKEND_URL + p.url} alt="photos item" />
          </Link>
        );
      })}
    </div>
  );
}
