import { OPERATORS } from "./operators";

export const isConditional = (field, value) => {
  const { dependsOn, operator, value: expected } = field.conditional;
  const fieldValue = value[dependsOn];

  // Normalize both fieldValue and expected into arrays for flexible comparison
  const fieldValues = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
  const expectedValues = Array.isArray(expected) ? expected : [expected];

  const operatorMap = {
    [OPERATORS.gt]: fieldValues.some((fv) => fv > expectedValues[0]),
    [OPERATORS.lt]: fieldValues.some((fv) => fv < expectedValues[0]),
    [OPERATORS.gte]: fieldValues.some((fv) => fv >= expectedValues[0]),
    [OPERATORS.lte]: fieldValues.some((fv) => fv <= expectedValues[0]),
    [OPERATORS.in]: fieldValues.some((fv) => expectedValues.includes(fv)),
    [OPERATORS.notIn]: fieldValues.every((fv) => !expectedValues.includes(fv)),
    [OPERATORS.equals]: expectedValues.some((ev) => fieldValues.includes(ev)),

    [OPERATORS.notEquals]: expectedValues.every(
      (ev) => !fieldValues.includes(ev)
    ),

    [OPERATORS.contains]: fieldValues.some((fv) =>
      typeof fv === "string" || Array.isArray(fv)
        ? expectedValues.every((ev) => fv.includes(ev))
        : false
    ),

    [OPERATORS.notContains]: fieldValues.every((fv) =>
      typeof fv === "string" || Array.isArray(fv)
        ? expectedValues.every((ev) => !fv.includes(ev))
        : true
    ),
  };

  const match = operatorMap[operator] || false;

  return match;
};
