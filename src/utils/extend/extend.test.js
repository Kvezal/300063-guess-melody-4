import extend from "./extend";

describe(`Extend function`, () => {
  const baseObject = {prop1: 1, prop2: 2};
  const addedObject = {newProp1: 3, newProp2: 4};

  test(`should create new object`, () => {
    const extendedObject = extend(baseObject, addedObject);
    expect(baseObject === extendedObject).toBeFalsy();
  });

  test.each(Object.keys(baseObject))(`should have base property %p`, (prop) => {
    const extendedObject = extend(baseObject, addedObject);
    expect(extendedObject).toHaveProperty(prop);
  });

  test.each(Object.keys(addedObject))(`should have new property %p`, (prop) => {
    const extendedObject = extend(baseObject, addedObject);
    expect(extendedObject).toHaveProperty(prop);
  });
});
