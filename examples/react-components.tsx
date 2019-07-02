import React from "react";

() => {
  // Don't rely on inference for function components; it just shuffles
  // errors around.
  const View = () => {
    return undefined; // no error here, but this is a runtime error
  };

  // instead: confusing error here!
  <View />;
};

() => {
  // Add the props interface to the FC generic, not to the props
  // object itself. This gives you `children` automatically
  interface ViewProps {
    active?: boolean;
  }
  const View: React.FC = ({ active }: ViewProps) => {
    return <div>{active}</div>;
  };

  const CorrectView: React.FC<ViewProps> = ({ active }) => {
    return <div>{active}</div>;
  };
};

() => {
  const Button: React.FC = ({ children }) => {
    return <button>{children}</button>;
  };

  interface ViewProps {
    active?: boolean;
  }
  // verbose error, but catches a conditional runtime error
  // returning "undefined" is a very annoying source of bugs
  const View: React.FC<ViewProps> = ({ active }) => {
    return active && <div />;
  };

  <>
    <Button>Hi</Button>
    <Button data-button aria-role="button">
      Hi
    </Button>
    <View />
  </>;
};
