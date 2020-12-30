# No Index Signature Found (code ts-7053)

When first trying to access a property by variable, such as `object[key]`, you're likely to hit a `No Index Signature` error when trying to work with `string`:

```tsx
export {};
interface Person {
  name: string;
  phone: string;
}
const person: Person = {
  name: "Rock Rockman",
  phone: "800-555-2400",
};

const get = (person: Person, key: string) => {
  return person[key];
};

get(person, "name");
```

This error is useful if you're familiar with index signatures, but can misleading if you're not.

## What is an index signature?

An index signature is a way of telling TypeScript "trust me, if you ask for something on this object, it will give you a specific type."

Here's an example:

```tsx
export {};
interface TileMap {
  [key: string]: { item: string };
}
const tileMap: TileMap = {};
```

These can be used alongside other keys:

```tsx
export {};
interface CSSProperties {
  color: string;
  [key: string]: string;
}
```

## Why an index signature isn't the solution here

Let's try correcting the error by adding an index signature to our `Person` type.

```tsx
export {};
interface Person {
  name: string;
  phone: string;
  [key: string]: string;
}
const person: Person = {
  name: "Big McLargeHuge",
  phone: "800-555-2400",
};

const get = (person: Person, key: string) => {
  return person[key];
};

get(person, "name");
```

Hey, that worked! Looking a little closer, though... we have a problem. Now we can ask for things that don't really exist.

```tsx
export {};
interface Person {
  name: string;
  phone: string;
  [key: string]: string;
}
const person: Person = {
  name: "Big McLargeHuge",
  phone: "800-555-2400",
};

const get = (person: Person, key: string) => {
  return person[key];
};

get(person, "name");
get(person, "phone");
// what about other things?
get(person, "pants");
```

So we haven't really fixed the errors, we've just suppressed them. Instead, we need to look at the signature of `get` - specially, the `key`.

## Be More Specific

We originally typed `key` as `string`. This isn't really what we want, though, as it allows any string - `a`, `pants`, or the entire text of the [complete works of Shakespeare](https://ocw.mit.edu/ans7870/6/6.006/s08/lecturenotes/files/t8.shakespeare.txt).

Instead, we want to limit it just to known keys of the object. These keys are more specific than `string` - in this case, the only valid keys are `name` or `phone`. Let's start with a union type:

```tsx
export {};
interface Person {
  name: string;
  phone: string;
}
const person: Person = {
  name: "Big McLargeHuge",
  phone: "800-555-2400",
};

const get = (person: Person, key: "name" | "phone") => {
  return person[key];
};

get(person, "name");
get(person, "phone");
// good, now we get errors here
get(person, "pants");
```

That's better. Still, we don't want to repeat this every time. Luckily, there's a `keyof` keyword that does what we're looking for:

```tsx
export {};
interface Person {
  name: string;
  phone: string;
}
const person: Person = {
  name: "Big McLargeHuge",
  phone: "800-555-2400",
};

// Hover over `key` to see the reduced type: "name" | "phone"
const get = (person: Person, key: keyof Person) => {
  return person[key];
};

get(person, "name");
get(person, "phone");
get(person, "pants");
```

Great! So the problem wasn't really the lack of an index signature; our type just wasn't specific enough.

Index signatures are very useful when you understand their tradeoffs, but can lead to runtime errors and poor results from refactoring tools when misused. Here are a few cases where you might want to use one:

1. You don't control an object (it comes from a backend, for instance), and there's no way to know the keys ahead of time. An example: a list of enabled/disabled features, by key/value:

   ```tsx
   export {};
   interface FeatureFlags {
     [key: string]: boolean | undefined;
   }
   ```

2. You control an object, but the keys aren't known until runtime.

   In this example, we might have an object of tiles in a game, where the keys correspond to `x, y` coordinates:

   ```tsx
   export {};
   const tileMap = {
     "1,1": {
       item: "player",
     },
     "2,2": {
       item: "monster",
     },
   };
   ```

   Since the player and monster move around, we couldn't know the structure of this object in advance. So, the index signature ensures we know the type of the value of an object, even if we can't know its keys.

3. You're writing to an object that will never be read by your code, and it can contain any keys. Here's a tracking call to an analytics library:

   ```tsx
   interface TrackingData {
     [key: string]: string | null | undefined;
   }
   declare global {
     interface Window {
       analytics: {
         trackEvent: (data: TrackingData) => void;
       };
     }
   }
   export {};
   const track = (data: TrackingData) => {
     return window.analytics.trackEvent(data);
   };
   ```

## Additional Reading

[TypeScript Deep Dive: Index Signatures](https://basarat.gitbook.io/typescript/type-system/index-signatures)
