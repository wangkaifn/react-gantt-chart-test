import React from "react";
import { FixedSizeList as List } from "react-window";

const GanttChart = ({ tasks }) => {
  const chartWidth = 800;
  const barHeight = 20;
  const barGap = 10;
  const chartPadding = 20;
  const minBarWidth = 5;

  const getMaxEndDate = (tasks) => {
    return tasks.reduce((max, task) => {
      const endDate = new Date(task.endDate);
      return endDate > max ? endDate : max;
    }, new Date(tasks[0].endDate));
  };

  const getMinStartDate = (tasks) => {
    return tasks.reduce((min, task) => {
      const startDate = new Date(task.startDate);
      return startDate < min ? startDate : min;
    }, new Date(tasks[0].startDate));
  };

  const minStartDate = getMinStartDate(tasks);
  const maxEndDate = getMaxEndDate(tasks);
  const totalDuration = maxEndDate - minStartDate;

  const getBarX = (startDate) => {
    return (
      ((new Date(startDate) - minStartDate) / totalDuration) *
        (chartWidth - 2 * chartPadding) +
      chartPadding
    );
  };

  const getBarWidth = (startDate, endDate) => {
    const width =
      ((new Date(endDate) - new Date(startDate)) / totalDuration) *
      (chartWidth - 2 * chartPadding);
    return Math.max(width, minBarWidth);
  };

  const Row = ({ index, style }) => {
    const task = tasks[index];
    return (
      <div style={{ ...style, display: "flex", alignItems: "center" }}>
        <svg width={chartWidth} height={barHeight}>
          <rect
            x={getBarX(task.startDate)}
            y={0}
            width={getBarWidth(task.startDate, task.endDate)}
            height={barHeight}
            fill="blue"
          />
        </svg>
      </div>
    );
  };

  return (
    <svg width={chartWidth} height={400}>
      <foreignObject width={chartWidth} height={400}>
        <div style={{ height: "400px", overflowY: "auto" }}>
          <List
            height={400}
            itemCount={tasks.length}
            itemSize={barHeight + barGap}
            width={chartWidth}
          >
            {Row}
          </List>
        </div>
      </foreignObject>
    </svg>
  );
};

export default GanttChart;
