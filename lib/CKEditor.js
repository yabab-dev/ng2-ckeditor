'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5; // Imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CKEditor = undefined;

var _core = require('angular2/core');

var _common = require('angular2/common');

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
 * <ckeditor [(ngModel)]="data" [config]="{...}" configFile="file.js"></ckeditor>
 */
var CKEditor = exports.CKEditor = (_dec = (0, _core.Component)({
    selector: 'ckeditor',
    template: '<textarea #host></textarea>\n    <button (click)="hackUpdate($event)" #button></button>'
}), _dec2 = Reflect.metadata('parameters', [null, [new _core.OptionalMetadata()]]), _dec3 = (0, _core.Input)(), _dec4 = (0, _core.Input)(), _dec5 = (0, _core.Output)(), _dec6 = (0, _core.ViewChild)('host'), _dec7 = (0, _core.ViewChild)('button'), _dec(_class = _dec2(_class = (_class2 = function () {

    /**
     * Constructor
     */

    function CKEditor(elementRef, ngControl) {
        _classCallCheck(this, CKEditor);

        _initDefineProp(this, 'config', _descriptor, this);

        _initDefineProp(this, 'configFile', _descriptor2, this);

        _initDefineProp(this, 'change', _descriptor3, this);

        _initDefineProp(this, 'host', _descriptor4, this);

        _initDefineProp(this, 'button', _descriptor5, this);

        this.value = '';
        this.instance = null;
        this.ngControl = this.ngControl;
        this._buttonEl = this._buttonEl;

        if (ngControl) {
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
    }

    /**
     * On component destroy
     */

    // Hack button

    _createClass(CKEditor, [{
        key: 'ngOnDestroy',
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
            var _this = this;

            // Configuration
            var config = {};

            // Fetch file
            if (this.configFile) {

                if (System && System.import) {
                    System.import(this.configFile).then(function (res) {
                        _this.ckeditorInit(res.config);
                    });
                }

                // Config object
            } else {
                    config = this.config || {};
                    this.ckeditorInit(config);
                }
        }

        /**
         * CKEditor init
         */

    }, {
        key: 'ckeditorInit',
        value: function ckeditorInit(config) {
            var _this2 = this;

            // CKEditor replace textarea
            this.instance = CKEDITOR.replace(this.host._appElement.nativeElement, config);

            // Hide hack button
            this._buttonEl = this.button._appElement.nativeElement;
            this._buttonEl.style.display = 'none';

            // Set initial value
            this.instance.setData(this.value);

            // Change event
            this.instance.on('change', function () {
                var value = _this2.instance.getData();

                // This doesn't work ???
                /*this.onChange( value );
                this.change.emit( value );
                this.ngControl.viewToModelUpdate(value);*/

                // Hack
                _this2._buttonEl.dispatchEvent(new Event('click'));
            });
        }

        /**
         * Hack to update model
         */

    }, {
        key: 'hackUpdate',
        value: function hackUpdate() {
            if (this.instance) {
                var value = this.instance.getData();
                this.ngControl.viewToModelUpdate(value);
                //this.onChange( value );
                this.change.emit(value);
            }
        }

        /**
         * Implements ControlValueAccessor
         */

    }, {
        key: 'writeValue',
        value: function writeValue(value) {
            this.value = value;
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
    }]);

    return CKEditor;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'config', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return this.config;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'configFile', [_dec4], {
    enumerable: true,
    initializer: function initializer() {
        return this.configFile;
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'change', [_dec5], {
    enumerable: true,
    initializer: function initializer() {
        return new _core.EventEmitter();
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'host', [_dec6], {
    enumerable: true,
    initializer: function initializer() {
        return this.host;
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'button', [_dec7], {
    enumerable: true,
    initializer: function initializer() {
        return this.button;
    }
})), _class2)) || _class) || _class);
Reflect.defineMetadata('design:paramtypes', [_core.ElementRef, _common.NgControl], CKEditor);
//# sourceMappingURL=CKEditor.js.map
