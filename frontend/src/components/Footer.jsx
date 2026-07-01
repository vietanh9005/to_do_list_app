import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Congratulations!You have completed {completedTasksCount}{" "}
                tasks
                {activeTasksCount > 0 &&
                  `,only ${activeTasksCount} tasks to go.Keep it up!`}
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Let's start on your {activeTasksCount} remaining tasks!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
