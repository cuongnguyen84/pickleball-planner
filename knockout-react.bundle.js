var KnockoutReactApp = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component2.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component2(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
          self = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            void 0,
            void 0,
            oldElement._owner,
            oldElement.props,
            oldElement._debugStack,
            oldElement._debugTask
          );
          oldElement._store && (newKey._store.validated = oldElement._store.validated);
          return newKey;
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function escape2(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index2) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape2("" + element.key)) : index2.toString(36);
        }
        function noop$1() {
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type) children = null;
          var invokeCallback = false;
          if (null === children) invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children) return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ctor = payload._result;
            ctor = ctor();
            ctor.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 1, payload._result = moduleObject;
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 2, payload._result = error;
              }
            );
            -1 === payload._status && (payload._status = 0, payload._result = ctor);
          }
          if (1 === payload._status)
            return ctor = payload._result, void 0 === ctor && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ctor
            ), "default" in ctor || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ctor
            ), ctor.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function noop() {
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        Symbol.for("react.provider");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component2.prototype.isReactComponent = {};
        Component2.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component2.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        }, fnName;
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component2.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component2.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          V: null,
          actQueue: null,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0
        }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        deprecatedAPIs = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
          deprecatedAPIs,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event)) return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        deprecatedAPIs = Object.freeze({
          __proto__: null,
          c: function(size) {
            return resolveDispatcher().useMemoCache(size);
          }
        });
        exports.Children = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Component = Component2;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.__COMPILER_RUNTIME = deprecatedAPIs;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$0) {
                        ReactSharedInternals.thrownErrors.push(error$0);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.captureOwnerStack = function() {
          var getCurrentStack = ReactSharedInternals.getCurrentStack;
          return null === getCurrentStack ? null : getCurrentStack();
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName) props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(
            element.type,
            key,
            void 0,
            void 0,
            owner,
            props,
            element._debugStack,
            element._debugTask
          );
          for (key = 2; key < arguments.length; key++)
            owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          for (var i = 2; i < arguments.length; i++) {
            var node = arguments[i];
            isValidElement(node) && node._store && (node._store.validated = 1);
          }
          i = {};
          node = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength) i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          node && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return ReactElement(
            type,
            node,
            void 0,
            void 0,
            getOwner(),
            i,
            propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement;
        exports.lazy = function(ctor) {
          return {
            $$typeof: REACT_LAZY_TYPE,
            _payload: { _status: -1, _result: ctor },
            _init: lazyInitializer
          };
        };
        exports.memo = function(type, compare) {
          null == type && console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState2, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState2,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create, createDeps, update) {
          null == create && console.warn(
            "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          var dispatcher = resolveDispatcher();
          if ("function" === typeof update)
            throw Error(
              "useEffect CRUD overload is not enabled in this build of React."
            );
          return dispatcher.useEffect(create, createDeps);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps);
        };
        exports.useInsertionEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useInsertionEffect(create, deps);
        };
        exports.useLayoutEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useLayoutEffect(create, deps);
        };
        exports.useMemo = function(create, deps) {
          return resolveDispatcher().useMemo(create, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState2) {
          return resolveDispatcher().useState(initialState2);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.1.1";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.development.js
  var require_react_dom_development = __commonJS({
    "node_modules/react-dom/cjs/react-dom.development.js"(exports) {
      "use strict";
      (function() {
        function noop() {
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function createPortal$1(children, containerInfo, implementation) {
          var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
          try {
            testStringCoercion(key);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          JSCompiler_inline_result && (console.error(
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            "function" === typeof Symbol && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"
          ), testStringCoercion(key));
          return {
            $$typeof: REACT_PORTAL_TYPE,
            key: null == key ? null : "" + key,
            children,
            containerInfo,
            implementation
          };
        }
        function getCrossOriginStringAs(as, input) {
          if ("font" === as) return "";
          if ("string" === typeof input)
            return "use-credentials" === input ? input : "";
        }
        function getValueDescriptorExpectingObjectForWarning(thing) {
          return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : 'something with type "' + typeof thing + '"';
        }
        function getValueDescriptorExpectingEnumForWarning(thing) {
          return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "string" === typeof thing ? JSON.stringify(thing) : "number" === typeof thing ? "`" + thing + "`" : 'something with type "' + typeof thing + '"';
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var React20 = require_react(), Internals = {
          d: {
            f: noop,
            r: function() {
              throw Error(
                "Invalid form element. requestFormReset must be passed a form that was rendered by React."
              );
            },
            D: noop,
            C: noop,
            L: noop,
            m: noop,
            X: noop,
            S: noop,
            M: noop
          },
          p: 0,
          findDOMNode: null
        }, REACT_PORTAL_TYPE = Symbol.for("react.portal"), ReactSharedInternals = React20.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
        "function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error(
          "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
        );
        exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
        exports.createPortal = function(children, container) {
          var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
          if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
            throw Error("Target container is not a DOM element.");
          return createPortal$1(children, container, null, key);
        };
        exports.flushSync = function(fn) {
          var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
          try {
            if (ReactSharedInternals.T = null, Internals.p = 2, fn)
              return fn();
          } finally {
            ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f() && console.error(
              "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
            );
          }
        };
        exports.preconnect = function(href, options) {
          "string" === typeof href && href ? null != options && "object" !== typeof options ? console.error(
            "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
            getValueDescriptorExpectingEnumForWarning(options)
          ) : null != options && "string" !== typeof options.crossOrigin && console.error(
            "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
            getValueDescriptorExpectingObjectForWarning(options.crossOrigin)
          ) : console.error(
            "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
            getValueDescriptorExpectingObjectForWarning(href)
          );
          "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
        };
        exports.prefetchDNS = function(href) {
          if ("string" !== typeof href || !href)
            console.error(
              "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
              getValueDescriptorExpectingObjectForWarning(href)
            );
          else if (1 < arguments.length) {
            var options = arguments[1];
            "object" === typeof options && options.hasOwnProperty("crossOrigin") ? console.error(
              "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
              getValueDescriptorExpectingEnumForWarning(options)
            ) : console.error(
              "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
              getValueDescriptorExpectingEnumForWarning(options)
            );
          }
          "string" === typeof href && Internals.d.D(href);
        };
        exports.preinit = function(href, options) {
          "string" === typeof href && href ? null == options || "object" !== typeof options ? console.error(
            "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
            getValueDescriptorExpectingEnumForWarning(options)
          ) : "style" !== options.as && "script" !== options.as && console.error(
            'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
            getValueDescriptorExpectingEnumForWarning(options.as)
          ) : console.error(
            "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
            getValueDescriptorExpectingObjectForWarning(href)
          );
          if ("string" === typeof href && options && "string" === typeof options.as) {
            var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
            "style" === as ? Internals.d.S(
              href,
              "string" === typeof options.precedence ? options.precedence : void 0,
              {
                crossOrigin,
                integrity,
                fetchPriority
              }
            ) : "script" === as && Internals.d.X(href, {
              crossOrigin,
              integrity,
              fetchPriority,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
          }
        };
        exports.preinitModule = function(href, options) {
          var encountered = "";
          "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
          void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "script" !== options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
          if (encountered)
            console.error(
              "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
              encountered
            );
          else
            switch (encountered = options && "string" === typeof options.as ? options.as : "script", encountered) {
              case "script":
                break;
              default:
                encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error(
                  'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
                  encountered,
                  href
                );
            }
          if ("string" === typeof href)
            if ("object" === typeof options && null !== options) {
              if (null == options.as || "script" === options.as)
                encountered = getCrossOriginStringAs(
                  options.as,
                  options.crossOrigin
                ), Internals.d.M(href, {
                  crossOrigin: encountered,
                  integrity: "string" === typeof options.integrity ? options.integrity : void 0,
                  nonce: "string" === typeof options.nonce ? options.nonce : void 0
                });
            } else null == options && Internals.d.M(href);
        };
        exports.preload = function(href, options) {
          var encountered = "";
          "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
          null == options || "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : "string" === typeof options.as && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
          encountered && console.error(
            'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
            encountered
          );
          if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
            encountered = options.as;
            var crossOrigin = getCrossOriginStringAs(
              encountered,
              options.crossOrigin
            );
            Internals.d.L(href, encountered, {
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0,
              type: "string" === typeof options.type ? options.type : void 0,
              fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
              referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
              imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
              imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
              media: "string" === typeof options.media ? options.media : void 0
            });
          }
        };
        exports.preloadModule = function(href, options) {
          var encountered = "";
          "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
          void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "string" !== typeof options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
          encountered && console.error(
            'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
            encountered
          );
          "string" === typeof href && (options ? (encountered = getCrossOriginStringAs(
            options.as,
            options.crossOrigin
          ), Internals.d.m(href, {
            as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
            crossOrigin: encountered,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0
          })) : Internals.d.m(href));
        };
        exports.requestFormReset = function(form) {
          Internals.d.r(form);
        };
        exports.unstable_batchedUpdates = function(fn, a) {
          return fn(a);
        };
        exports.useFormState = function(action, initialState2, permalink) {
          return resolveDispatcher().useFormState(action, initialState2, permalink);
        };
        exports.useFormStatus = function() {
          return resolveDispatcher().useHostTransitionStatus();
        };
        exports.version = "19.1.1";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      if (false) {
        checkDCE();
        module.exports = null;
      } else {
        module.exports = require_react_dom_development();
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      (function() {
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
          self = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
          var children = config.children;
          if (void 0 !== children)
            if (isStaticChildren)
              if (isArrayImpl(children)) {
                for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                  validateChildKeys(children[isStaticChildren]);
                Object.freeze && Object.freeze(children);
              } else
                console.error(
                  "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
                );
            else validateChildKeys(children);
          if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
              return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
              'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
              isStaticChildren,
              children,
              keys,
              children
            ), didWarnAboutKeySpread[children + isStaticChildren] = true);
          }
          children = null;
          void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
          hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
          if ("key" in config) {
            maybeKey = {};
            for (var propName in config)
              "key" !== propName && (maybeKey[propName] = config[propName]);
          } else maybeKey = config;
          children && defineKeyPropWarningGetter(
            maybeKey,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          return ReactElement(
            type,
            children,
            self,
            source,
            getOwner(),
            maybeKey,
            debugStack,
            debugTask
          );
        }
        function validateChildKeys(node) {
          "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
        }
        var React20 = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        Symbol.for("react.provider");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React20.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        React20 = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = React20.react_stack_bottom_frame.bind(
          React20,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutKeySpread = {};
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = function(type, config, maybeKey, source, self) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            false,
            source,
            self,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.jsxs = function(type, config, maybeKey, source, self) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            true,
            source,
            self,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
      })();
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // node_modules/stylis/stylis.min.js
  var require_stylis_min = __commonJS({
    "node_modules/stylis/stylis.min.js"(exports, module) {
      !function(e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e(null) : "function" == typeof define && define.amd ? define(e(null)) : window.stylis = e(null);
      }(function e(a) {
        "use strict";
        var r = /^\0+/g, c = /[\0\r\f]/g, s = /: */g, t = /zoo|gra/, i = /([,: ])(transform)/g, f = /,+\s*(?![^(]*[)])/g, n = / +\s*(?![^(]*[)])/g, l = / *[\0] */g, o = /,\r+?/g, h = /([\t\r\n ])*\f?&/g, u = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g, d = /\W+/g, b = /@(k\w+)\s*(\S*)\s*/, p = /::(place)/g, k = /:(read-only)/g, g = /\s+(?=[{\];=:>])/g, A = /([[}=:>])\s+/g, C = /(\{[^{]+?);(?=\})/g, w = /\s{2,}/g, v = /([^\(])(:+) */g, m = /[svh]\w+-[tblr]{2}/, x = /\(\s*(.*)\s*\)/g, $ = /([\s\S]*?);/g, y = /-self|flex-/g, O = /[^]*?(:[rp][el]a[\w-]+)[^]*/, j = /stretch|:\s*\w+\-(?:conte|avail)/, z = /([^-])(image-set\()/, N = "-webkit-", S = "-moz-", F = "-ms-", W = 59, q = 125, B = 123, D = 40, E = 41, G = 91, H = 93, I = 10, J = 13, K = 9, L = 64, M = 32, P = 38, Q = 45, R = 95, T = 42, U = 44, V = 58, X = 39, Y = 34, Z = 47, _ = 62, ee = 43, ae = 126, re = 0, ce = 12, se = 11, te = 107, ie = 109, fe = 115, ne = 112, le = 111, oe = 105, he = 99, ue = 100, de = 112, be = 1, pe = 1, ke = 0, ge = 1, Ae = 1, Ce = 1, we = 0, ve = 0, me = 0, xe = [], $e = [], ye = 0, Oe = null, je = -2, ze = -1, Ne = 0, Se = 1, Fe = 2, We = 3, qe = 0, Be = 1, De = "", Ee = "", Ge = "";
        function He(e2, a2, s2, t2, i2) {
          for (var f2, n2, o2 = 0, h2 = 0, u2 = 0, d2 = 0, g2 = 0, A2 = 0, C2 = 0, w2 = 0, m2 = 0, $2 = 0, y2 = 0, O2 = 0, j2 = 0, z2 = 0, R2 = 0, we2 = 0, $e2 = 0, Oe2 = 0, je2 = 0, ze2 = s2.length, Je2 = ze2 - 1, Re2 = "", Te2 = "", Ue = "", Ve = "", Xe = "", Ye = ""; R2 < ze2; ) {
            if (C2 = s2.charCodeAt(R2), R2 === Je2) {
              if (h2 + d2 + u2 + o2 !== 0) {
                if (0 !== h2) C2 = h2 === Z ? I : Z;
                d2 = u2 = o2 = 0, ze2++, Je2++;
              }
            }
            if (h2 + d2 + u2 + o2 === 0) {
              if (R2 === Je2) {
                if (we2 > 0) Te2 = Te2.replace(c, "");
                if (Te2.trim().length > 0) {
                  switch (C2) {
                    case M:
                    case K:
                    case W:
                    case J:
                    case I:
                      break;
                    default:
                      Te2 += s2.charAt(R2);
                  }
                  C2 = W;
                }
              }
              if (1 === $e2) switch (C2) {
                case B:
                case q:
                case W:
                case Y:
                case X:
                case D:
                case E:
                case U:
                  $e2 = 0;
                case K:
                case J:
                case I:
                case M:
                  break;
                default:
                  for ($e2 = 0, je2 = R2, g2 = C2, R2--, C2 = W; je2 < ze2; ) switch (s2.charCodeAt(je2++)) {
                    case I:
                    case J:
                    case W:
                      ++R2, C2 = g2, je2 = ze2;
                      break;
                    case V:
                      if (we2 > 0) ++R2, C2 = g2;
                    case B:
                      je2 = ze2;
                  }
              }
              switch (C2) {
                case B:
                  for (g2 = (Te2 = Te2.trim()).charCodeAt(0), y2 = 1, je2 = ++R2; R2 < ze2; ) {
                    switch (C2 = s2.charCodeAt(R2)) {
                      case B:
                        y2++;
                        break;
                      case q:
                        y2--;
                        break;
                      case Z:
                        switch (A2 = s2.charCodeAt(R2 + 1)) {
                          case T:
                          case Z:
                            R2 = Qe(A2, R2, Je2, s2);
                        }
                        break;
                      case G:
                        C2++;
                      case D:
                        C2++;
                      case Y:
                      case X:
                        for (; R2++ < Je2 && s2.charCodeAt(R2) !== C2; ) ;
                    }
                    if (0 === y2) break;
                    R2++;
                  }
                  if (Ue = s2.substring(je2, R2), g2 === re) g2 = (Te2 = Te2.replace(r, "").trim()).charCodeAt(0);
                  switch (g2) {
                    case L:
                      if (we2 > 0) Te2 = Te2.replace(c, "");
                      switch (A2 = Te2.charCodeAt(1)) {
                        case ue:
                        case ie:
                        case fe:
                        case Q:
                          f2 = a2;
                          break;
                        default:
                          f2 = xe;
                      }
                      if (je2 = (Ue = He(a2, f2, Ue, A2, i2 + 1)).length, me > 0 && 0 === je2) je2 = Te2.length;
                      if (ye > 0) {
                        if (f2 = Ie(xe, Te2, Oe2), n2 = Pe(We, Ue, f2, a2, pe, be, je2, A2, i2, t2), Te2 = f2.join(""), void 0 !== n2) {
                          if (0 === (je2 = (Ue = n2.trim()).length)) A2 = 0, Ue = "";
                        }
                      }
                      if (je2 > 0) switch (A2) {
                        case fe:
                          Te2 = Te2.replace(x, Me);
                        case ue:
                        case ie:
                        case Q:
                          Ue = Te2 + "{" + Ue + "}";
                          break;
                        case te:
                          if (Ue = (Te2 = Te2.replace(b, "$1 $2" + (Be > 0 ? De : ""))) + "{" + Ue + "}", 1 === Ae || 2 === Ae && Le("@" + Ue, 3)) Ue = "@" + N + Ue + "@" + Ue;
                          else Ue = "@" + Ue;
                          break;
                        default:
                          if (Ue = Te2 + Ue, t2 === de) Ve += Ue, Ue = "";
                      }
                      else Ue = "";
                      break;
                    default:
                      Ue = He(a2, Ie(a2, Te2, Oe2), Ue, t2, i2 + 1);
                  }
                  Xe += Ue, O2 = 0, $e2 = 0, z2 = 0, we2 = 0, Oe2 = 0, j2 = 0, Te2 = "", Ue = "", C2 = s2.charCodeAt(++R2);
                  break;
                case q:
                case W:
                  if ((je2 = (Te2 = (we2 > 0 ? Te2.replace(c, "") : Te2).trim()).length) > 1) {
                    if (0 === z2) {
                      if ((g2 = Te2.charCodeAt(0)) === Q || g2 > 96 && g2 < 123) je2 = (Te2 = Te2.replace(" ", ":")).length;
                    }
                    if (ye > 0) {
                      if (void 0 !== (n2 = Pe(Se, Te2, a2, e2, pe, be, Ve.length, t2, i2, t2))) {
                        if (0 === (je2 = (Te2 = n2.trim()).length)) Te2 = "\0\0";
                      }
                    }
                    switch (g2 = Te2.charCodeAt(0), A2 = Te2.charCodeAt(1), g2) {
                      case re:
                        break;
                      case L:
                        if (A2 === oe || A2 === he) {
                          Ye += Te2 + s2.charAt(R2);
                          break;
                        }
                      default:
                        if (Te2.charCodeAt(je2 - 1) === V) break;
                        Ve += Ke(Te2, g2, A2, Te2.charCodeAt(2));
                    }
                  }
                  O2 = 0, $e2 = 0, z2 = 0, we2 = 0, Oe2 = 0, Te2 = "", C2 = s2.charCodeAt(++R2);
              }
            }
            switch (C2) {
              case J:
              case I:
                if (h2 + d2 + u2 + o2 + ve === 0) switch ($2) {
                  case E:
                  case X:
                  case Y:
                  case L:
                  case ae:
                  case _:
                  case T:
                  case ee:
                  case Z:
                  case Q:
                  case V:
                  case U:
                  case W:
                  case B:
                  case q:
                    break;
                  default:
                    if (z2 > 0) $e2 = 1;
                }
                if (h2 === Z) h2 = 0;
                else if (ge + O2 === 0 && t2 !== te && Te2.length > 0) we2 = 1, Te2 += "\0";
                if (ye * qe > 0) Pe(Ne, Te2, a2, e2, pe, be, Ve.length, t2, i2, t2);
                be = 1, pe++;
                break;
              case W:
              case q:
                if (h2 + d2 + u2 + o2 === 0) {
                  be++;
                  break;
                }
              default:
                switch (be++, Re2 = s2.charAt(R2), C2) {
                  case K:
                  case M:
                    if (d2 + o2 + h2 === 0) switch (w2) {
                      case U:
                      case V:
                      case K:
                      case M:
                        Re2 = "";
                        break;
                      default:
                        if (C2 !== M) Re2 = " ";
                    }
                    break;
                  case re:
                    Re2 = "\\0";
                    break;
                  case ce:
                    Re2 = "\\f";
                    break;
                  case se:
                    Re2 = "\\v";
                    break;
                  case P:
                    if (d2 + h2 + o2 === 0 && ge > 0) Oe2 = 1, we2 = 1, Re2 = "\f" + Re2;
                    break;
                  case 108:
                    if (d2 + h2 + o2 + ke === 0 && z2 > 0) switch (R2 - z2) {
                      case 2:
                        if (w2 === ne && s2.charCodeAt(R2 - 3) === V) ke = w2;
                      case 8:
                        if (m2 === le) ke = m2;
                    }
                    break;
                  case V:
                    if (d2 + h2 + o2 === 0) z2 = R2;
                    break;
                  case U:
                    if (h2 + u2 + d2 + o2 === 0) we2 = 1, Re2 += "\r";
                    break;
                  case Y:
                  case X:
                    if (0 === h2) d2 = d2 === C2 ? 0 : 0 === d2 ? C2 : d2;
                    break;
                  case G:
                    if (d2 + h2 + u2 === 0) o2++;
                    break;
                  case H:
                    if (d2 + h2 + u2 === 0) o2--;
                    break;
                  case E:
                    if (d2 + h2 + o2 === 0) u2--;
                    break;
                  case D:
                    if (d2 + h2 + o2 === 0) {
                      if (0 === O2) switch (2 * w2 + 3 * m2) {
                        case 533:
                          break;
                        default:
                          y2 = 0, O2 = 1;
                      }
                      u2++;
                    }
                    break;
                  case L:
                    if (h2 + u2 + d2 + o2 + z2 + j2 === 0) j2 = 1;
                    break;
                  case T:
                  case Z:
                    if (d2 + o2 + u2 > 0) break;
                    switch (h2) {
                      case 0:
                        switch (2 * C2 + 3 * s2.charCodeAt(R2 + 1)) {
                          case 235:
                            h2 = Z;
                            break;
                          case 220:
                            je2 = R2, h2 = T;
                        }
                        break;
                      case T:
                        if (C2 === Z && w2 === T && je2 + 2 !== R2) {
                          if (33 === s2.charCodeAt(je2 + 2)) Ve += s2.substring(je2, R2 + 1);
                          Re2 = "", h2 = 0;
                        }
                    }
                }
                if (0 === h2) {
                  if (ge + d2 + o2 + j2 === 0 && t2 !== te && C2 !== W) switch (C2) {
                    case U:
                    case ae:
                    case _:
                    case ee:
                    case E:
                    case D:
                      if (0 === O2) {
                        switch (w2) {
                          case K:
                          case M:
                          case I:
                          case J:
                            Re2 += "\0";
                            break;
                          default:
                            Re2 = "\0" + Re2 + (C2 === U ? "" : "\0");
                        }
                        we2 = 1;
                      } else switch (C2) {
                        case D:
                          if (z2 + 7 === R2 && 108 === w2) z2 = 0;
                          O2 = ++y2;
                          break;
                        case E:
                          if (0 == (O2 = --y2)) we2 = 1, Re2 += "\0";
                      }
                      break;
                    case K:
                    case M:
                      switch (w2) {
                        case re:
                        case B:
                        case q:
                        case W:
                        case U:
                        case ce:
                        case K:
                        case M:
                        case I:
                        case J:
                          break;
                        default:
                          if (0 === O2) we2 = 1, Re2 += "\0";
                      }
                  }
                  if (Te2 += Re2, C2 !== M && C2 !== K) $2 = C2;
                }
            }
            m2 = w2, w2 = C2, R2++;
          }
          if (je2 = Ve.length, me > 0) {
            if (0 === je2 && 0 === Xe.length && 0 === a2[0].length == false) {
              if (t2 !== ie || 1 === a2.length && (ge > 0 ? Ee : Ge) === a2[0]) je2 = a2.join(",").length + 2;
            }
          }
          if (je2 > 0) {
            if (f2 = 0 === ge && t2 !== te ? function(e3) {
              for (var a3, r2, s3 = 0, t3 = e3.length, i3 = Array(t3); s3 < t3; ++s3) {
                for (var f3 = e3[s3].split(l), n3 = "", o3 = 0, h3 = 0, u3 = 0, d3 = 0, b2 = f3.length; o3 < b2; ++o3) {
                  if (0 === (h3 = (r2 = f3[o3]).length) && b2 > 1) continue;
                  if (u3 = n3.charCodeAt(n3.length - 1), d3 = r2.charCodeAt(0), a3 = "", 0 !== o3) switch (u3) {
                    case T:
                    case ae:
                    case _:
                    case ee:
                    case M:
                    case D:
                      break;
                    default:
                      a3 = " ";
                  }
                  switch (d3) {
                    case P:
                      r2 = a3 + Ee;
                    case ae:
                    case _:
                    case ee:
                    case M:
                    case E:
                    case D:
                      break;
                    case G:
                      r2 = a3 + r2 + Ee;
                      break;
                    case V:
                      switch (2 * r2.charCodeAt(1) + 3 * r2.charCodeAt(2)) {
                        case 530:
                          if (Ce > 0) {
                            r2 = a3 + r2.substring(8, h3 - 1);
                            break;
                          }
                        default:
                          if (o3 < 1 || f3[o3 - 1].length < 1) r2 = a3 + Ee + r2;
                      }
                      break;
                    case U:
                      a3 = "";
                    default:
                      if (h3 > 1 && r2.indexOf(":") > 0) r2 = a3 + r2.replace(v, "$1" + Ee + "$2");
                      else r2 = a3 + r2 + Ee;
                  }
                  n3 += r2;
                }
                i3[s3] = n3.replace(c, "").trim();
              }
              return i3;
            }(a2) : a2, ye > 0) {
              if (void 0 !== (n2 = Pe(Fe, Ve, f2, e2, pe, be, je2, t2, i2, t2)) && 0 === (Ve = n2).length) return Ye + Ve + Xe;
            }
            if (Ve = f2.join(",") + "{" + Ve + "}", Ae * ke != 0) {
              if (2 === Ae && !Le(Ve, 2)) ke = 0;
              switch (ke) {
                case le:
                  Ve = Ve.replace(k, ":" + S + "$1") + Ve;
                  break;
                case ne:
                  Ve = Ve.replace(p, "::" + N + "input-$1") + Ve.replace(p, "::" + S + "$1") + Ve.replace(p, ":" + F + "input-$1") + Ve;
              }
              ke = 0;
            }
          }
          return Ye + Ve + Xe;
        }
        function Ie(e2, a2, r2) {
          var c2 = a2.trim().split(o), s2 = c2, t2 = c2.length, i2 = e2.length;
          switch (i2) {
            case 0:
            case 1:
              for (var f2 = 0, n2 = 0 === i2 ? "" : e2[0] + " "; f2 < t2; ++f2) s2[f2] = Je(n2, s2[f2], r2, i2).trim();
              break;
            default:
              f2 = 0;
              var l2 = 0;
              for (s2 = []; f2 < t2; ++f2) for (var h2 = 0; h2 < i2; ++h2) s2[l2++] = Je(e2[h2] + " ", c2[f2], r2, i2).trim();
          }
          return s2;
        }
        function Je(e2, a2, r2, c2) {
          var s2 = a2, t2 = s2.charCodeAt(0);
          if (t2 < 33) t2 = (s2 = s2.trim()).charCodeAt(0);
          switch (t2) {
            case P:
              switch (ge + c2) {
                case 0:
                case 1:
                  if (0 === e2.trim().length) break;
                default:
                  return s2.replace(h, "$1" + e2.trim());
              }
              break;
            case V:
              switch (s2.charCodeAt(1)) {
                case 103:
                  if (Ce > 0 && ge > 0) return s2.replace(u, "$1").replace(h, "$1" + Ge);
                  break;
                default:
                  return e2.trim() + s2.replace(h, "$1" + e2.trim());
              }
            default:
              if (r2 * ge > 0 && s2.indexOf("\f") > 0) return s2.replace(h, (e2.charCodeAt(0) === V ? "" : "$1") + e2.trim());
          }
          return e2 + s2;
        }
        function Ke(e2, a2, r2, c2) {
          var l2, o2 = 0, h2 = e2 + ";", u2 = 2 * a2 + 3 * r2 + 4 * c2;
          if (944 === u2) return function(e3) {
            var a3 = e3.length, r3 = e3.indexOf(":", 9) + 1, c3 = e3.substring(0, r3).trim(), s2 = e3.substring(r3, a3 - 1).trim();
            switch (e3.charCodeAt(9) * Be) {
              case 0:
                break;
              case Q:
                if (110 !== e3.charCodeAt(10)) break;
              default:
                for (var t2 = s2.split((s2 = "", f)), i2 = 0, r3 = 0, a3 = t2.length; i2 < a3; r3 = 0, ++i2) {
                  for (var l3 = t2[i2], o3 = l3.split(n); l3 = o3[r3]; ) {
                    var h3 = l3.charCodeAt(0);
                    if (1 === Be && (h3 > L && h3 < 90 || h3 > 96 && h3 < 123 || h3 === R || h3 === Q && l3.charCodeAt(1) !== Q)) switch (isNaN(parseFloat(l3)) + (-1 !== l3.indexOf("("))) {
                      case 1:
                        switch (l3) {
                          case "infinite":
                          case "alternate":
                          case "backwards":
                          case "running":
                          case "normal":
                          case "forwards":
                          case "both":
                          case "none":
                          case "linear":
                          case "ease":
                          case "ease-in":
                          case "ease-out":
                          case "ease-in-out":
                          case "paused":
                          case "reverse":
                          case "alternate-reverse":
                          case "inherit":
                          case "initial":
                          case "unset":
                          case "step-start":
                          case "step-end":
                            break;
                          default:
                            l3 += De;
                        }
                    }
                    o3[r3++] = l3;
                  }
                  s2 += (0 === i2 ? "" : ",") + o3.join(" ");
                }
            }
            if (s2 = c3 + s2 + ";", 1 === Ae || 2 === Ae && Le(s2, 1)) return N + s2 + s2;
            return s2;
          }(h2);
          else if (0 === Ae || 2 === Ae && !Le(h2, 1)) return h2;
          switch (u2) {
            case 1015:
              return 97 === h2.charCodeAt(10) ? N + h2 + h2 : h2;
            case 951:
              return 116 === h2.charCodeAt(3) ? N + h2 + h2 : h2;
            case 963:
              return 110 === h2.charCodeAt(5) ? N + h2 + h2 : h2;
            case 1009:
              if (100 !== h2.charCodeAt(4)) break;
            case 969:
            case 942:
              return N + h2 + h2;
            case 978:
              return N + h2 + S + h2 + h2;
            case 1019:
            case 983:
              return N + h2 + S + h2 + F + h2 + h2;
            case 883:
              if (h2.charCodeAt(8) === Q) return N + h2 + h2;
              if (h2.indexOf("image-set(", 11) > 0) return h2.replace(z, "$1" + N + "$2") + h2;
              return h2;
            case 932:
              if (h2.charCodeAt(4) === Q) switch (h2.charCodeAt(5)) {
                case 103:
                  return N + "box-" + h2.replace("-grow", "") + N + h2 + F + h2.replace("grow", "positive") + h2;
                case 115:
                  return N + h2 + F + h2.replace("shrink", "negative") + h2;
                case 98:
                  return N + h2 + F + h2.replace("basis", "preferred-size") + h2;
              }
              return N + h2 + F + h2 + h2;
            case 964:
              return N + h2 + F + "flex-" + h2 + h2;
            case 1023:
              if (99 !== h2.charCodeAt(8)) break;
              return l2 = h2.substring(h2.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify"), N + "box-pack" + l2 + N + h2 + F + "flex-pack" + l2 + h2;
            case 1005:
              return t.test(h2) ? h2.replace(s, ":" + N) + h2.replace(s, ":" + S) + h2 : h2;
            case 1e3:
              switch (o2 = (l2 = h2.substring(13).trim()).indexOf("-") + 1, l2.charCodeAt(0) + l2.charCodeAt(o2)) {
                case 226:
                  l2 = h2.replace(m, "tb");
                  break;
                case 232:
                  l2 = h2.replace(m, "tb-rl");
                  break;
                case 220:
                  l2 = h2.replace(m, "lr");
                  break;
                default:
                  return h2;
              }
              return N + h2 + F + l2 + h2;
            case 1017:
              if (-1 === h2.indexOf("sticky", 9)) return h2;
            case 975:
              switch (o2 = (h2 = e2).length - 10, u2 = (l2 = (33 === h2.charCodeAt(o2) ? h2.substring(0, o2) : h2).substring(e2.indexOf(":", 7) + 1).trim()).charCodeAt(0) + (0 | l2.charCodeAt(7))) {
                case 203:
                  if (l2.charCodeAt(8) < 111) break;
                case 115:
                  h2 = h2.replace(l2, N + l2) + ";" + h2;
                  break;
                case 207:
                case 102:
                  h2 = h2.replace(l2, N + (u2 > 102 ? "inline-" : "") + "box") + ";" + h2.replace(l2, N + l2) + ";" + h2.replace(l2, F + l2 + "box") + ";" + h2;
              }
              return h2 + ";";
            case 938:
              if (h2.charCodeAt(5) === Q) switch (h2.charCodeAt(6)) {
                case 105:
                  return l2 = h2.replace("-items", ""), N + h2 + N + "box-" + l2 + F + "flex-" + l2 + h2;
                case 115:
                  return N + h2 + F + "flex-item-" + h2.replace(y, "") + h2;
                default:
                  return N + h2 + F + "flex-line-pack" + h2.replace("align-content", "").replace(y, "") + h2;
              }
              break;
            case 973:
            case 989:
              if (h2.charCodeAt(3) !== Q || 122 === h2.charCodeAt(4)) break;
            case 931:
            case 953:
              if (true === j.test(e2)) if (115 === (l2 = e2.substring(e2.indexOf(":") + 1)).charCodeAt(0)) return Ke(e2.replace("stretch", "fill-available"), a2, r2, c2).replace(":fill-available", ":stretch");
              else return h2.replace(l2, N + l2) + h2.replace(l2, S + l2.replace("fill-", "")) + h2;
              break;
            case 962:
              if (h2 = N + h2 + (102 === h2.charCodeAt(5) ? F + h2 : "") + h2, r2 + c2 === 211 && 105 === h2.charCodeAt(13) && h2.indexOf("transform", 10) > 0) return h2.substring(0, h2.indexOf(";", 27) + 1).replace(i, "$1" + N + "$2") + h2;
          }
          return h2;
        }
        function Le(e2, a2) {
          var r2 = e2.indexOf(1 === a2 ? ":" : "{"), c2 = e2.substring(0, 3 !== a2 ? r2 : 10), s2 = e2.substring(r2 + 1, e2.length - 1);
          return Oe(2 !== a2 ? c2 : c2.replace(O, "$1"), s2, a2);
        }
        function Me(e2, a2) {
          var r2 = Ke(a2, a2.charCodeAt(0), a2.charCodeAt(1), a2.charCodeAt(2));
          return r2 !== a2 + ";" ? r2.replace($, " or ($1)").substring(4) : "(" + a2 + ")";
        }
        function Pe(e2, a2, r2, c2, s2, t2, i2, f2, n2, l2) {
          for (var o2, h2 = 0, u2 = a2; h2 < ye; ++h2) switch (o2 = $e[h2].call(Te, e2, u2, r2, c2, s2, t2, i2, f2, n2, l2)) {
            case void 0:
            case false:
            case true:
            case null:
              break;
            default:
              u2 = o2;
          }
          if (u2 !== a2) return u2;
        }
        function Qe(e2, a2, r2, c2) {
          for (var s2 = a2 + 1; s2 < r2; ++s2) switch (c2.charCodeAt(s2)) {
            case Z:
              if (e2 === T) {
                if (c2.charCodeAt(s2 - 1) === T && a2 + 2 !== s2) return s2 + 1;
              }
              break;
            case I:
              if (e2 === Z) return s2 + 1;
          }
          return s2;
        }
        function Re(e2) {
          for (var a2 in e2) {
            var r2 = e2[a2];
            switch (a2) {
              case "keyframe":
                Be = 0 | r2;
                break;
              case "global":
                Ce = 0 | r2;
                break;
              case "cascade":
                ge = 0 | r2;
                break;
              case "compress":
                we = 0 | r2;
                break;
              case "semicolon":
                ve = 0 | r2;
                break;
              case "preserve":
                me = 0 | r2;
                break;
              case "prefix":
                if (Oe = null, !r2) Ae = 0;
                else if ("function" != typeof r2) Ae = 1;
                else Ae = 2, Oe = r2;
            }
          }
          return Re;
        }
        function Te(a2, r2) {
          if (void 0 !== this && this.constructor === Te) return e(a2);
          var s2 = a2, t2 = s2.charCodeAt(0);
          if (t2 < 33) t2 = (s2 = s2.trim()).charCodeAt(0);
          if (Be > 0) De = s2.replace(d, t2 === G ? "" : "-");
          if (t2 = 1, 1 === ge) Ge = s2;
          else Ee = s2;
          var i2, f2 = [Ge];
          if (ye > 0) {
            if (void 0 !== (i2 = Pe(ze, r2, f2, f2, pe, be, 0, 0, 0, 0)) && "string" == typeof i2) r2 = i2;
          }
          var n2 = He(xe, f2, r2, 0, 0);
          if (ye > 0) {
            if (void 0 !== (i2 = Pe(je, n2, f2, f2, pe, be, n2.length, 0, 0, 0)) && "string" != typeof (n2 = i2)) t2 = 0;
          }
          return De = "", Ge = "", Ee = "", ke = 0, pe = 1, be = 1, we * t2 == 0 ? n2 : n2.replace(c, "").replace(g, "").replace(A, "$1").replace(C, "$1").replace(w, " ");
        }
        if (Te.use = function e2(a2) {
          switch (a2) {
            case void 0:
            case null:
              ye = $e.length = 0;
              break;
            default:
              if ("function" == typeof a2) $e[ye++] = a2;
              else if ("object" == typeof a2) for (var r2 = 0, c2 = a2.length; r2 < c2; ++r2) e2(a2[r2]);
              else qe = 0 | !!a2;
          }
          return e2;
        }, Te.set = Re, void 0 !== a) Re(a);
        return Te;
      });
    }
  });

  // node_modules/stylis-rule-sheet/index.js
  var require_stylis_rule_sheet = __commonJS({
    "node_modules/stylis-rule-sheet/index.js"(exports, module) {
      (function(factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module["exports"] = factory() : typeof define === "function" && define["amd"] ? define(factory()) : window["stylisRuleSheet"] = factory();
      })(function() {
        "use strict";
        return function(insertRule) {
          var delimiter = "/*|*/";
          var needle = delimiter + "}";
          function toSheet(block) {
            if (block)
              try {
                insertRule(block + "}");
              } catch (e) {
              }
          }
          return function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
            switch (context) {
              // property
              case 1:
                if (depth === 0 && content.charCodeAt(0) === 64)
                  return insertRule(content + ";"), "";
                break;
              // selector
              case 2:
                if (ns === 0)
                  return content + delimiter;
                break;
              // at-rule
              case 3:
                switch (ns) {
                  // @font-face, @page
                  case 102:
                  case 112:
                    return insertRule(selectors[0] + content), "";
                  default:
                    return content + (at === 0 ? delimiter : "");
                }
              case -2:
                content.split(needle).forEach(toSheet);
            }
          };
        };
      });
    }
  });

  // node_modules/@emotion/unitless/dist/unitless.browser.esm.js
  var unitlessKeys, unitless_browser_esm_default;
  var init_unitless_browser_esm = __esm({
    "node_modules/@emotion/unitless/dist/unitless.browser.esm.js"() {
      unitlessKeys = {
        animationIterationCount: 1,
        borderImageOutset: 1,
        borderImageSlice: 1,
        borderImageWidth: 1,
        boxFlex: 1,
        boxFlexGroup: 1,
        boxOrdinalGroup: 1,
        columnCount: 1,
        columns: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        flexOrder: 1,
        gridRow: 1,
        gridRowEnd: 1,
        gridRowSpan: 1,
        gridRowStart: 1,
        gridColumn: 1,
        gridColumnEnd: 1,
        gridColumnSpan: 1,
        gridColumnStart: 1,
        msGridRow: 1,
        msGridRowSpan: 1,
        msGridColumn: 1,
        msGridColumnSpan: 1,
        fontWeight: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        tabSize: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1,
        WebkitLineClamp: 1,
        // SVG-related properties
        fillOpacity: 1,
        floodOpacity: 1,
        stopOpacity: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1,
        strokeMiterlimit: 1,
        strokeOpacity: 1,
        strokeWidth: 1
      };
      unitless_browser_esm_default = unitlessKeys;
    }
  });

  // node_modules/react-is/cjs/react-is.development.js
  var require_react_is_development = __commonJS({
    "node_modules/react-is/cjs/react-is.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var hasSymbol = typeof Symbol === "function" && Symbol.for;
          var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
          var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
          var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
          var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
          var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
          var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
          var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
          var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
          var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
          var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
          var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
          var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
          var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
          var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
          var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
          var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
          var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
          var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
          function isValidElementType2(type) {
            return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
            type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
          }
          function typeOf(object) {
            if (typeof object === "object" && object !== null) {
              var $$typeof = object.$$typeof;
              switch ($$typeof) {
                case REACT_ELEMENT_TYPE:
                  var type = object.type;
                  switch (type) {
                    case REACT_ASYNC_MODE_TYPE:
                    case REACT_CONCURRENT_MODE_TYPE:
                    case REACT_FRAGMENT_TYPE:
                    case REACT_PROFILER_TYPE:
                    case REACT_STRICT_MODE_TYPE:
                    case REACT_SUSPENSE_TYPE:
                      return type;
                    default:
                      var $$typeofType = type && type.$$typeof;
                      switch ($$typeofType) {
                        case REACT_CONTEXT_TYPE:
                        case REACT_FORWARD_REF_TYPE:
                        case REACT_LAZY_TYPE:
                        case REACT_MEMO_TYPE:
                        case REACT_PROVIDER_TYPE:
                          return $$typeofType;
                        default:
                          return $$typeof;
                      }
                  }
                case REACT_PORTAL_TYPE:
                  return $$typeof;
              }
            }
            return void 0;
          }
          var AsyncMode = REACT_ASYNC_MODE_TYPE;
          var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
          var ContextConsumer = REACT_CONTEXT_TYPE;
          var ContextProvider = REACT_PROVIDER_TYPE;
          var Element = REACT_ELEMENT_TYPE;
          var ForwardRef2 = REACT_FORWARD_REF_TYPE;
          var Fragment = REACT_FRAGMENT_TYPE;
          var Lazy = REACT_LAZY_TYPE;
          var Memo = REACT_MEMO_TYPE;
          var Portal = REACT_PORTAL_TYPE;
          var Profiler = REACT_PROFILER_TYPE;
          var StrictMode = REACT_STRICT_MODE_TYPE;
          var Suspense = REACT_SUSPENSE_TYPE;
          var hasWarnedAboutDeprecatedIsAsyncMode = false;
          function isAsyncMode(object) {
            {
              if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                hasWarnedAboutDeprecatedIsAsyncMode = true;
                console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
              }
            }
            return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
          }
          function isConcurrentMode(object) {
            return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
          }
          function isContextConsumer(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
          }
          function isContextProvider(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
          }
          function isElement2(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          function isForwardRef(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
          }
          function isFragment(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
          }
          function isLazy(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
          }
          function isMemo(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
          }
          function isPortal(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
          }
          function isProfiler(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
          }
          function isStrictMode(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
          }
          function isSuspense(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
          }
          exports.AsyncMode = AsyncMode;
          exports.ConcurrentMode = ConcurrentMode;
          exports.ContextConsumer = ContextConsumer;
          exports.ContextProvider = ContextProvider;
          exports.Element = Element;
          exports.ForwardRef = ForwardRef2;
          exports.Fragment = Fragment;
          exports.Lazy = Lazy;
          exports.Memo = Memo;
          exports.Portal = Portal;
          exports.Profiler = Profiler;
          exports.StrictMode = StrictMode;
          exports.Suspense = Suspense;
          exports.isAsyncMode = isAsyncMode;
          exports.isConcurrentMode = isConcurrentMode;
          exports.isContextConsumer = isContextConsumer;
          exports.isContextProvider = isContextProvider;
          exports.isElement = isElement2;
          exports.isForwardRef = isForwardRef;
          exports.isFragment = isFragment;
          exports.isLazy = isLazy;
          exports.isMemo = isMemo;
          exports.isPortal = isPortal;
          exports.isProfiler = isProfiler;
          exports.isStrictMode = isStrictMode;
          exports.isSuspense = isSuspense;
          exports.isValidElementType = isValidElementType2;
          exports.typeOf = typeOf;
        })();
      }
    }
  });

  // node_modules/react-is/index.js
  var require_react_is = __commonJS({
    "node_modules/react-is/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_is_development();
      }
    }
  });

  // node_modules/memoize-one/dist/memoize-one.esm.js
  function isEqual(first, second) {
    if (first === second) {
      return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
      return true;
    }
    return false;
  }
  function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
      return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
      if (!isEqual(newInputs[i], lastInputs[i])) {
        return false;
      }
    }
    return true;
  }
  function memoizeOne(resultFn, isEqual2) {
    if (isEqual2 === void 0) {
      isEqual2 = areInputsEqual;
    }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
      var newArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        newArgs[_i] = arguments[_i];
      }
      if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
        return lastResult;
      }
      lastResult = resultFn.apply(this, newArgs);
      calledOnce = true;
      lastThis = this;
      lastArgs = newArgs;
      return lastResult;
    }
    return memoized;
  }
  var safeIsNaN, memoize_one_esm_default;
  var init_memoize_one_esm = __esm({
    "node_modules/memoize-one/dist/memoize-one.esm.js"() {
      safeIsNaN = Number.isNaN || function ponyfill(value) {
        return typeof value === "number" && value !== value;
      };
      memoize_one_esm_default = memoizeOne;
    }
  });

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols2 = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols2) {
            symbols = getOwnPropertySymbols2(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/prop-types/lib/ReactPropTypesSecret.js
  var require_ReactPropTypesSecret = __commonJS({
    "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
      "use strict";
      var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      module.exports = ReactPropTypesSecret;
    }
  });

  // node_modules/prop-types/lib/has.js
  var require_has = __commonJS({
    "node_modules/prop-types/lib/has.js"(exports, module) {
      module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
    }
  });

  // node_modules/prop-types/checkPropTypes.js
  var require_checkPropTypes = __commonJS({
    "node_modules/prop-types/checkPropTypes.js"(exports, module) {
      "use strict";
      var printWarning = function() {
      };
      if (true) {
        ReactPropTypesSecret = require_ReactPropTypesSecret();
        loggedTypeFailures = {};
        has = require_has();
        printWarning = function(text) {
          var message = "Warning: " + text;
          if (typeof console !== "undefined") {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {
          }
        };
      }
      var ReactPropTypesSecret;
      var loggedTypeFailures;
      var has;
      function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
        if (true) {
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error(
                    (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                  );
                  err.name = "Invariant Violation";
                  throw err;
                }
                error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
              } catch (ex) {
                error = ex;
              }
              if (error && !(error instanceof Error)) {
                printWarning(
                  (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
                );
              }
              if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                loggedTypeFailures[error.message] = true;
                var stack = getStack ? getStack() : "";
                printWarning(
                  "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
                );
              }
            }
          }
        }
      }
      checkPropTypes.resetWarningCache = function() {
        if (true) {
          loggedTypeFailures = {};
        }
      };
      module.exports = checkPropTypes;
    }
  });

  // node_modules/prop-types/factoryWithTypeCheckers.js
  var require_factoryWithTypeCheckers = __commonJS({
    "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
      "use strict";
      var ReactIs = require_react_is();
      var assign = require_object_assign();
      var ReactPropTypesSecret = require_ReactPropTypesSecret();
      var has = require_has();
      var checkPropTypes = require_checkPropTypes();
      var printWarning = function() {
      };
      if (true) {
        printWarning = function(text) {
          var message = "Warning: " + text;
          if (typeof console !== "undefined") {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {
          }
        };
      }
      function emptyFunctionThatReturnsNull() {
        return null;
      }
      module.exports = function(isValidElement, throwOnDirectAccess) {
        var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
          if (typeof iteratorFn === "function") {
            return iteratorFn;
          }
        }
        var ANONYMOUS = "<<anonymous>>";
        var ReactPropTypes = {
          array: createPrimitiveTypeChecker("array"),
          bigint: createPrimitiveTypeChecker("bigint"),
          bool: createPrimitiveTypeChecker("boolean"),
          func: createPrimitiveTypeChecker("function"),
          number: createPrimitiveTypeChecker("number"),
          object: createPrimitiveTypeChecker("object"),
          string: createPrimitiveTypeChecker("string"),
          symbol: createPrimitiveTypeChecker("symbol"),
          any: createAnyTypeChecker(),
          arrayOf: createArrayOfTypeChecker,
          element: createElementTypeChecker(),
          elementType: createElementTypeTypeChecker(),
          instanceOf: createInstanceTypeChecker,
          node: createNodeChecker(),
          objectOf: createObjectOfTypeChecker,
          oneOf: createEnumTypeChecker,
          oneOfType: createUnionTypeChecker,
          shape: createShapeTypeChecker,
          exact: createStrictShapeTypeChecker
        };
        function is(x, y) {
          if (x === y) {
            return x !== 0 || 1 / x === 1 / y;
          } else {
            return x !== x && y !== y;
          }
        }
        function PropTypeError(message, data) {
          this.message = message;
          this.data = data && typeof data === "object" ? data : {};
          this.stack = "";
        }
        PropTypeError.prototype = Error.prototype;
        function createChainableTypeChecker(validate) {
          if (true) {
            var manualPropTypeCallCache = {};
            var manualPropTypeWarningCount = 0;
          }
          function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
            componentName = componentName || ANONYMOUS;
            propFullName = propFullName || propName;
            if (secret !== ReactPropTypesSecret) {
              if (throwOnDirectAccess) {
                var err = new Error(
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
                );
                err.name = "Invariant Violation";
                throw err;
              } else if (typeof console !== "undefined") {
                var cacheKey = componentName + ":" + propName;
                if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
                manualPropTypeWarningCount < 3) {
                  printWarning(
                    "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                  );
                  manualPropTypeCallCache[cacheKey] = true;
                  manualPropTypeWarningCount++;
                }
              }
            }
            if (props[propName] == null) {
              if (isRequired) {
                if (props[propName] === null) {
                  return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
                }
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
              }
              return null;
            } else {
              return validate(props, propName, componentName, location, propFullName);
            }
          }
          var chainedCheckType = checkType.bind(null, false);
          chainedCheckType.isRequired = checkType.bind(null, true);
          return chainedCheckType;
        }
        function createPrimitiveTypeChecker(expectedType) {
          function validate(props, propName, componentName, location, propFullName, secret) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== expectedType) {
              var preciseType = getPreciseType(propValue);
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
                { expectedType }
              );
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createAnyTypeChecker() {
          return createChainableTypeChecker(emptyFunctionThatReturnsNull);
        }
        function createArrayOfTypeChecker(typeChecker) {
          function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== "function") {
              return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
            }
            var propValue = props[propName];
            if (!Array.isArray(propValue)) {
              var propType = getPropType(propValue);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
            }
            for (var i = 0; i < propValue.length; i++) {
              var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createElementTypeChecker() {
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!isValidElement(propValue)) {
              var propType = getPropType(propValue);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createElementTypeTypeChecker() {
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!ReactIs.isValidElementType(propValue)) {
              var propType = getPropType(propValue);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createInstanceTypeChecker(expectedClass) {
          function validate(props, propName, componentName, location, propFullName) {
            if (!(props[propName] instanceof expectedClass)) {
              var expectedClassName = expectedClass.name || ANONYMOUS;
              var actualClassName = getClassName(props[propName]);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createEnumTypeChecker(expectedValues) {
          if (!Array.isArray(expectedValues)) {
            if (true) {
              if (arguments.length > 1) {
                printWarning(
                  "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
                );
              } else {
                printWarning("Invalid argument supplied to oneOf, expected an array.");
              }
            }
            return emptyFunctionThatReturnsNull;
          }
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            for (var i = 0; i < expectedValues.length; i++) {
              if (is(propValue, expectedValues[i])) {
                return null;
              }
            }
            var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
              var type = getPreciseType(value);
              if (type === "symbol") {
                return String(value);
              }
              return value;
            });
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
          }
          return createChainableTypeChecker(validate);
        }
        function createObjectOfTypeChecker(typeChecker) {
          function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== "function") {
              return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
            }
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
            }
            for (var key in propValue) {
              if (has(propValue, key)) {
                var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                if (error instanceof Error) {
                  return error;
                }
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createUnionTypeChecker(arrayOfTypeCheckers) {
          if (!Array.isArray(arrayOfTypeCheckers)) {
            true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
            return emptyFunctionThatReturnsNull;
          }
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            if (typeof checker !== "function") {
              printWarning(
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
              );
              return emptyFunctionThatReturnsNull;
            }
          }
          function validate(props, propName, componentName, location, propFullName) {
            var expectedTypes = [];
            for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
              var checker2 = arrayOfTypeCheckers[i2];
              var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
              if (checkerResult == null) {
                return null;
              }
              if (checkerResult.data && has(checkerResult.data, "expectedType")) {
                expectedTypes.push(checkerResult.data.expectedType);
              }
            }
            var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
          }
          return createChainableTypeChecker(validate);
        }
        function createNodeChecker() {
          function validate(props, propName, componentName, location, propFullName) {
            if (!isNode(props[propName])) {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function invalidValidatorError(componentName, location, propFullName, key, type) {
          return new PropTypeError(
            (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
          );
        }
        function createShapeTypeChecker(shapeTypes) {
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
            }
            for (var key in shapeTypes) {
              var checker = shapeTypes[key];
              if (typeof checker !== "function") {
                return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
              }
              var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error) {
                return error;
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createStrictShapeTypeChecker(shapeTypes) {
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
            }
            var allKeys = assign({}, props[propName], shapeTypes);
            for (var key in allKeys) {
              var checker = shapeTypes[key];
              if (has(shapeTypes, key) && typeof checker !== "function") {
                return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
              }
              if (!checker) {
                return new PropTypeError(
                  "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
                );
              }
              var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error) {
                return error;
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function isNode(propValue) {
          switch (typeof propValue) {
            case "number":
            case "string":
            case "undefined":
              return true;
            case "boolean":
              return !propValue;
            case "object":
              if (Array.isArray(propValue)) {
                return propValue.every(isNode);
              }
              if (propValue === null || isValidElement(propValue)) {
                return true;
              }
              var iteratorFn = getIteratorFn(propValue);
              if (iteratorFn) {
                var iterator = iteratorFn.call(propValue);
                var step;
                if (iteratorFn !== propValue.entries) {
                  while (!(step = iterator.next()).done) {
                    if (!isNode(step.value)) {
                      return false;
                    }
                  }
                } else {
                  while (!(step = iterator.next()).done) {
                    var entry = step.value;
                    if (entry) {
                      if (!isNode(entry[1])) {
                        return false;
                      }
                    }
                  }
                }
              } else {
                return false;
              }
              return true;
            default:
              return false;
          }
        }
        function isSymbol2(propType, propValue) {
          if (propType === "symbol") {
            return true;
          }
          if (!propValue) {
            return false;
          }
          if (propValue["@@toStringTag"] === "Symbol") {
            return true;
          }
          if (typeof Symbol === "function" && propValue instanceof Symbol) {
            return true;
          }
          return false;
        }
        function getPropType(propValue) {
          var propType = typeof propValue;
          if (Array.isArray(propValue)) {
            return "array";
          }
          if (propValue instanceof RegExp) {
            return "object";
          }
          if (isSymbol2(propType, propValue)) {
            return "symbol";
          }
          return propType;
        }
        function getPreciseType(propValue) {
          if (typeof propValue === "undefined" || propValue === null) {
            return "" + propValue;
          }
          var propType = getPropType(propValue);
          if (propType === "object") {
            if (propValue instanceof Date) {
              return "date";
            } else if (propValue instanceof RegExp) {
              return "regexp";
            }
          }
          return propType;
        }
        function getPostfixForTypeWarning(value) {
          var type = getPreciseType(value);
          switch (type) {
            case "array":
            case "object":
              return "an " + type;
            case "boolean":
            case "date":
            case "regexp":
              return "a " + type;
            default:
              return type;
          }
        }
        function getClassName(propValue) {
          if (!propValue.constructor || !propValue.constructor.name) {
            return ANONYMOUS;
          }
          return propValue.constructor.name;
        }
        ReactPropTypes.checkPropTypes = checkPropTypes;
        ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
        ReactPropTypes.PropTypes = ReactPropTypes;
        return ReactPropTypes;
      };
    }
  });

  // node_modules/prop-types/index.js
  var require_prop_types = __commonJS({
    "node_modules/prop-types/index.js"(exports, module) {
      if (true) {
        ReactIs = require_react_is();
        throwOnDirectAccess = true;
        module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
      } else {
        module.exports = null();
      }
      var ReactIs;
      var throwOnDirectAccess;
    }
  });

  // node_modules/@emotion/memoize/dist/memoize.browser.esm.js
  function memoize(fn) {
    var cache = {};
    return function(arg) {
      if (cache[arg] === void 0) cache[arg] = fn(arg);
      return cache[arg];
    };
  }
  var memoize_browser_esm_default;
  var init_memoize_browser_esm = __esm({
    "node_modules/@emotion/memoize/dist/memoize.browser.esm.js"() {
      memoize_browser_esm_default = memoize;
    }
  });

  // node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js
  var reactPropsRegex, index, is_prop_valid_browser_esm_default;
  var init_is_prop_valid_browser_esm = __esm({
    "node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js"() {
      init_memoize_browser_esm();
      reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
      index = memoize_browser_esm_default(
        function(prop) {
          return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
        }
        /* Z+1 */
      );
      is_prop_valid_browser_esm_default = index;
    }
  });

  // node_modules/is-what/dist/index.esm.js
  function getType(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
  }
  function isUndefined(payload) {
    return getType(payload) === "Undefined";
  }
  function isNull(payload) {
    return getType(payload) === "Null";
  }
  function isPlainObject(payload) {
    if (getType(payload) !== "Object")
      return false;
    return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype;
  }
  function isArray(payload) {
    return getType(payload) === "Array";
  }
  function isSymbol(payload) {
    return getType(payload) === "Symbol";
  }
  function isOneOf(a, b, c, d, e) {
    return function(value) {
      return a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
    };
  }
  var isNullOrUndefined;
  var init_index_esm = __esm({
    "node_modules/is-what/dist/index.esm.js"() {
      isNullOrUndefined = isOneOf(isNull, isUndefined);
    }
  });

  // node_modules/merge-anything/dist/index.esm.js
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  }
  function assignProp(carry, key, newVal, originalObject) {
    var propType = originalObject.propertyIsEnumerable(key) ? "enumerable" : "nonenumerable";
    if (propType === "enumerable")
      carry[key] = newVal;
    if (propType === "nonenumerable") {
      Object.defineProperty(carry, key, {
        value: newVal,
        enumerable: false,
        writable: true,
        configurable: true
      });
    }
  }
  function mergeRecursively(origin, newComer, extensions) {
    if (!isPlainObject(newComer)) {
      if (extensions && isArray(extensions)) {
        extensions.forEach(function(extend) {
          newComer = extend(origin, newComer);
        });
      }
      return newComer;
    }
    var newObject = {};
    if (isPlainObject(origin)) {
      var props_1 = Object.getOwnPropertyNames(origin);
      var symbols_1 = Object.getOwnPropertySymbols(origin);
      newObject = __spreadArrays(props_1, symbols_1).reduce(function(carry, key) {
        var targetVal = origin[key];
        if (!isSymbol(key) && !Object.getOwnPropertyNames(newComer).includes(key) || isSymbol(key) && !Object.getOwnPropertySymbols(newComer).includes(key)) {
          assignProp(carry, key, targetVal, origin);
        }
        return carry;
      }, {});
    }
    var props = Object.getOwnPropertyNames(newComer);
    var symbols = Object.getOwnPropertySymbols(newComer);
    var result = __spreadArrays(props, symbols).reduce(function(carry, key) {
      var newVal = newComer[key];
      var targetVal = isPlainObject(origin) ? origin[key] : void 0;
      if (extensions && isArray(extensions)) {
        extensions.forEach(function(extend) {
          newVal = extend(targetVal, newVal);
        });
      }
      if (targetVal !== void 0 && isPlainObject(newVal)) {
        newVal = mergeRecursively(targetVal, newVal, extensions);
      }
      assignProp(carry, key, newVal, newComer);
      return carry;
    }, newObject);
    return result;
  }
  function merge(origin) {
    var newComers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      newComers[_i - 1] = arguments[_i];
    }
    var extensions = null;
    var base = origin;
    if (isPlainObject(origin) && origin.extensions && Object.keys(origin).length === 1) {
      base = {};
      extensions = origin.extensions;
    }
    return newComers.reduce(function(result, newComer) {
      return mergeRecursively(result, newComer, extensions);
    }, base);
  }
  var index_esm_default;
  var init_index_esm2 = __esm({
    "node_modules/merge-anything/dist/index.esm.js"() {
      init_index_esm();
      index_esm_default = merge;
    }
  });

  // node_modules/styled-components/dist/styled-components.browser.esm.js
  function isFunction(test) {
    return typeof test === "function";
  }
  function getComponentName(target) {
    return (true ? typeof target === "string" && target : false) || target.displayName || target.name || "Component";
  }
  function isStatelessFunction(test) {
    return typeof test === "function" && !(test.prototype && test.prototype.isReactComponent);
  }
  function isStyledComponent(target) {
    return target && typeof target.styledComponentId === "string";
  }
  function format() {
    var a = arguments.length <= 0 ? void 0 : arguments[0];
    var b = [];
    for (var c = 1, len = arguments.length; c < len; c += 1) {
      b.push(arguments.length <= c ? void 0 : arguments[c]);
    }
    b.forEach(function(d) {
      a = a.replace(/%[a-z]/, d);
    });
    return a;
  }
  function stringifyRules(rules, selector, prefix) {
    var componentId = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "&";
    var flatCSS = rules.join("").replace(COMMENT_REGEX, "");
    var cssStr = selector && prefix ? prefix + " " + selector + " { " + flatCSS + " }" : flatCSS;
    _componentId = componentId;
    _selector = selector;
    _selectorRegexp = new RegExp("\\" + _selector + "\\b", "g");
    return stylis(prefix || !selector ? "" : selector, cssStr);
  }
  function hyphenateStyleName(string) {
    return string.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-");
  }
  function addUnitIfNeeded(name, value) {
    if (value == null || typeof value === "boolean" || value === "") {
      return "";
    }
    if (typeof value === "number" && value !== 0 && !(name in unitless_browser_esm_default)) {
      return value + "px";
    }
    return String(value).trim();
  }
  function flatten(chunk, executionContext, styleSheet) {
    if (Array.isArray(chunk)) {
      var ruleSet = [];
      for (var i = 0, len = chunk.length, result; i < len; i += 1) {
        result = flatten(chunk[i], executionContext, styleSheet);
        if (result === null) continue;
        else if (Array.isArray(result)) ruleSet.push.apply(ruleSet, result);
        else ruleSet.push(result);
      }
      return ruleSet;
    }
    if (isFalsish(chunk)) {
      return null;
    }
    if (isStyledComponent(chunk)) {
      return "." + chunk.styledComponentId;
    }
    if (isFunction(chunk)) {
      if (isStatelessFunction(chunk) && executionContext) {
        var _result = chunk(executionContext);
        if ((0, import_react_is.isElement)(_result)) {
          console.warn(getComponentName(chunk) + " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.");
        }
        return flatten(_result, executionContext, styleSheet);
      } else return chunk;
    }
    if (chunk instanceof Keyframes) {
      if (styleSheet) {
        chunk.inject(styleSheet);
        return chunk.getName();
      } else return chunk;
    }
    return isPlainObject2(chunk) ? objToCssArray(chunk) : chunk.toString();
  }
  function css(styles) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }
    if (isFunction(styles) || isPlainObject2(styles)) {
      return flatten(interleave(EMPTY_ARRAY, [styles].concat(interpolations)));
    }
    return flatten(interleave(styles, interpolations));
  }
  function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EMPTY_OBJECT;
    if (!(0, import_react_is.isValidElementType)(tag)) {
      throw new StyledComponentsError(1, String(tag));
    }
    var templateFunction = function templateFunction2() {
      return componentConstructor(tag, options, css.apply(void 0, arguments));
    };
    templateFunction.withConfig = function(config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function(attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
      }));
    };
    return templateFunction;
  }
  function murmurhash(c) {
    for (var e = c.length | 0, a = e | 0, d = 0, b; e >= 4; ) {
      b = c.charCodeAt(d) & 255 | (c.charCodeAt(++d) & 255) << 8 | (c.charCodeAt(++d) & 255) << 16 | (c.charCodeAt(++d) & 255) << 24, b = 1540483477 * (b & 65535) + ((1540483477 * (b >>> 16) & 65535) << 16), b ^= b >>> 24, b = 1540483477 * (b & 65535) + ((1540483477 * (b >>> 16) & 65535) << 16), a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16) ^ b, e -= 4, ++d;
    }
    switch (e) {
      case 3:
        a ^= (c.charCodeAt(d + 2) & 255) << 16;
      case 2:
        a ^= (c.charCodeAt(d + 1) & 255) << 8;
      case 1:
        a ^= c.charCodeAt(d) & 255, a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16);
    }
    a ^= a >>> 13;
    a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16);
    return (a ^ a >>> 15) >>> 0;
  }
  function generateAlphabeticName(code) {
    var name = "";
    var x = void 0;
    for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
      name = getAlphabeticChar(x % charsLength) + name;
    }
    return getAlphabeticChar(x % charsLength) + name;
  }
  function hasFunctionObjectKey(obj) {
    for (var key in obj) {
      if (isFunction(obj[key])) {
        return true;
      }
    }
    return false;
  }
  function isStaticRules(rules, attrs) {
    for (var i = 0; i < rules.length; i += 1) {
      var rule = rules[i];
      if (Array.isArray(rule) && !isStaticRules(rule, attrs)) {
        return false;
      } else if (isFunction(rule) && !isStyledComponent(rule)) {
        return false;
      }
    }
    if (attrs.some(function(x) {
      return isFunction(x) || hasFunctionObjectKey(x);
    })) return false;
    return true;
  }
  function escape(str) {
    return str.replace(escapeRegex, "-").replace(dashesAtEnds, "");
  }
  function isTag(target) {
    return typeof target === "string" && (true ? target.charAt(0) === target.charAt(0).toLowerCase() : true);
  }
  function generateDisplayName(target) {
    return isTag(target) ? "styled." + target : "Styled(" + getComponentName(target) + ")";
  }
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== "string") {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
      var keys = arrayPrototype.concat(
        getOwnPropertyNames(sourceComponent),
        // $FlowFixMe
        getOwnPropertySymbols(sourceComponent)
      );
      var targetStatics = TYPE_STATICS[targetComponent.$$typeof] || REACT_STATICS;
      var sourceStatics = TYPE_STATICS[sourceComponent.$$typeof] || REACT_STATICS;
      var i = keys.length;
      var descriptor = void 0;
      var key = void 0;
      while (i--) {
        key = keys[i];
        if (
          // $FlowFixMe
          !KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && // $FlowFixMe
          !(targetStatics && targetStatics[key])
        ) {
          descriptor = getOwnPropertyDescriptor(sourceComponent, key);
          if (descriptor) {
            try {
              defineProperty$1(targetComponent, key, descriptor);
            } catch (e) {
            }
          }
        }
      }
      return targetComponent;
    }
    return targetComponent;
  }
  function isDerivedReactComponent(fn) {
    return !!(fn && fn.prototype && fn.prototype.isReactComponent);
  }
  function generateId(_ComponentStyle, _displayName, parentComponentId) {
    var displayName = typeof _displayName !== "string" ? "sc" : escape(_displayName);
    var nr = (identifiers[displayName] || 0) + 1;
    identifiers[displayName] = nr;
    var componentId = displayName + "-" + _ComponentStyle.generateName(displayName + nr);
    return parentComponentId ? parentComponentId + "-" + componentId : componentId;
  }
  function createStyledComponent(target, options, rules) {
    var isTargetStyledComp = isStyledComponent(target);
    var isClass = !isTag(target);
    var _options$displayName = options.displayName, displayName = _options$displayName === void 0 ? generateDisplayName(target) : _options$displayName, _options$componentId = options.componentId, componentId = _options$componentId === void 0 ? generateId(ComponentStyle, options.displayName, options.parentComponentId) : _options$componentId, _options$ParentCompon = options.ParentComponent, ParentComponent = _options$ParentCompon === void 0 ? StyledComponent : _options$ParentCompon, _options$attrs = options.attrs, attrs = _options$attrs === void 0 ? EMPTY_ARRAY : _options$attrs;
    var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + "-" + options.componentId : options.componentId || componentId;
    var finalAttrs = (
      // $FlowFixMe
      isTargetStyledComp && target.attrs ? Array.prototype.concat(target.attrs, attrs).filter(Boolean) : attrs
    );
    var componentStyle = new ComponentStyle(isTargetStyledComp ? (
      // fold the underlying StyledComponent rules up (implicit extend)
      // $FlowFixMe
      target.componentStyle.rules.concat(rules)
    ) : rules, finalAttrs, styledComponentId);
    var WrappedStyledComponent = void 0;
    var forwardRef = function forwardRef2(props, ref) {
      return import_react.default.createElement(ParentComponent, _extends({}, props, { forwardedComponent: WrappedStyledComponent, forwardedRef: ref }));
    };
    forwardRef.displayName = displayName;
    WrappedStyledComponent = import_react.default.forwardRef(forwardRef);
    WrappedStyledComponent.displayName = displayName;
    WrappedStyledComponent.attrs = finalAttrs;
    WrappedStyledComponent.componentStyle = componentStyle;
    WrappedStyledComponent.foldedComponentIds = isTargetStyledComp ? (
      // $FlowFixMe
      Array.prototype.concat(target.foldedComponentIds, target.styledComponentId)
    ) : EMPTY_ARRAY;
    WrappedStyledComponent.styledComponentId = styledComponentId;
    WrappedStyledComponent.target = isTargetStyledComp ? target.target : target;
    WrappedStyledComponent.withComponent = function withComponent(tag) {
      var previousComponentId = options.componentId, optionsToCopy = objectWithoutProperties(options, ["componentId"]);
      var newComponentId = previousComponentId && previousComponentId + "-" + (isTag(tag) ? tag : escape(getComponentName(tag)));
      var newOptions = _extends({}, optionsToCopy, {
        attrs: finalAttrs,
        componentId: newComponentId,
        ParentComponent
      });
      return createStyledComponent(tag, newOptions, rules);
    };
    Object.defineProperty(WrappedStyledComponent, "defaultProps", {
      get: function get$$1() {
        return this._foldedDefaultProps;
      },
      set: function set$$1(obj) {
        this._foldedDefaultProps = isTargetStyledComp ? index_esm_default(target.defaultProps, obj) : obj;
      }
    });
    if (true) {
      WrappedStyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
    }
    WrappedStyledComponent.toString = function() {
      return "." + WrappedStyledComponent.styledComponentId;
    };
    if (isClass) {
      hoistNonReactStatics(WrappedStyledComponent, target, {
        // all SC-specific things should not be hoisted
        attrs: true,
        componentStyle: true,
        displayName: true,
        foldedComponentIds: true,
        styledComponentId: true,
        target: true,
        withComponent: true
      });
    }
    return WrappedStyledComponent;
  }
  var import_stylis, import_stylis_rule_sheet, import_react, import_react_is, import_prop_types, interleave, _typeof, classCallCheck, createClass, _extends, inherits, objectWithoutProperties, possibleConstructorReturn, isPlainObject2, EMPTY_ARRAY, EMPTY_OBJECT, SC_ATTR, SC_VERSION_ATTR, SC_STREAM_ATTR, IS_BROWSER, DISABLE_SPEEDY, ERRORS, StyledComponentsError, SC_COMPONENT_ID, extractComps, COMMENT_REGEX, stylisSplitter, stylis, parsingRules, returnRulesPlugin, parseRulesPlugin, _componentId, _selector, _selectorRegexp, selfReferenceReplacer, selfReferenceReplacementPlugin, splitByRules, getNonce, addNameForId, resetIdNames, hasNameForId, stringifyNames, cloneNames, sheetForTag, safeInsertRule, deleteRules, makeTextMarker, addUpUntilIndex, makeStyleTag, wrapAsHtmlTag, wrapAsElement, getIdsFromMarkersFactory, makeSpeedyTag, makeTextNode, makeBrowserTag, makeServerTag, makeTag, rehydrate, SPLIT_REGEX, MAX_SIZE, sheetRunningId, master, StyleSheet, Keyframes, uppercasePattern, msPattern, isFalsish, objToCssArray, charsLength, getAlphabeticChar, hasher, ComponentStyle, LIMIT, createWarnTooManyClasses, determineTheme, escapeRegex, dashesAtEnds, _TYPE_STATICS, REACT_STATICS, KNOWN_STATICS, TYPE_STATICS, defineProperty$1, getOwnPropertyNames, _Object$getOwnPropert, getOwnPropertySymbols, getOwnPropertyDescriptor, getPrototypeOf, objectPrototype, arrayPrototype, once, ThemeContext, ThemeConsumer, ThemeProvider, CLOSING_TAG_R, ServerStyleSheet, StyleSheetContext, StyleSheetConsumer, StyleSheetManager, identifiers, StyledComponent, domElements, styled, GlobalStyle, styled_components_browser_esm_default;
  var init_styled_components_browser_esm = __esm({
    "node_modules/styled-components/dist/styled-components.browser.esm.js"() {
      import_stylis = __toESM(require_stylis_min());
      import_stylis_rule_sheet = __toESM(require_stylis_rule_sheet());
      import_react = __toESM(require_react());
      init_unitless_browser_esm();
      import_react_is = __toESM(require_react_is());
      init_memoize_one_esm();
      import_prop_types = __toESM(require_prop_types());
      init_is_prop_valid_browser_esm();
      init_index_esm2();
      interleave = function(strings, interpolations) {
        var result = [strings[0]];
        for (var i = 0, len = interpolations.length; i < len; i += 1) {
          result.push(interpolations[i], strings[i + 1]);
        }
        return result;
      };
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      createClass = /* @__PURE__ */ function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      inherits = function(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      };
      objectWithoutProperties = function(obj, keys) {
        var target = {};
        for (var i in obj) {
          if (keys.indexOf(i) >= 0) continue;
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          target[i] = obj[i];
        }
        return target;
      };
      possibleConstructorReturn = function(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      };
      isPlainObject2 = function(x) {
        return (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && x.constructor === Object;
      };
      EMPTY_ARRAY = Object.freeze([]);
      EMPTY_OBJECT = Object.freeze({});
      SC_ATTR = typeof process !== "undefined" && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled";
      SC_VERSION_ATTR = "data-styled-version";
      SC_STREAM_ATTR = "data-styled-streamed";
      IS_BROWSER = typeof window !== "undefined" && "HTMLElement" in window;
      DISABLE_SPEEDY = typeof SC_DISABLE_SPEEDY === "boolean" && SC_DISABLE_SPEEDY || typeof process !== "undefined" && (process.env.REACT_APP_SC_DISABLE_SPEEDY || process.env.SC_DISABLE_SPEEDY) || true;
      ERRORS = true ? {
        "1": "Cannot create styled-component for component: %s.\n\n",
        "2": "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
        "3": "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",
        "4": "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",
        "5": "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",
        "6": "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
        "7": 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',
        "8": 'ThemeProvider: Please make your "theme" prop an object.\n\n',
        "9": "Missing document `<head>`\n\n",
        "10": "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",
        "11": "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",
        "12": "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",
        "13": "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n"
      } : {};
      StyledComponentsError = function(_Error) {
        inherits(StyledComponentsError2, _Error);
        function StyledComponentsError2(code) {
          classCallCheck(this, StyledComponentsError2);
          for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            interpolations[_key - 1] = arguments[_key];
          }
          if (false) {
            var _this = possibleConstructorReturn(this, _Error.call(this, "An error occurred. See https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/errors.md#" + code + " for more information." + (interpolations.length > 0 ? " Additional arguments: " + interpolations.join(", ") : "")));
          } else {
            var _this = possibleConstructorReturn(this, _Error.call(this, format.apply(void 0, [ERRORS[code]].concat(interpolations)).trim()));
          }
          return possibleConstructorReturn(_this);
        }
        return StyledComponentsError2;
      }(Error);
      SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;
      extractComps = function(maybeCSS) {
        var css2 = "" + (maybeCSS || "");
        var existingComponents = [];
        css2.replace(SC_COMPONENT_ID, function(match, componentId, matchIndex) {
          existingComponents.push({ componentId, matchIndex });
          return match;
        });
        return existingComponents.map(function(_ref, i) {
          var componentId = _ref.componentId, matchIndex = _ref.matchIndex;
          var nextComp = existingComponents[i + 1];
          var cssFromDOM = nextComp ? css2.slice(matchIndex, nextComp.matchIndex) : css2.slice(matchIndex);
          return { componentId, cssFromDOM };
        });
      };
      COMMENT_REGEX = /^\s*\/\/.*$/gm;
      stylisSplitter = new import_stylis.default({
        global: false,
        cascade: true,
        keyframe: false,
        prefix: false,
        compress: false,
        semicolon: true
      });
      stylis = new import_stylis.default({
        global: false,
        cascade: true,
        keyframe: false,
        prefix: true,
        compress: false,
        semicolon: false
        // NOTE: This means "autocomplete missing semicolons"
      });
      parsingRules = [];
      returnRulesPlugin = function returnRulesPlugin2(context) {
        if (context === -2) {
          var parsedRules = parsingRules;
          parsingRules = [];
          return parsedRules;
        }
      };
      parseRulesPlugin = (0, import_stylis_rule_sheet.default)(function(rule) {
        parsingRules.push(rule);
      });
      _componentId = void 0;
      _selector = void 0;
      _selectorRegexp = void 0;
      selfReferenceReplacer = function selfReferenceReplacer2(match, offset, string) {
        if (
          // the first self-ref is always untouched
          offset > 0 && // there should be at least two self-refs to do a replacement (.b > .b)
          string.slice(0, offset).indexOf(_selector) !== -1 && // no consecutive self refs (.b.b); that is a precedence boost and treated differently
          string.slice(offset - _selector.length, offset) !== _selector
        ) {
          return "." + _componentId;
        }
        return match;
      };
      selfReferenceReplacementPlugin = function selfReferenceReplacementPlugin2(context, _, selectors) {
        if (context === 2 && selectors.length && selectors[0].lastIndexOf(_selector) > 0) {
          selectors[0] = selectors[0].replace(_selectorRegexp, selfReferenceReplacer);
        }
      };
      stylis.use([selfReferenceReplacementPlugin, parseRulesPlugin, returnRulesPlugin]);
      stylisSplitter.use([parseRulesPlugin, returnRulesPlugin]);
      splitByRules = function splitByRules2(css2) {
        return stylisSplitter("", css2);
      };
      getNonce = function() {
        return typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;
      };
      addNameForId = function addNameForId2(names, id, name) {
        if (name) {
          var namesForId = names[id] || (names[id] = /* @__PURE__ */ Object.create(null));
          namesForId[name] = true;
        }
      };
      resetIdNames = function resetIdNames2(names, id) {
        names[id] = /* @__PURE__ */ Object.create(null);
      };
      hasNameForId = function hasNameForId2(names) {
        return function(id, name) {
          return names[id] !== void 0 && names[id][name];
        };
      };
      stringifyNames = function stringifyNames2(names) {
        var str = "";
        for (var id in names) {
          str += Object.keys(names[id]).join(" ") + " ";
        }
        return str.trim();
      };
      cloneNames = function cloneNames2(names) {
        var clone = /* @__PURE__ */ Object.create(null);
        for (var id in names) {
          clone[id] = _extends({}, names[id]);
        }
        return clone;
      };
      sheetForTag = function sheetForTag2(tag) {
        if (tag.sheet) return tag.sheet;
        var size = tag.ownerDocument.styleSheets.length;
        for (var i = 0; i < size; i += 1) {
          var sheet = tag.ownerDocument.styleSheets[i];
          if (sheet.ownerNode === tag) return sheet;
        }
        throw new StyledComponentsError(10);
      };
      safeInsertRule = function safeInsertRule2(sheet, cssRule, index2) {
        if (!cssRule) return false;
        var maxIndex = sheet.cssRules.length;
        try {
          sheet.insertRule(cssRule, index2 <= maxIndex ? index2 : maxIndex);
        } catch (err) {
          return false;
        }
        return true;
      };
      deleteRules = function deleteRules2(sheet, removalIndex, size) {
        var lowerBound = removalIndex - size;
        for (var i = removalIndex; i > lowerBound; i -= 1) {
          sheet.deleteRule(i);
        }
      };
      makeTextMarker = function makeTextMarker2(id) {
        return "\n/* sc-component-id: " + id + " */\n";
      };
      addUpUntilIndex = function addUpUntilIndex2(sizes, index2) {
        var totalUpToIndex = 0;
        for (var i = 0; i <= index2; i += 1) {
          totalUpToIndex += sizes[i];
        }
        return totalUpToIndex;
      };
      makeStyleTag = function makeStyleTag2(target, tagEl, insertBefore) {
        var targetDocument = document;
        if (target) targetDocument = target.ownerDocument;
        else if (tagEl) targetDocument = tagEl.ownerDocument;
        var el = targetDocument.createElement("style");
        el.setAttribute(SC_ATTR, "");
        el.setAttribute(SC_VERSION_ATTR, "4.4.1");
        var nonce = getNonce();
        if (nonce) {
          el.setAttribute("nonce", nonce);
        }
        el.appendChild(targetDocument.createTextNode(""));
        if (target && !tagEl) {
          target.appendChild(el);
        } else {
          if (!tagEl || !target || !tagEl.parentNode) {
            throw new StyledComponentsError(6);
          }
          tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
        }
        return el;
      };
      wrapAsHtmlTag = function wrapAsHtmlTag2(css2, names) {
        return function(additionalAttrs) {
          var nonce = getNonce();
          var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR + '="' + stringifyNames(names) + '"', SC_VERSION_ATTR + '="4.4.1"', additionalAttrs];
          var htmlAttr = attrs.filter(Boolean).join(" ");
          return "<style " + htmlAttr + ">" + css2() + "</style>";
        };
      };
      wrapAsElement = function wrapAsElement2(css2, names) {
        return function() {
          var _props;
          var props = (_props = {}, _props[SC_ATTR] = stringifyNames(names), _props[SC_VERSION_ATTR] = "4.4.1", _props);
          var nonce = getNonce();
          if (nonce) {
            props.nonce = nonce;
          }
          return import_react.default.createElement("style", _extends({}, props, { dangerouslySetInnerHTML: { __html: css2() } }));
        };
      };
      getIdsFromMarkersFactory = function getIdsFromMarkersFactory2(markers) {
        return function() {
          return Object.keys(markers);
        };
      };
      makeSpeedyTag = function makeSpeedyTag2(el, getImportRuleTag) {
        var names = /* @__PURE__ */ Object.create(null);
        var markers = /* @__PURE__ */ Object.create(null);
        var sizes = [];
        var extractImport = getImportRuleTag !== void 0;
        var usedImportRuleTag = false;
        var insertMarker = function insertMarker2(id) {
          var prev = markers[id];
          if (prev !== void 0) {
            return prev;
          }
          markers[id] = sizes.length;
          sizes.push(0);
          resetIdNames(names, id);
          return markers[id];
        };
        var insertRules = function insertRules2(id, cssRules, name) {
          var marker = insertMarker(id);
          var sheet = sheetForTag(el);
          var insertIndex = addUpUntilIndex(sizes, marker);
          var injectedRules = 0;
          var importRules = [];
          var cssRulesSize = cssRules.length;
          for (var i = 0; i < cssRulesSize; i += 1) {
            var cssRule = cssRules[i];
            var mayHaveImport = extractImport;
            if (mayHaveImport && cssRule.indexOf("@import") !== -1) {
              importRules.push(cssRule);
            } else if (safeInsertRule(sheet, cssRule, insertIndex + injectedRules)) {
              mayHaveImport = false;
              injectedRules += 1;
            }
          }
          if (extractImport && importRules.length > 0) {
            usedImportRuleTag = true;
            getImportRuleTag().insertRules(id + "-import", importRules);
          }
          sizes[marker] += injectedRules;
          addNameForId(names, id, name);
        };
        var removeRules = function removeRules2(id) {
          var marker = markers[id];
          if (marker === void 0) return;
          if (el.isConnected === false) return;
          var size = sizes[marker];
          var sheet = sheetForTag(el);
          var removalIndex = addUpUntilIndex(sizes, marker) - 1;
          deleteRules(sheet, removalIndex, size);
          sizes[marker] = 0;
          resetIdNames(names, id);
          if (extractImport && usedImportRuleTag) {
            getImportRuleTag().removeRules(id + "-import");
          }
        };
        var css2 = function css3() {
          var _sheetForTag = sheetForTag(el), cssRules = _sheetForTag.cssRules;
          var str = "";
          for (var id in markers) {
            str += makeTextMarker(id);
            var marker = markers[id];
            var end = addUpUntilIndex(sizes, marker);
            var size = sizes[marker];
            for (var i = end - size; i < end; i += 1) {
              var rule = cssRules[i];
              if (rule !== void 0) {
                str += rule.cssText;
              }
            }
          }
          return str;
        };
        return {
          clone: function clone() {
            throw new StyledComponentsError(5);
          },
          css: css2,
          getIds: getIdsFromMarkersFactory(markers),
          hasNameForId: hasNameForId(names),
          insertMarker,
          insertRules,
          removeRules,
          sealed: false,
          styleTag: el,
          toElement: wrapAsElement(css2, names),
          toHTML: wrapAsHtmlTag(css2, names)
        };
      };
      makeTextNode = function makeTextNode2(targetDocument, id) {
        return targetDocument.createTextNode(makeTextMarker(id));
      };
      makeBrowserTag = function makeBrowserTag2(el, getImportRuleTag) {
        var names = /* @__PURE__ */ Object.create(null);
        var markers = /* @__PURE__ */ Object.create(null);
        var extractImport = getImportRuleTag !== void 0;
        var usedImportRuleTag = false;
        var insertMarker = function insertMarker2(id) {
          var prev = markers[id];
          if (prev !== void 0) {
            return prev;
          }
          markers[id] = makeTextNode(el.ownerDocument, id);
          el.appendChild(markers[id]);
          names[id] = /* @__PURE__ */ Object.create(null);
          return markers[id];
        };
        var insertRules = function insertRules2(id, cssRules, name) {
          var marker = insertMarker(id);
          var importRules = [];
          var cssRulesSize = cssRules.length;
          for (var i = 0; i < cssRulesSize; i += 1) {
            var rule = cssRules[i];
            var mayHaveImport = extractImport;
            if (mayHaveImport && rule.indexOf("@import") !== -1) {
              importRules.push(rule);
            } else {
              mayHaveImport = false;
              var separator = i === cssRulesSize - 1 ? "" : " ";
              marker.appendData("" + rule + separator);
            }
          }
          addNameForId(names, id, name);
          if (extractImport && importRules.length > 0) {
            usedImportRuleTag = true;
            getImportRuleTag().insertRules(id + "-import", importRules);
          }
        };
        var removeRules = function removeRules2(id) {
          var marker = markers[id];
          if (marker === void 0) return;
          var newMarker = makeTextNode(el.ownerDocument, id);
          el.replaceChild(newMarker, marker);
          markers[id] = newMarker;
          resetIdNames(names, id);
          if (extractImport && usedImportRuleTag) {
            getImportRuleTag().removeRules(id + "-import");
          }
        };
        var css2 = function css3() {
          var str = "";
          for (var id in markers) {
            str += markers[id].data;
          }
          return str;
        };
        return {
          clone: function clone() {
            throw new StyledComponentsError(5);
          },
          css: css2,
          getIds: getIdsFromMarkersFactory(markers),
          hasNameForId: hasNameForId(names),
          insertMarker,
          insertRules,
          removeRules,
          sealed: false,
          styleTag: el,
          toElement: wrapAsElement(css2, names),
          toHTML: wrapAsHtmlTag(css2, names)
        };
      };
      makeServerTag = function makeServerTag2(namesArg, markersArg) {
        var names = namesArg === void 0 ? /* @__PURE__ */ Object.create(null) : namesArg;
        var markers = markersArg === void 0 ? /* @__PURE__ */ Object.create(null) : markersArg;
        var insertMarker = function insertMarker2(id) {
          var prev = markers[id];
          if (prev !== void 0) {
            return prev;
          }
          return markers[id] = [""];
        };
        var insertRules = function insertRules2(id, cssRules, name) {
          var marker = insertMarker(id);
          marker[0] += cssRules.join(" ");
          addNameForId(names, id, name);
        };
        var removeRules = function removeRules2(id) {
          var marker = markers[id];
          if (marker === void 0) return;
          marker[0] = "";
          resetIdNames(names, id);
        };
        var css2 = function css3() {
          var str = "";
          for (var id in markers) {
            var cssForId = markers[id][0];
            if (cssForId) {
              str += makeTextMarker(id) + cssForId;
            }
          }
          return str;
        };
        var clone = function clone2() {
          var namesClone = cloneNames(names);
          var markersClone = /* @__PURE__ */ Object.create(null);
          for (var id in markers) {
            markersClone[id] = [markers[id][0]];
          }
          return makeServerTag2(namesClone, markersClone);
        };
        var tag = {
          clone,
          css: css2,
          getIds: getIdsFromMarkersFactory(markers),
          hasNameForId: hasNameForId(names),
          insertMarker,
          insertRules,
          removeRules,
          sealed: false,
          styleTag: null,
          toElement: wrapAsElement(css2, names),
          toHTML: wrapAsHtmlTag(css2, names)
        };
        return tag;
      };
      makeTag = function makeTag2(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
        if (IS_BROWSER && !forceServer) {
          var el = makeStyleTag(target, tagEl, insertBefore);
          if (DISABLE_SPEEDY) {
            return makeBrowserTag(el, getImportRuleTag);
          } else {
            return makeSpeedyTag(el, getImportRuleTag);
          }
        }
        return makeServerTag();
      };
      rehydrate = function rehydrate2(tag, els, extracted) {
        for (var i = 0, len = extracted.length; i < len; i += 1) {
          var _extracted$i = extracted[i], componentId = _extracted$i.componentId, cssFromDOM = _extracted$i.cssFromDOM;
          var cssRules = splitByRules(cssFromDOM);
          tag.insertRules(componentId, cssRules);
        }
        for (var _i = 0, _len = els.length; _i < _len; _i += 1) {
          var el = els[_i];
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      };
      SPLIT_REGEX = /\s+/;
      MAX_SIZE = void 0;
      if (IS_BROWSER) {
        MAX_SIZE = DISABLE_SPEEDY ? 40 : 1e3;
      } else {
        MAX_SIZE = -1;
      }
      sheetRunningId = 0;
      master = void 0;
      StyleSheet = function() {
        function StyleSheet2() {
          var _this = this;
          var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : IS_BROWSER ? document.head : null;
          var forceServer = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          classCallCheck(this, StyleSheet2);
          this.getImportRuleTag = function() {
            var importRuleTag = _this.importRuleTag;
            if (importRuleTag !== void 0) {
              return importRuleTag;
            }
            var firstTag = _this.tags[0];
            var insertBefore = true;
            return _this.importRuleTag = makeTag(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
          };
          sheetRunningId += 1;
          this.id = sheetRunningId;
          this.forceServer = forceServer;
          this.target = forceServer ? null : target;
          this.tagMap = {};
          this.deferred = {};
          this.rehydratedNames = {};
          this.ignoreRehydratedNames = {};
          this.tags = [];
          this.capacity = 1;
          this.clones = [];
        }
        StyleSheet2.prototype.rehydrate = function rehydrate$$1() {
          if (!IS_BROWSER || this.forceServer) return this;
          var els = [];
          var extracted = [];
          var isStreamed = false;
          var nodes = document.querySelectorAll("style[" + SC_ATTR + "][" + SC_VERSION_ATTR + '="4.4.1"]');
          var nodesSize = nodes.length;
          if (!nodesSize) return this;
          for (var i = 0; i < nodesSize; i += 1) {
            var el = nodes[i];
            if (!isStreamed) isStreamed = !!el.getAttribute(SC_STREAM_ATTR);
            var elNames = (el.getAttribute(SC_ATTR) || "").trim().split(SPLIT_REGEX);
            var elNamesSize = elNames.length;
            for (var j = 0, name; j < elNamesSize; j += 1) {
              name = elNames[j];
              this.rehydratedNames[name] = true;
            }
            extracted.push.apply(extracted, extractComps(el.textContent));
            els.push(el);
          }
          var extractedSize = extracted.length;
          if (!extractedSize) return this;
          var tag = this.makeTag(null);
          rehydrate(tag, els, extracted);
          this.capacity = Math.max(1, MAX_SIZE - extractedSize);
          this.tags.push(tag);
          for (var _j = 0; _j < extractedSize; _j += 1) {
            this.tagMap[extracted[_j].componentId] = tag;
          }
          return this;
        };
        StyleSheet2.reset = function reset2() {
          var forceServer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
          master = new StyleSheet2(void 0, forceServer).rehydrate();
        };
        StyleSheet2.prototype.clone = function clone() {
          var sheet = new StyleSheet2(this.target, this.forceServer);
          this.clones.push(sheet);
          sheet.tags = this.tags.map(function(tag) {
            var ids = tag.getIds();
            var newTag = tag.clone();
            for (var i = 0; i < ids.length; i += 1) {
              sheet.tagMap[ids[i]] = newTag;
            }
            return newTag;
          });
          sheet.rehydratedNames = _extends({}, this.rehydratedNames);
          sheet.deferred = _extends({}, this.deferred);
          return sheet;
        };
        StyleSheet2.prototype.sealAllTags = function sealAllTags() {
          this.capacity = 1;
          this.tags.forEach(function(tag) {
            tag.sealed = true;
          });
        };
        StyleSheet2.prototype.makeTag = function makeTag$$1(tag) {
          var lastEl = tag ? tag.styleTag : null;
          var insertBefore = false;
          return makeTag(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
        };
        StyleSheet2.prototype.getTagForId = function getTagForId(id) {
          var prev = this.tagMap[id];
          if (prev !== void 0 && !prev.sealed) {
            return prev;
          }
          var tag = this.tags[this.tags.length - 1];
          this.capacity -= 1;
          if (this.capacity === 0) {
            this.capacity = MAX_SIZE;
            tag = this.makeTag(tag);
            this.tags.push(tag);
          }
          return this.tagMap[id] = tag;
        };
        StyleSheet2.prototype.hasId = function hasId(id) {
          return this.tagMap[id] !== void 0;
        };
        StyleSheet2.prototype.hasNameForId = function hasNameForId3(id, name) {
          if (this.ignoreRehydratedNames[id] === void 0 && this.rehydratedNames[name]) {
            return true;
          }
          var tag = this.tagMap[id];
          return tag !== void 0 && tag.hasNameForId(id, name);
        };
        StyleSheet2.prototype.deferredInject = function deferredInject(id, cssRules) {
          if (this.tagMap[id] !== void 0) return;
          var clones = this.clones;
          for (var i = 0; i < clones.length; i += 1) {
            clones[i].deferredInject(id, cssRules);
          }
          this.getTagForId(id).insertMarker(id);
          this.deferred[id] = cssRules;
        };
        StyleSheet2.prototype.inject = function inject(id, cssRules, name) {
          var clones = this.clones;
          for (var i = 0; i < clones.length; i += 1) {
            clones[i].inject(id, cssRules, name);
          }
          var tag = this.getTagForId(id);
          if (this.deferred[id] !== void 0) {
            var rules = this.deferred[id].concat(cssRules);
            tag.insertRules(id, rules, name);
            this.deferred[id] = void 0;
          } else {
            tag.insertRules(id, cssRules, name);
          }
        };
        StyleSheet2.prototype.remove = function remove(id) {
          var tag = this.tagMap[id];
          if (tag === void 0) return;
          var clones = this.clones;
          for (var i = 0; i < clones.length; i += 1) {
            clones[i].remove(id);
          }
          tag.removeRules(id);
          this.ignoreRehydratedNames[id] = true;
          this.deferred[id] = void 0;
        };
        StyleSheet2.prototype.toHTML = function toHTML() {
          return this.tags.map(function(tag) {
            return tag.toHTML();
          }).join("");
        };
        StyleSheet2.prototype.toReactElements = function toReactElements() {
          var id = this.id;
          return this.tags.map(function(tag, i) {
            var key = "sc-" + id + "-" + i;
            return (0, import_react.cloneElement)(tag.toElement(), { key });
          });
        };
        createClass(StyleSheet2, null, [{
          key: "master",
          get: function get$$1() {
            return master || (master = new StyleSheet2().rehydrate());
          }
          /* NOTE: This is just for backwards-compatibility with jest-styled-components */
        }, {
          key: "instance",
          get: function get$$1() {
            return StyleSheet2.master;
          }
        }]);
        return StyleSheet2;
      }();
      Keyframes = function() {
        function Keyframes2(name, rules) {
          var _this = this;
          classCallCheck(this, Keyframes2);
          this.inject = function(styleSheet) {
            if (!styleSheet.hasNameForId(_this.id, _this.name)) {
              styleSheet.inject(_this.id, _this.rules, _this.name);
            }
          };
          this.toString = function() {
            throw new StyledComponentsError(12, String(_this.name));
          };
          this.name = name;
          this.rules = rules;
          this.id = "sc-keyframes-" + name;
        }
        Keyframes2.prototype.getName = function getName() {
          return this.name;
        };
        return Keyframes2;
      }();
      uppercasePattern = /([A-Z])/g;
      msPattern = /^ms-/;
      isFalsish = function isFalsish2(chunk) {
        return chunk === void 0 || chunk === null || chunk === false || chunk === "";
      };
      objToCssArray = function objToCssArray2(obj, prevKey) {
        var rules = [];
        var keys = Object.keys(obj);
        keys.forEach(function(key) {
          if (!isFalsish(obj[key])) {
            if (isPlainObject2(obj[key])) {
              rules.push.apply(rules, objToCssArray2(obj[key], key));
              return rules;
            } else if (isFunction(obj[key])) {
              rules.push(hyphenateStyleName(key) + ":", obj[key], ";");
              return rules;
            }
            rules.push(hyphenateStyleName(key) + ": " + addUnitIfNeeded(key, obj[key]) + ";");
          }
          return rules;
        });
        return prevKey ? [prevKey + " {"].concat(rules, ["}"]) : rules;
      };
      charsLength = 52;
      getAlphabeticChar = function getAlphabeticChar2(code) {
        return String.fromCharCode(code + (code > 25 ? 39 : 97));
      };
      hasher = function hasher2(str) {
        return generateAlphabeticName(murmurhash(str));
      };
      ComponentStyle = function() {
        function ComponentStyle2(rules, attrs, componentId) {
          classCallCheck(this, ComponentStyle2);
          this.rules = rules;
          this.isStatic = false;
          this.componentId = componentId;
          if (!StyleSheet.master.hasId(componentId)) {
            StyleSheet.master.deferredInject(componentId, []);
          }
        }
        ComponentStyle2.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
          var isStatic = this.isStatic, componentId = this.componentId, lastClassName = this.lastClassName;
          if (IS_BROWSER && isStatic && typeof lastClassName === "string" && styleSheet.hasNameForId(componentId, lastClassName)) {
            return lastClassName;
          }
          var flatCSS = flatten(this.rules, executionContext, styleSheet);
          var name = hasher(this.componentId + flatCSS.join(""));
          if (!styleSheet.hasNameForId(componentId, name)) {
            styleSheet.inject(this.componentId, stringifyRules(flatCSS, "." + name, void 0, componentId), name);
          }
          this.lastClassName = name;
          return name;
        };
        ComponentStyle2.generateName = function generateName(str) {
          return hasher(str);
        };
        return ComponentStyle2;
      }();
      LIMIT = 200;
      createWarnTooManyClasses = function(displayName) {
        var generatedClasses = {};
        var warningSeen = false;
        return function(className) {
          if (!warningSeen) {
            generatedClasses[className] = true;
            if (Object.keys(generatedClasses).length >= LIMIT) {
              console.warn("Over " + LIMIT + " classes were generated for component " + displayName + ". \nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />");
              warningSeen = true;
              generatedClasses = {};
            }
          }
        };
      };
      determineTheme = function(props, fallbackTheme) {
        var defaultProps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EMPTY_OBJECT;
        var isDefaultTheme = defaultProps ? props.theme === defaultProps.theme : false;
        var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme || defaultProps.theme;
        return theme;
      };
      escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
      dashesAtEnds = /(^-|-$)/g;
      REACT_STATICS = {
        childContextTypes: true,
        contextTypes: true,
        defaultProps: true,
        displayName: true,
        getDerivedStateFromProps: true,
        propTypes: true,
        type: true
      };
      KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        callee: true,
        arguments: true,
        arity: true
      };
      TYPE_STATICS = (_TYPE_STATICS = {}, _TYPE_STATICS[import_react_is.ForwardRef] = {
        $$typeof: true,
        render: true
      }, _TYPE_STATICS);
      defineProperty$1 = Object.defineProperty;
      getOwnPropertyNames = Object.getOwnPropertyNames;
      _Object$getOwnPropert = Object.getOwnPropertySymbols;
      getOwnPropertySymbols = _Object$getOwnPropert === void 0 ? function() {
        return [];
      } : _Object$getOwnPropert;
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      getPrototypeOf = Object.getPrototypeOf;
      objectPrototype = Object.prototype;
      arrayPrototype = Array.prototype;
      once = function(cb) {
        var called = false;
        return function() {
          if (!called) {
            called = true;
            cb.apply(void 0, arguments);
          }
        };
      };
      ThemeContext = (0, import_react.createContext)();
      ThemeConsumer = ThemeContext.Consumer;
      ThemeProvider = function(_Component) {
        inherits(ThemeProvider2, _Component);
        function ThemeProvider2(props) {
          classCallCheck(this, ThemeProvider2);
          var _this = possibleConstructorReturn(this, _Component.call(this, props));
          _this.getContext = memoize_one_esm_default(_this.getContext.bind(_this));
          _this.renderInner = _this.renderInner.bind(_this);
          return _this;
        }
        ThemeProvider2.prototype.render = function render() {
          if (!this.props.children) return null;
          return import_react.default.createElement(
            ThemeContext.Consumer,
            null,
            this.renderInner
          );
        };
        ThemeProvider2.prototype.renderInner = function renderInner(outerTheme) {
          var context = this.getContext(this.props.theme, outerTheme);
          return import_react.default.createElement(
            ThemeContext.Provider,
            { value: context },
            this.props.children
          );
        };
        ThemeProvider2.prototype.getTheme = function getTheme(theme, outerTheme) {
          if (isFunction(theme)) {
            var mergedTheme = theme(outerTheme);
            if (mergedTheme === null || Array.isArray(mergedTheme) || (typeof mergedTheme === "undefined" ? "undefined" : _typeof(mergedTheme)) !== "object") {
              throw new StyledComponentsError(7);
            }
            return mergedTheme;
          }
          if (theme === null || Array.isArray(theme) || (typeof theme === "undefined" ? "undefined" : _typeof(theme)) !== "object") {
            throw new StyledComponentsError(8);
          }
          return _extends({}, outerTheme, theme);
        };
        ThemeProvider2.prototype.getContext = function getContext(theme, outerTheme) {
          return this.getTheme(theme, outerTheme);
        };
        return ThemeProvider2;
      }(import_react.Component);
      CLOSING_TAG_R = /^\s*<\/[a-z]/i;
      ServerStyleSheet = function() {
        function ServerStyleSheet2() {
          classCallCheck(this, ServerStyleSheet2);
          this.masterSheet = StyleSheet.master;
          this.instance = this.masterSheet.clone();
          this.sealed = false;
        }
        ServerStyleSheet2.prototype.seal = function seal() {
          if (!this.sealed) {
            var index2 = this.masterSheet.clones.indexOf(this.instance);
            this.masterSheet.clones.splice(index2, 1);
            this.sealed = true;
          }
        };
        ServerStyleSheet2.prototype.collectStyles = function collectStyles(children) {
          if (this.sealed) {
            throw new StyledComponentsError(2);
          }
          return import_react.default.createElement(
            StyleSheetManager,
            { sheet: this.instance },
            children
          );
        };
        ServerStyleSheet2.prototype.getStyleTags = function getStyleTags() {
          this.seal();
          return this.instance.toHTML();
        };
        ServerStyleSheet2.prototype.getStyleElement = function getStyleElement() {
          this.seal();
          return this.instance.toReactElements();
        };
        ServerStyleSheet2.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
          var _this = this;
          {
            throw new StyledComponentsError(3);
          }
          var instance = this.instance;
          var instanceTagIndex = 0;
          var streamAttr = SC_STREAM_ATTR + '="true"';
          var transformer = new stream.Transform({
            transform: function appendStyleChunks(chunk, _, callback) {
              var tags = instance.tags;
              var html = "";
              for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
                var tag = tags[instanceTagIndex];
                html += tag.toHTML(streamAttr);
              }
              instance.sealAllTags();
              var renderedHtml = chunk.toString();
              if (CLOSING_TAG_R.test(renderedHtml)) {
                var endOfClosingTag = renderedHtml.indexOf(">");
                this.push(renderedHtml.slice(0, endOfClosingTag + 1) + html + renderedHtml.slice(endOfClosingTag + 1));
              } else this.push(html + renderedHtml);
              callback();
            }
          });
          readableStream.on("end", function() {
            return _this.seal();
          });
          readableStream.on("error", function(err) {
            _this.seal();
            transformer.emit("error", err);
          });
          return readableStream.pipe(transformer);
        };
        return ServerStyleSheet2;
      }();
      StyleSheetContext = (0, import_react.createContext)();
      StyleSheetConsumer = StyleSheetContext.Consumer;
      StyleSheetManager = function(_Component) {
        inherits(StyleSheetManager2, _Component);
        function StyleSheetManager2(props) {
          classCallCheck(this, StyleSheetManager2);
          var _this = possibleConstructorReturn(this, _Component.call(this, props));
          _this.getContext = memoize_one_esm_default(_this.getContext);
          return _this;
        }
        StyleSheetManager2.prototype.getContext = function getContext(sheet, target) {
          if (sheet) {
            return sheet;
          } else if (target) {
            return new StyleSheet(target);
          } else {
            throw new StyledComponentsError(4);
          }
        };
        StyleSheetManager2.prototype.render = function render() {
          var _props = this.props, children = _props.children, sheet = _props.sheet, target = _props.target;
          return import_react.default.createElement(
            StyleSheetContext.Provider,
            { value: this.getContext(sheet, target) },
            true ? import_react.default.Children.only(children) : children
          );
        };
        return StyleSheetManager2;
      }(import_react.Component);
      true ? StyleSheetManager.propTypes = {
        sheet: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(StyleSheet), import_prop_types.default.instanceOf(ServerStyleSheet)]),
        target: import_prop_types.default.shape({
          appendChild: import_prop_types.default.func.isRequired
        })
      } : void 0;
      identifiers = {};
      StyledComponent = function(_Component) {
        inherits(StyledComponent2, _Component);
        function StyledComponent2() {
          classCallCheck(this, StyledComponent2);
          var _this = possibleConstructorReturn(this, _Component.call(this));
          _this.attrs = {};
          _this.renderOuter = _this.renderOuter.bind(_this);
          _this.renderInner = _this.renderInner.bind(_this);
          if (true) {
            _this.warnInnerRef = once(function(displayName) {
              return (
                // eslint-disable-next-line no-console
                console.warn('The "innerRef" API has been removed in styled-components v4 in favor of React 16 ref forwarding, use "ref" instead like a typical component. "innerRef" was detected on component "' + displayName + '".')
              );
            });
            _this.warnAttrsFnObjectKeyDeprecated = once(function(key, displayName) {
              return (
                // eslint-disable-next-line no-console
                console.warn('Functions as object-form attrs({}) keys are now deprecated and will be removed in a future version of styled-components. Switch to the new attrs(props => ({})) syntax instead for easier and more powerful composition. The attrs key in question is "' + key + '" on component "' + displayName + '".', "\n " + new Error().stack)
              );
            });
            _this.warnNonStyledComponentAttrsObjectKey = once(function(key, displayName) {
              return (
                // eslint-disable-next-line no-console
                console.warn(`It looks like you've used a non styled-component as the value for the "` + key + '" prop in an object-form attrs constructor of "' + displayName + `".
You should use the new function-form attrs constructor which avoids this issue: attrs(props => ({ yourStuff }))
To continue using the deprecated object syntax, you'll need to wrap your component prop in a function to make it available inside the styled component (you'll still get the deprecation warning though.)
` + ("For example, { " + key + ": () => InnerComponent } instead of { " + key + ": InnerComponent }"))
              );
            });
          }
          return _this;
        }
        StyledComponent2.prototype.render = function render() {
          return import_react.default.createElement(
            StyleSheetConsumer,
            null,
            this.renderOuter
          );
        };
        StyledComponent2.prototype.renderOuter = function renderOuter() {
          var styleSheet = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : StyleSheet.master;
          this.styleSheet = styleSheet;
          if (this.props.forwardedComponent.componentStyle.isStatic) return this.renderInner();
          return import_react.default.createElement(
            ThemeConsumer,
            null,
            this.renderInner
          );
        };
        StyledComponent2.prototype.renderInner = function renderInner(theme) {
          var _props$forwardedCompo = this.props.forwardedComponent, componentStyle = _props$forwardedCompo.componentStyle, defaultProps = _props$forwardedCompo.defaultProps, displayName = _props$forwardedCompo.displayName, foldedComponentIds = _props$forwardedCompo.foldedComponentIds, styledComponentId = _props$forwardedCompo.styledComponentId, target = _props$forwardedCompo.target;
          var generatedClassName = void 0;
          if (componentStyle.isStatic) {
            generatedClassName = this.generateAndInjectStyles(EMPTY_OBJECT, this.props);
          } else {
            generatedClassName = this.generateAndInjectStyles(determineTheme(this.props, theme, defaultProps) || EMPTY_OBJECT, this.props);
          }
          var elementToBeCreated = this.props.as || this.attrs.as || target;
          var isTargetTag = isTag(elementToBeCreated);
          var propsForElement = {};
          var computedProps = _extends({}, this.props, this.attrs);
          var key = void 0;
          for (key in computedProps) {
            if (key === "innerRef" && isTargetTag) {
              this.warnInnerRef(displayName);
            }
            if (key === "forwardedComponent" || key === "as") {
              continue;
            } else if (key === "forwardedRef") propsForElement.ref = computedProps[key];
            else if (key === "forwardedAs") propsForElement.as = computedProps[key];
            else if (!isTargetTag || is_prop_valid_browser_esm_default(key)) {
              propsForElement[key] = computedProps[key];
            }
          }
          if (this.props.style && this.attrs.style) {
            propsForElement.style = _extends({}, this.attrs.style, this.props.style);
          }
          propsForElement.className = Array.prototype.concat(foldedComponentIds, styledComponentId, generatedClassName !== styledComponentId ? generatedClassName : null, this.props.className, this.attrs.className).filter(Boolean).join(" ");
          return (0, import_react.createElement)(elementToBeCreated, propsForElement);
        };
        StyledComponent2.prototype.buildExecutionContext = function buildExecutionContext(theme, props, attrs) {
          var _this2 = this;
          var context = _extends({}, props, { theme });
          if (!attrs.length) return context;
          this.attrs = {};
          attrs.forEach(function(attrDef) {
            var resolvedAttrDef = attrDef;
            var attrDefWasFn = false;
            var attr = void 0;
            var key = void 0;
            if (isFunction(resolvedAttrDef)) {
              resolvedAttrDef = resolvedAttrDef(context);
              attrDefWasFn = true;
            }
            for (key in resolvedAttrDef) {
              attr = resolvedAttrDef[key];
              if (!attrDefWasFn) {
                if (isFunction(attr) && !isDerivedReactComponent(attr) && !isStyledComponent(attr)) {
                  if (true) {
                    _this2.warnAttrsFnObjectKeyDeprecated(key, props.forwardedComponent.displayName);
                  }
                  attr = attr(context);
                  if (import_react.default.isValidElement(attr)) {
                    _this2.warnNonStyledComponentAttrsObjectKey(key, props.forwardedComponent.displayName);
                  }
                }
              }
              _this2.attrs[key] = attr;
              context[key] = attr;
            }
          });
          return context;
        };
        StyledComponent2.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
          var _props$forwardedCompo2 = props.forwardedComponent, attrs = _props$forwardedCompo2.attrs, componentStyle = _props$forwardedCompo2.componentStyle, warnTooManyClasses = _props$forwardedCompo2.warnTooManyClasses;
          if (componentStyle.isStatic && !attrs.length) {
            return componentStyle.generateAndInjectStyles(EMPTY_OBJECT, this.styleSheet);
          }
          var className = componentStyle.generateAndInjectStyles(this.buildExecutionContext(theme, props, attrs), this.styleSheet);
          if (warnTooManyClasses) warnTooManyClasses(className);
          return className;
        };
        return StyledComponent2;
      }(import_react.Component);
      domElements = [
        "a",
        "abbr",
        "address",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "base",
        "bdi",
        "bdo",
        "big",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "cite",
        "code",
        "col",
        "colgroup",
        "data",
        "datalist",
        "dd",
        "del",
        "details",
        "dfn",
        "dialog",
        "div",
        "dl",
        "dt",
        "em",
        "embed",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hgroup",
        "hr",
        "html",
        "i",
        "iframe",
        "img",
        "input",
        "ins",
        "kbd",
        "keygen",
        "label",
        "legend",
        "li",
        "link",
        "main",
        "map",
        "mark",
        "marquee",
        "menu",
        "menuitem",
        "meta",
        "meter",
        "nav",
        "noscript",
        "object",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "param",
        "picture",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "script",
        "section",
        "select",
        "small",
        "source",
        "span",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "title",
        "tr",
        "track",
        "u",
        "ul",
        "var",
        "video",
        "wbr",
        // SVG
        "circle",
        "clipPath",
        "defs",
        "ellipse",
        "foreignObject",
        "g",
        "image",
        "line",
        "linearGradient",
        "marker",
        "mask",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialGradient",
        "rect",
        "stop",
        "svg",
        "text",
        "tspan"
      ];
      styled = function styled2(tag) {
        return constructWithOptions(createStyledComponent, tag);
      };
      domElements.forEach(function(domElement) {
        styled[domElement] = styled(domElement);
      });
      GlobalStyle = function() {
        function GlobalStyle2(rules, componentId) {
          classCallCheck(this, GlobalStyle2);
          this.rules = rules;
          this.componentId = componentId;
          this.isStatic = isStaticRules(rules, EMPTY_ARRAY);
          if (!StyleSheet.master.hasId(componentId)) {
            StyleSheet.master.deferredInject(componentId, []);
          }
        }
        GlobalStyle2.prototype.createStyles = function createStyles(executionContext, styleSheet) {
          var flatCSS = flatten(this.rules, executionContext, styleSheet);
          var css2 = stringifyRules(flatCSS, "");
          styleSheet.inject(this.componentId, css2);
        };
        GlobalStyle2.prototype.removeStyles = function removeStyles(styleSheet) {
          var componentId = this.componentId;
          if (styleSheet.hasId(componentId)) {
            styleSheet.remove(componentId);
          }
        };
        GlobalStyle2.prototype.renderStyles = function renderStyles(executionContext, styleSheet) {
          this.removeStyles(styleSheet);
          this.createStyles(executionContext, styleSheet);
        };
        return GlobalStyle2;
      }();
      if (IS_BROWSER) {
        window.scCGSHMRCache = {};
      }
      if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
        console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native");
      }
      if (typeof window !== "undefined" && typeof navigator !== "undefined" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Node.js") === -1 && navigator.userAgent.indexOf("jsdom") === -1) {
        window["__styled-components-init__"] = window["__styled-components-init__"] || 0;
        if (window["__styled-components-init__"] === 1) {
          console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles not rendering properly, errors happening during rehydration process and makes your application bigger without a good reason.\n\nSee https://s-c.sh/2BAXzed for more info.");
        }
        window["__styled-components-init__"] += 1;
      }
      styled_components_browser_esm_default = styled;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/utils/string.js
  var sortAlphanumerically;
  var init_string = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/utils/string.js"() {
      sortAlphanumerically = (a, b) => {
        const collator = new Intl.Collator(void 0, {
          numeric: true,
          sensitivity: "base"
        });
        return collator.compare(a, b);
      };
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/core/calculate-svg-dimensions.js
  function calculateSVGDimensions(numOfRows, numOfColumns, rowHeight, columnWidth, canvasPadding, roundHeader, currentRound = "") {
    const bracketHeight = numOfRows * rowHeight;
    const bracketWidth = numOfColumns * columnWidth;
    const gameHeight = bracketHeight + canvasPadding * 2 + (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);
    const gameWidth = bracketWidth + canvasPadding * 2;
    const startPosition = [
      currentRound ? -(parseInt(currentRound, 10) * columnWidth - canvasPadding * 2) : 0,
      0
    ];
    return { gameWidth, gameHeight, startPosition };
  }
  var init_calculate_svg_dimensions = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/core/calculate-svg-dimensions.js"() {
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/core/match-context.js
  var import_jsx_runtime, import_react2, initialState, store, Provider, MatchContextProvider;
  var init_match_context = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/core/match-context.js"() {
      import_jsx_runtime = __toESM(require_jsx_runtime());
      import_react2 = __toESM(require_react());
      initialState = {
        hoveredMatchId: null,
        hoveredPartyId: null,
        hoveredColumnIndex: null,
        hoveredRowIndex: null
      };
      store = (0, import_react2.createContext)(initialState);
      ({ Provider } = store);
      MatchContextProvider = ({ children }) => {
        const [state, dispatch] = (0, import_react2.useReducer)((previousState, action) => {
          var _a;
          switch (action.type) {
            case "SET_HOVERED_PARTYID": {
              const { partyId, columnIndex, rowIndex, matchId } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
              return Object.assign(Object.assign({}, previousState), { hoveredPartyId: partyId, hoveredColumnIndex: columnIndex, hoveredRowIndex: rowIndex, hoveredMatchId: matchId });
            }
            default:
              throw new Error();
          }
        }, initialState);
        return (0, import_jsx_runtime.jsx)(Provider, Object.assign({ value: { state, dispatch } }, { children }));
      };
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/core/match-states.js
  var MATCH_STATES;
  var init_match_states = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/core/match-states.js"() {
      MATCH_STATES = {
        PLAYED: "PLAYED",
        NO_SHOW: "NO_SHOW",
        WALK_OVER: "WALK_OVER",
        NO_PARTY: "NO_PARTY",
        DONE: "DONE",
        SCORE_DONE: "SCORE_DONE"
      };
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/settings.js
  var defaultStyle, getCalculatedStyles;
  var init_settings = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/settings.js"() {
      defaultStyle = {
        width: 300,
        boxHeight: 110,
        canvasPadding: 25,
        spaceBetweenColumns: 50,
        spaceBetweenRows: 50,
        connectorColor: "rgb(47, 54, 72)",
        connectorColorHighlight: "#DDD",
        roundHeader: {
          isShown: true,
          height: 40,
          marginBottom: 25,
          fontSize: 16,
          fontColor: "white",
          backgroundColor: "rgb(47, 54, 72)",
          fontFamily: '"Roboto", "Arial", "Helvetica", "sans-serif"',
          roundTextGenerator: void 0
        },
        roundSeparatorWidth: 24,
        lineInfo: {
          separation: -13,
          homeVisitorSpread: 0.5
        },
        horizontalOffset: 13,
        wonBywalkOverText: "WO",
        lostByNoShowText: "NS"
      };
      getCalculatedStyles = (style = defaultStyle) => {
        const { boxHeight, width, spaceBetweenColumns, spaceBetweenRows } = style;
        const columnWidth = width + spaceBetweenColumns;
        const rowHeight = boxHeight + spaceBetweenRows;
        return Object.assign(Object.assign({}, style), { rowHeight, columnWidth });
      };
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/core/match-functions.js
  function getPreviousMatches(columnIndex, columns, previousBottomPosition) {
    const previousTopMatch = columnIndex !== 0 && columns[columnIndex - 1][previousBottomPosition - 1];
    const previousBottomMatch = columnIndex !== 0 && columns[columnIndex - 1][previousBottomPosition];
    return { previousTopMatch, previousBottomMatch };
  }
  function sortTeamsSeedOrder(previousBottomMatch) {
    return (partyA, partyB) => {
      var _a, _b;
      const partyAInBottomMatch = (_a = previousBottomMatch === null || previousBottomMatch === void 0 ? void 0 : previousBottomMatch.participants) === null || _a === void 0 ? void 0 : _a.find((p) => p.id === partyA.id);
      const partyBInBottomMatch = (_b = previousBottomMatch === null || previousBottomMatch === void 0 ? void 0 : previousBottomMatch.participants) === null || _b === void 0 ? void 0 : _b.find((p) => p.id === partyB.id);
      if (partyAInBottomMatch) {
        return 1;
      }
      if (partyBInBottomMatch) {
        return -1;
      }
      return 0;
    };
  }
  var init_match_functions = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/core/match-functions.js"() {
      init_string();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/core/match-wrapper.js
  function Match(_a) {
    var _b;
    var { rowIndex, columnIndex, match, previousBottomMatch = null, teams, topText, bottomText, style = defaultStyle, matchComponent: MatchComponent, onMatchClick, onPartyClick } = _a, rest = __rest(_a, ["rowIndex", "columnIndex", "match", "previousBottomMatch", "teams", "topText", "bottomText", "style", "matchComponent", "onMatchClick", "onPartyClick"]);
    const { state: { hoveredPartyId }, dispatch } = (0, import_react3.useContext)(store);
    const computedStyles = getCalculatedStyles(style);
    const { width = 300, boxHeight = 70, connectorColor } = computedStyles;
    const sortedTeams = teams.sort(sortTeamsSeedOrder(previousBottomMatch));
    const topParty = (sortedTeams === null || sortedTeams === void 0 ? void 0 : sortedTeams[0]) ? sortedTeams[0] : {};
    const bottomParty = (sortedTeams === null || sortedTeams === void 0 ? void 0 : sortedTeams[1]) ? sortedTeams[1] : {};
    const topHovered = !Number.isNaN(hoveredPartyId) && (topParty === null || topParty === void 0 ? void 0 : topParty.id) !== void 0 && hoveredPartyId === topParty.id;
    const bottomHovered = !Number.isNaN(hoveredPartyId) && (bottomParty === null || bottomParty === void 0 ? void 0 : bottomParty.id) !== void 0 && hoveredPartyId === bottomParty.id;
    const participantWalkedOver = (participant) => match.state === MATCH_STATES.WALK_OVER && teams.filter((team) => !!team.id).length < 2 && participant.id;
    const topWon = topParty.status === MATCH_STATES.WALK_OVER || participantWalkedOver(topParty) || topParty.isWinner;
    const bottomWon = bottomParty.status === MATCH_STATES.WALK_OVER || participantWalkedOver(bottomParty) || bottomParty.isWinner;
    const matchState = MATCH_STATES[match.state];
    const teamNameFallback = (_b = {
      [MATCH_STATES.WALK_OVER]: "",
      [MATCH_STATES.NO_SHOW]: "",
      [MATCH_STATES.DONE]: "",
      [MATCH_STATES.SCORE_DONE]: "",
      [MATCH_STATES.NO_PARTY]: ""
    }[matchState]) !== null && _b !== void 0 ? _b : "TBD";
    const resultFallback = (participant) => {
      var _a2;
      if (participant.status) {
        return (_a2 = {
          WALKOVER: computedStyles.wonBywalkOverText,
          [MATCH_STATES.WALK_OVER]: computedStyles.wonBywalkOverText,
          [MATCH_STATES.NO_SHOW]: computedStyles.lostByNoShowText,
          [MATCH_STATES.NO_PARTY]: ""
        }[participant.status]) !== null && _a2 !== void 0 ? _a2 : "";
      }
      if (participantWalkedOver(participant)) {
        return computedStyles.wonBywalkOverText;
      }
      return "";
    };
    const onMouseEnter = (partyId) => {
      dispatch({
        type: "SET_HOVERED_PARTYID",
        payload: {
          partyId,
          matchId: match.id,
          rowIndex,
          columnIndex
        }
      });
    };
    const onMouseLeave = () => {
      dispatch({ type: "SET_HOVERED_PARTYID", payload: null });
    };
    bottomParty.name = bottomParty.name || teamNameFallback;
    bottomParty.resultText = bottomParty.resultText || resultFallback(bottomParty);
    topParty.name = topParty.name || teamNameFallback;
    topParty.resultText = topParty.resultText || resultFallback(topParty);
    return (0, import_jsx_runtime2.jsx)("svg", Object.assign({ width, height: boxHeight, viewBox: `0 0 ${width} ${boxHeight}` }, rest, { children: (0, import_jsx_runtime2.jsx)("foreignObject", Object.assign({ x: 0, y: 0, width, height: boxHeight }, { children: MatchComponent && (0, import_jsx_runtime2.jsx)(MatchComponent, Object.assign({}, {
      match,
      onMatchClick,
      onPartyClick,
      onMouseEnter,
      onMouseLeave,
      topParty,
      bottomParty,
      topWon,
      bottomWon,
      topHovered,
      bottomHovered,
      topText,
      bottomText,
      connectorColor,
      computedStyles
    })) })) }));
  }
  var import_jsx_runtime2, import_react3, __rest, match_wrapper_default;
  var init_match_wrapper = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/core/match-wrapper.js"() {
      import_jsx_runtime2 = __toESM(require_jsx_runtime());
      import_react3 = __toESM(require_react());
      init_match_context();
      init_match_states();
      init_settings();
      init_match_functions();
      __rest = function(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      match_wrapper_default = Match;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/components/round-header.js
  function RoundHeader({ x, y = 0, width, roundHeader, canvasPadding, numOfRounds, tournamentRoundText, columnIndex }) {
    return (0, import_jsx_runtime3.jsxs)("g", { children: [(0, import_jsx_runtime3.jsx)(Rect, { x, y: y + canvasPadding, width, height: roundHeader.height, fill: roundHeader.backgroundColor, rx: "3", ry: "3" }), (0, import_jsx_runtime3.jsxs)(Text, Object.assign({ x: x + width / 2, y: y + canvasPadding + roundHeader.height / 2, style: {
      fontFamily: roundHeader.fontFamily,
      fontSize: `${roundHeader.fontSize}px`,
      color: roundHeader.fontColor
    }, fill: "currentColor", dominantBaseline: "middle", textAnchor: "middle" }, { children: [!roundHeader.roundTextGenerator && columnIndex + 1 === numOfRounds && "Final", !roundHeader.roundTextGenerator && columnIndex + 1 === numOfRounds - 1 && "Semi-final", !roundHeader.roundTextGenerator && columnIndex + 1 < numOfRounds - 1 && `Round ${tournamentRoundText}`, roundHeader.roundTextGenerator && roundHeader.roundTextGenerator(columnIndex + 1, numOfRounds)] }))] });
  }
  var import_jsx_runtime3, Text, Rect;
  var init_round_header = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/components/round-header.js"() {
      import_jsx_runtime3 = __toESM(require_jsx_runtime());
      init_styled_components_browser_esm();
      Text = styled_components_browser_esm_default.text`
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor.highlighted};
`;
      Rect = styled_components_browser_esm_default.rect.attrs(({ theme }) => ({
        fill: theme.roundHeaders.background
      }))``;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-single/calculate-match-position.js
  var calculateVerticalStartingPoint, columnIncrement, calculateHeightIncrease, calculateVerticalPositioning, calculatePositionOfMatch;
  var init_calculate_match_position = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-single/calculate-match-position.js"() {
      calculateVerticalStartingPoint = (columnIndex, height) => 2 ** columnIndex * (height / 2) - height / 2;
      columnIncrement = (columnIndex, height) => 2 ** columnIndex * height;
      calculateHeightIncrease = (columnIndex, rowIndex, height) => columnIncrement(columnIndex, height) * rowIndex;
      calculateVerticalPositioning = ({ rowIndex, columnIndex, rowHeight: height }) => {
        return calculateHeightIncrease(columnIndex, rowIndex, height) + calculateVerticalStartingPoint(columnIndex, height);
      };
      calculatePositionOfMatch = (rowIndex, columnIndex, { canvasPadding, rowHeight, columnWidth, offsetX = 0, offsetY = 0 }) => {
        const result = calculateVerticalPositioning({
          rowHeight,
          rowIndex,
          columnIndex
        });
        return {
          x: columnIndex * columnWidth + canvasPadding + offsetX,
          y: result + canvasPadding + offsetY
        };
      };
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/hooks/use-match-highlight.js
  var import_react4, useMatchHighlightContext, use_match_highlight_default;
  var init_use_match_highlight = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/hooks/use-match-highlight.js"() {
      import_react4 = __toESM(require_react());
      init_match_context();
      useMatchHighlightContext = ({ bracketSnippet = null }) => {
        var _a, _b, _c, _d;
        const { state: { hoveredPartyId } } = (0, import_react4.useContext)(store);
        const previousTopMatch = bracketSnippet === null || bracketSnippet === void 0 ? void 0 : bracketSnippet.previousTopMatch;
        const previousBottomMatch = bracketSnippet === null || bracketSnippet === void 0 ? void 0 : bracketSnippet.previousBottomMatch;
        const currentMatch = bracketSnippet === null || bracketSnippet === void 0 ? void 0 : bracketSnippet.currentMatch;
        const topHighlighted = ((_a = currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.participants) === null || _a === void 0 ? void 0 : _a.some((p) => p.id === hoveredPartyId)) && ((_b = previousTopMatch === null || previousTopMatch === void 0 ? void 0 : previousTopMatch.participants) === null || _b === void 0 ? void 0 : _b.some((p) => p.id === hoveredPartyId));
        const bottomHighlighted = ((_c = currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.participants) === null || _c === void 0 ? void 0 : _c.some((p) => p.id === hoveredPartyId)) && ((_d = previousBottomMatch === null || previousBottomMatch === void 0 ? void 0 : previousBottomMatch.participants) === null || _d === void 0 ? void 0 : _d.some((p) => p.id === hoveredPartyId));
        return { topHighlighted, bottomHighlighted };
      };
      use_match_highlight_default = useMatchHighlightContext;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/components/connector.js
  var import_jsx_runtime4, Connector, connector_default;
  var init_connector = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/components/connector.js"() {
      import_jsx_runtime4 = __toESM(require_jsx_runtime());
      init_use_match_highlight();
      init_settings();
      Connector = ({ bracketSnippet, previousBottomMatchPosition = null, previousTopMatchPosition = null, currentMatchPosition, style }) => {
        const { boxHeight, connectorColor, roundHeader, roundSeparatorWidth, lineInfo, horizontalOffset, connectorColorHighlight, width } = getCalculatedStyles(style);
        const pathInfo = (multiplier) => {
          const middlePointOfMatchComponent = boxHeight / 2;
          const previousMatch = multiplier > 0 ? previousBottomMatchPosition : previousTopMatchPosition;
          const startPoint = `${currentMatchPosition.x - horizontalOffset - lineInfo.separation} ${currentMatchPosition.y + lineInfo.homeVisitorSpread * multiplier + middlePointOfMatchComponent + (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0)}`;
          const horizontalWidthLeft = currentMatchPosition.x - roundSeparatorWidth / 2 - horizontalOffset;
          const isPreviousMatchOnSameYLevel = Math.abs(currentMatchPosition.y - previousMatch.y) < 1;
          const verticalHeight = previousMatch.y + middlePointOfMatchComponent + (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);
          const horizontalWidthRight = previousMatch.x + width;
          if (isPreviousMatchOnSameYLevel) {
            return [`M${startPoint}`, `H${horizontalWidthRight}`];
          }
          return [
            `M${startPoint}`,
            `H${horizontalWidthLeft}`,
            `V${verticalHeight}`,
            `H${horizontalWidthRight}`
          ];
        };
        const { topHighlighted, bottomHighlighted } = use_match_highlight_default({
          bracketSnippet
        });
        const { x, y } = currentMatchPosition;
        return (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [previousTopMatchPosition && (0, import_jsx_runtime4.jsx)("path", { d: pathInfo(-1).join(" "), id: `connector-${x}-${y}-${-1}`, fill: "transparent", stroke: topHighlighted ? connectorColorHighlight : connectorColor }), previousBottomMatchPosition && (0, import_jsx_runtime4.jsx)("path", { d: pathInfo(1).join(" "), id: `connector-${x}-${y}-${1}`, fill: "transparent", stroke: bottomHighlighted ? connectorColorHighlight : connectorColor }), topHighlighted && (0, import_jsx_runtime4.jsx)("use", { href: `connector-${x}-${y}-${-1}` }), bottomHighlighted && (0, import_jsx_runtime4.jsx)("use", { href: `connector-${x}-${y}-${1}` })] });
      };
      connector_default = Connector;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-single/connectors.js
  var import_jsx_runtime5, Connectors, connectors_default;
  var init_connectors = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-single/connectors.js"() {
      import_jsx_runtime5 = __toESM(require_jsx_runtime());
      init_connector();
      init_settings();
      init_calculate_match_position();
      Connectors = ({ bracketSnippet, rowIndex, columnIndex, style, offsetY = 0 }) => {
        const { columnWidth, rowHeight, canvasPadding } = getCalculatedStyles(style);
        const currentMatchPosition = calculatePositionOfMatch(rowIndex, columnIndex, {
          canvasPadding,
          rowHeight,
          columnWidth,
          offsetY
        });
        const previousBottomPosition = (rowIndex + 1) * 2 - 1;
        const previousTopMatchPosition = calculatePositionOfMatch(previousBottomPosition - 1, columnIndex - 1, {
          canvasPadding,
          rowHeight,
          columnWidth,
          offsetY
        });
        const previousBottomMatchPosition = calculatePositionOfMatch(previousBottomPosition, columnIndex - 1, {
          canvasPadding,
          rowHeight,
          columnWidth,
          offsetY
        });
        return (0, import_jsx_runtime5.jsx)(connector_default, { bracketSnippet, previousBottomMatchPosition, previousTopMatchPosition, currentMatchPosition, style });
      };
      connectors_default = Connectors;
    }
  });

  // node_modules/deepmerge/dist/cjs.js
  var require_cjs = __commonJS({
    "node_modules/deepmerge/dist/cjs.js"(exports, module) {
      "use strict";
      var isMergeableObject = function isMergeableObject2(value) {
        return isNonNullObject(value) && !isSpecial(value);
      };
      function isNonNullObject(value) {
        return !!value && typeof value === "object";
      }
      function isSpecial(value) {
        var stringValue = Object.prototype.toString.call(value);
        return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
      }
      var canUseSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
      function isReactElement(value) {
        return value.$$typeof === REACT_ELEMENT_TYPE;
      }
      function emptyTarget(val) {
        return Array.isArray(val) ? [] : {};
      }
      function cloneUnlessOtherwiseSpecified(value, options) {
        return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
      }
      function defaultArrayMerge(target, source, options) {
        return target.concat(source).map(function(element) {
          return cloneUnlessOtherwiseSpecified(element, options);
        });
      }
      function getMergeFunction(key, options) {
        if (!options.customMerge) {
          return deepmerge;
        }
        var customMerge = options.customMerge(key);
        return typeof customMerge === "function" ? customMerge : deepmerge;
      }
      function getEnumerableOwnPropertySymbols(target) {
        return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
          return Object.propertyIsEnumerable.call(target, symbol);
        }) : [];
      }
      function getKeys(target) {
        return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
      }
      function propertyIsOnObject(object, property) {
        try {
          return property in object;
        } catch (_) {
          return false;
        }
      }
      function propertyIsUnsafe(target, key) {
        return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
      }
      function mergeObject(target, source, options) {
        var destination = {};
        if (options.isMergeableObject(target)) {
          getKeys(target).forEach(function(key) {
            destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
          });
        }
        getKeys(source).forEach(function(key) {
          if (propertyIsUnsafe(target, key)) {
            return;
          }
          if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
            destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
          } else {
            destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
          }
        });
        return destination;
      }
      function deepmerge(target, source, options) {
        options = options || {};
        options.arrayMerge = options.arrayMerge || defaultArrayMerge;
        options.isMergeableObject = options.isMergeableObject || isMergeableObject;
        options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
        var sourceIsArray = Array.isArray(source);
        var targetIsArray = Array.isArray(target);
        var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
        if (!sourceAndTargetTypesMatch) {
          return cloneUnlessOtherwiseSpecified(source, options);
        } else if (sourceIsArray) {
          return options.arrayMerge(target, source, options);
        } else {
          return mergeObject(target, source, options);
        }
      }
      deepmerge.all = function deepmergeAll(array, options) {
        if (!Array.isArray(array)) {
          throw new Error("first argument should be an array");
        }
        return array.reduce(function(prev, next) {
          return deepmerge(prev, next, options);
        }, {});
      };
      var deepmerge_1 = deepmerge;
      module.exports = deepmerge_1;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/themes/themes.js
  function createTheme(customTheme) {
    return (0, import_deepmerge.default)(defaultTheme, customTheme || {});
  }
  var import_deepmerge, defaultTheme, themes_default;
  var init_themes = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/themes/themes.js"() {
      import_deepmerge = __toESM(require_cjs());
      defaultTheme = {
        fontFamily: '"Roboto", "Arial", "Helvetica", "sans-serif"',
        transitionTimingFunction: "cubic-bezier(0, 0.92, 0.77, 0.99)",
        disabledColor: "#5D6371",
        roundHeaders: {
          background: "#2F3648"
        },
        matchBackground: {
          wonColor: "#1D2232",
          lostColor: "#141822"
        },
        border: {
          color: "#22293B",
          highlightedColor: "#707582"
        },
        textColor: {
          highlighted: "#E9EAEC",
          main: "#BEC0C6",
          dark: "#707582",
          disabled: "#5D6371"
        },
        score: {
          text: {
            highlightedWonColor: "#118ADE",
            highlightedLostColor: "#FF9505"
          },
          background: {
            wonColor: "#10131C",
            lostColor: "#10131C"
          }
        },
        canvasBackground: "#0B0D13"
      };
      themes_default = defaultTheme;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-single/single-elim-bracket.js
  var import_jsx_runtime6, SingleEliminationBracket, single_elim_bracket_default;
  var init_single_elim_bracket = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-single/single-elim-bracket.js"() {
      import_jsx_runtime6 = __toESM(require_jsx_runtime());
      init_styled_components_browser_esm();
      init_string();
      init_calculate_svg_dimensions();
      init_match_context();
      init_match_wrapper();
      init_round_header();
      init_match_functions();
      init_settings();
      init_calculate_match_position();
      init_connectors();
      init_themes();
      SingleEliminationBracket = ({ matches, matchComponent, currentRound, onMatchClick, onPartyClick, svgWrapper: SvgWrapper = ({ children }) => (0, import_jsx_runtime6.jsx)("div", { children }), theme = themes_default, options: { style: inputStyle } = {
        style: defaultStyle
      } }) => {
        var _a, _b;
        const style = Object.assign(Object.assign(Object.assign({}, defaultStyle), inputStyle), { roundHeader: Object.assign(Object.assign({}, defaultStyle.roundHeader), (_a = inputStyle === null || inputStyle === void 0 ? void 0 : inputStyle.roundHeader) !== null && _a !== void 0 ? _a : {}), lineInfo: Object.assign(Object.assign({}, defaultStyle.lineInfo), (_b = inputStyle === null || inputStyle === void 0 ? void 0 : inputStyle.lineInfo) !== null && _b !== void 0 ? _b : {}) });
        const { roundHeader, columnWidth, canvasPadding, rowHeight, width } = getCalculatedStyles(style);
        const lastGame = matches.find((match) => !match.nextMatchId);
        const generateColumn = (matchesColumn) => {
          const previousMatchesColumn = matchesColumn.reduce((result, match) => {
            return [
              ...result,
              ...matches.filter((m) => m.nextMatchId === match.id).sort((a, b) => sortAlphanumerically(a.name, b.name))
            ];
          }, []);
          if (previousMatchesColumn.length > 0) {
            return [...generateColumn(previousMatchesColumn), previousMatchesColumn];
          }
          return [previousMatchesColumn];
        };
        const generate2DBracketArray = (final) => {
          return final ? [...generateColumn([final]), [final]].filter((arr) => arr.length > 0) : [];
        };
        const columns = generate2DBracketArray(lastGame);
        const { gameWidth, gameHeight, startPosition } = calculateSVGDimensions(columns[0].length, columns.length, rowHeight, columnWidth, canvasPadding, roundHeader, currentRound);
        return (0, import_jsx_runtime6.jsx)(ThemeProvider, Object.assign({ theme }, { children: (0, import_jsx_runtime6.jsx)(SvgWrapper, Object.assign({ bracketWidth: gameWidth, bracketHeight: gameHeight, startAt: startPosition }, { children: (0, import_jsx_runtime6.jsx)("svg", Object.assign({ height: gameHeight, width: gameWidth, viewBox: `0 0 ${gameWidth} ${gameHeight}` }, { children: (0, import_jsx_runtime6.jsx)(MatchContextProvider, { children: (0, import_jsx_runtime6.jsx)("g", { children: columns.map((matchesColumn, columnIndex) => matchesColumn.map((match, rowIndex) => {
          const { x, y } = calculatePositionOfMatch(rowIndex, columnIndex, {
            canvasPadding,
            columnWidth,
            rowHeight
          });
          const previousBottomPosition = (rowIndex + 1) * 2 - 1;
          const { previousTopMatch, previousBottomMatch } = getPreviousMatches(columnIndex, columns, previousBottomPosition);
          return (0, import_jsx_runtime6.jsxs)("g", { children: [roundHeader.isShown && (0, import_jsx_runtime6.jsx)(RoundHeader, { x, roundHeader, canvasPadding, width, numOfRounds: columns.length, tournamentRoundText: match.tournamentRoundText, columnIndex }), columnIndex !== 0 && (0, import_jsx_runtime6.jsx)(connectors_default, Object.assign({}, {
            bracketSnippet: {
              currentMatch: match,
              previousTopMatch,
              previousBottomMatch
            },
            rowIndex,
            columnIndex,
            gameHeight,
            gameWidth,
            style
          })), (0, import_jsx_runtime6.jsx)("g", { children: (0, import_jsx_runtime6.jsx)(match_wrapper_default, { x, y: y + (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0), rowIndex, columnIndex, match, previousBottomMatch, topText: match.startTime, bottomText: match.name, teams: match.participants, onMatchClick, onPartyClick, style, matchComponent }) })] }, x + y);
        })) }) }) })) })) }));
      };
      single_elim_bracket_default = SingleEliminationBracket;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/calculate-match-position.js
  var init_calculate_match_position2 = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/calculate-match-position.js"() {
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/upper-connectors.js
  var import_jsx_runtime7;
  var init_upper_connectors = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/upper-connectors.js"() {
      import_jsx_runtime7 = __toESM(require_jsx_runtime());
      init_connector();
      init_settings();
      init_calculate_match_position2();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/upper-bracket.js
  var import_jsx_runtime8;
  var init_upper_bracket = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/upper-bracket.js"() {
      import_jsx_runtime8 = __toESM(require_jsx_runtime());
      init_match_wrapper();
      init_match_functions();
      init_calculate_match_position2();
      init_upper_connectors();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/lower-connectors.js
  var import_jsx_runtime9;
  var init_lower_connectors = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/lower-connectors.js"() {
      import_jsx_runtime9 = __toESM(require_jsx_runtime());
      init_connector();
      init_settings();
      init_calculate_match_position2();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/lower-bracket.js
  var import_jsx_runtime10;
  var init_lower_bracket = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/lower-bracket.js"() {
      import_jsx_runtime10 = __toESM(require_jsx_runtime());
      init_match_wrapper();
      init_match_functions();
      init_calculate_match_position2();
      init_lower_connectors();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/round-headers.js
  var import_jsx_runtime11;
  var init_round_headers = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/round-headers.js"() {
      import_jsx_runtime11 = __toESM(require_jsx_runtime());
      init_round_header();
      init_calculate_match_position2();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/final-connectors.js
  var import_jsx_runtime12;
  var init_final_connectors = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/final-connectors.js"() {
      import_jsx_runtime12 = __toESM(require_jsx_runtime());
      init_connector();
      init_settings();
      init_calculate_match_position2();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/final-game.js
  var import_jsx_runtime13;
  var init_final_game = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/final-game.js"() {
      import_jsx_runtime13 = __toESM(require_jsx_runtime());
      init_match_wrapper();
      init_calculate_match_position2();
      init_final_connectors();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/extra-final-connectors.js
  var import_jsx_runtime14;
  var init_extra_final_connectors = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/extra-final-connectors.js"() {
      import_jsx_runtime14 = __toESM(require_jsx_runtime());
      init_connector();
      init_settings();
      init_calculate_match_position2();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/extra-final.js
  var import_jsx_runtime15;
  var init_extra_final = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/extra-final.js"() {
      import_jsx_runtime15 = __toESM(require_jsx_runtime());
      init_match_wrapper();
      init_calculate_match_position2();
      init_extra_final_connectors();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/double-elim-bracket.js
  var import_jsx_runtime16;
  var init_double_elim_bracket = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/bracket-double/double-elim-bracket.js"() {
      import_jsx_runtime16 = __toESM(require_jsx_runtime());
      init_match_functions();
      init_calculate_svg_dimensions();
      init_match_context();
      init_settings();
      init_themes();
      init_upper_bracket();
      init_lower_bracket();
      init_round_headers();
      init_final_game();
      init_extra_final();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/components/match/styles.js
  var Wrapper, TopText, BottomText, StyledMatch, Team, Score, Side, Line, Anchor;
  var init_styles = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/components/match/styles.js"() {
      init_styled_components_browser_esm();
      Wrapper = styled_components_browser_esm_default.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  font-family: ${({ theme }) => theme.fontFamily};
