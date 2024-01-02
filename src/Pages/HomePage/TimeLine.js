import Post from "./Post";
import "./home.scss";
import {
  postReducer,
  postActions,
  initialPostState,
} from "../../ContextApi/PostReducer";
import { useReducer } from "react";

const TimeLine = ({ uid, id, logo, name, email, text, image, timestamp }) => {
  const [state, dispatch] = useReducer(postReducer, initialPostState);

  const feeds = [
    {
      id: 1,
      name: "Onobun Seun",
      userId: 1,
      profilePicture:
        "https://images.unsplash.com/photo-1492462543947-040389c4a66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
      image:
        "https://images.unsplash.com/photo-1589483232748-515c025575bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    },
    {
      id: 2,
      name: "Arieman Bashir",
      userId: 2,
      profilePicture:
        "https://plus.unsplash.com/premium_photo-1661349615132-31544f9f0467?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
    },
    {
      id: 3,
      name: "Okosun Aiwanose",
      userId: 3,
      profilePicture:
        "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      image:
        "https://images.pexels.com/photos/5050139/pexels-photo-5050139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      name: "Mohammed Jega",
      userId: 4,
      profilePicture:
        "https://images.unsplash.com/photo-1686287118358-2ac201c8cb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
    },
    {
      id: 5,
      name: "Oyakhilome Samson",
      userId: 5,
      profilePicture:
        "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
      image:
        "https://images.pexels.com/photos/9731990/pexels-photo-9731990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 6,
      name: "Orisha Segun",
      userId: 6,
      profilePicture:
        "https://images.unsplash.com/photo-1457367756802-2c6127b8ad11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE2fHxibGFjayUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      image:
        "https://images.pexels.com/photos/6578752/pexels-photo-6578752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 ",
    },
    {
      id: 7,
      name: "Okoh Eseose",
      userId: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
      image:
        "https://images.pexels.com/photos/5956951/pexels-photo-5956951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  return (
    <div className="TimeLine">
      {/* {feeds.map((feed) => {
        return <Post feed={feed} key={feed.id} />;
      })} */}

      {/* {state?.error ? (
        <div className="alert">
          <div color="red">Something went wrong refresh and try again...</div>
        </div>
      ) : (
        <div>
          {state?.posts?.length > 0 &&
            state?.posts?.map((post, index) => (
              <Post
                key={index}
                logo={post?.logo}
                id={post?.documentId}
                uid={post?.uid}
                name={post?.name}
                email={post?.email}
                image={post?.image}
                text={post?.text}
                timestamp={new Date(post?.timestamp?.toDate())?.toUTCString()}
              />
            ))}
        </div>
      )} */}
    </div>
  );
};

export default TimeLine;
