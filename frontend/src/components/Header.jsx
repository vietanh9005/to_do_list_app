import React from "react";

const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold bg-linear-to-br from-indigo-500 via-purple-800 to-purple-900  bg-clip-text text-transparent">
        To Do List
      </h1>
      <p className="text-muted-foreground">
        Organize your tasks and boost your productivity
      </p>
    </div>
  );
};

export default Header;
