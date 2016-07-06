'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CKEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4; // Imports


var _core = require('@angular/core');

var _forms = require('@angular/forms');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

// Control Value accessor provider
var CKEDITOR_CONTROL_VALUE_ACCESSOR = new _core.Provider(_forms.NG_VALUE_ACCESSOR, {
  useExisting: (0, _core.forwardRef)(function () {
    return CKEditor;
  }),
  multi: true
});

/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
var CKEditor = exports.CKEditor = (_dec = (0, _core.Component)({
  selector: 'ckeditor',
  providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR],
  template: '<textarea #host></textarea>'
}), _dec2 = (0, _core.Input)(), _dec3 = (0, _core.Input)(), _dec4 = (0, _core.Output)(), _dec5 = (0, _core.ViewChild)('host'), _dec6 = (0, _core.Input)(), _dec(_class = (_class2 = function () {

  /**
   * Constructor
   */

  function CKEditor(elementRef, zone) {
    _classCallCheck(this, CKEditor);

    _initDefineProp(this, 'config', _descriptor, this);

    _initDefineProp(this, 'debounce', _descriptor2, this);

    _initDefineProp(this, 'change', _descriptor3, this);

    _initDefineProp(this, 'host', _descriptor4, this);

    this._value = '';
    this.instance = this.instance;
    this.debounceTimeout = this.debounceTimeout;
    this.zone = this.zone;

    this.zone = zone;
  }

  _createClass(CKEditor, [{
    key: 'ngOnDestroy',


    /**
     * On component destroy
     */
    value: function ngOnDestroy() {
      if (this.instance) {
        this.instance.removeAllListeners();
        this.instance.destroy();
        this.instance = null;
      }
    }

    /**
     * On component view init
     */

  }, {
    key: 'ngAfterViewInit',
    value: function ngAfterViewInit() {
      // Configuration
      var config = this.config || {};
      this.ckeditorInit(config);
    }

    /**
     * Value update process
     */

  }, {
    key: 'updateValue',
    value: function updateValue(value) {
      var _this = this;

      this.zone.run(function () {
        _this.value = value;

        _this.onChange(value);

        _this._onTouchedCallback();
        _this.change.emit(value);
      });
    }

    /**
     * CKEditor init
     */

  }, {
    key: 'ckeditorInit',
    value: function ckeditorInit(config) {
      var _this2 = this;

      if (!CKEDITOR) {
        console.error('Please include CKEditor in your page');
        return;
      }

      // CKEditor replace textarea
      this.instance = CKEDITOR.replace(this.host.nativeElement, config);

      // Set initial value
      this.instance.setData(this.value);

      // CKEditor change event
      this.instance.on('change', function () {
        _this2._onTouchedCallback();
        var value = _this2.instance.getData();

        // Debounce update
        if (_this2.debounce) {
          if (_this2.debounceTimeout) clearTimeout(_this2.debounceTimeout);
          _this2.debounceTimeout = setTimeout(function () {
            _this2.updateValue(value);
            _this2.debounceTimeout = null;
          }, parseInt(_this2.debounce));

          // Live update
        } else {
          _this2.updateValue(value);
        }
      });
    }

    /**
     * Implements ControlValueAccessor
     */

  }, {
    key: 'writeValue',
    value: function writeValue(value) {
      this._value = value;
      if (this.instance) this.instance.setData(value);
    }
  }, {
    key: 'onChange',
    value: function onChange(_) {}
  }, {
    key: 'onTouched',
    value: function onTouched() {}
  }, {
    key: 'registerOnChange',
    value: function registerOnChange(fn) {
      this.onChange = fn;
    }
  }, {
    key: 'registerOnTouched',
    value: function registerOnTouched(fn) {
      this.onTouched = fn;
    }
  }, {
    key: '_onChangeCallback',
    value: function _onChangeCallback(_) {}
  }, {
    key: '_onTouchedCallback',
    value: function _onTouchedCallback() {}
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(v) {
      if (v !== this._value) {
        this._value = v;
        this._onChangeCallback(v);
      }
    }
  }]);

  return CKEditor;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'config', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return this.config;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'debounce', [_dec3], {
  enumerable: true,
  initializer: function initializer() {
    return this.debounce;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'change', [_dec4], {
  enumerable: true,
  initializer: function initializer() {
    return new _core.EventEmitter();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'host', [_dec5], {
  enumerable: true,
  initializer: function initializer() {
    return this.host;
  }
}), _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class);
Reflect.defineMetadata('design:paramtypes', [_core.ElementRef, _core.NgZone], CKEditor);
//# sourceMappingURL=CKEditor.js.map
