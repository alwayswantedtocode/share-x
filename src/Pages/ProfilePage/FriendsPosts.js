import "../HomePage/home.scss";
import FriendPost from "./FriendPost";
const FriendsPosts = () => {
  const myPost = [
    {
      id: 1,
      name: "Okoh Eseose",
      userId: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
      image:
        "https://images.unsplash.com/photo-1573164574511-73c773193279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwd29tZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Okoh Eseose",
      userId: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
    },
    {
      id: 3,
      name: "Okoh Eseose",
      userId: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      image:
        "https://images.unsplash.com/photo-1522512115668-c09775d6f424?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsYWNrJTIwd29tZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Okoh Eseose",
      userId: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
    },
    {
      id: 5,
      name: "Okoh Eseose",
      userId: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. Tempora ullam, commodi minus quam vitae cupiditate ratione eius possimus consectetur molestiae adipisci sint eos?",
      image:
        "https://images.unsplash.com/photo-1573164574230-db1d5e960238?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGJsYWNrJTIwd29tZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 6,
      name: "Okoh Eseose",
      userId: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      image:
        "https://images.unsplash.com/photo-1573167627769-e201a7ddf409?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
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
        "https://images.unsplash.com/photo-1584720205607-82d281ec08f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxibGFjayUyMHdvbWVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return (
    <div className="TimeLine">
      {myPost.map((myPost) => {
        return <FriendPost myPost={myPost} key={myPost.id} />;
      })}
    </div>
  );
};

export default FriendsPosts;
