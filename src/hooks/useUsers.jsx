import { useState, useEffect } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterParams, setFilterParams] = useState({
    column: "fullName",
  });

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const age = user.age.toString();
    const gender = user.gender.toLowerCase();
    const phone = user.phone.toLowerCase();
    const address =
      `${user.address.city} ${user.address.address}`.toLowerCase();

    const searchColumn = filterParams.column;

    if (searchColumn === "fullName")
      return fullName.includes(searchTerm.toLowerCase());
    if (searchColumn === "age") return age.includes(searchTerm);
    if (searchColumn === "gender")
      return gender.includes(searchTerm.toLowerCase());
    if (searchColumn === "phone")
      return phone.includes(searchTerm.toLowerCase());
    if (searchColumn === "address")
      return address.includes(searchTerm.toLowerCase());

    return false;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key.includes(".")) {
      const keys = sortConfig.key.split(".");
      aValue = keys.reduce((obj, key) => obj[key], a);
      bValue = keys.reduce((obj, key) => obj[key], b);
    }

    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  const sortUsers = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      key = null;
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }

    if (sortConfig.direction === "ascending") {
      return " ▲";
    }

    if (sortConfig.direction === "descending") {
      return " ▼";
    }

    return " ↔";
  };

  return {
    users: sortedUsers,
    searchTerm,
    setSearchTerm,
    sortUsers,
    selectedUser,
    setSelectedUser,
    getSortIndicator,
    filterParams,
    setFilterParams,
  };
};

export default useUsers;
