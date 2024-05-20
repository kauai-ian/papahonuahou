import React from "react";
import DayList from "../components/DayList";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page.</p>
      <DayList />
    </div>
  );
};

export default Home;