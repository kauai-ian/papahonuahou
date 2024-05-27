import React from "react";
import DayList from "../components/DayListv2";
import NewEventModal from "../components/NewEventModal";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page.</p>
      <div>
        <NewEventModal isOpen={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </div>
      <DayList />
    </div>
  );
};

export default Home;
