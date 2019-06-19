# The Missing TypeScript Guide

This repo is a

# For Site / Application Developers

## I'm trying to start with an empty object and add properties one by one, and TypeScript gives me errors no matter what I do. I've given up and `// @ts-ignore`d them.

When you create an empty object, there's just no good way for TS to ensure that all properties have been added _after_ the object has already been specified. Don't worry, though - there are lots of ways to accomplish this, and one of them is very concise as well! See: [Build Up Object](examples/build-up-object.md).

## I'm accepting

## Why isn't TypeScript showing errors on extra properties I have on an object?

TypeScript has a system called "excess property checking" which is a great tradeoff between type safety and developer experience... provided you know how it works. Luckily, it's pretty simple. See: [Excess Property Checking](examples/excess-property-checking.md).

## How can I get a function to accept an object with a couple extra properties? My code works fine!

Same question as above! Understanding [Excess Property Checking](examples/excess-property-checking.md) will let you intentionally bypass this check where needed.

## I used `filter` but TS errors and says that something could be null/undefined.

A nullable type is a union type, such as `string | null`. To narrow types in a function like `filter`, an extra annotation is needed. See: [Filter and Reduce](examples/filter-reduce.md).

## Why can't I use `reduce` without errors?

You can! However, creating an empty object and building it up one property at a time isn't something that can really ever be checked for safety. A simple type assertion is typically all you need, but there are some nice alternatives over at [Filter and Reduce](examples/filter-reduce.md).

## I have an array of mixed object types. Why can't I narrow based on whether or not a property exists?

You can! You just have to use an `in` check to opt in to less-strict checking of properties. See the tradeoffs and other solutions in [Type Guards](examples/type-guards.md).

## I checked if something is null, and now TypeScript is complaining that something might be null.

This is usually an example of TS being especially careful with callbacks, as they may or may not be called synchronously. See: [Type Widening](examples/type-widening.md).

## Is it OK to have an object function argument with a bunch of optional properties?

Maybe! If all the options really are independently optional, that's fine. However, you may have a couple properties which are _exclusive_ of one another. Think of a function that must accept either "a" or "b", but cannot accept both at once. If this covers your case, [Dependent Properties](examples/dependent-properties.md) can help you.

## I'm using a library, and I seem to need to manually type everything for it.

This can be one of a few issues.

If the library you're using involves two functions that quietly pass information between each other between imports (example: redux `createStore()` and react-redux `connect()` or `useSelector()`), you might be interested in the [Extending Modules](examples/extending-modules.md) section. This can let you define types _once_ instead of on every usage.

If this isn't the case, your library is likely set up to accept generics. These are like function arguments, but for types. The syntax for these involves angle brackets (`<>`) and can be tricky, so see [Generics](examples/generics.md) for details.

Finally, some libraries just don't have very good type definitions available, or are so dynamic that creating good library definitions isn't possible, or require types which TypeScript just can't support yet. This is rare, but an example is the [humps](https://github.com/domchristie/humps) library which converts all keys of an object from snake_case to camelCase. For these instances, you might want to use a [Type Assertion](examples/type-assertion.md). This ties into knowing [when to bail out of types](examples/when-to-bail-out.md).

## My function accepts string | number as a type and returns string | number. I know I gave it a string but now I have to check for numbers every time.

You're looking for [Generics](examples/generics.md). These allow you to change the return value based on the arguments. Think of them like function arguments, but for types.

## Hey! I used a generic like you said, and now I'm getting type errors inside my function.

Right! Generics accept anything by default, so your `add()` function suddenly needs to accept arrays, objects, and `null`. You might want to restrict which types you accept using [Bounded Type Parameters](examples/bounded-type-parameters.md).

## I'm using Object.keys() or Object.entries() and there's some index signature error. Why is the key ending up as a `string`?

This one trips up everyone at some point. There's an explanation at [Object.keys and Object.entries](examples/object-keys-and-entries.md). Don't worry, there's a reason for it - and a few ways to opt-in to the behavior you want.

# For Library Authors

## I want to make my library work with TypeScript. What's all this .d.ts nonsense?

d.ts files are interesting. They allow you to declare the external API for your library without needing to specify

This can be challenging.

## How do I test types?

If you're writing library definitions, [Testing Types](examples/testing-types.md) can help you, by using the [Conditional Type Checks](https://github.com/dsherret/conditional-type-checks) library.
