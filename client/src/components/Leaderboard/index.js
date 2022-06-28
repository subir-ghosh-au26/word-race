import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineProgress } from "react-preloader-tmnt";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table className="leaderboard__table">
        <thead>
          <tr>
            <th>Sr. no</th>
            <th>User</th>
            <th>Score</th>
            <th>Max Level</th>
          </tr>
        </thead>
        <tbody>
          {stats?.map((stats, index) => {
            return (
              <tr key={stats.id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/user-stats/${stats.users.id}`}>
                    {stats.users.name}
                  </Link>
                </td>
                <td>{stats.score}</td>
                <td>{stats.level}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <LineProgress loading={loading} color="blue" />
    </div>
  );
};

export default Leaderboard;
