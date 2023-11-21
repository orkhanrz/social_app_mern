import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import TimeAgo from "react-timeago";
import axios from "axios";
import "./messengerBottom.css";
import { io } from "socket.io-client";

import {
  AddCircle,
  Close,
  HorizontalRule,
  KeyboardArrowDown,
  Phone,
  Send,
  SentimentSatisfied,
  Videocam,
} from "@mui/icons-material";

export default function MessengerBottom({ messenger, toggleMessenger }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { user: me } = useContext(AuthContext);
  const [socket, setSocket] = useState();
  const scrollRef = useRef();

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_BACKEND_URL, {autoConnect: true}));
  }, []);

  useEffect(() => {
    const joinUser = () => {
      console.log(socket);
      socket.emit('join', ({userId: me._id, socketId: socket.id}));
    }

    socket?.on('connect', joinUser);

    return () => {
      socket?.disconnect();
    };
  }, [socket, me]);

  useEffect(() => {
    const receiveMessage = (message) => {
      if (message.from === messenger.user._id){
        setMessages(prevState => [...prevState, message]);
      }
    }

    socket?.on('message', receiveMessage);

    return () => {
      socket?.disconnect('message', receiveMessage);
    }
  }, [messenger, socket]);

  //Scroll to bottom when new message appears
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/messages/" + messenger.conversationId);

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [messenger]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = {
      from: me._id,
      to: messenger.user._id,
      message: input,
      conversationId: messenger.conversationId,
      date: Date.now(),
    };

    try {
      const res = await axios.post("/messages", message);
      setMessages((prevState) => [...prevState, res.data]);
      setInput("");
      socket?.emit('message', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`messengerBottom ${messenger.state ? "active" : ""}`}>
      <div className="messengerBottomContainer">
        <div className="messengerBottomTop">
          <div className="messengerBottomTopLeft">
            <div className="messengerBottomTopLeftImg">
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL +
                  messenger.user.profilePicture
                }
                alt="profile"
              />
            </div>
            <h4 className="messengerBottomTopLeftUsername">
              {messenger.user.firstName} {messenger.user.lastName}
            </h4>
            <span className="messengerBottomTopLeftButton">
              <KeyboardArrowDown />
            </span>
          </div>
          <div className="messengerBottomTopRight">
            <span className="messengerBottomTopRightButton">
              <Phone />
            </span>
            <span className="messengerBottomTopRightButton">
              <Videocam />
            </span>
            <span className="messengerBottomTopRightButton">
              <HorizontalRule />
            </span>
            <span
              className="messengerBottomTopRightButton"
              onClick={() => toggleMessenger(false, null)}
            >
              <Close />
            </span>
          </div>
        </div>
        <div className="messengerBottomMessages">
          <div className="messengerBottomMessagesTop">
            <img
              src={
                process.env.REACT_APP_BACKEND_URL +
                messenger.user.profilePicture
              }
              alt="profile"
              className="messengerBottomMessagesTopImg"
            />
            <h3 className="messengerBottomMessagesTopUsername">
              {messenger.user.firstName} {messenger.user.lastName}
            </h3>
            <p className="messengerBottomMessagesTopText">
              You're friends on Facebook
            </p>
          </div>
          {messages.map((m) => {
            return (
              <div key={m._id} className="messengerBottomMessagesItem">
                <p className="messengerBottomMessagesItemDate">
                  <TimeAgo date={m.date} />
                </p>
                <div
                  className="messengerBottomMessagesItemWrapper"
                  ref={scrollRef}
                >
                  {m.from === messenger.user._id ? (
                    <div className="messengerBottomMessagesItemSender">
                      <img
                        className="messengerBottomMessagesItemSenderImg"
                        src={
                          process.env.REACT_APP_BACKEND_URL +
                          messenger.user.profilePicture
                        }
                        alt="profile"
                      />
                      <div className="messengerBottomMessagesItemSenderMessages">
                        <p className="messengerBottomMessagesItemSenderText">
                          {m.message}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="messengerBottomMessagesItemReceiver">
                      <div className="messengerBottomMessagesItemReceiverMessages">
                        <p className="messengerBottomMessagesItemReceiverText">
                          {m.message}
                        </p>
                      </div>
                      <img
                        className="messengerBottomMessagesItemReceiverImg"
                        src={
                          process.env.REACT_APP_BACKEND_URL + me.profilePicture
                        }
                        alt="profile"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <form className="messengerBottomActions" onSubmit={sendMessage}>
          <span className="messengerBottomActionsBtn">
            <AddCircle />
          </span>
          <div className="messengerBottomActionsInputWrapper">
            <input
              type="text"
              placeholder="Aa"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <span className="messengerBottomActionsInputIcon">
              <SentimentSatisfied />
            </span>
          </div>
          <button type="submit" className="messengerBottomActionsBtn">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}
