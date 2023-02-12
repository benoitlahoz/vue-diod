// node_modules/diod/lib/diod.es.js
var RegistrationType = ((RegistrationType2) => {
  RegistrationType2["Class"] = "class";
  RegistrationType2["Factory"] = "factory";
  RegistrationType2["Instance"] = "instance";
  return RegistrationType2;
})(RegistrationType || {});
var ScopeType = ((ScopeType2) => {
  ScopeType2["Transient"] = "transient";
  ScopeType2["Request"] = "request";
  ScopeType2["Singleton"] = "singleton";
  return ScopeType2;
})(ScopeType || {});
var DiodContainer = class {
  constructor(services) {
    this.services = services;
    this.singletons = /* @__PURE__ */ new Map();
  }
  get(identifier) {
    return this.getService(
      identifier,
      /* @__PURE__ */ new Map(),
      false
    );
  }
  findTaggedServiceIdentifiers(tag) {
    return Array.from(this.services).filter(([, data]) => data.tags.indexOf(tag) >= 0).map(([id]) => id);
  }
  getService(identifier, perRequestServices, isDependency) {
    const data = this.findServiceDataOrThrow(identifier, isDependency);
    if (data.scope === ScopeType.Singleton && this.singletons.has(identifier)) {
      return this.singletons.get(identifier);
    } else if (data.scope === ScopeType.Request && perRequestServices.has(identifier)) {
      return perRequestServices.get(identifier);
    }
    let instance;
    if (data.type === RegistrationType.Instance) {
      instance = data.instance;
    } else if (data.type === RegistrationType.Class) {
      const dependencies = this.getDependencies(
        data.dependencies,
        perRequestServices
      );
      instance = new data.class(...dependencies);
    } else {
      instance = data.factory({
        get: (id) => {
          return this.getService(id, perRequestServices, true);
        },
        findTaggedServiceIdentifiers: (tag) => this.findTaggedServiceIdentifiers(tag)
      });
    }
    if (data.scope === ScopeType.Singleton) {
      this.singletons.set(identifier, instance);
    } else if (data.scope === ScopeType.Request) {
      perRequestServices.set(identifier, instance);
    }
    return instance;
  }
  findServiceDataOrThrow(identifier, isDependency) {
    const service = this.services.get(identifier);
    if (!service) {
      throw new Error(`Service not registered for: ${identifier.name}`);
    }
    const data = service;
    if (!isDependency && data.isPrivate) {
      throw new Error(
        `The ${identifier.name} service has been registered as private and can not be directly get from the container`
      );
    }
    return service;
  }
  getDependencies(dependencyIdentifiers, perRequestServices) {
    const dependencies = new Array();
    for (const dependencyIdentifier of dependencyIdentifiers) {
      dependencies.push(
        this.getService(dependencyIdentifier, perRequestServices, true)
      );
    }
    return dependencies;
  }
};
var PARAM_TYPES = "design:paramtypes";
var getDependenciesFromDecoratedServiceOrThrow = (target, parents) => {
  const dependencies = Reflect.getMetadata(PARAM_TYPES, target) || [];
  if (dependencies.length < target.length) {
    throw new Error(
      `Service not decorated: ${[...parents, target.name].join(" -> ")}`
    );
  }
  return dependencies;
};
var getBaseClass = (target) => {
  const baseClass = Object.getPrototypeOf(target.prototype).constructor;
  if (baseClass === Object) {
    return void 0;
  }
  return baseClass;
};
var getDependencies = (target, parents = []) => {
  const dependencies = getDependenciesFromDecoratedServiceOrThrow(
    target,
    parents
  );
  if (dependencies.length > 0) {
    return dependencies;
  }
  const baseClass = getBaseClass(target);
  if (baseClass) {
    return getDependencies(baseClass, [...parents, target.name]);
  }
  return [];
};
var getDependencyCount = (target) => {
  if (target.length > 0) {
    return target.length;
  }
  const baseClass = getBaseClass(target);
  if (baseClass) {
    return getDependencyCount(baseClass);
  }
  return 0;
};
var ServiceConfiguration = class {
  constructor() {
    this.isPrivate = false;
    this.tags = [];
  }
  public() {
    this.isPrivate = false;
    return this;
  }
  private() {
    this.isPrivate = true;
    return this;
  }
  addTag(tag) {
    this.tags = [...this.tags, tag];
    return this;
  }
  asTransient() {
    this.scope = ScopeType.Transient;
    return this;
  }
  asSingleton() {
    this.scope = ScopeType.Singleton;
    return this;
  }
  asInstancePerRequest() {
    this.scope = ScopeType.Request;
    return this;
  }
};
var ClassConfiguration = class extends ServiceConfiguration {
  constructor(newable) {
    super();
    this.newable = newable;
    this.scope = ScopeType.Transient;
    this.dependencies = [];
    this.autowire = true;
  }
  withDependencies(dependencies) {
    this.dependencies = dependencies;
    this.autowire = false;
    return this;
  }
  asTransient() {
    return super.asTransient();
  }
  asSingleton() {
    return super.asSingleton();
  }
  asInstancePerRequest() {
    return super.asInstancePerRequest();
  }
  setDependencyInformationIfNotExist(identifier, options) {
    const autowire = options.autowire && this.autowire;
    if (!autowire && getDependencyCount(this.newable) > this.dependencies.length) {
      throw new Error(
        `Dependencies must be provided for non autowired services. Service with missing dependencies: ${identifier.name}`
      );
    }
    if (autowire) {
      this.dependencies = getDependencies(this.newable);
    }
  }
  build(options) {
    this.setDependencyInformationIfNotExist(this.newable, options);
    return {
      tags: this.tags,
      isPrivate: this.isPrivate,
      scope: this.scope,
      type: RegistrationType.Class,
      class: this.newable,
      dependencies: this.dependencies,
      autowire: this.autowire
    };
  }
  static createBuildable(newable) {
    const use = new ClassConfiguration(newable);
    return {
      instance: use,
      build: (options) => use.build(options)
    };
  }
};
var FactoryConfiguration = class extends ServiceConfiguration {
  constructor(factory) {
    super();
    this.factory = factory;
    this.scope = ScopeType.Transient;
  }
  asTransient() {
    return super.asTransient();
  }
  asSingleton() {
    return super.asSingleton();
  }
  asInstancePerRequest() {
    return super.asInstancePerRequest();
  }
  build() {
    return {
      tags: this.tags,
      isPrivate: this.isPrivate,
      scope: this.scope,
      type: RegistrationType.Factory,
      factory: this.factory,
      dependencies: []
    };
  }
  static createBuildable(factory) {
    const use = new FactoryConfiguration(factory);
    return {
      instance: use,
      build: () => use.build()
    };
  }
};
var InstanceConfiguration = class extends ServiceConfiguration {
  constructor(instance) {
    super();
    this.instance = instance;
    this.scope = ScopeType.Singleton;
  }
  build() {
    return {
      tags: this.tags,
      isPrivate: this.isPrivate,
      scope: this.scope,
      type: RegistrationType.Instance,
      instance: this.instance,
      dependencies: []
    };
  }
  static createBuildable(instance) {
    const use = new InstanceConfiguration(instance);
    return {
      instance: use,
      build: () => use.build()
    };
  }
};
var DiodRegistration = class {
  constructor(identifier) {
    this.identifier = identifier;
  }
  useClass(newable) {
    const buildable = ClassConfiguration.createBuildable(newable);
    this.buildable = buildable;
    return buildable.instance;
  }
  use(newable) {
    return this.useClass(newable);
  }
  useInstance(instance) {
    const buildable = InstanceConfiguration.createBuildable(instance);
    this.buildable = buildable;
    return buildable.instance;
  }
  useFactory(factory) {
    const buildable = FactoryConfiguration.createBuildable(factory);
    this.buildable = buildable;
    return buildable.instance;
  }
  build(options) {
    if (this.buildable === void 0) {
      throw new Error(
        `Service ${this.identifier.name} registration is not completed. Use .registerAndUse(${this.identifier.name}) instead of .register(${this.identifier.name}) to use it directly or set any other registration use`
      );
    }
    return this.buildable.build(options);
  }
  static createBuildable(identifier) {
    const registration = new DiodRegistration(identifier);
    return {
      instance: registration,
      build: (options) => registration.build(options)
    };
  }
};
var verifyMetadata = (identifier, metadata, services) => {
  const missing = new Array();
  for (const dependencyIdentifier of metadata.dependencies) {
    if (!services.has(dependencyIdentifier)) {
      missing.push(dependencyIdentifier.name);
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `Service not registered for the following dependencies of ${identifier.name}: ${missing.join(", ")}`
    );
  }
};
var verifyCircularDependencies = (identifier, metadata, services, dependencyTree = []) => {
  for (const dependencyIdentifier of metadata.dependencies) {
    if (identifier === dependencyIdentifier) {
      throw new Error(
        `Circular dependency detected: ${[
          identifier.name,
          ...dependencyTree,
          identifier.name
        ].join(" -> ")}`
      );
    }
    const dependencyMetadata = services.get(
      dependencyIdentifier
    );
    if (dependencyMetadata.dependencies.length > 0) {
      verifyCircularDependencies(identifier, dependencyMetadata, services, [
        ...dependencyTree,
        dependencyIdentifier.name
      ]);
    }
  }
};
var verifyAllServices = (services, callback) => {
  for (const [identifier, metadata] of services) {
    callback(identifier, metadata, services);
  }
};
var verify = (services) => {
  verifyAllServices(services, verifyMetadata);
  verifyAllServices(services, verifyCircularDependencies);
};
var ContainerBuilder = class {
  constructor() {
    this.buildables = /* @__PURE__ */ new Map();
  }
  register(identifier) {
    if (this.buildables.has(identifier)) {
      throw new Error(
        `A service identified as ${identifier.name} has been already registered. You need to unregister it before you can register it again.`
      );
    }
    const buildable = DiodRegistration.createBuildable(identifier);
    this.buildables.set(identifier, buildable);
    return buildable.instance;
  }
  unregister(identifier) {
    if (!this.buildables.has(identifier)) {
      throw new Error(`There is no service registered as ${identifier.name}.`);
    }
    this.buildables.delete(identifier);
  }
  isRegistered(identifier) {
    return this.buildables.has(identifier);
  }
  registerAndUse(newable) {
    return this.register(newable).use(newable);
  }
  build({ autowire = true } = {}) {
    const services = /* @__PURE__ */ new Map();
    for (const [identifier, buildable] of this.buildables) {
      const data = buildable.build({ autowire });
      services.set(identifier, data);
    }
    verify(services);
    return new DiodContainer(services);
  }
};
var Service = () => {
  return (target) => {
    return target;
  };
};
export {
  ContainerBuilder,
  Service
};
//# sourceMappingURL=diod.js.map
