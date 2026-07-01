import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success(`Task ${newTaskTitle} has been added.`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("Error adding new task.", error);
        toast.error("Error adding task");
      }
      setNewTaskTitle("");
    } else {
      toast.error("Need to insert task's title");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-transparent shadow-custom-lg">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Add a new task..."
          className="h-10 text-base bg-slate-200 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/50"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="gradient"
          size="lg"
          className="px-6 bg-purple-800"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Add Task
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
