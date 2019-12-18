example: camelize/decamelize. not worth typing. do it
before reaching typed code

```tsx
declare const camelizeKeys: (obj: object) => object;

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
```
