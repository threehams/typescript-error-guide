Let's say you start out with a functions that works with strings:

```tsx
const last = (item: string) => {
  return item[item.length - 1];
};

const lastChar = last("things"); // OK!
lastChar.toString(); // also OK
```

After using it for a bit, you find a usage for arrays of numbers: but you realize that the return value is now `string | number`

```tsx
const last = (item: string | number[]) => {
  return item[item.length - 1];
};

const lastChar = last("things"); // OK!
lastChar.length; // error - this doesn't exist on `number`
```

It would be really nice if TypeScript could figure this stuff out. This is where generics come in. A generic is a type which accepts arguments, just as a function accepts arguments.

Simple example:

```tsx
interface Location<Query> {
  pathname: string;
  query: Query;
}

const locationWithoutQuery: Location<null> = {
  pathname: "/",
  query: null, // OK!
};

const locationWithQuery: Location<{ id: string }> = {
  pathname: "/",
  query: { personId: "1" }, // error: query must include "id"
};
```

Let's use this above:

```tsx
type Last<TItem> = (item: TItem) => TItem;
const last: Last<> = item => {
  return item[item.length - 1];
};

const lastChar = last("things"); // OK!
lastChar.toString(); // also OK
```

An important note is that generics aren't a replacement for union types. TS doesn't currently treat a generic function as a union type.

```tsx
interface PacketMap {
  Foo: {
    prop: string;
  };
  Bar: number;
}

type PacketType = keyof PacketMap;

const encodePacket = <T extends PacketType>(packet: {
  type: T;
  data: PacketMap[T];
}) => {
  if (packet.type === "Foo") {
    return `0${packet.data.prop}`;
  } else if (packet.type === "Bar") {
    return `1${packet.data}`;
  }
};
```
