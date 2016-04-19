'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CKEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5; // Imports


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
    template: '<textarea #host></textarea>'
}), _dec2 = Reflect.metadata('parameters', [null, [new _core.OptionalMetadata()]]), _dec3 = (0, _core.Input)(), _dec4 = (0, _core.Input)(), _dec5 = (0, _core.Output)(), _dec6 = (0, _core.ViewChild)('host'), _dec7 = (0, _core.ViewChild)('button'), _dec(_class = _dec2(_class = (_class2 = function () {

    /**
     * Constructor
     */

    function CKEditor(elementRef, ngControl, zone) {
        _classCallCheck(this, CKEditor);

        _initDefineProp(this, 'config', _descriptor, this);

        _initDefineProp(this, 'configFile', _descriptor2, this);

        _initDefineProp(this, 'change', _descriptor3, this);

        _initDefineProp(this, 'host', _descriptor4, this);

        _initDefineProp(this, 'button', _descriptor5, this);

        this.value = '';
        this.instance = null;
        this.ngControl = this.ngControl;
        this.zone = this.zone;

        if (ngControl) {
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }

        this.zone = zone;
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
         * CKEditor init
         */

    }, {
        key: 'ckeditorInit',
        value: function ckeditorInit(config) {
            var _this2 = this;

            // CKEditor replace textarea
            this.instance = CKEDITOR.replace(this.host._appElement.nativeElement, config);

            // Set initial value
            this.instance.setData(this.value);

            // Change event
            this.instance.on('change', function () {
                _this2.zone.run(function () {
                    var value = _this2.instance.getData();
                    _this2.change.emit(value);
                    _this2.ngControl.viewToModelUpdate(value);
                });
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
Reflect.defineMetadata('design:paramtypes', [_core.ElementRef, _common.NgControl, _core.NgZone], CKEditor);
//# sourceMappingURL=data:application/json;charset=utf8;base64,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ZmlsZSI6IkNLRWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBPcHRpb25hbCxcbiAgICBPcHRpb25hbE1ldGFkYXRhLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBOZ1pvbmVcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nQ29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5cbi8qKlxuICogQ0tFZGl0b3IgY29tcG9uZW50XG4gKiBVc2FnZSA6XG4gKiA8Y2tlZGl0b3IgWyhuZ01vZGVsKV09XCJkYXRhXCIgW2NvbmZpZ109XCJ7Li4ufVwiIGNvbmZpZ0ZpbGU9XCJmaWxlLmpzXCI+PC9ja2VkaXRvcj5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdja2VkaXRvcicsXG4gICAgdGVtcGxhdGU6IGA8dGV4dGFyZWEgI2hvc3Q+PC90ZXh0YXJlYT5gLFxufSlcbkBSZWZsZWN0Lm1ldGFkYXRhKCdwYXJhbWV0ZXJzJywgW251bGwsIFtuZXcgT3B0aW9uYWxNZXRhZGF0YSgpXV0pXG5leHBvcnQgY2xhc3MgQ0tFZGl0b3Ige1xuXG4gICAgQElucHV0KCkgY29uZmlnO1xuICAgIEBJbnB1dCgpIGNvbmZpZ0ZpbGU7XG5cbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBWaWV3Q2hpbGQoJ2hvc3QnKSBob3N0O1xuICAgIEBWaWV3Q2hpbGQoJ2J1dHRvbicpIGJ1dHRvbjtcblxuICAgIHZhbHVlID0gJyc7XG4gICAgaW5zdGFuY2UgPSBudWxsO1xuICAgIG5nQ29udHJvbDtcbiAgICB6b25lO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOkVsZW1lbnRSZWYsIG5nQ29udHJvbDpOZ0NvbnRyb2wsIHpvbmU6Tmdab25lKXtcbiAgICAgICAgaWYoIG5nQ29udHJvbCApe1xuICAgICAgICAgICAgbmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5uZ0NvbnRyb2wgPSBuZ0NvbnRyb2w7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGNvbXBvbmVudCBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKXtcbiAgICAgICAgaWYoIHRoaXMuaW5zdGFuY2UgKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGNvbXBvbmVudCB2aWV3IGluaXRcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICAgICAgLy8gQ29uZmlndXJhdGlvblxuICAgICAgICB2YXIgY29uZmlnID0ge307XG5cbiAgICAgICAgLy8gRmV0Y2ggZmlsZVxuICAgICAgICBpZiggdGhpcy5jb25maWdGaWxlICl7XG5cbiAgICAgICAgICAgIGlmKCBTeXN0ZW0gJiYgU3lzdGVtLmltcG9ydCApe1xuICAgICAgICAgICAgICAgIFN5c3RlbS5pbXBvcnQodGhpcy5jb25maWdGaWxlKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNrZWRpdG9ySW5pdCggcmVzLmNvbmZpZyApO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbmZpZyBvYmplY3RcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25maWcgPSB0aGlzLmNvbmZpZyB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMuY2tlZGl0b3JJbml0KCBjb25maWcgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENLRWRpdG9yIGluaXRcbiAgICAgKi9cbiAgICBja2VkaXRvckluaXQoIGNvbmZpZyApe1xuICAgICAgICAvLyBDS0VkaXRvciByZXBsYWNlIHRleHRhcmVhXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBDS0VESVRPUi5yZXBsYWNlKCB0aGlzLmhvc3QuX2FwcEVsZW1lbnQubmF0aXZlRWxlbWVudCwgY29uZmlnICk7XG5cbiAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5zZXREYXRhKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIC8vIENoYW5nZSBldmVudFxuICAgICAgICB0aGlzLmluc3RhbmNlLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmluc3RhbmNlLmdldERhdGEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KCB2YWx1ZSApO1xuICAgICAgICAgICAgICAgIHRoaXMubmdDb250cm9sLnZpZXdUb01vZGVsVXBkYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZSl7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYoIHRoaXMuaW5zdGFuY2UgKVxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zZXREYXRhKHZhbHVlKTtcbiAgICB9XG4gICAgb25DaGFuZ2UoXyl7fVxuICAgIG9uVG91Y2hlZCgpe31cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKXt0aGlzLm9uQ2hhbmdlID0gZm47fVxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKXt0aGlzLm9uVG91Y2hlZCA9IGZuO31cbn1cbiJdfQ==
