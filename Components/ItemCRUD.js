import React, { useState, useEffect } from "react";
import axios from "axios";
import UserData from "./UserData";

function ItemCRUD() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const [data, setData] = useState([]);

  //1.A state variable is changed by its setter only.
  //2.when a state variable is changed the component is re-rendered i.e the return block  () executes again
  //3. useEffect explaind below.

  //It gets executed only once after mount is complete
  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint you want to fetch data from
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        // Use slice to get only the first 10 results
        const first10Results = response.data.slice(0, 10);
        setData(first10Results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    //setCounter(counter+1)
    //console.log("first useEffect called");
  }, []);

  //It gets executed after mount. and also when the counter variable is updated.
  useEffect(() => {
    console.log("second useEffect called");
    //setCounter(counter + 1);
  }, [counter, data]);

  //It gets executed after mount. and also when the any state variable is updated.
  // useEffect(() => {
  //   console.log("third useEffect");
  // });

  //   useEffect(() => {
  //     // Fetch items from your API or a local data source
  //     // For this example, we'll use a hardcoded array
  //     const initialItems = [
  //       { id: 1, name: "Item 1 " },
  //       { id: 2, name: "Item 2 " },
  //       { id: 3, name: "Item 3 " },
  //     ];
  //     setItems(initialItems);
  //   }, []);

  const handleAddItem = () => {
    // Create a new item and add it to the list
    const newItemObj = { id: items.length + 1, name: newItem };
    setItems([newItemObj, ...items]);
    setNewItem("");
  };

  const handleEditItem = (id) => {
    // Set the item you want to edit
    const itemToEdit = items.find((item) => item.id === id);
    setEditingItem(itemToEdit);
  };

  const handleUpdateItem = () => {
    // Update the item
    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? { ...item, name: editingItem.name } : item
    );
    setItems(updatedItems);
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    // Delete the item
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingItem?.id === item.id ? (
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, name: e.target.value })
                }
              />
            ) : (
              item.name
            )}
            <button onClick={() => handleEditItem(item.id)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            {editingItem?.id === item.id && (
              <button onClick={handleUpdateItem}>Update</button>
            )}
          </li>
        ))}
      </ul>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <UserData data={data} />
          </tbody>
        </table>
        <h1>CRUD Operations</h1>
        <input
          type="text"
          placeholder="New item"
          value={newItem}
          onChange={(e) => data.push(e.target.value)}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
    </div>
  );
}

export default ItemCRUD;
