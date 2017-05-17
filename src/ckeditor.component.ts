// Imports
import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  NgZone,
  forwardRef,
  QueryList,
  AfterViewInit,
  ContentChildren
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CKButtonDirective } from "./ckbutton.directive";
import { CKGroupDirective } from "./ckgroup.directive";

declare var CKEDITOR:any;

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
export class CKEditorComponent implements AfterViewInit {

  @Input() config: any;
  @Input() debounce: string;

  @Output() change = new EventEmitter();
  @Output() ready = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @ViewChild('host') host: any;
  @ContentChildren(CKButtonDirective) toolbarButtons: QueryList<CKButtonDirective>;
  @ContentChildren(CKGroupDirective) toolbarGroups: QueryList<CKGroupDirective>;

  _value = '';
  instance: any;
  debounceTimeout: any;
  zone: NgZone;

  /**
   * Constructor
   */
  constructor(zone:NgZone) {
    this.zone = zone;

  }

  get value(): any { return this._value; }
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
        CKEDITOR.instances[this.instance.name].destroy();
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
  updateValue(value: any) {
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
  ckeditorInit(config: any) {
    if (typeof CKEDITOR === 'undefined') {
      console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');

    } else {
      // CKEditor replace textarea
      this.instance = CKEDITOR.replace(this.host.nativeElement, config);

      // Set initial value
      this.instance.setData(this.value);

      // listen for instanceReady event
      this.instance.on('instanceReady', (evt: any) => {
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
      this.instance.on('blur', (evt: any) => {
        this.blur.emit(evt);
      });

      // CKEditor focus event
      this.instance.on('focus', (evt: any) => {
        this.focus.emit(evt);
      });

      // Add Toolbar Groups to Editor. This will also add Buttons within groups.
      this.toolbarGroups.forEach((group) => {
        group.initialize(this);
      });
      // Add Toolbar Buttons to Editor.
      this.toolbarButtons.forEach((button) => {
        button.initialize(this);
      });

    }
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value: any) {
    this._value = value;
    if (this.instance)
      this.instance.setData(value);
  }
  onChange(_: any) {}
  onTouched() {}
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
}
