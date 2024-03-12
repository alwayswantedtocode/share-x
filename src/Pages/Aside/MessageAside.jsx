import React from "react";
import "./Message.scss";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const MessageAside = () => {
  const data = [
    {
      id: 1,
      name: "Onobun Seun",
      imageUrl:
        "https://images.unsplash.com/photo-1492462543947-040389c4a66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      discription: "is online, would you like to send a direct message?",
    },
    {
      id: 2,
      name: "Arieman Bashir",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661349615132-31544f9f0467?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      discription: "is online, would you like to send a direct message?",
    },
    {
      id: 3,
      name: "Okosun Aiwanose",
      imageUrl:
        "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      discription: "is online, would you like to send a direct message?",
    },
    {
      id: 4,
      name: "Mohammed Jega",
      imageUrl:
        "https://images.unsplash.com/photo-1686287118358-2ac201c8cb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
      discription: "is online, would you like to send a direct message?",
    },
    {
      id: 5,
      name: "Oyakhilome Samson",
      imageUrl:
        "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      discription: "is online, would you like to send a direct message?",
    },
    {
      id: 6,
      name: "Orisha Segun",
      imageUrl:
        "https://images.unsplash.com/photo-1457367756802-2c6127b8ad11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE2fHxibGFjayUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      discription: "is online, would you like to send a direct message?",
    },
    {
      id: 7,
      name: "Okoh Eseose",
      imageUrl:
        "https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const latestFilter = data.filter((items) => items.id < 7);

  return (
    <article className="Message">
      <div className="container">
        <div className="Topheading">
          <span className="chat">
            <h1>Chat</h1>
          </span>
          <div className="btn">
            <button>
              <MdOutlineMoreHoriz />
            </button>
            <button>
              <FiEdit />
            </button>
          </div>
        </div>
        <div className="items">
          <h4>Contact</h4>
          {latestFilter.map((latest) => {
            const { id, name, imageUrl, discription } = latest;
            return (
              <div className="user" key={id}>
                <div className="userInfo">
                  <div className="image">
                    <img src={imageUrl} alt="" />
                  </div>
                  <div className="notice">
                    <span>{name}</span>
                    <p>{discription}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default MessageAside;
