import React from "react";
import { FaUser } from 'react-icons/fa';

const TicketCard = ({ ticket, mapPriorityToLabel, statusIcons, priorityIcons }) => {
    console.log("t",ticket);
    const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <div className="ticket-card">
      <div className="ticket-id">{ticket.id}</div>
      <div className="ticket-title">
        {statusIcons[ticket.status]}
        {ticket.title}
      </div>
      <div className="ticket-tags">
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="ticket-meta">
        <span className={`user-avatar ${ticket.userAvailable ? 'available' : ''}`}>
          <div className="user-icon-container">
          <FaUser className="user-icon" />
          <span className="user-initials">{getInitials(ticket?.userName)}</span>
        </div>
        </span>
        <span className={`priority priority-${ticket.priority}`}>
          {priorityIcons[ticket.priority]}
          {mapPriorityToLabel(ticket.priority)}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;