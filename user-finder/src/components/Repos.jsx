import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Repos = ({ user, repositories }) => {
  return (
    <div>
      <ul className="p-0 ">
        {repositories.slice(0, 3).map((repo) => (
          <li key={repo.id} className="repo-item">
            <h4>
              <span>
                <FontAwesomeIcon icon={faLink} />
              </span>
              {repo.name}
            </h4>
            <h5 className="mt-4 mb-4">
              Descrption :
              {!repo.description
                ? "User has not entered repo's description"
                : repo.description}
            </h5>
            <h4 className="mt-4">{repo.stargazers_count} ⭐</h4>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <span className="link-icon">
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repos;
