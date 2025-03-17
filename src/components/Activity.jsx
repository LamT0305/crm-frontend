import React, { useEffect } from "react";
import useActivity from "../hooks/useActivity";

function Activity({ id }) {
  const { activities, handleGetActivities } = useActivity();

  useEffect(() => {
    handleGetActivities(id);
  }, []);

  return (
    <div className="bg-white h-full px-8 py-5">
      <p className="font-bold text-xl">Activity</p>
      {activities.length !== 0 ? (
        <>Activities</>
      ) : (
        <>
          <p>No activity</p>
        </>
      )}
    </div>
  );
}

export default Activity;
