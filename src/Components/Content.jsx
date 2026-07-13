import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";

const Content = () => {
  const [items, setItems] = useState([
    { id: 1, label: "HTML & CSS", checked: true },
    { id: 2, label: "Javascript", checked: true },
    { id: 3, label: "React Js", checked: false },
  ]);

  const [newItem, setNewItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEleID, setCurrentEleId] = useState(null);

  const handleChecked = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleDelete = (id) => {
    setItems(
      items
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, id: index + 1 })),
    );
  };

  const handleAddOrSave = () => {
    if (isEditing) {
      setItems(
        items.map((item) =>
          item.id === currentEleID ? { ...item, label: newItem } : item,
        ),
      );
      setCurrentEleId(null);
      setIsEditing(false);
      setNewItem("");
    } else {
      if (newItem.trim() === "") {
        alert("Task cannot be empty");
        return;
      }
      setItems([
        ...items,
        { id: items.length + 1, label: newItem, checked: false },
      ]);
      setNewItem("");
    }
  };

  const handleUpdate = (id) => {
    const item = items.find((item) => item.id === id);
    setNewItem(item.label);
    setIsEditing(true);
    setCurrentEleId(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddOrSave();
  };

  const pending = items.filter((item) => !item.checked).length;
  const completed = items.filter((item) => item.checked).length;

  return (
    <main style={styles.wrapper}>
      <div style={styles.stats}>
        <div style={styles.statBox}>
          <span style={styles.statNumber}>{items.length}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.statBox}>
          <span style={{ ...styles.statNumber, color: "#4caf50" }}>
            {completed}
          </span>
          <span style={styles.statLabel}>Done</span>
        </div>
        <div style={styles.statBox}>
          <span style={{ ...styles.statNumber, color: "#dc2626" }}>
            {pending}
          </span>
          <span style={styles.statLabel}>Pending</span>
        </div>
      </div>

      <div style={styles.inputRow}>
        <input
          type="text"
          value={newItem}
          placeholder={isEditing ? "Edit task..." : "Add new task..."}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button
          onClick={handleAddOrSave}
          style={styles.addBtn}
          title={isEditing ? "Save" : "Add"}
        >
          {isEditing ? (
            <CiSaveDown2 size={22} color="white" />
          ) : (
            <IoMdAddCircle size={22} color="white" />
          )}
        </button>
      </div>

      {items.length === 0 && (
        <p style={styles.emptyText}>No tasks yet. Add one above!</p>
      )}

      <ul style={styles.list}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{ ...styles.item, opacity: item.checked ? 0.6 : 1 }}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleChecked(item.id)}
              style={styles.checkbox}
            />
            <label
              style={{
                ...styles.label,
                textDecoration: item.checked ? "line-through" : "none",
              }}
            >
              {item.label}
            </label>
            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => handleUpdate(item.id)}
                title="Edit"
              >
                <FaEdit size={14} />
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
                title="Delete"
              >
                <FaTrashCan size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

const styles = {
  wrapper: {
    maxWidth: "520px",
    margin: "40px auto",
    padding: "0 16px",
  },
  stats: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    justifyContent: "center",
  },
  statBox: {
    background: "white",
    borderRadius: "12px",
    padding: "16px 24px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  statNumber: {
    fontSize: "1.8em",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  statLabel: {
    fontSize: "0.8em",
    color: "#888",
    marginTop: "4px",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    height: "48px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    padding: "0 16px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  addBtn: {
    width: "48px",
    height: "48px",
    background: "#1a1a2e",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    padding: "40px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "white",
    padding: "14px 16px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "opacity 0.2s",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#1a1a2e",
  },
  label: {
    flex: 1,
    fontSize: "15px",
    color: "#333",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    background: "#fff8e1",
    border: "none",
    borderRadius: "6px",
    padding: "6px 8px",
    cursor: "pointer",
    color: "#f59e0b",
    display: "flex",
    alignItems: "center",
  },
  deleteBtn: {
    background: "#fff1f1",
    border: "none",
    borderRadius: "6px",
    padding: "6px 8px",
    cursor: "pointer",
    color: "#dc2626",
    display: "flex",
    alignItems: "center",
  },
};

export default Content;