`;
      TopText = styled_components_browser_esm_default.p`
  color: ${({ theme }) => theme.textColor.dark};
  margin-bottom: 0.2rem;
  min-height: 1.25rem;
`;
      BottomText = styled_components_browser_esm_default.p`
  color: ${({ theme }) => theme.textColor.dark};

  flex: 0 0 none;
  text-align: center;
  margin-top: 0.2rem;
  min-height: 1.25rem;
`;
      StyledMatch = styled_components_browser_esm_default.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
`;
      Team = styled_components_browser_esm_default.div``;
      Score = styled_components_browser_esm_default.div`
  display: flex;
  height: 100%;
  padding: 0 1rem;
  align-items: center;
  width: 20%;
  justify-content: center;
  background: ${({ theme, won }) => won ? theme.score.background.wonColor : theme.score.background.lostColor};
  color: ${({ theme, won }) => won ? theme.textColor.highlighted : theme.textColor.dark};
`;
      Side = styled_components_browser_esm_default.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 1rem;
  background: ${({ theme, won }) => won ? theme.matchBackground.wonColor : theme.matchBackground.lostColor};

  :first-of-type {
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-top-width: 2px;
  }
  :last-of-type {
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-width: 2px;
  }
  border-right: 4px solid ${({ theme }) => theme.border.color};
  border-left: 4px solid ${({ theme }) => theme.border.color};
  border-top: 1px solid ${({ theme }) => theme.border.color};
  border-bottom: 1px solid ${({ theme }) => theme.border.color};

  transition: border-color 0.5s ${({ theme }) => theme.transitionTimingFunction};
  ${Team} {
    color: ${({ theme, won }) => won ? theme.textColor.highlighted : theme.textColor.dark};
  }
  ${Score} {
    color: ${({ theme, won }) => won ? theme.textColor.highlighted : theme.textColor.dark};
  }
  ${({ hovered, theme, won }) => hovered && css`
      border-color: ${theme.border.highlightedColor};
      ${Team} {
        color: ${theme.textColor.highlighted};
      }
      ${Score} {
        color: ${won ? theme.score.text.highlightedWonColor : theme.score.text.highlightedLostColor};
      }
    `}
