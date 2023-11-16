import "./photoItem.css";

export default function PhotoItem({ item, type }) {
  return (
    <div className="photosItem">
      <div className="photosItemImage">
        <img className="photosItemImg" src={type === 'album' ? item.albumImage : item.url} alt="" />
      </div>
      {type === "album" ? (
        <div className="photosItemInfo">
          <h3 className="photosItemName">Profile pictures</h3>
          <h3 className="photosItemLength">24 item</h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
