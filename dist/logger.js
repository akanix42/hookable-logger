'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var suppressAllOutput = false;
var logFunctions = ['log', 'error', 'warn', 'info'];
var logger = {
  test: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(cb) {
      var result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              suppressAllOutput = true;
              _context.next = 3;
              return cb();

            case 3:
              result = _context.sent;

              suppressAllOutput = false;

              logFunctions.forEach(function (logFunction) {
                return logger[logFunction].removeAllHooks();
              });

              if (!result) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', result);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function test(_x) {
      return _ref.apply(this, arguments);
    }

    return test;
  }()
};

logger.logException = function logException(err) {
  logger.error(stringifyError(err, null, 2));

  /* stringifyError function from Bryan Larsen, http://stackoverflow.com/a/20405830/1090626 */
  function stringifyError(err, filter, space) {
    var plainObject = {};
    (0, _getOwnPropertyNames2.default)(err).forEach(function (key) {
      plainObject[key] = err[key];
    });
    return (0, _stringify2.default)(plainObject, filter, space);
  };
};

exports.default = logger;


logFunctions.forEach(function (logFunction) {
  return logger[logFunction] = generateOutputFunction(logFunction);
});

function generateOutputFunction(logFunction) {
  var hooks = [];
  var fn = function callLogFunction() {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var suppressMessage = hooks.some(function (hookFn) {
      return hookFn.apply(undefined, args) === false;
    });
    if (suppressAllOutput || suppressMessage) return;
    (_console = console)[logFunction].apply(_console, args);
  };
  fn.addHook = function (hookFn) {
    return hooks.push(hookFn);
  };
  fn.removeHook = function (hookFn) {
    return hooks.splice(hooks.indexOf(hookFn), 1);
  };
  fn.removeAllHooks = function () {
    return hooks.length = 0;
  };

  return fn;
}
//# sourceMappingURL=logger.js.map
