import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import Repos from "./Repos";

const Card = ({ selectedUser }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [publicReposCount, setPublicReposCount] = useState(0);
  const [publicGistsCount, setPublicGistsCount] = useState(0);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [repos, setRepos] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${selectedUser.login}`
      );
      const data = response.data;
      console.log(data);
      setFollowersCount(data.followers);
      setFollowingCount(data.following);
      setPublicReposCount(data.public_repos);
      setPublicGistsCount(data.public_gists);
      setCompany(data.company);
      setLocation(data.location);
      setBio(data.bio);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchRepos() {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${selectedUser.login}/repos`
      );
      const data = response.data;
      setRepos(data);
    } catch (error) {
      console.error("Error fetching repos:", error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchRepos();
  }, []);

  return (
    <div>
      <div className="p-3">
        <h1>Profile Details</h1>
        <div className="head-box">
          <img
            className="card-img"
            src={selectedUser.avatar_url}
            alt={selectedUser.login}
          />
          <h2 className="mt-5">{selectedUser.login}</h2>
          <div className="box-container">
            <h3 className="box-heading">Stats</h3>
            <div className="box-data">
              <h4>Followers : {followersCount} </h4>
              <h4>Following : {followingCount} </h4>
              <h4>Public Repos : {publicReposCount} </h4>
              <h4>Public Gists : {publicGistsCount} </h4>
            </div>
          </div>
          <div className="box-container">
            <h3 className="box-heading">Other Info</h3>
            <div className="box-data ">
              <h4>Company : {!company ? "Not Provided" : company}</h4>
              <h4>Location : {!location ? "Not Provided" : location}</h4>
              <h4>Bio : {!bio ? "Not Provided" : bio}</h4>
            </div>
          </div>
          <div className="box-container">
            <h3 className="box-heading">Latest Repositories</h3>
            <div className="box-data m-0 p-0">
              <Repos user={selectedUser} repositories={repos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
