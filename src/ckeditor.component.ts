// Imports
import {
  Component,
  Input,
  Output,
  ElementRef,
  ViewChild,
  Optional,
  EventEmitter,
  NgZone,
  forwardRef,
  Renderer,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
@Component({
  selector: 'ckeditor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CKEditorComponent),
      multi: true
    }
  ],
  template: `<textarea #host></textarea>`,
})
export class CKEditorComponent {

  @Input() config;
  @Input() debounce;

  @Output() change = new EventEmitter();
  @Output() ready = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @ViewChild('host') host;

  _value = '';
  instance;
  debounceTimeout;
  zone;

  /**
   * Constructor
   */
  constructor(zone:NgZone) {
    this.zone = zone;
  }

  get value(): any { return this._value; };
  @Input() set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  /**
   * On component destroy
   */
  ngOnDestroy() {
    if (this.instance) {
      setTimeout(() => {
        this.instance.removeAllListeners();
        this.instance.destroy();
        this.instance = null;
      });
    }
  }

  /**
   * On component view init
   */
  ngAfterViewInit() {
    // Configuration
    this.ckeditorInit(this.config || {});
  }

  /**
   * Value update process
   */
  updateValue(value) {
    this.zone.run(() => {
      this.value = value;

      this.onChange(value);

      this.onTouched();
      this.change.emit(value);
    });
  }

  /**
   * CKEditor init
   */
  ckeditorInit(config) {
    if (!CKEDITOR) {
      console.error('Please include CKEditor in your page');
      return;
    }

    // CKEditor replace textarea
    this.instance = CKEDITOR.replace(this.host.nativeElement, config);

    // Set initial value
    this.instance.setData(this.value);

    // listen for instanceReady event
    this.instance.on('instanceReady', (evt) => {
      // send the evt to the EventEmitter
      this.ready.emit(evt);
    });

    // CKEditor change event
    this.instance.on('change', () => {
      this.onTouched();
      let value = this.instance.getData();

      // Debounce update
      if (this.debounce) {
        if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.updateValue(value);
          this.debounceTimeout = null;
        }, parseInt(this.debounce));

      // Live update
      }else {
        this.updateValue(value);
      }
    });

    // CKEditor blur event
    this.instance.on('blur', (evt) => {
      this.blur.emit(evt);
    });

    // CKEditor focus event
    this.instance.on('focus', (evt) => {
      this.focus.emit(evt);
    });
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value) {
    this._value = value;
    if (this.instance)
      this.instance.setData(value);
  }
  onChange(_) {}
  onTouched() {}
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }
}
