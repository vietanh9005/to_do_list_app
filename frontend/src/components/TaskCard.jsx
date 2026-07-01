import { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar, CheckCircle, Circle, SquarePen, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";

const TaskCard = ({ task, index, handleTaskChange }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task has been deleted");
      handleTaskChange();
    } catch (error) {
      console.error("Error deleting task.", error);
      toast.error("Error deleting task");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Task has been updated to ${updateTaskTitle}`);
      handleTaskChange();
    } catch (error) {
      console.error("Error updating task.", error);
      toast.error("Error updating task");
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(`Task ${task.title} has been marked as completed`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`Task ${task.title} is still in progress`);
      }
      handleTaskChange();
    } catch (error) {
      console.error("Error toggling task status.", error);
      toast.error("Error toggling task status");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-slate-100",
        "border-0 shawdow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* Rounded button */}

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success/80"
              : "text-muted-foreground/80 hover:text-primary",
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "completed" ? (
            <CheckCircle className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* show or edit title */}

        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Task to do"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200 ",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          {/* Creation and completion date */}

          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* edit and delete button */}

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* edit button */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* delete button */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
