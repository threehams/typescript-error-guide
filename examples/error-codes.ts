export {};
// https://github.com/Microsoft/TypeScript/blob/9c71eaf59040ae75343da8cdff01344020f5bba2/lib/diagnosticMessages.generated.json

const doStuff = (thing: "thing" | "stuff") => {};

["thing", "stuff"].map(thing => {
  doStuff(thing);
});

(["thing", "stuff"] as const).map(thing => {
  doStuff(thing);
});
