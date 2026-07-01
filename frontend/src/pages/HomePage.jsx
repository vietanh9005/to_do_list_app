import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState();
  const [completedTaskCount, setCompletedTaskCount] = useState();
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  // logic
  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
    } catch (error) {
      console.error("Can't find tasks:", error);
      toast.error("Can't find tasks.");
    }
  }, [dateQuery]);

  useEffect(() => {
    void Promise.resolve().then(fetchTasks);
  }, [fetchTasks]);

  const handleTaskChange = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleDateQueryChange = (newDateQuery) => {
    setDateQuery(newDateQuery);
    setPage(1);
  };

  // variable
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / visibleTaskLimit),
  );

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit,
  );

  if (visibleTasks.length === 0) {
    handlePrev();
  }
  return (
    <div className="min-h-screen w-full relative">
      {/* Azure Depths */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6 relative z-10">
          <Header />

          <AddTask handleNewTaskAdded={handleTaskChange} />

          <StatsAndFilters
            filter={filter}
            setFilter={handleFilterChange}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />

          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChange={handleTaskChange}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dateQuery={dateQuery}
              setDateQuery={handleDateQueryChange}
            />
          </div>

          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
