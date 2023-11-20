import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import "./topbarMessenger.css";

import {
  MoreHoriz,
  OpenWith,
  RateReviewOutlined,
  Search,
} from "@mui/icons-material";

import Conversation from "../../conversation/Conversation";

export default function TopbarMessenger({ messengerMenu, toggleMessenger }) {
  const [conversations, setConversations] = useState([]);
  const { user: me } = useContext(AuthContext);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`/conversations/users/${me._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchConversations();
  }, [me]);

  return (
    <div className={`topbarMessenger card ${messengerMenu ? "active" : ""}`}>
      <div className="topbarMessengerTop">
        <h3 className="topbarMessengerTopText">Chats</h3>
        <div className="topbarMessengerTopButtons">
          <span className="topbarMessengerTopButton">
            <MoreHoriz />
          </span>
          <span className="topbarMessengerTopButton">
            <OpenWith />
          </span>
          <span className="topbarMessengerTopButton">
            <RateReviewOutlined />
          </span>
        </div>
      </div>
      <div className="topbarMessengerInputWrapper">
        <span className="topbarMessengerInputIcon">
          <Search />
        </span>
        <input type="text" placeholder="Search Messenger" />
      </div>
      <div className="topbarMessengerConversations">
        {conversations.map((conversation) => {
          const user = conversation.users.filter((u) => u._id !== me._id)[0];

          return (
            <Conversation
              conversation={conversation}
              toggleMessenger={toggleMessenger}
              user={user}
              key={conversation._id}
            />
          );
        })}
      </div>
      <hr />
      <div className="topbarMessengerBottom">
        <p className="topbarMessengerBottomBtn">See all in Messenger</p>
      </div>
    </div>
  );
}
