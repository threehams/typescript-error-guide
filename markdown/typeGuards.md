## Diagnostic Codes

ts2339

go over: why property accesses are checked for union types
it's important for refactoring, types go both ways

Why can't I just access a property?
because you're not just changing your code, you want to
be able to change the underlying data as well

```tsx
interface VideoWithType {
  type: "video";
  url: string;
  length: number;
}

interface PhotoWithType {
  kind: "photo"; // I refactored the above and forgot this one
  url: string;
}

const showMedia = (media: PhotoWithType | VideoWithType) => {
  // error - if no property check were done here, this would
  // never be true
  if (media.type === "photo") {
    media; // Photo
  }
};

interface Video {
  type: "video";
  url: string;
  length: number;
}

interface Photo {
  type: "photo";
  url: string;
}
```

using `in` is "less safe" for refactoring than other guards.
You can check any property, even something that doesn't exist on
either object. Use with caution.

```tsx
const showMoreMedia = (media: Photo | Video) => {
  if (media.type === "photo") {
    media; // Photo
  }
  // error: "Photo" does not contain property "length"
  if (media.length) {
    media;
  }
  if (media.url) {
    media; // Photo | Video
  }
  if ("length" in media) {
    media; // Video
  }
  if ("url" in media) {
    media; // Photo | Video
  }
};
```
