import { Card } from "antd";
import GanttChart from "./GanttChart";

// 生成大量任务数据
const generateTasks = (numTasks) => {
  const tasks = [];
  for (let i = 0; i < numTasks; i++) {
    const startDate = new Date(2023, 9, 1 + i); // 从2023-10-01开始
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10) + 1); // 随机持续1到10天
    tasks.push({
      id: i + 1,
      name: `Task ${i + 1}`,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });
  }
  return tasks;
};

function App() {
  const tasks = generateTasks(200000);
  return (
    <Card>
      <GanttChart tasks={tasks} />
    </Card>
  );
}

export default App;
