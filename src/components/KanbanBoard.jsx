import React from "react";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ groupedTickets, mapPriorityToLabel, statusIcons, priorityIcons,groupBy }) => {
  return (
    <div className="board-container">
      {Object.entries(groupedTickets).map(([groupKey, tickets]) => (
        <KanbanColumn
          key={groupKey}
          groupKey={groupKey}
          groupBy={groupBy}
          tickets={tickets}
          mapPriorityToLabel={mapPriorityToLabel}
          statusIcons={statusIcons}
          priorityIcons={priorityIcons}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;