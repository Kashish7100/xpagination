import React, { useState, useEffect } from "react";
import "./App.css";

const PaginationTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
                if (!response.ok) throw new Error("failed to fetch data");
                const result = await response.json();
                setData(result);
            } catch (error) {
                alert("failed to fetch data");
            }
        };
        fetchData();
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="pagination-container">
          <h2>Employee Data Table</h2>
            <table className="pagination-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-controls">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {/* <span> Page {currentPage} of {totalPages} </span> */}
                <span>{currentPage}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationTable;
