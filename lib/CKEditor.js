'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CKEditorModule = exports.CKEditorComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _dec8, _class4; // Imports


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

/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
var CKEditorComponent = exports.CKEditorComponent = (_dec = (0, _core.Component)({
  selector: 'ckeditor',
  providers: [{
    provide: _forms.NG_VALUE_ACCESSOR,
    useExisting: (0, _core.forwardRef)(function () {
      return CKEditorComponent;
    }),
    multi: true
  }],
  template: '<textarea #host></textarea>'
}), _dec2 = (0, _core.Input)(), _dec3 = (0, _core.Input)(), _dec4 = (0, _core.Output)(), _dec5 = (0, _core.Output)(), _dec6 = (0, _core.ViewChild)('host'), _dec7 = (0, _core.Input)(), _dec(_class = (_class2 = function () {

  /**
   * Constructor
   */
  function CKEditorComponent(zone) {
    _classCallCheck(this, CKEditorComponent);

    _initDefineProp(this, 'config', _descriptor, this);

    _initDefineProp(this, 'debounce', _descriptor2, this);

    _initDefineProp(this, 'change', _descriptor3, this);

    _initDefineProp(this, 'ready', _descriptor4, this);

    _initDefineProp(this, 'host', _descriptor5, this);

    this._value = '';
    this.instance = this.instance;
    this.debounceTimeout = this.debounceTimeout;
    this.zone = this.zone;

    this.zone = zone;
  }

  _createClass(CKEditorComponent, [{
    key: 'ngOnDestroy',


    /**
     * On component destroy
     */
    value: function ngOnDestroy() {
      var _this = this;

      if (this.instance) {
        setTimeout(function () {
          _this.instance.removeAllListeners();
          _this.instance.destroy();
          _this.instance = null;
        });
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
      var _this2 = this;

      this.zone.run(function () {
        _this2.value = value;

        _this2.onChange(value);

        _this2.onTouched();
        _this2.change.emit(value);
      });
    }

    /**
     * CKEditor init
     */

  }, {
    key: 'ckeditorInit',
    value: function ckeditorInit(config) {
      var _this3 = this;

      if (!CKEDITOR) {
        console.error('Please include CKEditor in your page');
        return;
      }

      // CKEditor replace textarea
      this.instance = CKEDITOR.replace(this.host.nativeElement, config);

      // Set initial value
      this.instance.setData(this.value);

      // listen for instanceReady event
      this.instance.on('instanceReady', function (evt) {
        // send the evt to the EventEmitter
        _this3.ready.emit(evt);
      });

      // CKEditor change event
      this.instance.on('change', function () {
        _this3.onTouched();
        var value = _this3.instance.getData();

        // Debounce update
        if (_this3.debounce) {
          if (_this3.debounceTimeout) clearTimeout(_this3.debounceTimeout);
          _this3.debounceTimeout = setTimeout(function () {
            _this3.updateValue(value);
            _this3.debounceTimeout = null;
          }, parseInt(_this3.debounce));

          // Live update
        } else {
          _this3.updateValue(value);
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
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(v) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }
  }]);

  return CKEditorComponent;
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'ready', [_dec5], {
  enumerable: true,
  initializer: function initializer() {
    return new _core.EventEmitter();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'host', [_dec6], {
  enumerable: true,
  initializer: function initializer() {
    return this.host;
  }
}), _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class);

/**
 * CKEditorModule
 */

Reflect.defineMetadata('design:paramtypes', [_core.NgZone], CKEditorComponent);
var CKEditorModule = exports.CKEditorModule = (_dec8 = (0, _core.NgModule)({
  declarations: [CKEditorComponent],
  exports: [CKEditorComponent]
}), _dec8(_class4 = function CKEditorModule() {
  _classCallCheck(this, CKEditorModule);
}) || _class4);
//# sourceMappingURL=CKEditor.js.map
