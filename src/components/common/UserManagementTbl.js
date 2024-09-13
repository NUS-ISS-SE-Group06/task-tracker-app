import React,{ useState } from "react";

import { BsFillTrashFill, BsFillPencilFill, BsPlus } from "react-icons/bs";

import "./Table.css";
import {  UserModal } from "./UserModal";


export const UserManagementTbl = ({ rows, deleteRow, editRow }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredRows = rows.filter(row =>
        row.username.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <UserModal
                        closeModal={() => {
                            setIsAddModalOpen(false);

                        }}

                    />
                )}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th className="expand">Email Address</th>
                        <th>User Role</th>
                        <th>Password Change Mandatory</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map((row, idx) => {


                        return (
                            <tr key={idx}>
                                <td>{row.username}</td>
                                <td>{row.name}</td>
                                <td className="expand">{row.email}</td>
                                <td>{row.userRole}</td>
                                <td>{row.passwordChangeMandatory}</td>
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