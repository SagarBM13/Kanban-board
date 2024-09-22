import React from "react";
import { FaUser } from 'react-icons/fa';
import TicketCard from "./TicketCard";

const KanbanColumn = ({ groupKey, tickets, mapPriorityToLabel, statusIcons, priorityIcons, groupBy }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderColumnIcon = () => {
    if (groupBy === 'user') {
      return (
        <div className="user-icon-container">
          <FaUser className="user-icon" />
          <span className="user-initials">{getInitials(groupKey)}</span>
        </div>
      );
    } else {
      return statusIcons[groupKey] || priorityIcons[tickets[0].priority] || <FaUser />;
    }
  };

  return (
    <div className="board-column">
      <div className="column-header">
        <div className="column-icon-wrapper">{renderColumnIcon()}</div>
        <span className="column-title">{groupKey}</span>
        <span className="ticket-count">{tickets.length}</span>
      </div>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          mapPriorityToLabel={mapPriorityToLabel}
          statusIcons={statusIcons}
          priorityIcons={priorityIcons}
        />
      ))}
    </div>
  );
};

export default KanbanColumn;