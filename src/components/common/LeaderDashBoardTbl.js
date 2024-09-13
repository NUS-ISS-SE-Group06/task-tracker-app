import React, { useState } from "react";

import { BsFillTrashFill, BsFillPencilFill, BsPlus } from "react-icons/bs";

import "./Table.css";
import { LeaderDashBoardModal } from "./LeaderDashBoardModal";


export const LeaderDashBoardTbl = ({ rows, deleteRow, editRow }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredRows = rows.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNew = () => {
        setIsAddModalOpen(true);
    };
    return (
        <div className="table-wrapper">
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="add-new-btn" onClick={handleAddNew}><BsPlus /></button>
                {isAddModalOpen && (
                    <LeaderDashBoardModal
                        closeModal={() => {
                            setIsAddModalOpen(false);

                        }}

                    />
                )}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th className="expand">User Name</th>
                        <th>Group ID</th>
                        <th>Group Name</th>
                        <th>Task Reward Point</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map((row, idx) => {


                        return (
                            <tr key={idx}>
                                <td>{row.id}</td>
                                <td>{row.userId}</td>
                                <td className="expand">{row.name}</td>
                                <td>{row.groupId}</td>
                                <td>{row.groupName}</td>
                                <td>{row.taskRewardPoint}</td>

                                <td className="fit">
                                    <span className="actions">
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(idx)}
                                        />
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(idx)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};