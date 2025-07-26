import { useState, useEffect } from "react";
import { fetchUsers } from "../services/api";
import type { User } from "../types/types";

export const Users = () => {
  const [usrs, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div>
      {usrs.map((usr) => (
        <div key={usr.id}>
          <h3>{usr.username}</h3>
          <p>{usr.email}</p>
          <p>{usr.address?.city}</p>
          <p>{usr.address?.street}</p>
          <p>{usr.address?.suite}</p>
          <p>{usr.address?.zipcode}</p>
          <p>{usr.address?.geo?.lat}</p>
          <p>{usr.address?.geo?.lng}</p>
          <p>{usr.phone}</p>
          <p>{usr.website}</p>
          <p>{usr.company?.name}</p>
          <p>{usr.company?.catchPhrase}</p>
          <p>{usr.company?.bc}</p>
        </div>
      ))}
    </div>
  );
};