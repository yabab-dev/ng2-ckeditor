'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CKEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5; // Imports


var _core = require('@angular/core');

var _common = require('@angular/common');

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
    template: '<textarea #host (change)="onValueChange($event)"></textarea>'
}), _dec2 = Reflect.metadata('parameters', [null, [new _core.OptionalMetadata()]]), _dec3 = (0, _core.Input)(), _dec4 = (0, _core.Input)(), _dec5 = (0, _core.Input)(), _dec6 = (0, _core.Output)(), _dec7 = (0, _core.ViewChild)('host'), _dec(_class = _dec2(_class = (_class2 = function () {

    /**
     * Constructor
     */

    function CKEditor(elementRef, ngControl, renderer) {
        _classCallCheck(this, CKEditor);

        _initDefineProp(this, 'config', _descriptor, this);

        _initDefineProp(this, 'configFile', _descriptor2, this);

        _initDefineProp(this, 'ngModel', _descriptor3, this);

        _initDefineProp(this, 'change', _descriptor4, this);

        _initDefineProp(this, 'host', _descriptor5, this);

        this.value = '';
        this.instance = this.instance;
        this.ngControl = this.ngControl;
        this.renderer = this.renderer;

        if (ngControl) {
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
        this.renderer = renderer;
    }

    /**
     * On component destroy
     */


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
         * Detect textarea value change
         */

    }, {
        key: 'onValueChange',
        value: function onValueChange(event) {
            var value = this.host.nativeElement.value;
            this.change.emit(value);
            this.ngControl.viewToModelUpdate(value);
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
                _this2.renderer.setElementProperty(_this2.host.nativeElement, 'value', _this2.instance.getData());
                _this2.renderer.invokeElementMethod(_this2.host.nativeElement, 'dispatchEvent', [new Event('change')]);
            });
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
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'ngModel', [_dec5], {
    enumerable: true,
    initializer: function initializer() {
        return this.ngModel;
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'change', [_dec6], {
    enumerable: true,
    initializer: function initializer() {
        return new _core.EventEmitter();
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'host', [_dec7], {
    enumerable: true,
    initializer: function initializer() {
        return this.host;
    }
})), _class2)) || _class) || _class);
Reflect.defineMetadata('design:paramtypes', [_core.ElementRef, _common.NgControl, _core.Renderer], CKEditor);
//# sourceMappingURL=CKEditor.js.map