`;
      Line = styled_components_browser_esm_default.div`
  height: 1px;
  transition: border-color 0.5s ${({ theme }) => theme.smooth};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ highlighted, theme }) => highlighted ? theme.border.highlightedColor : theme.border.color};
`;
      Anchor = styled_components_browser_esm_default.a`
  font-family: ${(props) => props.font ? props.font : props.theme.fontFamily};
  font-weight: ${(props) => props.bold ? "700" : "400"};
  color: ${(props) => props.theme.textColor.main};
  font-size: ${(props) => props.size ? props.size : "1rem"};
  line-height: 1.375rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/components/match/index.js
  var import_jsx_runtime17;
  var init_match = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/components/match/index.js"() {
      import_jsx_runtime17 = __toESM(require_jsx_runtime());
      init_styles();
    }
  });

  // node_modules/transformation-matrix/src/applyToPoint.js
  function applyToPoint(matrix, point) {
    return Array.isArray(point) ? [
      matrix.a * point[0] + matrix.c * point[1] + matrix.e,
      matrix.b * point[0] + matrix.d * point[1] + matrix.f
    ] : {
      x: matrix.a * point.x + matrix.c * point.y + matrix.e,
      y: matrix.b * point.x + matrix.d * point.y + matrix.f
    };
  }
  function applyToPoints(matrix, points) {
    return points.map((point) => applyToPoint(matrix, point));
  }
  var init_applyToPoint = __esm({
    "node_modules/transformation-matrix/src/applyToPoint.js"() {
    }
  });

  // node_modules/transformation-matrix/src/fromObject.js
  function fromObject(object) {
    return {
      a: parseFloat(object.a),
      b: parseFloat(object.b),
      c: parseFloat(object.c),
      d: parseFloat(object.d),
      e: parseFloat(object.e),
      f: parseFloat(object.f)
    };
  }
  var init_fromObject = __esm({
    "node_modules/transformation-matrix/src/fromObject.js"() {
    }
  });

  // node_modules/transformation-matrix/src/fromString.js
  var init_fromString = __esm({
    "node_modules/transformation-matrix/src/fromString.js"() {
    }
  });

  // node_modules/transformation-matrix/src/identity.js
  function identity() {
    return {
      a: 1,
      c: 0,
      e: 0,
      b: 0,
      d: 1,
      f: 0
    };
  }
  var init_identity = __esm({
    "node_modules/transformation-matrix/src/identity.js"() {
    }
  });

  // node_modules/transformation-matrix/src/inverse.js
  function inverse(matrix) {
    const { a, b, c, d, e, f } = matrix;
    const denom = a * d - b * c;
    return {
      a: d / denom,
      b: b / -denom,
      c: c / -denom,
      d: a / denom,
      e: (d * e - c * f) / -denom,
      f: (b * e - a * f) / denom
    };
  }
  var init_inverse = __esm({
    "node_modules/transformation-matrix/src/inverse.js"() {
    }
  });

  // node_modules/transformation-matrix/src/utils.js
  function isUndefined2(val) {
    return typeof val === "undefined";
  }
  var init_utils = __esm({
    "node_modules/transformation-matrix/src/utils.js"() {
    }
  });

  // node_modules/transformation-matrix/src/isAffineMatrix.js
  var init_isAffineMatrix = __esm({
    "node_modules/transformation-matrix/src/isAffineMatrix.js"() {
      init_utils();
    }
  });

  // node_modules/transformation-matrix/src/translate.js
  function translate(tx, ty = 0) {
    return {
      a: 1,
      c: 0,
      e: tx,
      b: 0,
      d: 1,
      f: ty
    };
  }
  var init_translate = __esm({
    "node_modules/transformation-matrix/src/translate.js"() {
    }
  });

  // node_modules/transformation-matrix/src/transform.js
  function transform(...matrices) {
    matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;
    const multiply = (m1, m2) => {
      return {
        a: m1.a * m2.a + m1.c * m2.b,
        c: m1.a * m2.c + m1.c * m2.d,
        e: m1.a * m2.e + m1.c * m2.f + m1.e,
        b: m1.b * m2.a + m1.d * m2.b,
        d: m1.b * m2.c + m1.d * m2.d,
        f: m1.b * m2.e + m1.d * m2.f + m1.f
      };
    };
    switch (matrices.length) {
      case 0:
        throw new Error("no matrices provided");
      case 1:
        return matrices[0];
      case 2:
        return multiply(matrices[0], matrices[1]);
      default: {
        const [m1, m2, ...rest] = matrices;
        const m = multiply(m1, m2);
        return transform(m, ...rest);
      }
    }
  }
  var init_transform = __esm({
    "node_modules/transformation-matrix/src/transform.js"() {
    }
  });

  // node_modules/transformation-matrix/src/rotate.js
  var cos, sin, PI;
  var init_rotate = __esm({
    "node_modules/transformation-matrix/src/rotate.js"() {
      init_utils();
      init_translate();
      init_transform();
      ({ cos, sin, PI } = Math);
    }
  });

  // node_modules/transformation-matrix/src/scale.js
  function scale(sx, sy = void 0, cx = void 0, cy = void 0) {
    if (isUndefined2(sy)) sy = sx;
    const scaleMatrix = {
      a: sx,
      c: 0,
      e: 0,
      b: 0,
      d: sy,
      f: 0
    };
    if (isUndefined2(cx) || isUndefined2(cy)) {
      return scaleMatrix;
    }
    return transform([
      translate(cx, cy),
      scaleMatrix,
      translate(-cx, -cy)
    ]);
  }
  var init_scale = __esm({
    "node_modules/transformation-matrix/src/scale.js"() {
      init_utils();
      init_translate();
      init_transform();
    }
  });

  // node_modules/transformation-matrix/src/shear.js
  var init_shear = __esm({
    "node_modules/transformation-matrix/src/shear.js"() {
    }
  });

  // node_modules/transformation-matrix/src/skew.js
  var tan;
  var init_skew = __esm({
    "node_modules/transformation-matrix/src/skew.js"() {
      ({ tan } = Math);
    }
  });

  // node_modules/transformation-matrix/src/toString.js
  function toSVG(matrix) {
    return toString(matrix);
  }
  function toString(matrix) {
    return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`;
  }
  var init_toString = __esm({
    "node_modules/transformation-matrix/src/toString.js"() {
    }
  });

  // node_modules/transformation-matrix/src/smoothMatrix.js
  var init_smoothMatrix = __esm({
    "node_modules/transformation-matrix/src/smoothMatrix.js"() {
    }
  });

  // node_modules/transformation-matrix/src/fromTriangles.js
  var init_fromTriangles = __esm({
    "node_modules/transformation-matrix/src/fromTriangles.js"() {
      init_inverse();
      init_transform();
      init_smoothMatrix();
    }
  });

  // node_modules/transformation-matrix/src/fromDefinition.js
  var init_fromDefinition = __esm({
    "node_modules/transformation-matrix/src/fromDefinition.js"() {
      init_fromObject();
      init_translate();
      init_scale();
      init_rotate();
      init_skew();
      init_shear();
    }
  });

  // node_modules/transformation-matrix/src/fromTransformAttribute.autogenerated.js
  function peg$subclass(child, parent) {
    function C() {
      this.constructor = child;
    }
    C.prototype = parent.prototype;
    child.prototype = new C();
  }
  function peg$SyntaxError(message, expected, found, location) {
    var self = Error.call(this, message);
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(self, peg$SyntaxError.prototype);
    }
    self.expected = expected;
    self.found = found;
    self.location = location;
    self.name = "SyntaxError";
    return self;
  }
  function peg$padEnd(str, targetLength, padString) {
    padString = padString || " ";
    if (str.length > targetLength) {
      return str;
    }
    targetLength -= str.length;
    padString += padString.repeat(targetLength);
    return str + padString.slice(0, targetLength);
  }
  var init_fromTransformAttribute_autogenerated = __esm({
    "node_modules/transformation-matrix/src/fromTransformAttribute.autogenerated.js"() {
      peg$subclass(peg$SyntaxError, Error);
      peg$SyntaxError.prototype.format = function(sources) {
        var str = "Error: " + this.message;
        if (this.location) {
          var src = null;
          var k;
          for (k = 0; k < sources.length; k++) {
            if (sources[k].source === this.location.source) {
              src = sources[k].text.split(/\r\n|\n|\r/g);
              break;
            }
          }
          var s = this.location.start;
          var offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
          var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
          if (src) {
            var e = this.location.end;
            var filler = peg$padEnd("", offset_s.line.toString().length, " ");
            var line = src[s.line - 1];
            var last = s.line === e.line ? e.column : line.length + 1;
            var hatLen = last - s.column || 1;
            str += "\n --> " + loc + "\n" + filler + " |\n" + offset_s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
          } else {
            str += "\n at " + loc;
          }
        }
        return str;
      };
      peg$SyntaxError.buildMessage = function(expected, found) {
        var DESCRIBE_EXPECTATION_FNS = {
          literal: function(expectation) {
            return '"' + literalEscape(expectation.text) + '"';
          },
          class: function(expectation) {
            var escapedParts = expectation.parts.map(function(part) {
              return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
            });
            return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
          },
          any: function() {
            return "any character";
          },
          end: function() {
            return "end of input";
          },
          other: function(expectation) {
            return expectation.description;
          }
        };
        function hex(ch) {
          return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
          return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
            return "\\x" + hex(ch);
          });
        }
        function classEscape(s) {
          return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
            return "\\x" + hex(ch);
          });
        }
        function describeExpectation(expectation) {
          return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
        }
        function describeExpected(expected2) {
          var descriptions = expected2.map(describeExpectation);
          var i, j;
          descriptions.sort();
          if (descriptions.length > 0) {
            for (i = 1, j = 1; i < descriptions.length; i++) {
              if (descriptions[i - 1] !== descriptions[i]) {
                descriptions[j] = descriptions[i];
                j++;
              }
            }
            descriptions.length = j;
          }
          switch (descriptions.length) {
            case 1:
              return descriptions[0];
            case 2:
              return descriptions[0] + " or " + descriptions[1];
            default:
              return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
          }
        }
        function describeFound(found2) {
          return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
      };
    }
  });

  // node_modules/transformation-matrix/src/fromTransformAttribute.js
  var init_fromTransformAttribute = __esm({
    "node_modules/transformation-matrix/src/fromTransformAttribute.js"() {
      init_fromTransformAttribute_autogenerated();
    }
  });

  // node_modules/transformation-matrix/src/decompose.js
  var init_decompose = __esm({
    "node_modules/transformation-matrix/src/decompose.js"() {
      init_scale();
      init_transform();
    }
  });

  // node_modules/transformation-matrix/src/flip.js
  var init_flip = __esm({
    "node_modules/transformation-matrix/src/flip.js"() {
    }
  });

  // node_modules/transformation-matrix/src/fromMovingPoints.js
  var init_fromMovingPoints = __esm({
    "node_modules/transformation-matrix/src/fromMovingPoints.js"() {
      init_translate();
      init_applyToPoint();
      init_rotate();
      init_scale();
      init_transform();
    }
  });

  // node_modules/transformation-matrix/src/index.js
  var init_src = __esm({
    "node_modules/transformation-matrix/src/index.js"() {
      init_applyToPoint();
      init_fromObject();
      init_fromString();
      init_identity();
      init_inverse();
      init_isAffineMatrix();
      init_rotate();
      init_scale();
      init_shear();
      init_skew();
      init_toString();
      init_transform();
      init_translate();
      init_fromTriangles();
      init_smoothMatrix();
      init_fromDefinition();
      init_fromTransformAttribute();
      init_decompose();
      init_flip();
      init_fromMovingPoints();
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/constants.js
  var MODE_IDLE, MODE_PANNING, MODE_ZOOMING, TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT, ACTION_ZOOM, ACTION_PAN, ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP, ALIGN_BOTTOM, ALIGN_COVER;
  var init_constants = __esm({
    "node_modules/react-svg-pan-zoom/build-es/constants.js"() {
      MODE_IDLE = "idle";
      MODE_PANNING = "panning";
      MODE_ZOOMING = "zooming";
      TOOL_AUTO = "auto";
      TOOL_NONE = "none";
      TOOL_PAN = "pan";
      TOOL_ZOOM_IN = "zoom-in";
      TOOL_ZOOM_OUT = "zoom-out";
      POSITION_NONE = "none";
      POSITION_TOP = "top";
      POSITION_RIGHT = "right";
      POSITION_BOTTOM = "bottom";
      POSITION_LEFT = "left";
      ACTION_ZOOM = "zoom";
      ACTION_PAN = "pan";
      ALIGN_CENTER = "center";
      ALIGN_LEFT = "left";
      ALIGN_RIGHT = "right";
      ALIGN_TOP = "top";
      ALIGN_BOTTOM = "bottom";
      ALIGN_COVER = "cover";
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/features/common.js
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
        _defineProperty(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function getDefaultValue(viewerWidth, viewerHeight, SVGMinX, SVGMinY, SVGWidth, SVGHeight) {
    let scaleFactorMin = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : null;
    let scaleFactorMax = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : null;
    return set({}, _objectSpread(_objectSpread({}, identity()), {}, {
      version: VERSION,
      mode: DEFAULT_MODE,
      focus: false,
      pinchPointDistance: null,
      prePinchMode: null,
      viewerWidth,
      viewerHeight,
      SVGMinX,
      SVGMinY,
      SVGWidth,
      SVGHeight,
      scaleFactorMin,
      scaleFactorMax,
      startX: null,
      startY: null,
      endX: null,
      endY: null,
      miniatureOpen: true,
      lastAction: null
    }));
  }
  function set(value, patch) {
    let action = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    value = Object.assign({}, value, patch, {
      lastAction: action
    });
    return Object.freeze(value);
  }
  function isValueValid(value) {
    return value !== null && typeof value === "object" && value.hasOwnProperty("version") && value.version === VERSION;
  }
  function getSVGPoint(value, viewerX, viewerY) {
    let matrix = fromObject(value);
    let inverseMatrix = inverse(matrix);
    return applyToPoint(inverseMatrix, {
      x: viewerX,
      y: viewerY
    });
  }
  function decompose(value) {
    let matrix = fromObject(value);
    return {
      scaleFactor: matrix.a,
      translationX: matrix.e,
      translationY: matrix.f
    };
  }
  function setFocus(value, focus) {
    return set(value, {
      focus
    });
  }
  function setViewerSize(value, viewerWidth, viewerHeight) {
    return set(value, {
      viewerWidth,
      viewerHeight
    });
  }
  function setSVGViewBox(value, SVGMinX, SVGMinY, SVGWidth, SVGHeight) {
    return set(value, {
      SVGMinX,
      SVGMinY,
      SVGWidth,
      SVGHeight
    });
  }
  function setZoomLevels(value, scaleFactorMin, scaleFactorMax) {
    return set(value, {
      scaleFactorMin,
      scaleFactorMax
    });
  }
  function setPointOnViewerCenter(value, SVGPointX, SVGPointY, zoomLevel) {
    let {
      viewerWidth,
      viewerHeight
    } = value;
    let matrix = transform(
      translate(-SVGPointX + viewerWidth / 2, -SVGPointY + viewerHeight / 2),
      //4
      translate(SVGPointX, SVGPointY),
      //3
      scale(zoomLevel, zoomLevel),
      //2
      translate(-SVGPointX, -SVGPointY)
      //1
    );
    return set(value, _objectSpread({
      mode: MODE_IDLE
    }, matrix));
  }
  function reset(value) {
    return set(value, _objectSpread({
      mode: MODE_IDLE
    }, identity()));
  }
  function resetMode(value) {
    return set(value, {
      mode: DEFAULT_MODE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    });
  }
  var VERSION, DEFAULT_MODE;
  var init_common = __esm({
    "node_modules/react-svg-pan-zoom/build-es/features/common.js"() {
      init_constants();
      init_src();
      VERSION = 3;
      DEFAULT_MODE = MODE_IDLE;
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/events/viewer-event.js
  var ViewerEvent;
  var init_viewer_event = __esm({
    "node_modules/react-svg-pan-zoom/build-es/events/viewer-event.js"() {
      init_common();
      ViewerEvent = class {
        constructor(originalEvent, value, SVGViewer) {
          this.originalEvent = originalEvent;
          this.value = value;
          this.SVGViewer = SVGViewer;
        }
        get scaleFactor() {
          this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
          return this._cacheDecomposedValue.scaleFactor;
        }
        get translationX() {
          this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
          return this._cacheDecomposedValue.translationX;
        }
        get translationY() {
          this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
          return this._cacheDecomposedValue.translationY;
        }
        preventDefault() {
          this.originalEvent.preventDefault();
        }
        stopPropagation() {
          this.originalEvent.stopPropagation();
        }
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/features/pan.js
  function ownKeys2(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
        _defineProperty2(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _defineProperty2(e, r, t) {
    return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
  }
  function _toPropertyKey2(t) {
    var i = _toPrimitive2(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _toPrimitive2(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function pan(value, SVGDeltaX, SVGDeltaY) {
    let panLimit = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : void 0;
    let matrix = transform(
      fromObject(value),
      //2
      translate(SVGDeltaX, SVGDeltaY)
      //1
    );
    if (panLimit) {
      let [{
        x: x1,
        y: y1
      }, {
        x: x2,
        y: y2
      }] = applyToPoints(matrix, [{
        x: value.SVGMinX + panLimit,
        y: value.SVGMinY + panLimit
      }, {
        x: value.SVGMinX + value.SVGWidth - panLimit,
        y: value.SVGMinY + value.SVGHeight - panLimit
      }]);
      let moveX = 0;
      if (value.viewerWidth - x1 < 0) moveX = value.viewerWidth - x1;
      else if (x2 < 0) moveX = -x2;
      let moveY = 0;
      if (value.viewerHeight - y1 < 0) moveY = value.viewerHeight - y1;
      else if (y2 < 0) moveY = -y2;
      matrix = transform(translate(moveX, moveY), matrix);
    }
    return set(value, _objectSpread2({
      mode: MODE_IDLE
    }, matrix), ACTION_PAN);
  }
  function startPanning(value, viewerX, viewerY) {
    return set(value, {
      mode: MODE_PANNING,
      startX: viewerX,
      startY: viewerY,
      endX: viewerX,
      endY: viewerY
    }, ACTION_PAN);
  }
  function updatePanning(value, viewerX, viewerY, panLimit) {
    if (value.mode !== MODE_PANNING) throw new Error("update pan not allowed in this mode " + value.mode);
    let {
      endX,
      endY
    } = value;
    let start = getSVGPoint(value, endX, endY);
    let end = getSVGPoint(value, viewerX, viewerY);
    let deltaX = end.x - start.x;
    let deltaY = end.y - start.y;
    let nextValue = pan(value, deltaX, deltaY, panLimit);
    return set(nextValue, {
      mode: MODE_PANNING,
      endX: viewerX,
      endY: viewerY
    }, ACTION_PAN);
  }
  function stopPanning(value) {
    return set(value, {
      mode: MODE_IDLE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    }, ACTION_PAN);
  }
  function autoPanIfNeeded(value, viewerX, viewerY) {
    let deltaX = 0;
    let deltaY = 0;
    if (viewerY <= 20) deltaY = 2;
    if (value.viewerWidth - viewerX <= 20) deltaX = -2;
    if (value.viewerHeight - viewerY <= 20) deltaY = -2;
    if (viewerX <= 20) deltaX = 2;
    deltaX = deltaX / value.d;
    deltaY = deltaY / value.d;
    return deltaX === 0 && deltaY === 0 ? value : pan(value, deltaX, deltaY);
  }
  var init_pan = __esm({
    "node_modules/react-svg-pan-zoom/build-es/features/pan.js"() {
      init_constants();
      init_common();
      init_src();
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/utils/calculateBox.js
  function calculateBox(start, end) {
    if (start.x <= end.x && start.y <= end.y) {
      return {
        x: start.x,
        y: start.y,
        width: end.x - start.x,
        height: end.y - start.y
      };
    } else if (start.x >= end.x && start.y <= end.y) {
      return {
        x: end.x,
        y: start.y,
        width: start.x - end.x,
        height: end.y - start.y
      };
    } else if (start.x >= end.x && start.y >= end.y) {
      return {
        x: end.x,
        y: end.y,
        width: start.x - end.x,
        height: start.y - end.y
      };
    } else if (start.x <= end.x && start.y >= end.y) {
      return {
        x: start.x,
        y: end.y,
        width: end.x - start.x,
        height: start.y - end.y
      };
    }
  }
  var init_calculateBox = __esm({
    "node_modules/react-svg-pan-zoom/build-es/utils/calculateBox.js"() {
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/features/zoom.js
  function ownKeys3(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread3(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys3(Object(t), true).forEach(function(r2) {
        _defineProperty3(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys3(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _defineProperty3(e, r, t) {
    return (r = _toPropertyKey3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
  }
  function _toPropertyKey3(t) {
    var i = _toPrimitive3(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _toPrimitive3(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function isZoomLevelGoingOutOfBounds(value, scaleFactor) {
    const {
      scaleFactor: curScaleFactor
    } = decompose(value);
    const lessThanScaleFactorMin = value.scaleFactorMin && curScaleFactor * scaleFactor < value.scaleFactorMin;
    const moreThanScaleFactorMax = value.scaleFactorMax && curScaleFactor * scaleFactor > value.scaleFactorMax;
    return lessThanScaleFactorMin && scaleFactor < 1 || moreThanScaleFactorMax && scaleFactor > 1;
  }
  function limitZoomLevel(value, matrix) {
    let scaleLevel = matrix.a;
    if (value.scaleFactorMin != null) {
      scaleLevel = Math.max(scaleLevel, value.scaleFactorMin);
    }
    if (value.scaleFactorMax != null) {
      scaleLevel = Math.min(scaleLevel, value.scaleFactorMax);
    }
    return set(matrix, {
      a: scaleLevel,
      d: scaleLevel
    });
  }
  function zoom(value, SVGPointX, SVGPointY, scaleFactor) {
    if (isZoomLevelGoingOutOfBounds(value, scaleFactor)) {
      return value;
    }
    const matrix = transform(fromObject(value), translate(SVGPointX, SVGPointY), scale(scaleFactor, scaleFactor), translate(-SVGPointX, -SVGPointY));
    return set(value, _objectSpread3(_objectSpread3({
      mode: MODE_IDLE
    }, matrix), {}, {
      startX: null,
      startY: null,
      endX: null,
      endY: null
    }), ACTION_ZOOM);
  }
  function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
    let {
      viewerWidth,
      viewerHeight
    } = value;
    let scaleX = viewerWidth / selectionWidth;
    let scaleY = viewerHeight / selectionHeight;
    let scaleLevel = Math.min(scaleX, scaleY);
    const matrix = transform(
      scale(scaleLevel, scaleLevel),
      //2
      translate(-selectionSVGPointX, -selectionSVGPointY)
      //1
    );
    if (isZoomLevelGoingOutOfBounds(value, scaleLevel / value.d)) {
      return set(value, {
        mode: MODE_IDLE,
        startX: null,
        startY: null,
        endX: null,
        endY: null
      });
    }
    return set(value, _objectSpread3(_objectSpread3({
      mode: MODE_IDLE
    }, limitZoomLevel(value, matrix)), {}, {
      startX: null,
      startY: null,
      endX: null,
      endY: null
    }), ACTION_ZOOM);
  }
  function fitToViewer(value) {
    let SVGAlignX = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ALIGN_LEFT;
    let SVGAlignY = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ALIGN_TOP;
    let {
      viewerWidth,
      viewerHeight,
      SVGMinX,
      SVGMinY,
      SVGWidth,
      SVGHeight
    } = value;
    let scaleX = viewerWidth / SVGWidth;
    let scaleY = viewerHeight / SVGHeight;
    let scaleLevel = Math.min(scaleX, scaleY);
    let scaleMatrix = scale(scaleLevel, scaleLevel);
    let translateX = -SVGMinX * scaleX;
    let translateY = -SVGMinY * scaleY;
    if (scaleX < scaleY) {
      let remainderY = viewerHeight - scaleX * SVGHeight;
      switch (SVGAlignY) {
        case ALIGN_TOP:
          translateY = -SVGMinY * scaleLevel;
          break;
        case ALIGN_CENTER:
          translateY = Math.round(remainderY / 2) - SVGMinY * scaleLevel;
          break;
        case ALIGN_BOTTOM:
          translateY = remainderY - SVGMinY * scaleLevel;
          break;
        case ALIGN_COVER:
          scaleMatrix = scale(scaleY, scaleY);
          let remainderX = viewerWidth - scaleY * SVGWidth;
          translateX = SVGMinX + Math.round(remainderX / 2);
          break;
        default:
      }
    } else {
      let remainderX = viewerWidth - scaleY * SVGWidth;
      switch (SVGAlignX) {
        case ALIGN_LEFT:
          translateX = -SVGMinX * scaleLevel;
          break;
        case ALIGN_CENTER:
          translateX = Math.round(remainderX / 2) - SVGMinX * scaleLevel;
          break;
        case ALIGN_RIGHT:
          translateX = remainderX - SVGMinX * scaleLevel;
          break;
        case ALIGN_COVER:
          scaleMatrix = scale(scaleX, scaleX);
          let remainderY = viewerHeight - scaleX * SVGHeight;
          translateY = SVGMinY + Math.round(remainderY / 2);
          break;
        default:
      }
    }
    const translationMatrix = translate(translateX, translateY);
    const matrix = transform(
      translationMatrix,
      //2
      scaleMatrix
      //1
    );
    if (isZoomLevelGoingOutOfBounds(value, scaleLevel / value.d)) {
      return set(value, {
        mode: MODE_IDLE,
        startX: null,
        startY: null,
        endX: null,
        endY: null
      });
    }
    return set(value, _objectSpread3(_objectSpread3({
      mode: MODE_IDLE
    }, limitZoomLevel(value, matrix)), {}, {
      startX: null,
      startY: null,
      endX: null,
      endY: null
    }), ACTION_ZOOM);
  }
  function zoomOnViewerCenter(value, scaleFactor) {
    let {
      viewerWidth,
      viewerHeight
    } = value;
    let SVGPoint = getSVGPoint(value, viewerWidth / 2, viewerHeight / 2);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
  }
  function startZooming(value, viewerX, viewerY) {
    return set(value, {
      mode: MODE_ZOOMING,
      startX: viewerX,
      startY: viewerY,
      endX: viewerX,
      endY: viewerY
    });
  }
  function updateZooming(value, viewerX, viewerY) {
    if (value.mode !== MODE_ZOOMING) throw new Error("update selection not allowed in this mode " + value.mode);
    return set(value, {
      endX: viewerX,
      endY: viewerY
    });
  }
  function stopZooming(value, viewerX, viewerY, scaleFactor) {
    const TOLERATED_DISTANCE = 7;
    let {
      startX,
      startY
    } = value;
    let start = getSVGPoint(value, startX, startY);
    let end = getSVGPoint(value, viewerX, viewerY);
    if (Math.abs(startX - viewerX) > TOLERATED_DISTANCE && Math.abs(startY - viewerY) > TOLERATED_DISTANCE) {
      let box = calculateBox(start, end);
      return fitSelection(value, box.x, box.y, box.width, box.height);
    } else {
      let SVGPoint = getSVGPoint(value, viewerX, viewerY);
      return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
    }
  }
  var init_zoom = __esm({
    "node_modules/react-svg-pan-zoom/build-es/features/zoom.js"() {
      init_src();
      init_constants();
      init_common();
      init_calculateBox();
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/utils/mapRange.js
  function mapRange(value, sourceStart, sourceEnd, targetStart, targetEnd) {
    return targetStart + (targetEnd - targetStart) * (value - sourceStart) / (sourceEnd - sourceStart);
  }
  var init_mapRange = __esm({
    "node_modules/react-svg-pan-zoom/build-es/utils/mapRange.js"() {
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/features/interactions.js
  function getMousePosition(event, ViewerDOM) {
    let {
      left,
      top
    } = ViewerDOM.getBoundingClientRect();
    let x = event.clientX - Math.round(left);
    let y = event.clientY - Math.round(top);
    return {
      x,
      y
    };
  }
  function onMouseDown(event, ViewerDOM, tool, value, props) {
    let coords = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
    const {
      x,
      y
    } = coords || getMousePosition(event, ViewerDOM);
    let nextValue = value;
    switch (tool) {
      case TOOL_ZOOM_OUT:
        let SVGPoint = getSVGPoint(value, x, y);
        nextValue = zoom(value, SVGPoint.x, SVGPoint.y, 1 / props.scaleFactor, props);
        break;
      case TOOL_ZOOM_IN:
        nextValue = startZooming(value, x, y);
        break;
      case TOOL_AUTO:
      case TOOL_PAN:
        nextValue = startPanning(value, x, y);
        break;
      default:
        return value;
    }
    event.preventDefault();
    return nextValue;
  }
  function onMouseMove(event, ViewerDOM, tool, value, props) {
    let coords = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
    const {
      x,
      y
    } = coords || getMousePosition(event, ViewerDOM);
    let forceExit = event.buttons === 0;
    let nextValue = value;
    switch (tool) {
      case TOOL_ZOOM_IN:
        if (value.mode === MODE_ZOOMING) nextValue = forceExit ? stopZooming(value, x, y, props.scaleFactor, props) : updateZooming(value, x, y);
        break;
      case TOOL_AUTO:
      case TOOL_PAN:
        if (value.mode === MODE_PANNING) nextValue = forceExit ? stopPanning(value) : updatePanning(value, x, y, props.preventPanOutside ? 20 : void 0);
        break;
      default:
        return value;
    }
    event.preventDefault();
    return nextValue;
  }
  function onMouseUp(event, ViewerDOM, tool, value, props) {
    let coords = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
    const {
      x,
      y
    } = coords || getMousePosition(event, ViewerDOM);
    let nextValue = value;
    switch (tool) {
      case TOOL_ZOOM_OUT:
        if (value.mode === MODE_ZOOMING) nextValue = stopZooming(value, x, y, 1 / props.scaleFactor, props);
        break;
      case TOOL_ZOOM_IN:
        if (value.mode === MODE_ZOOMING) nextValue = stopZooming(value, x, y, props.scaleFactor, props);
        break;
      case TOOL_AUTO:
      case TOOL_PAN:
        if (value.mode === MODE_PANNING) nextValue = stopPanning(value);
        break;
      default:
        return value;
    }
    event.preventDefault();
    return nextValue;
  }
  function onDoubleClick(event, ViewerDOM, tool, value, props) {
    let coords = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
    const {
      x,
      y
    } = coords || getMousePosition(event, ViewerDOM);
    let nextValue = value;
    if (tool === TOOL_AUTO && !props.disableDoubleClickZoomWithToolAuto) {
      const {
        modifierKeys = []
      } = props;
      let SVGPoint = getSVGPoint(value, x, y);
      let modifierKeysReducer = (current, modifierKey) => current || event.getModifierState(modifierKey);
      let modifierKeyActive = modifierKeys.reduce(modifierKeysReducer, false);
      let scaleFactor = modifierKeyActive ? 1 / props.scaleFactor : props.scaleFactor;
      nextValue = zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor, props);
    }
    event.preventDefault();
    return nextValue;
  }
  function onWheel(event, ViewerDOM, tool, value, props) {
    let coords = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
    const {
      x,
      y
    } = coords || getMousePosition(event, ViewerDOM);
    if (!props.detectWheel) return value;
    let delta = Math.max(-1, Math.min(1, event.deltaY));
    let scaleFactor = mapRange(delta, -1, 1, props.scaleFactorOnWheel, 1 / props.scaleFactorOnWheel);
    let SVGPoint = getSVGPoint(value, x, y);
    let nextValue = zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor, props);
    event.preventDefault();
    return nextValue;
  }
  function onMouseEnterOrLeave(event, ViewerDOM, tool, value, props) {
    let coords = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
    let nextValue = setFocus(value, event.type === "mouseenter");
    event.preventDefault();
    return nextValue;
  }
  function onInterval(event, ViewerDOM, tool, value, props) {
    let coords = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
    let {
      x,
      y
    } = coords;
    if (!([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0)) return value;
    if (!props.detectAutoPan) return value;
    if (!value.focus) return value;
    return autoPanIfNeeded(value, x, y);
  }
  var init_interactions = __esm({
    "node_modules/react-svg-pan-zoom/build-es/features/interactions.js"() {
      init_constants();
      init_common();
      init_pan();
      init_zoom();
      init_mapRange();
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/events/viewer-mouse-event.js
  var ViewerMouseEvent;
  var init_viewer_mouse_event = __esm({
    "node_modules/react-svg-pan-zoom/build-es/events/viewer-mouse-event.js"() {
      init_viewer_event();
      init_interactions();
      init_common();
      ViewerMouseEvent = class extends ViewerEvent {
        get point() {
          if (!this._cachePoint) {
            const {
              originalEvent: event,
              SVGViewer,
              value
            } = this;
            const mousePosition = getMousePosition(event, SVGViewer);
            this._cachePoint = getSVGPoint(value, mousePosition.x, mousePosition.y);
          }
          return this._cachePoint;
        }
        get x() {
          return this.point.x;
        }
        get y() {
          return this.point.y;
        }
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/events/viewer-touch-event.js
  function ownKeys4(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread4(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys4(Object(t), true).forEach(function(r2) {
        _defineProperty4(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys4(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _defineProperty4(e, r, t) {
    return (r = _toPropertyKey4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
  }
  function _toPropertyKey4(t) {
    var i = _toPrimitive4(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _toPrimitive4(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  var ViewerTouchEvent;
  var init_viewer_touch_event = __esm({
    "node_modules/react-svg-pan-zoom/build-es/events/viewer-touch-event.js"() {
      init_common();
      init_viewer_event();
      ViewerTouchEvent = class _ViewerTouchEvent extends ViewerEvent {
        get points() {
          if (!this._cachePoints) this._cachePoints = _ViewerTouchEvent.touchesToPoints(this.originalEvent.touches, this.SVGViewer, this.value);
          return this._cachePoints;
        }
        get changedPoints() {
          if (!this._cacheChangedPoints) this._cacheChangedPoints = _ViewerTouchEvent.touchesToPoints(this.originalEvent.changedTouches, this.SVGViewer, this.value);
          return this._cacheChangedPoints;
        }
        static touchesToPoints(touches, SVGViewer, value) {
          let points = [];
          for (let i = 0; i < touches.length; i++) {
            let touch = touches[i];
            let rect = SVGViewer.getBoundingClientRect();
            let x = touch.clientX - Math.round(rect.left);
            let y = touch.clientY - Math.round(rect.top);
            let point = getSVGPoint(value, x, y);
            points.push(_objectSpread4(_objectSpread4({}, point), {}, {
              identifier: touch.identifier
            }));
          }
          return points;
        }
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/events/event-factory.js
  function eventFactory(originalEvent, value, SVGViewer) {
    let eventType = originalEvent.type;
    switch (eventType) {
      case "mousemove":
      case "mouseup":
      case "mousedown":
      case "click":
      case "dblclick":
        return new ViewerMouseEvent(originalEvent, value, SVGViewer);
      case "touchstart":
      case "touchmove":
      case "touchend":
      case "touchcancel":
        return new ViewerTouchEvent(originalEvent, value, SVGViewer);
      default:
        throw new Error(`${eventType} not supported`);
    }
  }
  var init_event_factory = __esm({
    "node_modules/react-svg-pan-zoom/build-es/events/event-factory.js"() {
      init_viewer_mouse_event();
      init_viewer_touch_event();
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/utils/parseViewBox.js
  function parseViewBox(viewBoxString) {
    return viewBoxString.split(/[ ,]/).filter(Boolean).map(Number);
  }
  var init_parseViewBox = __esm({
    "node_modules/react-svg-pan-zoom/build-es/utils/parseViewBox.js"() {
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/features/interactions-touch.js
  function ownKeys5(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread5(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys5(Object(t), true).forEach(function(r2) {
        _defineProperty5(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys5(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _defineProperty5(e, r, t) {
    return (r = _toPropertyKey5(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
  }
  function _toPropertyKey5(t) {
    var i = _toPrimitive5(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _toPrimitive5(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function getTouchPosition(touch, ViewerDOM) {
    let {
      left,
      top
    } = ViewerDOM.getBoundingClientRect();
    let x = touch.clientX - Math.round(left);
    let y = touch.clientY - Math.round(top);
    return {
      x,
      y
    };
  }
  function onTouchStart(event, ViewerDOM, tool, value, props) {
    if (isMultiTouch(event, props)) {
      return onMultiTouch(event, ViewerDOM, tool, value, props);
    }
    if (event.touches.length !== 1) {
      if ([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0) {
        return resetMode(value);
      } else if ([MODE_IDLE].indexOf(value.mode) >= 0) {
        return value;
      }
    }
    return onSingleTouch(event, ViewerDOM, tool, value, props, onMouseDown);
  }
  function onTouchMove(event, ViewerDOM, tool, value, props) {
    if (isMultiTouch(event, props)) {
      return onMultiTouch(event, ViewerDOM, tool, value, props);
    }
    if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) {
      return value;
    }
    return onSingleTouch(event, ViewerDOM, tool, value, props, onMouseMove);
  }
  function onTouchEnd(event, ViewerDOM, tool, value, props) {
    if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) {
      return value;
    }
    let nextValue = shouldResetPinchPointDistance(event, value, props) ? set(value, {
      pinchPointDistance: null
    }) : value;
    if (event.touches.length > 0) {
      return nextValue;
    }
    return onSingleTouch(event, ViewerDOM, tool, nextValue, props, onMouseUp);
  }
  function onTouchCancel(event, ViewerDOM, tool, value, props) {
    event.stopPropagation();
    event.preventDefault();
    return resetMode(value);
  }
  function hasPinchPointDistance(value) {
    return typeof value.pinchPointDistance === "number";
  }
  function shouldResetPinchPointDistance(event, value, props) {
    return props.detectPinchGesture && hasPinchPointDistance(value) && event.touches.length < 2;
  }
  function isMultiTouch(event, props) {
    return props.detectPinchGesture && event.touches.length > 1;
  }
  function onSingleTouch(event, ViewerDOM, tool, value, props, nextValueFn) {
    let nextValue = event.touches.length === 0 ? set(value, {
      mode: value.prePinchMode ? MODE_IDLE : value.mode,
      prePinchMode: null
    }) : value;
    let touch = event.touches.length > 0 ? event.touches[0] : event.changedTouches[0];
    let touchPosition = getTouchPosition(touch, ViewerDOM);
    switch (tool) {
      case TOOL_ZOOM_OUT:
      case TOOL_ZOOM_IN:
      case TOOL_AUTO:
      case TOOL_PAN:
        event.stopPropagation();
        event.preventDefault();
        return nextValueFn(event, ViewerDOM, tool, nextValue, props, touchPosition);
      default:
        return nextValue;
    }
  }
  function onMultiTouch(event, ViewerDOM, tool, value, props) {
    const {
      left,
      top
    } = ViewerDOM.getBoundingClientRect();
    const x1 = event.touches[0].clientX - Math.round(left);
    const y1 = event.touches[0].clientY - Math.round(top);
    const x2 = event.touches[1].clientX - Math.round(left);
    const y2 = event.touches[1].clientY - Math.round(top);
    const pinchPointDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const previousPointDistance = hasPinchPointDistance(value) ? value.pinchPointDistance : pinchPointDistance;
    const svgPoint = getSVGPoint(value, (x1 + x2) / 2, (y1 + y2) / 2);
    let distanceFactor = pinchPointDistance / previousPointDistance;
    if (isZoomLevelGoingOutOfBounds(value, distanceFactor)) {
      return value;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    let matrix = transform(fromObject(value), translate(svgPoint.x, svgPoint.y), scale(distanceFactor, distanceFactor), translate(-svgPoint.x, -svgPoint.y));
    return set(value, set(_objectSpread5(_objectSpread5({
      mode: MODE_ZOOMING
    }, limitZoomLevel(value, matrix)), {}, {
      startX: null,
      startY: null,
      endX: null,
      endY: null,
      prePinchMode: value.prePinchMode ? value.prePinchMode : value.mode,
      pinchPointDistance
    })));
  }
  var init_interactions_touch = __esm({
    "node_modules/react-svg-pan-zoom/build-es/features/interactions-touch.js"() {
      init_src();
      init_constants();
      init_common();
      init_interactions();
      init_zoom();
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/features/miniature.js
  function openMiniature(value) {
    return set(value, {
      miniatureOpen: true
    });
  }
  function closeMiniature(value) {
    return set(value, {
      miniatureOpen: false
    });
  }
  var init_miniature = __esm({
    "node_modules/react-svg-pan-zoom/build-es/features/miniature.js"() {
      init_common();
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui/cursor-polyfill.js
  function cursor_polyfill_default(cursor) {
    if (!needPrefix(cursor)) return cursor;
    if (isFirefox()) return `-moz-${cursor}`;
    if (isWebkit()) return `-webkit-${cursor}`;
  }
  var needPrefix, userAgent, isFirefox, isWebkit;
  var init_cursor_polyfill = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui/cursor-polyfill.js"() {
      needPrefix = (cursor) => ["zoom-in", "zoom-out", "grab", "grabbing"].indexOf(cursor) > -1;
      userAgent = () => navigator.userAgent.toLowerCase();
      isFirefox = () => userAgent().indexOf("firefox") > -1;
      isWebkit = () => userAgent().indexOf("webkit") > -1;
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/utils/getDisplayName.js
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
  }
  var init_getDisplayName = __esm({
    "node_modules/react-svg-pan-zoom/build-es/utils/getDisplayName.js"() {
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/utils/RandomUID.js
  function _extends2() {
    return _extends2 = Object.assign ? Object.assign.bind() : function(n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends2.apply(null, arguments);
  }
  function RandomUID(WrappedComponent) {
    class RandomUID2 extends import_react5.default.Component {
      constructor(props) {
        super(props);
        this.state = {
          uid: nextUID()
        };
      }
      render() {
        return /* @__PURE__ */ import_react5.default.createElement(WrappedComponent, _extends2({
          _uid: this.state.uid
        }, this.props));
      }
    }
    RandomUID2.displayName = `RandomUID(${getDisplayName(WrappedComponent)})`;
    return RandomUID2;
  }
  var import_react5, uid, nextUID;
  var init_RandomUID = __esm({
    "node_modules/react-svg-pan-zoom/build-es/utils/RandomUID.js"() {
      import_react5 = __toESM(require_react());
      init_getDisplayName();
      uid = 1;
      nextUID = () => `uid${uid++}`;
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui/border-gradient.js
  function BorderGradient(_ref) {
    let {
      direction,
      width,
      height,
      _uid
    } = _ref;
    let transform2;
    switch (direction) {
      case POSITION_TOP:
        transform2 = `translate(${width}, 0) rotate(90)`;
        break;
      case POSITION_RIGHT:
        transform2 = `translate(${width}, ${height}) rotate(180)`;
        break;
      case POSITION_BOTTOM:
        transform2 = `translate(0, ${height}) rotate(270)`;
        break;
      case POSITION_LEFT:
      default:
        transform2 = " ";
        break;
    }
    let gradientID = `${prefixID}_gradient_${_uid}`;
    let maskID = `${prefixID}_mask_${_uid}`;
    return /* @__PURE__ */ import_react6.default.createElement("g", null, /* @__PURE__ */ import_react6.default.createElement("defs", null, /* @__PURE__ */ import_react6.default.createElement("linearGradient", {
      id: gradientID,
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%",
      spreadMethod: "pad"
    }, /* @__PURE__ */ import_react6.default.createElement("stop", {
      offset: "0%",
      stopColor: "#fff",
      stopOpacity: "0.8"
    }), /* @__PURE__ */ import_react6.default.createElement("stop", {
      offset: "100%",
      stopColor: "#000",
      stopOpacity: "0.5"
    })), /* @__PURE__ */ import_react6.default.createElement("mask", {
      id: maskID,
      x: "0",
      y: "0",
      width: "20",
      height: Math.max(width, height)
    }, /* @__PURE__ */ import_react6.default.createElement("rect", {
      x: "0",
      y: "0",
      width: "20",
      height: Math.max(width, height),
      style: {
        stroke: "none",
        fill: `url(#${gradientID})`
      }
    }))), /* @__PURE__ */ import_react6.default.createElement("rect", {
      x: "0",
      y: "0",
      width: "20",
      height: Math.max(width, height),
      style: {
        stroke: "none",
        fill: "#000",
        mask: `url(#${maskID})`
      },
      transform: transform2
    }));
  }
  var import_react6, import_prop_types2, prefixID, border_gradient_default;
  var init_border_gradient = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui/border-gradient.js"() {
      import_react6 = __toESM(require_react());
      import_prop_types2 = __toESM(require_prop_types());
      init_constants();
      init_RandomUID();
      prefixID = "react-svg-pan-zoom_border_gradient";
      BorderGradient.propTypes = {
        direction: import_prop_types2.default.oneOf([POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]).isRequired,
        width: import_prop_types2.default.number.isRequired,
        height: import_prop_types2.default.number.isRequired
      };
      border_gradient_default = RandomUID(BorderGradient);
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui/selection.js
  function Selection(_ref) {
    let {
      startX,
      startY,
      endX,
      endY
    } = _ref;
    if (!startX || !startY || !endX || !endY) return null;
    let box = calculateBox({
      x: startX,
      y: startY
    }, {
      x: endX,
      y: endY
    });
    return /* @__PURE__ */ import_react7.default.createElement("rect", {
      stroke: "#969FFF",
      strokeOpacity: 0.7,
      fill: "#F3F4FF",
      fillOpacity: 0.7,
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
      style: {
        pointerEvents: "none"
      }
    });
  }
  var import_react7, import_prop_types3;
  var init_selection = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui/selection.js"() {
      import_react7 = __toESM(require_react());
      import_prop_types3 = __toESM(require_prop_types());
      init_calculateBox();
      Selection.propTypes = {
        startX: import_prop_types3.default.number,
        startY: import_prop_types3.default.number,
        endX: import_prop_types3.default.number,
        endY: import_prop_types3.default.number
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-cursor.js
  function IconCursor() {
    return /* @__PURE__ */ import_react8.default.createElement("svg", {
      width: 24,
      height: 24,
      stroke: "currentColor"
    }, /* @__PURE__ */ import_react8.default.createElement("path", {
      d: "M10.07,14.27C10.57,14.03 11.16,14.25 11.4,14.75L13.7,19.74L15.5,18.89L13.19,13.91C12.95,13.41 13.17,12.81 13.67,12.58L13.95,12.5L16.25,12.05L8,5.12V15.9L9.82,14.43L10.07,14.27M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z"
    }));
  }
  var import_react8;
  var init_icon_cursor = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-cursor.js"() {
      import_react8 = __toESM(require_react());
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-pan.js
  function IconPan() {
    return /* @__PURE__ */ import_react9.default.createElement("svg", {
      width: 24,
      height: 24,
      stroke: "currentColor"
    }, /* @__PURE__ */ import_react9.default.createElement("path", {
      d: "M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z"
    }));
  }
  var import_react9;
  var init_icon_pan = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-pan.js"() {
      import_react9 = __toESM(require_react());
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-zoom-in.js
  function IconZoomIn() {
    return /* @__PURE__ */ import_react10.default.createElement("svg", {
      width: 24,
      height: 24,
      stroke: "currentColor"
    }, /* @__PURE__ */ import_react10.default.createElement("g", null, /* @__PURE__ */ import_react10.default.createElement("path", {
      d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    }), /* @__PURE__ */ import_react10.default.createElement("path", {
      d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"
    })));
  }
  var import_react10;
  var init_icon_zoom_in = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-zoom-in.js"() {
      import_react10 = __toESM(require_react());
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-zoom-out.js
  function IconZoomOut() {
    return /* @__PURE__ */ import_react11.default.createElement("svg", {
      width: 24,
      height: 24,
      stroke: "currentColor"
    }, /* @__PURE__ */ import_react11.default.createElement("path", {
      d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"
    }));
  }
  var import_react11;
  var init_icon_zoom_out = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-zoom-out.js"() {
      import_react11 = __toESM(require_react());
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-fit.js
  function IconFit() {
    return /* @__PURE__ */ import_react12.default.createElement("svg", {
      width: 24,
      height: 24,
      stroke: "currentColor"
    }, /* @__PURE__ */ import_react12.default.createElement("path", {
      d: "M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z"
    }));
  }
  var import_react12;
  var init_icon_fit = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-toolbar/icon-fit.js"() {
      import_react12 = __toESM(require_react());
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-toolbar/toolbar-button.js
  var import_react13, import_prop_types4, ToolbarButton;
  var init_toolbar_button = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-toolbar/toolbar-button.js"() {
      import_react13 = __toESM(require_react());
      import_prop_types4 = __toESM(require_prop_types());
      init_constants();
      ToolbarButton = class extends import_react13.default.Component {
        constructor(props) {
          super(props);
          this.state = {
            hover: false
          };
        }
        change(event) {
          event.preventDefault();
          event.stopPropagation();
          switch (event.type) {
            case "mouseenter":
            case "touchstart":
              this.setState({
                hover: true
              });
              break;
            case "mouseleave":
            case "touchend":
            case "touchcancel":
              this.setState({
                hover: false
              });
              break;
            default:
          }
        }
        render() {
          let style = {
            display: "block",
            width: "24px",
            height: "24px",
            margin: [POSITION_TOP, POSITION_BOTTOM].indexOf(this.props.toolbarPosition) >= 0 ? "2px 1px" : "1px 2px",
            color: this.props.active || this.state.hover ? this.props.activeColor : "#FFF",
            transition: "color 200ms ease",
            background: "none",
            padding: "0px",
            border: "0px",
            outline: "0px",
            cursor: "pointer"
          };
          return /* @__PURE__ */ import_react13.default.createElement("button", {
            onMouseEnter: (e) => this.change(e),
            onMouseLeave: (e) => this.change(e),
            onTouchStart: (e) => {
              this.change(e);
              this.props.onClick(e);
            },
            onTouchEnd: (e) => this.change(e),
            onTouchCancel: (e) => this.change(e),
            onClick: this.props.onClick,
            style,
            title: this.props.title,
            name: this.props.name,
            type: "button"
          }, this.props.children);
        }
      };
      ToolbarButton.propTypes = {
        title: import_prop_types4.default.string.isRequired,
        name: import_prop_types4.default.string.isRequired,
        toolbarPosition: import_prop_types4.default.string.isRequired,
        activeColor: import_prop_types4.default.string.isRequired,
        onClick: import_prop_types4.default.func.isRequired,
        active: import_prop_types4.default.bool.isRequired
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-toolbar/toolbar.js
  function Toolbar(_ref) {
    let {
      tool,
      value,
      onChangeValue,
      onChangeTool,
      activeToolColor = DEFAULT_ACTIVE_TOOL_COLOR,
      position = POSITION_RIGHT,
      SVGAlignX = ALIGN_LEFT,
      SVGAlignY = ALIGN_TOP
    } = _ref;
    let handleChangeTool = (event, tool2) => {
      onChangeTool(tool2);
      event.stopPropagation();
      event.preventDefault();
    };
    let handleFit = (event) => {
      onChangeValue(fitToViewer(value, SVGAlignX, SVGAlignY));
      event.stopPropagation();
      event.preventDefault();
    };
    let isHorizontal = [POSITION_TOP, POSITION_BOTTOM].indexOf(position) >= 0;
    let style = {
      //position
      position: "absolute",
      transform: [POSITION_TOP, POSITION_BOTTOM].indexOf(position) >= 0 ? "translate(-50%, 0px)" : "none",
      top: [POSITION_LEFT, POSITION_RIGHT, POSITION_TOP].indexOf(position) >= 0 ? "5px" : "unset",
      left: [POSITION_TOP, POSITION_BOTTOM].indexOf(position) >= 0 ? "50%" : POSITION_LEFT === position ? "5px" : "unset",
      right: [POSITION_RIGHT].indexOf(position) >= 0 ? "5px" : "unset",
      bottom: [POSITION_BOTTOM].indexOf(position) >= 0 ? "5px" : "unset",
      //inner styling
      backgroundColor: "rgba(19, 20, 22, 0.90)",
      borderRadius: "2px",
      display: "flex",
      flexDirection: isHorizontal ? "row" : "column",
      padding: isHorizontal ? "1px 2px" : "2px 1px"
    };
    return /* @__PURE__ */ import_react14.default.createElement("div", {
      style,
      role: "toolbar"
    }, /* @__PURE__ */ import_react14.default.createElement(ToolbarButton, {
      toolbarPosition: position,
      active: tool === TOOL_NONE,
      activeColor: activeToolColor,
      name: "unselect-tools",
      title: "Selection",
      onClick: (event) => handleChangeTool(event, TOOL_NONE)
    }, /* @__PURE__ */ import_react14.default.createElement(IconCursor, null)), /* @__PURE__ */ import_react14.default.createElement(ToolbarButton, {
      toolbarPosition: position,
      active: tool === TOOL_PAN,
      activeColor: activeToolColor,
      name: "select-tool-pan",
      title: "Pan",
      onClick: (event) => handleChangeTool(event, TOOL_PAN)
    }, /* @__PURE__ */ import_react14.default.createElement(IconPan, null)), /* @__PURE__ */ import_react14.default.createElement(ToolbarButton, {
      toolbarPosition: position,
      active: tool === TOOL_ZOOM_IN,
      activeColor: activeToolColor,
      name: "select-tool-zoom-in",
      title: "Zoom in",
      onClick: (event) => handleChangeTool(event, TOOL_ZOOM_IN)
    }, /* @__PURE__ */ import_react14.default.createElement(IconZoomIn, null)), /* @__PURE__ */ import_react14.default.createElement(ToolbarButton, {
      toolbarPosition: position,
      active: tool === TOOL_ZOOM_OUT,
      activeColor: activeToolColor,
      name: "select-tool-zoom-out",
      title: "Zoom out",
      onClick: (event) => handleChangeTool(event, TOOL_ZOOM_OUT)
    }, /* @__PURE__ */ import_react14.default.createElement(IconZoomOut, null)), /* @__PURE__ */ import_react14.default.createElement(ToolbarButton, {
      toolbarPosition: position,
      active: false,
      activeColor: activeToolColor,
      name: "fit-to-viewer",
      title: "Fit to viewer",
      onClick: (event) => handleFit(event)
    }, /* @__PURE__ */ import_react14.default.createElement(IconFit, null)));
  }
  var import_react14, import_prop_types5, DEFAULT_ACTIVE_TOOL_COLOR;
  var init_toolbar = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-toolbar/toolbar.js"() {
      import_react14 = __toESM(require_react());
      import_prop_types5 = __toESM(require_prop_types());
      init_constants();
      init_zoom();
      init_icon_cursor();
      init_icon_pan();
      init_icon_zoom_in();
      init_icon_zoom_out();
      init_icon_fit();
      init_toolbar_button();
      DEFAULT_ACTIVE_TOOL_COLOR = "#1CA6FC";
      Toolbar.propTypes = {
        tool: import_prop_types5.default.string.isRequired,
        onChangeTool: import_prop_types5.default.func.isRequired,
        value: import_prop_types5.default.object.isRequired,
        onChangeValue: import_prop_types5.default.func.isRequired,
        //customizations
        position: import_prop_types5.default.oneOf([POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),
        SVGAlignX: import_prop_types5.default.oneOf([ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
        SVGAlignY: import_prop_types5.default.oneOf([ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
        activeToolColor: import_prop_types5.default.string
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui/detect-touch.js
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints;
  }
  var init_detect_touch = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui/detect-touch.js"() {
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-miniature/icon-arrow.js
  function IconArrow(_ref) {
    let {
      open,
      position
    } = _ref;
    let transform2 = 0;
    switch (position) {
      case POSITION_LEFT:
        transform2 = open ? "rotate(225, 12, 13)" : "rotate(45, 12, 13)";
        break;
      case POSITION_RIGHT:
        transform2 = transform2 = open ? "rotate(135, 12, 13)" : "rotate(-45, 12, 13)";
        break;
      default:
    }
    return /* @__PURE__ */ import_react15.default.createElement("svg", {
      width: 24,
      height: 24,
      stroke: "currentColor"
    }, /* @__PURE__ */ import_react15.default.createElement("g", {
      transform: transform2
    }, /* @__PURE__ */ import_react15.default.createElement("path", {
      fill: "#000000",
      d: "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
    })));
  }
  var import_react15, import_prop_types6;
  var init_icon_arrow = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-miniature/icon-arrow.js"() {
      import_react15 = __toESM(require_react());
      import_prop_types6 = __toESM(require_prop_types());
      init_constants();
      IconArrow.propTypes = {
        open: import_prop_types6.default.bool.isRequired,
        position: import_prop_types6.default.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-miniature/miniature-toggle-button.js
  function MiniatureToggleButton(_ref) {
    let {
      value,
      onChangeValue,
      position
    } = _ref;
    let style = {
      width: "24px",
      height: "24px",
      display: "block",
      position: "absolute",
      bottom: 0,
      [position === POSITION_LEFT ? "left" : "right"]: "0px",
      background: "rgba(19, 20, 22, 0.901961)",
      border: 0,
      padding: 0,
      outline: 0,
      color: "#fff"
    };
    let action = value.miniatureOpen ? closeMiniature : openMiniature;
    return /* @__PURE__ */ import_react16.default.createElement("button", {
      type: "button",
      style,
      onClick: () => onChangeValue(action(value))
    }, /* @__PURE__ */ import_react16.default.createElement(IconArrow, {
      open: value.miniatureOpen,
      position
    }));
  }
  var import_react16, import_prop_types7;
  var init_miniature_toggle_button = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-miniature/miniature-toggle-button.js"() {
      import_react16 = __toESM(require_react());
      import_prop_types7 = __toESM(require_prop_types());
      init_miniature();
      init_icon_arrow();
      init_constants();
      MiniatureToggleButton.propTypes = {
        value: import_prop_types7.default.object.isRequired,
        onChangeValue: import_prop_types7.default.func.isRequired,
        position: import_prop_types7.default.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-miniature/miniature-mask.js
  function MiniatureMask(_ref) {
    let {
      SVGMinX,
      SVGMinY,
      SVGWidth,
      SVGHeight,
      x1,
      y1,
      x2,
      y2,
      zoomToFit,
      _uid
    } = _ref;
    const maskID = `${prefixID2}_mask_${_uid}`;
    return /* @__PURE__ */ import_react17.default.createElement("g", null, /* @__PURE__ */ import_react17.default.createElement("defs", null, /* @__PURE__ */ import_react17.default.createElement("mask", {
      id: maskID
    }, /* @__PURE__ */ import_react17.default.createElement("rect", {
      x: SVGMinX,
      y: SVGMinY,
      width: SVGWidth,
      height: SVGHeight,
      fill: "#ffffff"
    }), /* @__PURE__ */ import_react17.default.createElement("rect", {
      x: x1,
      y: y1,
      width: x2 - x1,
      height: y2 - y1
    }))), /* @__PURE__ */ import_react17.default.createElement("rect", {
      x: SVGMinX,
      y: SVGMinY,
      width: SVGWidth,
      height: SVGHeight,
      style: {
        stroke: "none",
        fill: "#000",
        mask: `url(#${maskID})`,
        opacity: 0.4
      }
    }));
  }
  var import_react17, import_prop_types8, prefixID2, miniature_mask_default;
  var init_miniature_mask = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-miniature/miniature-mask.js"() {
      import_react17 = __toESM(require_react());
      import_prop_types8 = __toESM(require_prop_types());
      init_RandomUID();
      prefixID2 = "react-svg-pan-zoom_miniature";
      MiniatureMask.propTypes = {
        SVGWidth: import_prop_types8.default.number.isRequired,
        SVGHeight: import_prop_types8.default.number.isRequired,
        SVGMinX: import_prop_types8.default.number.isRequired,
        SVGMinY: import_prop_types8.default.number.isRequired,
        x1: import_prop_types8.default.number.isRequired,
        y1: import_prop_types8.default.number.isRequired,
        x2: import_prop_types8.default.number.isRequired,
        y2: import_prop_types8.default.number.isRequired,
        zoomToFit: import_prop_types8.default.number.isRequired
      };
      miniature_mask_default = RandomUID(MiniatureMask);
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/ui-miniature/miniature.js
  function Miniature(_ref) {
    let {
      value,
      onChangeValue,
      children,
      SVGBackground,
      background = DEFAULT_BACKGROUND,
      position = POSITION_LEFT,
      width: miniatureWidth = 100,
      height: miniatureHeight = 80
    } = _ref;
    let {
      SVGMinX,
      SVGMinY,
      SVGWidth,
      SVGHeight,
      viewerWidth,
      viewerHeight
    } = value;
    let ratio = SVGHeight / SVGWidth;
    let zoomToFit = ratio >= 1 ? miniatureHeight / SVGHeight : miniatureWidth / SVGWidth;
    let [{
      x: x1,
      y: y1
    }, {
      x: x2,
      y: y2
    }] = applyToPoints(inverse(value), [{
      x: 0,
      y: 0
    }, {
      x: viewerWidth,
      y: viewerHeight
    }]);
    let width, height;
    if (value.miniatureOpen) {
      width = miniatureWidth;
      height = miniatureHeight;
    } else {
      width = 24;
      height = 24;
    }
    let style = {
      position: "absolute",
      overflow: "hidden",
      outline: "1px solid rgba(19, 20, 22, 0.90)",
      transition: "width 200ms ease, height 200ms ease, bottom 200ms ease",
      width: width + "px",
      height: height + "px",
      bottom: "6px",
      [position === POSITION_LEFT ? "left" : "right"]: "6px",
      background
    };
    let centerTranslation = ratio >= 1 ? `translate(${(miniatureWidth - SVGWidth * zoomToFit) / 2 - SVGMinX * zoomToFit}, ${-SVGMinY * zoomToFit})` : `translate(${-SVGMinX * zoomToFit}, ${(miniatureHeight - SVGHeight * zoomToFit) / 2 - SVGMinY * zoomToFit})`;
    return /* @__PURE__ */ import_react18.default.createElement("div", {
      role: "navigation",
      style
    }, /* @__PURE__ */ import_react18.default.createElement("svg", {
      width: miniatureWidth,
      height: miniatureHeight,
      style: {
        pointerEvents: "none"
      }
    }, /* @__PURE__ */ import_react18.default.createElement("g", {
      transform: centerTranslation
    }, /* @__PURE__ */ import_react18.default.createElement("g", {
      transform: `scale(${zoomToFit}, ${zoomToFit})`
    }, /* @__PURE__ */ import_react18.default.createElement("rect", {
      fill: SVGBackground,
      x: SVGMinX,
      y: SVGMinY,
      width: SVGWidth,
      height: SVGHeight
    }), children, /* @__PURE__ */ import_react18.default.createElement(miniature_mask_default, {
      SVGWidth,
      SVGHeight,
      SVGMinX,
      SVGMinY,
      x1,
      y1,
      x2,
      y2,
      zoomToFit
    })))), /* @__PURE__ */ import_react18.default.createElement(MiniatureToggleButton, {
      value,
      onChangeValue,
      position
    }));
  }
  var import_react18, import_prop_types9, DEFAULT_BACKGROUND;
  var init_miniature2 = __esm({
    "node_modules/react-svg-pan-zoom/build-es/ui-miniature/miniature.js"() {
      import_react18 = __toESM(require_react());
      import_prop_types9 = __toESM(require_prop_types());
      init_constants();
      init_src();
      init_miniature_toggle_button();
      init_miniature_mask();
      DEFAULT_BACKGROUND = "#616264";
      Miniature.propTypes = {
        value: import_prop_types9.default.object.isRequired,
        onChangeValue: import_prop_types9.default.func.isRequired,
        SVGBackground: import_prop_types9.default.string.isRequired,
        //customizations
        position: import_prop_types9.default.oneOf([POSITION_RIGHT, POSITION_LEFT]),
        background: import_prop_types9.default.string,
        width: import_prop_types9.default.number,
        height: import_prop_types9.default.number
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/utils/is.js
  function isNullOrUndefined2(value) {
    return typeof value === "undefined" || value === null;
  }
  var init_is = __esm({
    "node_modules/react-svg-pan-zoom/build-es/utils/is.js"() {
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/migration-tips.js
  function tipControlledComponent() {
    console.error(`HEY! With ReactSVGPanZoom >= 3 you MUST specify value and tool props. Please read here ${doc_v2_to_v3}`);
  }
  function tipDeprecatedMiniatureProps() {
    console.error(`HEY! With ReactSVGPanZoom >= 3 the props miniaturePosition, miniatureBackground, miniatureWidth, miniatureHeight can be specified as key in the miniatureProps object. Please read here ${doc_v2_to_v3}`);
  }
  function tipDeprecateToolbarProps() {
    console.error(`HEY! With ReactSVGPanZoom >= 3 the prop toolbarPosition can be specified as key in the toolbarProps object. Please read here ${doc_v2_to_v3}`);
  }
  function printMigrationTipsRelatedToProps(props) {
    if (isNullOrUndefined2(props.tool) || isNullOrUndefined2(props.value)) tipControlledComponent();
    if (!isNullOrUndefined2(props.miniaturePosition) || !isNullOrUndefined2(props.miniatureBackground) || !isNullOrUndefined2(props.miniatureWidth) || !isNullOrUndefined2(props.miniatureHeight)) tipDeprecatedMiniatureProps();
    if (!isNullOrUndefined2(props.toolbarPosition)) tipDeprecateToolbarProps();
  }
  var github_base, doc_v2_to_v3;
  var init_migration_tips = __esm({
    "node_modules/react-svg-pan-zoom/build-es/migration-tips.js"() {
      init_is();
      github_base = "https://github.com/chrvadala/react-svg-pan-zoom/blob/main";
      doc_v2_to_v3 = github_base + "/docs/migrate-from-v2-to-v3.md";
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/viewer.js
  function _extends3() {
    return _extends3 = Object.assign ? Object.assign.bind() : function(n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends3.apply(null, arguments);
  }
  function ownKeys6(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread6(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys6(Object(t), true).forEach(function(r2) {
        _defineProperty6(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys6(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _defineProperty6(e, r, t) {
    return (r = _toPropertyKey6(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
  }
  function _toPropertyKey6(t) {
    var i = _toPrimitive6(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _toPrimitive6(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  var import_react19, import_prop_types10, ReactSVGPanZoom;
  var init_viewer = __esm({
    "node_modules/react-svg-pan-zoom/build-es/viewer.js"() {
      import_react19 = __toESM(require_react());
      import_prop_types10 = __toESM(require_prop_types());
      init_src();
      init_event_factory();
      init_pan();
      init_common();
      init_interactions();
      init_parseViewBox();
      init_interactions_touch();
      init_zoom();
      init_miniature();
      init_cursor_polyfill();
      init_border_gradient();
      init_selection();
      init_toolbar();
      init_detect_touch();
      init_miniature2();
      init_constants();
      init_migration_tips();
      ReactSVGPanZoom = class extends import_react19.default.Component {
        constructor(props, context) {
          const {
            width: viewerWidth,
            height: viewerHeight,
            scaleFactorMin,
            scaleFactorMax,
            children
          } = props;
          const {
            viewBox: SVGViewBox
          } = children.props;
          let defaultValue;
          if (SVGViewBox) {
            const [SVGMinX, SVGMinY, SVGWidth, SVGHeight] = parseViewBox(SVGViewBox);
            defaultValue = getDefaultValue(viewerWidth, viewerHeight, SVGMinX, SVGMinY, SVGWidth, SVGHeight, scaleFactorMin, scaleFactorMax);
          } else {
            const {
              width: SVGWidth,
              height: SVGHeight
            } = children.props;
            defaultValue = getDefaultValue(viewerWidth, viewerHeight, 0, 0, SVGWidth, SVGHeight, scaleFactorMin, scaleFactorMax);
          }
          super(props, context);
          this.ViewerDOM = null;
          this.state = {
            pointerX: null,
            pointerY: null,
            defaultValue
          };
          this.autoPanLoop = this.autoPanLoop.bind(this);
          this.onWheel = this.onWheel.bind(this);
          if (true) {
            printMigrationTipsRelatedToProps(props);
          }
        }
        /** React hooks **/
        componentDidUpdate(prevProps) {
          const value = this.getValue();
          const props = this.props;
          let nextValue = value;
          let needUpdate = false;
          if (true) {
            printMigrationTipsRelatedToProps(props);
          }
          const {
            viewBox: SVGViewBox
          } = props.children.props;
          if (SVGViewBox) {
            const [x, y, width, height] = parseViewBox(SVGViewBox);
            if (value.SVGMinX !== x || value.SVGMinY !== y || value.SVGWidth !== width || value.SVGHeight !== height) {
              nextValue = setSVGViewBox(nextValue, x, y, width, height);
              needUpdate = true;
            }
          } else {
            const {
              width: SVGWidth,
              height: SVGHeight
            } = props.children.props;
            if (value.SVGWidth !== SVGWidth || value.SVGHeight !== SVGHeight) {
              nextValue = setSVGViewBox(nextValue, 0, 0, SVGWidth, SVGHeight);
              needUpdate = true;
            }
          }
          if (prevProps.width !== props.width || prevProps.height !== props.height) {
            nextValue = setViewerSize(nextValue, props.width, props.height);
            needUpdate = true;
          }
          if (prevProps.scaleFactorMin !== props.scaleFactorMin || prevProps.scaleFactorMax !== props.scaleFactorMax) {
            nextValue = setZoomLevels(nextValue, props.scaleFactorMin, props.scaleFactorMax);
            needUpdate = true;
          }
          if (needUpdate) {
            this.setValue(nextValue);
          }
        }
        componentDidMount() {
          this.autoPanIsRunning = true;
          requestAnimationFrame(this.autoPanLoop);
          this.ViewerDOM.addEventListener("wheel", this.onWheel, false);
        }
        componentWillUnmount() {
          this.autoPanIsRunning = false;
          this.ViewerDOM.removeEventListener("wheel", this.onWheel);
        }
        /** ReactSVGPanZoom handlers **/
        getValue() {
          if (isValueValid(this.props.value)) return this.props.value;
          return this.state.defaultValue;
        }
        getTool() {
          if (this.props.tool) return this.props.tool;
          return TOOL_NONE;
        }
        setValue(nextValue) {
          let {
            onChangeValue,
            onZoom,
            onPan
          } = this.props;
          if (onChangeValue) onChangeValue(nextValue);
          if (nextValue.lastAction) {
            if (onZoom && nextValue.lastAction === ACTION_ZOOM) onZoom(nextValue);
            if (onPan && nextValue.lastAction === ACTION_PAN) onPan(nextValue);
          }
        }
        /** ReactSVGPanZoom methods **/
        pan(SVGDeltaX, SVGDeltaY) {
          let nextValue = pan(this.getValue(), SVGDeltaX, SVGDeltaY);
          this.setValue(nextValue);
        }
        zoom(SVGPointX, SVGPointY, scaleFactor) {
          let nextValue = zoom(this.getValue(), SVGPointX, SVGPointY, scaleFactor);
          this.setValue(nextValue);
        }
        fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
          let nextValue = fitSelection(this.getValue(), selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
          this.setValue(nextValue);
        }
        fitToViewer() {
          let SVGAlignX = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ALIGN_LEFT;
          let SVGAlignY = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ALIGN_TOP;
          let nextValue = fitToViewer(this.getValue(), SVGAlignX, SVGAlignY);
          this.setValue(nextValue);
        }
        zoomOnViewerCenter(scaleFactor) {
          let nextValue = zoomOnViewerCenter(this.getValue(), scaleFactor);
          this.setValue(nextValue);
        }
        setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
          let nextValue = setPointOnViewerCenter(this.getValue(), SVGPointX, SVGPointY, zoomLevel);
          this.setValue(nextValue);
        }
        reset() {
          let nextValue = reset(this.getValue());
          this.setValue(nextValue);
        }
        openMiniature() {
          let nextValue = openMiniature(this.getValue());
          this.setValue(nextValue);
        }
        closeMiniature() {
          let nextValue = closeMiniature(this.getValue());
          this.setValue(nextValue);
        }
        /** ReactSVGPanZoom internals **/
        handleViewerEvent(event) {
          let {
            props,
            ViewerDOM
          } = this;
          if (!([TOOL_NONE, TOOL_AUTO].indexOf(this.getTool()) >= 0)) return;
          if (event.target === ViewerDOM) return;
          let eventsHandler = {
            click: props.onClick,
            dblclick: props.onDoubleClick,
            mousemove: props.onMouseMove,
            mouseup: props.onMouseUp,
            mousedown: props.onMouseDown,
            touchstart: props.onTouchStart,
            touchmove: props.onTouchMove,
            touchend: props.onTouchEnd,
            touchcancel: props.onTouchCancel
          };
          let onEventHandler = eventsHandler[event.type];
          if (!onEventHandler) return;
          onEventHandler(eventFactory(event, props.value, ViewerDOM));
        }
        autoPanLoop() {
          let coords = {
            x: this.state.pointerX,
            y: this.state.pointerY
          };
          let nextValue = onInterval(null, this.ViewerDOM, this.getTool(), this.getValue(), this.props, coords);
          if (this.getValue() !== nextValue) {
            this.setValue(nextValue);
          }
          if (this.autoPanIsRunning) {
            requestAnimationFrame(this.autoPanLoop);
          }
        }
        onWheel(event) {
          let nextValue = onWheel(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
          if (this.getValue() !== nextValue) this.setValue(nextValue);
        }
        /** React renderer **/
        render() {
          let {
            props,
            state: {
              pointerX,
              pointerY
            }
          } = this;
          let tool = this.getTool();
          let value = this.getValue();
          let {
            customToolbar: CustomToolbar = Toolbar,
            customMiniature: CustomMiniature = Miniature
          } = props;
          let panningWithToolAuto = tool === TOOL_AUTO && value.mode === MODE_PANNING && value.startX !== value.endX && value.startY !== value.endY;
          let cursor;
          if (tool === TOOL_PAN) cursor = cursor_polyfill_default(value.mode === MODE_PANNING ? "grabbing" : "grab");
          if (tool === TOOL_ZOOM_IN) cursor = cursor_polyfill_default("zoom-in");
          if (tool === TOOL_ZOOM_OUT) cursor = cursor_polyfill_default("zoom-out");
          if (panningWithToolAuto) cursor = cursor_polyfill_default("grabbing");
          let blockChildEvents = [TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT].indexOf(tool) >= 0;
          blockChildEvents = blockChildEvents || panningWithToolAuto;
          const touchAction = this.props.detectPinchGesture || [TOOL_PAN, TOOL_AUTO].indexOf(this.getTool()) !== -1 ? "none" : void 0;
          const style = {
            display: "block",
            cursor,
            touchAction
          };
          return /* @__PURE__ */ import_react19.default.createElement("div", {
            style: _objectSpread6({
              position: "relative",
              width: value.viewerWidth,
              height: value.viewerHeight
            }, props.style),
            className: this.props.className
          }, /* @__PURE__ */ import_react19.default.createElement("svg", {
            ref: (ViewerDOM) => this.ViewerDOM = ViewerDOM,
            width: value.viewerWidth,
            height: value.viewerHeight,
            style,
            onMouseDown: (event) => {
              let nextValue = onMouseDown(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
              this.handleViewerEvent(event);
            },
            onMouseMove: (event) => {
              let {
                left,
                top
              } = this.ViewerDOM.getBoundingClientRect();
              let x = event.clientX - Math.round(left);
              let y = event.clientY - Math.round(top);
              let nextValue = onMouseMove(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props, {
                x,
                y
              });
              if (this.getValue() !== nextValue) this.setValue(nextValue);
              this.setState({
                pointerX: x,
                pointerY: y
              });
              this.handleViewerEvent(event);
            },
            onMouseUp: (event) => {
              let nextValue = onMouseUp(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
              this.handleViewerEvent(event);
            },
            onClick: (event) => {
              this.handleViewerEvent(event);
            },
            onDoubleClick: (event) => {
              let nextValue = onDoubleClick(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
              this.handleViewerEvent(event);
            },
            onMouseEnter: (event) => {
              if (isTouchDevice()) return;
              let nextValue = onMouseEnterOrLeave(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
            },
            onMouseLeave: (event) => {
              let nextValue = onMouseEnterOrLeave(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
            },
            onTouchStart: (event) => {
              let nextValue = onTouchStart(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
              this.handleViewerEvent(event);
            },
            onTouchMove: (event) => {
              let nextValue = onTouchMove(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
              this.handleViewerEvent(event);
            },
            onTouchEnd: (event) => {
              let nextValue = onTouchEnd(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
              this.handleViewerEvent(event);
            },
            onTouchCancel: (event) => {
              let nextValue = onTouchCancel(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
              if (this.getValue() !== nextValue) this.setValue(nextValue);
              this.handleViewerEvent(event);
            }
          }, /* @__PURE__ */ import_react19.default.createElement("rect", {
            fill: props.background,
            x: 0,
            y: 0,
            width: value.viewerWidth,
            height: value.viewerHeight,
            style: {
              pointerEvents: "none"
            }
          }), /* @__PURE__ */ import_react19.default.createElement("g", {
            transform: toSVG(value),
            style: blockChildEvents ? {
              pointerEvents: "none"
            } : {}
          }, /* @__PURE__ */ import_react19.default.createElement("rect", {
            fill: this.props.SVGBackground,
            style: this.props.SVGStyle,
            x: value.SVGMinX || 0,
            y: value.SVGMinY || 0,
            width: value.SVGWidth,
            height: value.SVGHeight
          }), /* @__PURE__ */ import_react19.default.createElement("g", null, props.children.props.children)), !([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0 && props.detectAutoPan && value.focus) ? null : /* @__PURE__ */ import_react19.default.createElement("g", {
            style: {
              pointerEvents: "none"
            }
          }, !(pointerY <= 20) ? null : /* @__PURE__ */ import_react19.default.createElement(border_gradient_default, {
            direction: POSITION_TOP,
            width: value.viewerWidth,
            height: value.viewerHeight
          }), !(value.viewerWidth - pointerX <= 20) ? null : /* @__PURE__ */ import_react19.default.createElement(border_gradient_default, {
            direction: POSITION_RIGHT,
            width: value.viewerWidth,
            height: value.viewerHeight
          }), !(value.viewerHeight - pointerY <= 20) ? null : /* @__PURE__ */ import_react19.default.createElement(border_gradient_default, {
            direction: POSITION_BOTTOM,
            width: value.viewerWidth,
            height: value.viewerHeight
          }), !(value.focus && pointerX <= 20) ? null : /* @__PURE__ */ import_react19.default.createElement(border_gradient_default, {
            direction: POSITION_LEFT,
            width: value.viewerWidth,
            height: value.viewerHeight
          })), !(value.mode === MODE_ZOOMING) ? null : /* @__PURE__ */ import_react19.default.createElement(Selection, {
            startX: value.startX,
            startY: value.startY,
            endX: value.endX,
            endY: value.endY
          })), props.toolbarProps.position === POSITION_NONE ? null : /* @__PURE__ */ import_react19.default.createElement(CustomToolbar, _extends3({}, this.props.toolbarProps, {
            value,
            onChangeValue: (value2) => this.setValue(value2),
            tool,
            onChangeTool: (tool2) => this.props.onChangeTool(tool2)
          })), props.miniatureProps.position === POSITION_NONE ? null : /* @__PURE__ */ import_react19.default.createElement(CustomMiniature, _extends3({}, this.props.miniatureProps, {
            value,
            onChangeValue: (value2) => this.setValue(value2),
            SVGBackground: this.props.SVGBackground
          }), props.children.props.children));
        }
      };
      ReactSVGPanZoom.propTypes = {
        /**************************************************************************/
        /*  Viewer configuration                                                  */
        /**************************************************************************/
        /**
         *   width of the viewer displayed on screen
         */
        width: import_prop_types10.default.number.isRequired,
        /**
        * height of the viewer displayed on screen
        */
        height: import_prop_types10.default.number.isRequired,
        /**
        * value of the viewer (current camera view)
        */
        value: import_prop_types10.default.oneOfType([import_prop_types10.default.object, import_prop_types10.default.shape({
          version: import_prop_types10.default.oneOf([2]).isRequired,
          mode: import_prop_types10.default.oneOf([MODE_IDLE, MODE_PANNING, MODE_ZOOMING]).isRequired,
          focus: import_prop_types10.default.bool.isRequired,
          a: import_prop_types10.default.number.isRequired,
          b: import_prop_types10.default.number.isRequired,
          c: import_prop_types10.default.number.isRequired,
          d: import_prop_types10.default.number.isRequired,
          e: import_prop_types10.default.number.isRequired,
          f: import_prop_types10.default.number.isRequired,
          viewerWidth: import_prop_types10.default.number.isRequired,
          viewerHeight: import_prop_types10.default.number.isRequired,
          SVGMinX: import_prop_types10.default.number.isRequired,
          SVGMinY: import_prop_types10.default.number.isRequired,
          SVGWidth: import_prop_types10.default.number.isRequired,
          SVGHeight: import_prop_types10.default.number.isRequired,
          startX: import_prop_types10.default.number,
          startY: import_prop_types10.default.number,
          endX: import_prop_types10.default.number,
          endY: import_prop_types10.default.number,
          miniatureOpen: import_prop_types10.default.bool.isRequired
        })]).isRequired,
        /**
        * handler something changed
        */
        onChangeValue: import_prop_types10.default.func.isRequired,
        /**
        * current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
        */
        tool: import_prop_types10.default.oneOf([TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]).isRequired,
        /**
        * handler tool changed
        */
        onChangeTool: import_prop_types10.default.func.isRequired,
        /**************************************************************************/
        /* Customize style                                                        */
        /**************************************************************************/
        /**
        * background of the viewer
        */
        background: import_prop_types10.default.string,
        /**
        * background of the svg
        */
        SVGBackground: import_prop_types10.default.string,
        /**
        * style of the svg
        */
        SVGStyle: import_prop_types10.default.object,
        /**
        * CSS style of the Viewer
        */
        style: import_prop_types10.default.object,
        /**
        * className of the Viewer
        */
        className: import_prop_types10.default.string,
        /**************************************************************************/
        /* Detect events                                                          */
        /**************************************************************************/
        /**
        * perform zoom operation on mouse scroll
        */
        detectWheel: import_prop_types10.default.bool,
        /**
        * perform PAN if the mouse is on viewer border
        */
        detectAutoPan: import_prop_types10.default.bool,
        /**
        * perform zoom operation on pinch gesture
        */
        detectPinchGesture: import_prop_types10.default.bool,
        /**
        * handler zoom level changed
        */
        onZoom: import_prop_types10.default.func,
        /**
        * handler pan action performed
        */
        onPan: import_prop_types10.default.func,
        /**
        * handler click
        */
        onClick: import_prop_types10.default.func,
        /**
        * handler double click
        */
        onDoubleClick: import_prop_types10.default.func,
        /**
        * handler mouseup
        */
        onMouseUp: import_prop_types10.default.func,
        /**
        * handler mousemove
        */
        onMouseMove: import_prop_types10.default.func,
        /**
        * handler mousedown
        */
        onMouseDown: import_prop_types10.default.func,
        /**************************************************************************/
        /* Some advanced configurations                                           */
        /**************************************************************************/
        /**
        * if disabled the user can move the image outside the viewer
        */
        preventPanOutside: import_prop_types10.default.bool,
        /**
        * how much scale in or out
        */
        scaleFactor: import_prop_types10.default.number,
        /**
        * how much scale in or out on mouse wheel (requires detectWheel enabled)
        */
        scaleFactorOnWheel: import_prop_types10.default.number,
        /**
        * maximum amount of scale a user can zoom in to
        */
        scaleFactorMax: import_prop_types10.default.number,
        /**
        * minimum amount of a scale a user can zoom out of
        */
        scaleFactorMin: import_prop_types10.default.number,
        /**
        * modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
        */
        modifierKeys: import_prop_types10.default.array,
        /**
        * Turn off zoom on double click
        */
        disableDoubleClickZoomWithToolAuto: import_prop_types10.default.bool,
        /**************************************************************************/
        /* Miniature configurations                                                 */
        /**************************************************************************/
        /**
        * override miniature component
        */
        customMiniature: import_prop_types10.default.oneOfType([import_prop_types10.default.element, import_prop_types10.default.func]),
        /**
        * miniature props
        */
        miniatureProps: import_prop_types10.default.shape({
          position: import_prop_types10.default.oneOf([POSITION_NONE, POSITION_RIGHT, POSITION_LEFT]),
          background: import_prop_types10.default.string,
          width: import_prop_types10.default.number,
          height: import_prop_types10.default.number
        }),
        /**************************************************************************/
        /* Toolbar configurations                                                 */
        /**************************************************************************/
        /**
        * override toolbar component
        */
        customToolbar: import_prop_types10.default.oneOfType([import_prop_types10.default.element, import_prop_types10.default.func]),
        /**
        * toolbar props
        */
        toolbarProps: import_prop_types10.default.shape({
          position: import_prop_types10.default.oneOf([POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),
          SVGAlignX: import_prop_types10.default.oneOf([ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
          SVGAlignY: import_prop_types10.default.oneOf([ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
          activeToolColor: import_prop_types10.default.string
        }),
        /**************************************************************************/
        /* Children Check                                                         */
        /**************************************************************************/
        /**
        * accept only one node SVG
        */
        children: function(props, propName, componentName) {
          let prop = props[propName];
          let types = ["svg"];
          if (import_react19.default.Children.count(prop) !== 1 || types.indexOf(prop.type) === -1) {
            return new Error("`" + componentName + "` should have a single child of the following types:  `" + types.join("`, `") + "`.");
          }
          if ((!prop.props.hasOwnProperty("width") || !prop.props.hasOwnProperty("height")) && !prop.props.hasOwnProperty("viewBox")) {
            return new Error("SVG should have props `width` and `height` or `viewBox`");
          }
        }
      };
      ReactSVGPanZoom.defaultProps = {
        style: {},
        background: "#616264",
        SVGBackground: "#fff",
        SVGStyle: {},
        detectWheel: true,
        detectAutoPan: true,
        detectPinchGesture: true,
        modifierKeys: ["Alt", "Shift", "Control"],
        preventPanOutside: true,
        scaleFactor: 1.1,
        scaleFactorOnWheel: 1.06,
        disableZoomWithToolAuto: false,
        onZoom: null,
        onPan: null,
        toolbarProps: {},
        miniatureProps: {}
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/uncontrolled-viewer.js
  function _extends4() {
    return _extends4 = Object.assign ? Object.assign.bind() : function(n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends4.apply(null, arguments);
  }
  function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (e.includes(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
  var import_react20, import_prop_types11, _excluded, UncontrolledReactSVGPanZoom;
  var init_uncontrolled_viewer = __esm({
    "node_modules/react-svg-pan-zoom/build-es/uncontrolled-viewer.js"() {
      import_react20 = __toESM(require_react());
      init_viewer();
      import_prop_types11 = __toESM(require_prop_types());
      init_constants();
      _excluded = ["width", "height", "onChangeTool", "onChangeValue"];
      UncontrolledReactSVGPanZoom = class extends import_react20.default.Component {
        constructor(props) {
          super(props);
          this.state = {
            value: props.defaultValue || {},
            tool: props.defaultTool || TOOL_NONE
          };
          this.Viewer = null;
          this.changeTool = this.changeTool.bind(this);
          this.changeValue = this.changeValue.bind(this);
        }
        changeTool(tool) {
          this.setState({
            tool
          });
        }
        changeValue(value) {
          this.setState({
            value
          });
        }
        pan(SVGDeltaX, SVGDeltaY) {
          this.Viewer.pan(SVGDeltaX, SVGDeltaY);
        }
        zoom(SVGPointX, SVGPointY, scaleFactor) {
          this.Viewer.zoom(SVGPointX, SVGPointY, scaleFactor);
        }
        fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
          this.Viewer.fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
        }
        fitToViewer(SVGAlignX, SVGAlignY) {
          this.Viewer.fitToViewer(SVGAlignX, SVGAlignY);
        }
        zoomOnViewerCenter(scaleFactor) {
          this.Viewer.zoomOnViewerCenter(scaleFactor);
        }
        setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
          this.Viewer.setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel);
        }
        reset() {
          this.Viewer.reset();
        }
        openMiniature() {
          this.Viewer.openMiniature();
        }
        closeMiniature() {
          this.Viewer.closeMiniature();
        }
        render() {
          const _this$props = this.props, {
            width,
            height,
            onChangeTool,
            onChangeValue
          } = _this$props, props = _objectWithoutProperties(_this$props, _excluded);
          const {
            tool,
            value
          } = this.state;
          return /* @__PURE__ */ import_react20.default.createElement(ReactSVGPanZoom, _extends4({
            width,
            height,
            tool,
            onChangeTool: this.changeTool,
            value,
            onChangeValue: this.changeValue,
            ref: (Viewer) => this.Viewer = Viewer
          }, props));
        }
      };
      UncontrolledReactSVGPanZoom.propTypes = {
        width: import_prop_types11.default.number.isRequired,
        height: import_prop_types11.default.number.isRequired,
        defaultValue: import_prop_types11.default.object,
        defaultTool: import_prop_types11.default.string
      };
    }
  });

  // node_modules/react-svg-pan-zoom/build-es/index.js
  var init_build_es = __esm({
    "node_modules/react-svg-pan-zoom/build-es/index.js"() {
      init_viewer();
      init_uncontrolled_viewer();
      init_toolbar();
      init_toolbar_button();
      init_icon_cursor();
      init_icon_pan();
      init_icon_fit();
      init_icon_zoom_in();
      init_icon_zoom_out();
      init_miniature2();
      init_common();
      init_pan();
      init_zoom();
      init_miniature();
      init_constants();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/utils/numbers.js
  var init_numbers = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/utils/numbers.js"() {
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/svg-viewer.js
  var import_jsx_runtime18, import_react21;
  var init_svg_viewer = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/svg-viewer.js"() {
      import_jsx_runtime18 = __toESM(require_jsx_runtime());
      import_react21 = __toESM(require_react());
      init_build_es();
      init_numbers();
    }
  });

  // node_modules/@g-loot/react-tournament-brackets/dist/esm/index.js
  var init_esm = __esm({
    "node_modules/@g-loot/react-tournament-brackets/dist/esm/index.js"() {
      init_single_elim_bracket();
      init_double_elim_bracket();
      init_match();
      init_match_states();
      init_svg_viewer();
      init_themes();
    }
  });

  // knockout-react.jsx
  var require_knockout_react = __commonJS({
    "knockout-react.jsx"() {
      var import_react22 = __toESM(require_react());
      var import_react_dom = __toESM(require_react_dom());
      init_esm();
      function loadState() {
        const brackets = JSON.parse(localStorage.getItem("bracket_brackets") || "[]");
        const scheduleScores = JSON.parse(localStorage.getItem("schedule_scores") || "[]");
        const knockoutState = JSON.parse(localStorage.getItem("knockout_state") || "{}\n");
        const koScores = JSON.parse(localStorage.getItem("ko_scores") || "{}\n");
        const numPlayers = parseInt(localStorage.getItem("bracket_numPlayers") || "0", 10);
        const numCourts = parseInt(localStorage.getItem("bracket_numCourts") || "0", 10);
        return { brackets, scheduleScores, knockoutState, koScores, numPlayers, numCourts };
      }
      function getBXHAll(brackets, scheduleScores) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const bxhs = [];
        brackets.forEach((bracket, idx) => {
          const n = bracket.players.length;
          const rows = bracket.players.map((p, i) => ({
            name: p.name,
            team: p.team,
            idx: i,
            bracketIdx: idx,
            win: 0,
            lose: 0,
            point: 0,
            scoreFor: 0,
            scoreAgainst: 0
          }));
          for (let i = 0; i < n; ++i) {
            for (let j = i + 1; j < n; ++j) {
              const match = scheduleScores.find((m) => {
                return (m.p1 === bracket.players[i].name && m.p2 === bracket.players[j].name || m.p2 === bracket.players[i].name && m.p1 === bracket.players[j].name) && m.bracket === alphabet[idx];
              });
              if (match && match.score1 !== "" && match.score2 !== "") {
                const s1 = Number(match.p1 === bracket.players[i].name ? match.score1 : match.score2);
                const s2 = Number(match.p2 === bracket.players[j].name ? match.score2 : match.score1);
                rows[i].scoreFor += s1;
                rows[i].scoreAgainst += s2;
                rows[j].scoreFor += s2;
                rows[j].scoreAgainst += s1;
                if (s1 > s2) {
                  rows[i].win++;
                  rows[j].lose++;
                  rows[i].point++;
                } else if (s2 > s1) {
                  rows[j].win++;
                  rows[i].lose++;
                  rows[j].point++;
                }
              }
            }
          }
          rows.sort((a, b) => {
            return b.point - a.point || b.scoreFor - b.scoreAgainst - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor;
          });
          bxhs.push(rows);
        });
        return bxhs;
      }
      function getKOPlayers(brackets, scheduleScores, numTeams) {
        const bxhs = getBXHAll(brackets, scheduleScores);
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const nBrackets = brackets.length;
        const totalPlayers = bxhs.reduce((a, b) => a + b.length, 0);
        function annotate(arr, bracketIdx, labels) {
          return arr.map((row, i2) => {
            return {
              name: row.name,
              team: row.team,
              pos: labels[i2] || "",
              bracket: alphabet[bracketIdx],
              point: row.point,
              scoreFor: row.scoreFor,
              scoreAgainst: row.scoreAgainst
            };
          });
        }
        if (nBrackets === 2) {
          if (numTeams === 4) {
            return [
              ...annotate(bxhs[0].slice(0, 2), 0, ["Nh\u1EA5t", "Nh\xEC"]),
              ...annotate(bxhs[1].slice(0, 2), 1, ["Nh\u1EA5t", "Nh\xEC"])
            ];
          }
          if (numTeams === 8) {
            return [
              ...annotate(bxhs[0].slice(0, 4), 0, ["Nh\u1EA5t", "Nh\xEC", "Ba", "T\u01B0"]),
              ...annotate(bxhs[1].slice(0, 4), 1, ["Nh\u1EA5t", "Nh\xEC", "Ba", "T\u01B0"])
            ];
          }
        }
        if (nBrackets === 3) {
          if (numTeams === 4) {
            const nhats = [0, 1, 2].map((i2) => ({ ...bxhs[i2][0], bracket: alphabet[i2], pos: "Nh\u1EA5t", bx: i2 }));
            nhats.sort((a, b) => b.point - a.point || b.scoreFor - b.scoreAgainst - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
            const nhis = [0, 1, 2].map((i2) => ({ ...bxhs[i2][1], bracket: alphabet[i2], pos: "Nh\xEC", bx: i2 }));
            nhis.sort((a, b) => b.point - a.point || b.scoreFor - b.scoreAgainst - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
            const c1_p1 = nhats[0];
            const c1_p2 = nhis.find((n) => n.bx !== c1_p1.bx) || nhis[0];
            const leftNhats = nhats.filter((n) => n.name !== c1_p1.name);
            return [c1_p1, c1_p2, leftNhats[0], leftNhats[1]];
          }
          if (numTeams === 8) {
            const nhats = [0, 1, 2].map((i2) => ({ ...bxhs[i2][0], bracket: alphabet[i2], pos: "Nh\u1EA5t" }));
            const nhis = [0, 1, 2].map((i2) => ({ ...bxhs[i2][1], bracket: alphabet[i2], pos: "Nh\xEC" }));
            const bas = [0, 1, 2].map((i2) => ({ ...bxhs[i2][2], bracket: alphabet[i2], pos: "Ba" }));
            bas.sort((a, b) => b.point - a.point || b.scoreFor - b.scoreAgainst - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
            const best3 = [bas[0], bas[1]];
            let pairs = [];
            const used = /* @__PURE__ */ new Set();
            for (const n1 of nhats) {
              const ba = best3.find((b) => !used.has(b.name) && b.bracket !== n1.bracket);
              if (ba) {
                pairs.push(n1, ba);
                used.add(n1.name);
                used.add(ba.name);
              } else {
                const nhi = nhis.find((n) => !used.has(n.name) && n.bracket !== n1.bracket);
                if (nhi) {
                  pairs.push(n1, nhi);
                  used.add(n1.name);
                  used.add(nhi.name);
                }
              }
            }
            const allPlayers = [...nhats, ...nhis, ...best3];
            const remain = allPlayers.filter((p) => !used.has(p.name));
            for (let i2 = 0; i2 < remain.length; i2 += 2) {
              if (remain[i2 + 1]) {
                pairs.push(remain[i2], remain[i2 + 1]);
              }
            }
            return pairs;
          }
        }
        if (nBrackets === 4) {
          if (numTeams === 4) {
            return [
              { ...bxhs[0][0], bracket: alphabet[0], pos: "Nh\u1EA5t" },
              { ...bxhs[1][0], bracket: alphabet[1], pos: "Nh\u1EA5t" },
              { ...bxhs[2][0], bracket: alphabet[2], pos: "Nh\u1EA5t" },
              { ...bxhs[3][0], bracket: alphabet[3], pos: "Nh\u1EA5t" }
            ];
          }
          if (numTeams === 8) {
            const result = [];
            for (let i2 = 0; i2 < 4; i2++) {
              result.push({ ...bxhs[i2][0], bracket: alphabet[i2], pos: "Nh\u1EA5t" });
              result.push({ ...bxhs[i2][1], bracket: alphabet[i2], pos: "Nh\xEC" });
            }
            return result;
          }
          if (numTeams === 16) {
            const result = [];
            for (let i2 = 0; i2 < 4; i2++) {
              result.push(
                { ...bxhs[i2][0], bracket: alphabet[i2], pos: "Nh\u1EA5t" },
                { ...bxhs[i2][1], bracket: alphabet[i2], pos: "Nh\xEC" },
                { ...bxhs[i2][2], bracket: alphabet[i2], pos: "Ba" },
                { ...bxhs[i2][3], bracket: alphabet[i2], pos: "T\u01B0" }
              );
            }
            return result;
          }
        }
        const flat = [];
        let i = 0;
        while (flat.length < numTeams) {
          for (let b = 0; b < bxhs.length; b++) {
            if (bxhs[b][i]) {
              flat.push({ ...bxhs[b][i], bracket: alphabet[b], pos: `${i + 1}` });
              if (flat.length === numTeams) break;
            }
          }
          i++;
        }
        return flat;
      }
      function genKOMatches(brackets, scheduleScores, numTeams) {
        const koPlayers = getKOPlayers(brackets, scheduleScores, numTeams);
        const nBrackets = brackets.length;
        const matches = [];
        if (nBrackets === 2 && numTeams === 4) {
          const A = koPlayers.filter((x) => x.bracket === "A");
          const B = koPlayers.filter((x) => x.bracket === "B");
          matches.push({ p1: A[0], p2: B[1], desc: "Nh\u1EA5t A - Nh\xEC B" });
          matches.push({ p1: B[0], p2: A[1], desc: "Nh\u1EA5t B - Nh\xEC A" });
        } else if (nBrackets === 2 && numTeams === 8) {
          const A = koPlayers.filter((x) => x.bracket === "A");
          const B = koPlayers.filter((x) => x.bracket === "B");
          matches.push({ p1: A[0], p2: B[3], desc: "Nh\u1EA5t A - T\u01B0 B" });
          matches.push({ p1: A[1], p2: B[2], desc: "Nh\xEC A - Ba B" });
          matches.push({ p1: B[0], p2: A[3], desc: "Nh\u1EA5t B - T\u01B0 A" });
          matches.push({ p1: B[1], p2: A[2], desc: "Nh\xEC B - Ba A" });
        } else if (nBrackets === 3 && numTeams === 4) {
          matches.push({ p1: koPlayers[0], p2: koPlayers[1], desc: `${koPlayers[0].pos} ${koPlayers[0].bracket} - ${koPlayers[1].pos} ${koPlayers[1].bracket}` });
          matches.push({ p1: koPlayers[2], p2: koPlayers[3], desc: `${koPlayers[2].pos} ${koPlayers[2].bracket} - ${koPlayers[3].pos} ${koPlayers[3].bracket}` });
        } else if (nBrackets === 3 && numTeams === 8) {
          for (let i = 0; i < 8; i += 2) {
            matches.push({ p1: koPlayers[i], p2: koPlayers[i + 1], desc: `${koPlayers[i].pos} ${koPlayers[i].bracket} - ${koPlayers[i + 1].pos} ${koPlayers[i + 1].bracket}` });
          }
        } else if (nBrackets === 4 && numTeams === 4) {
          matches.push({ p1: koPlayers[0], p2: koPlayers[2], desc: "Nh\u1EA5t A - Nh\u1EA5t C" });
          matches.push({ p1: koPlayers[1], p2: koPlayers[3], desc: "Nh\u1EA5t B - Nh\u1EA5t D" });
        } else if (nBrackets === 4 && numTeams === 8) {
          const A = koPlayers.filter((x) => x.bracket === "A");
          const B = koPlayers.filter((x) => x.bracket === "B");
          const C = koPlayers.filter((x) => x.bracket === "C");
          const D = koPlayers.filter((x) => x.bracket === "D");
          matches.push({ p1: A[0], p2: B[1], desc: "Nh\u1EA5t A - Nh\xEC B" });
          matches.push({ p1: C[0], p2: D[1], desc: "Nh\u1EA5t C - Nh\xEC D" });
          matches.push({ p1: B[0], p2: A[1], desc: "Nh\u1EA5t B - Nh\xEC A" });
          matches.push({ p1: D[0], p2: C[1], desc: "Nh\u1EA5t D - Nh\xEC C" });
        } else if (nBrackets === 4 && numTeams === 16) {
          for (let i = 0; i < 16; i += 2) {
            matches.push({ p1: koPlayers[i], p2: koPlayers[15 - i], desc: "" });
          }
        } else if (nBrackets === 5 && numTeams === 8) {
          for (let i = 0; i < 8; i += 2) {
            matches.push({ p1: koPlayers[i], p2: koPlayers[i + 1], desc: `${koPlayers[i].pos} ${koPlayers[i].bracket} - ${koPlayers[i + 1].pos} ${koPlayers[i + 1].bracket}` });
          }
        } else if (nBrackets === 5 && numTeams === 16) {
          for (let i = 0; i < 16; i += 2) {
            matches.push({ p1: koPlayers[i], p2: koPlayers[i + 1], desc: `${koPlayers[i].pos} ${koPlayers[i].bracket} - ${koPlayers[i + 1].pos} ${koPlayers[i + 1].bracket}` });
          }
        } else {
          for (let i = 0; i < koPlayers.length; i += 2) {
            if (koPlayers[i + 1]) matches.push({ p1: koPlayers[i], p2: koPlayers[i + 1], desc: "" });
          }
        }
        return matches;
      }
      function getKoResult(koScores, matchId) {
        return koScores[matchId] || { score1: "", score2: "" };
      }
      function getWinner(p1, p2, result) {
        if (!p1 || !p2) return null;
        const s1 = result.score1 === "" ? null : Number(result.score1);
        const s2 = result.score2 === "" ? null : Number(result.score2);
        if (s1 === null || s2 === null) return null;
        if (s1 > s2) return p1;
        if (s2 > s1) return p2;
        return null;
      }
      function buildBracketMatches(brackets, scheduleScores, koScores, numTeams) {
        const round0 = genKOMatches(brackets, scheduleScores, numTeams);
        const totalRounds = Math.ceil(Math.log2(round0.length * 2));
        const roundLabelsMap = {
          4: ["V\xF2ng 1/8", "T\u1EE9 k\u1EBFt", "B\xE1n k\u1EBFt", "Chung k\u1EBFt"],
          3: ["T\u1EE9 k\u1EBFt", "B\xE1n k\u1EBFt", "Chung k\u1EBFt"],
          2: ["B\xE1n k\u1EBFt", "Chung k\u1EBFt"],
          1: ["Chung k\u1EBFt"]
        };
        const roundLabels = roundLabelsMap[totalRounds] || [];
        const rounds = [];
        rounds.push(round0.map((m, i) => {
          return { p1: m.p1, p2: m.p2, desc: m.desc, matchId: `R0_${i}` };
        }));
        for (let r = 1; r < totalRounds; r++) {
          const prev = rounds[r - 1];
          const next = [];
          for (let i = 0; i < prev.length; i += 2) {
            const matchId1 = prev[i].matchId;
            const matchId2 = prev[i + 1] ? prev[i + 1].matchId : null;
            const winner1 = getWinner(prev[i].p1, prev[i].p2, getKoResult(koScores, matchId1));
            const winner2 = matchId2 ? getWinner(prev[i + 1].p1, prev[i + 1].p2, getKoResult(koScores, matchId2)) : null;
            const label = matchId2 ? `Th\u1EAFng ${roundLabels[r - 1]} ${i + 1}` : "Bye";
            next.push({ p1: winner1 || { name: label }, p2: winner2 || { name: label }, desc: "", matchId: `R${r}_${Math.floor(i / 2)}` });
          }
          rounds.push(next);
        }
        const matches = [];
        for (let r = 0; r < rounds.length; r++) {
          const round = rounds[r];
          for (let i = 0; i < round.length; i++) {
            const match = round[i];
            let nextMatchId = null;
            if (r < rounds.length - 1) {
              nextMatchId = rounds[r + 1][Math.floor(i / 2)].matchId;
            }
            const res = getKoResult(koScores, match.matchId);
            const participants = [];
            if (match.p1) {
              participants.push({
                id: `${match.matchId}_p1`,
                name: match.p1.name,
                resultText: res.score1 || null,
                isWinner: res.score1 !== "" && res.score2 !== "" && Number(res.score1) > Number(res.score2),
                status: res.score1 === "" || res.score2 === "" ? null : "PLAYED"
              });
            } else {
              participants.push({ id: `${match.matchId}_p1`, name: "TBD", resultText: null, isWinner: false, status: null });
            }
            if (match.p2) {
              participants.push({
                id: `${match.matchId}_p2`,
                name: match.p2.name,
                resultText: res.score2 || null,
                isWinner: res.score1 !== "" && res.score2 !== "" && Number(res.score2) > Number(res.score1),
                status: res.score1 === "" || res.score2 === "" ? null : "PLAYED"
              });
            } else {
              participants.push({ id: `${match.matchId}_p2`, name: "TBD", resultText: null, isWinner: false, status: null });
            }
            matches.push({
              id: match.matchId,
              name: `Match ${match.matchId}`,
              nextMatchId,
              nextLooserMatchId: null,
              tournamentRoundText: roundLabels[r] || "",
              startTime: null,
              state: res.score1 === "" || res.score2 === "" ? "SCHEDULED" : "SCORE_DONE",
              participants
            });
          }
        }
        return matches;
      }
      function KnockoutBracket() {
        const [matches, setMatches] = (0, import_react22.useState)([]);
        const [numTeams, setNumTeams] = (0, import_react22.useState)(() => {
          const state = JSON.parse(localStorage.getItem("knockout_state") || "{}");
          return state.numTeams || 4;
        });
        (0, import_react22.useEffect)(() => {
          const handler = () => {
            const { brackets, scheduleScores, koScores } = loadState();
            const m = buildBracketMatches(brackets, scheduleScores, koScores, numTeams);
            setMatches(m);
          };
          handler();
          window.addEventListener("storage", handler);
          return () => window.removeEventListener("storage", handler);
        }, [numTeams]);
        const theme = createTheme({
          textColor: "#374151",
          matchBackground: "#f9fafb",
          borderRadius: 8,
          score: {
            background: "#e5e7eb",
            color: "#374151"
          },
          connector: {
            color: "#9ca3af",
            thickness: 1
          }
        });
        return /* @__PURE__ */ import_react22.default.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ import_react22.default.createElement(
          single_elim_bracket_default,
          {
            matches,
            theme,
            onMatchClick: () => {
            }
          }
        ));
      }
      document.addEventListener("DOMContentLoaded", () => {
        const root = document.getElementById("koBracketReact");
        if (root) {
          import_react_dom.default.render(/* @__PURE__ */ import_react22.default.createElement(KnockoutBracket, null), root);
        }
      });
    }
  });
  return require_knockout_react();
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.development.js:
  (**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

merge-anything/dist/index.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
