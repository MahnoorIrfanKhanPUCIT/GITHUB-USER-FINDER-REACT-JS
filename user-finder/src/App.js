import Alert from "./components/Alert";
import Button from "./components/Button";
import Paragraph from "./components/Paragraph";
import ListItems from "./components/ListItems";
import { useState } from "react";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [showError, setShowError] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleGetStarted() {
    setIsStarted(true);
  }

  function handleUsername(e) {
    const currUsername = e.target.value;
    setUsername(currUsername);
  }

  function handleSubmitUsername() {
    if (username === "") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    } else {
      getUserList(username);
      setUsername("");
    }
  }

  async function getUserList(currUsername) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${currUsername}`
      );
      const data = await res.json();
      setUserList(data.items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("ERROR IN FETCHING DATA", error);
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {!isStarted ? (
        <div className="d-flex flex-column justify-content-center align-items-center starter">
          <img
            src="/images/github.png"
            alt="github-img"
            className="github-img"
          />
          <div className="w-50 mt-5 mb-5 text-center">
            <Paragraph>
              Connecting Coders, Celebrating Diversity: GitHub User Finder
              brings together developers from all walks of life. Explore the
              rich talent within the charm of GitHub community. Get started now!
            </Paragraph>
          </div>
          <div>
            <Button handleClick={handleGetStarted}>Get Started</Button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center starter">
          <div className=" mt-5 mb-5 text-center">
            <Paragraph>
              Enter the username and get the results. Go explore....
            </Paragraph>
            <input
              className="input-field "
              type="text"
              placeholder="Enter your search..."
              value={username}
              onChange={handleUsername}
            />
          </div>
          <Button handleClick={handleSubmitUsername}>Query search</Button>
          {isLoading && <Alert color={"green"}>Loading...</Alert>}
          {showError && <Alert color={"red"}>Please enter the username</Alert>}
          {userList.length > 0 && <ListItems userList={userList} />}
        </div>
      )}
    </div>
  );
}

export default App;
