// validationEngine.js
class ValidationEngine {
  constructor() {
    this.registry = {}; // store rules by fieldType
  }

  register(fieldType, { validateConfig, validateResponse }) {
    this.registry[fieldType] = { validateConfig, validateResponse };
  }

  validateConfig(field) {
    const type = field.type;
    if (!this.registry[type]) {
      throw new Error(`No validator registered for field type: ${type}`);
    }
    return this.registry[type].validateConfig(field);
  }

  validateResponse(field, value) {
    const type = field.type;
    if (!this.registry[type]) {
      throw new Error(`No validator registered for field type: ${type}`);
    }
    return this.registry[type].validateResponse(field, value);
  }

  getRegistry = () => {
    return this.registry;
  };

  get = (type) => {
    return this.registry[type];
  };
}

export const validationEngine = new ValidationEngine();
