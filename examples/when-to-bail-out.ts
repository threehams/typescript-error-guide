// avoid polluting other files
export {};
declare const camelizeKeys: (obj: object) => object;

// example: camelize/decamelize. not worth typing. do it
// before reaching typed code

interface UserResponse {
  [key: string]: {
    id: string;
    name: string;
    phone?: string;
  };
}

fetch("/users")
  .then(response => response.json())
  .then(json => camelizeKeys(json) as UserResponse);
