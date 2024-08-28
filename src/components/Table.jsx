import React, { useRef } from "react";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import useUsers from "../hooks/useUsers";

const Table = () => {
  const {
    users,
    searchTerm,
    setSearchTerm,
    sortUsers,
    selectedUser,
    setSelectedUser,
    getSortIndicator,
    filterParams,
    setFilterParams,
  } = useUsers();

  const tableRef = useRef(null);

  let isResizing = false; // Флаг для отслеживания процесса изменения ширины

  const handleResize = (e, index) => {
    const th = e.target.parentElement;
    if (!th) return;

    const minWidth = 50;
    let startX = e.clientX;

    const table = tableRef.current;
    const thElements = Array.from(table.querySelectorAll("th"));

    const columns = thElements.slice(index);

    const startWidths = columns.map((th) => th.offsetWidth);

    const handleMouseMove = (e) => {
      const moveX = e.clientX - startX;
      let totalDelta = moveX;

      let newWidths = [...startWidths];
      newWidths[0] = Math.max(minWidth, startWidths[0] + totalDelta);

      for (let i = 1; i < newWidths.length; i++) {
        const availableWidth = Math.max(minWidth, startWidths[i] - totalDelta);
        newWidths[i] = availableWidth;
        totalDelta -= startWidths[i] - newWidths[i];
        if (totalDelta <= 0) break;
      }

      columns.forEach((col, i) => {
        col.style.width = `${newWidths[i]}px`;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleHeaderClick = (key) => {
    if (!isResizing) {
      sortUsers(key);
    }
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th
                className="resizable"
                onClick={() => handleHeaderClick("firstName")}
              >
                ФИО {getSortIndicator("firstName")}
                <div
                  className="resizer"
                  onMouseDown={(e) => handleResize(e, 0)}
                ></div>
              </th>
              <th
                className="resizable"
                onClick={() => handleHeaderClick("age")}
              >
                Возраст {getSortIndicator("age")}
                <div
                  className="resizer"
                  onMouseDown={(e) => handleResize(e, 1)}
                ></div>
              </th>
              <th
                className="resizable"
                onClick={() => handleHeaderClick("gender")}
              >
                Пол {getSortIndicator("gender")}
                <div
                  className="resizer"
                  onMouseDown={(e) => handleResize(e, 2)}
                ></div>
              </th>
              <th className="resizable" style={{ cursor: "auto" }}>
                Номер телефона
                <div
                  className="resizer"
                  onMouseDown={(e) => handleResize(e, 3)}
                ></div>
              </th>
              <th
                className="resizable"
                onClick={() => handleHeaderClick("address.city")}
              >
                Адрес {getSortIndicator("address.city")}
                <div
                  className="resizer"
                  onMouseDown={(e) => handleResize(e, 4)}
                ></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => setSelectedUser(user)}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>
                  {user.address.city}, {user.address.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Table;
