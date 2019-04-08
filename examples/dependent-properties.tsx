// avoid polluting other files
export {};
import React from "react";

// case: you have two properties which depend on each other
// with optionals:
interface UserWithOptionals {
  id: string;
  name?: string;
  phone?: string;
}

interface UnregisteredUser {
  id: string;
  name: null;
  phone: null;
}

interface RegisteredUser {
  id: string;
  name: string;
  phone: string;
}

const UserTile = (user: UserWithOptionals) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <span>{user.phone}</span>
    </div>
  );
};
