import { useState } from "react";
import Card from "./Card";

const ListItems = ({ userList }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  function handleShowDetails(user) {
    setSelectedUser(user);
    setIsPressed(true);
    console.log("new user", user);
  }

  function handleCloseDetails() {
    setSelectedUser({});
    setIsPressed(false);
  }

  return (
    <div className="">
      {userList.map((user) => (
        <div className="list-item d-flex " key={user.id}>
          {selectedUser && selectedUser.id !== user.id ? (
            <>
              <img
                className="list-img"
                src={user.avatar_url}
                alt={user.login}
              />
              <div className="ms-5 mt-4">
                <h4 className="ms-5 mt-2">{user.login}</h4>
                <a
                  className="ms-5 "
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github Profile
                </a>
                <button
                  className="show-btn ms-5"
                  onClick={() => handleShowDetails(user)}
                >
                  Show Profile
                </button>
              </div>
            </>
          ) : (
            <div className="card-item">
              <Card selectedUser={selectedUser} />
              <div className=" d-flex justify-content-center align-items-center">
                <button className="show-btn" onClick={handleCloseDetails}>
                  Close Profile
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListItems;
