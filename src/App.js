import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import { FaCheckCircle, FaSpinner, FaTimes, FaRegCircle } from 'react-icons/fa';
import { BsFillExclamationTriangleFill, BsThreeDots } from 'react-icons/bs';
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar, MdSignalCellularAlt1Bar } from 'react-icons/md';
import "./App.css";

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || "status");
    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || "priority");

    useEffect(() => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then((response) => response.json())
            .then((data) => {
                setTickets(data.tickets);
                setUsers(data.users);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        localStorage.setItem('groupBy', groupBy);
        localStorage.setItem('sortBy', sortBy);
    }, [groupBy, sortBy]);

    const getMappedTickets = () => {
        return tickets.map((ticket) => {
            const user = users.find((user) => user.id === ticket.userId);
            return {
                ...ticket,
                userName: user ? user.name : "Unknown",
                userAvailable: user ? user.available : false,
            };
        });
    };

    const mapPriorityToLabel = (priority) => {
        switch (priority) {
            case 4: return "Urgent";
            case 3: return "High";
            case 2: return "Medium";
            case 1: return "Low";
            case 0:
            default: return "No priority";
        }
    };

    const priorityOrder = ["No priority", "Low", "Medium", "High", "Urgent"];

    const statusIcons = {
        "Backlog": <BsThreeDots />,
        "Todo": <FaRegCircle />,
        "In progress": <FaSpinner className="fa-spin" />,
        "Done": <FaCheckCircle />,
        "Canceled": <FaTimes />
    };

    const priorityIcons = {
        0: <BsThreeDots />,
        1: <MdSignalCellularAlt1Bar />,
        2: <MdSignalCellularAlt2Bar />,
        3: <MdSignalCellularAlt />,
        4: <BsFillExclamationTriangleFill />
    };

    const groupAndSortTickets = () => {
        let mappedTickets = getMappedTickets();
        let groupedTickets = {};

        if (groupBy === "status") {
            groupedTickets = groupByField(mappedTickets, "status");
        } else if (groupBy === "user") {
            groupedTickets = groupByField(mappedTickets, "userName");
        } else if (groupBy === "priority") {
            groupedTickets = groupByField(mappedTickets, "priority", true);
        }

        for (const group in groupedTickets) {
            groupedTickets[group].sort((a, b) => {
                if (sortBy === "priority") {
                    return b.priority - a.priority;
                } else if (sortBy === "title") {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        }

        if (groupBy === "priority") {
            return sortPriorityGroups(groupedTickets);
        }

        return groupedTickets;
    };

    const sortPriorityGroups = (groupedTickets) => {
        const sortedGroupedTickets = {};
        priorityOrder.forEach((priorityLabel) => {
            if (groupedTickets[priorityLabel]) {
                sortedGroupedTickets[priorityLabel] = groupedTickets[priorityLabel];
            }
        });
        return sortedGroupedTickets;
    };

    const groupByField = (tickets, field, mapPriority = false) => {
        return tickets.reduce((groups, ticket) => {
            const key = mapPriority ? mapPriorityToLabel(ticket[field]) : ticket[field];
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(ticket);
            return groups;
        }, {});
    };

    return (
        <div className="app">
            <Header
                setGroupBy={setGroupBy}
                setSortBy={setSortBy}
                groupBy={groupBy}
                sortBy={sortBy}
            />
            <KanbanBoard
                groupedTickets={groupAndSortTickets()}
                mapPriorityToLabel={mapPriorityToLabel}
                statusIcons={statusIcons}
                priorityIcons={priorityIcons}
                groupBy={groupBy}
            />
        </div>
    );
};

export default App;