// Imports
import {
  Component,
  Input,
  Output,
  ElementRef,
  ViewChild,
  Optional,
  EventEmitter,
  NgZone
} from '@angular/core';
import {NgControl} from '@angular/forms';

/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
@Component({
  selector: 'ckeditor',
  template: `<textarea #host></textarea>`,
})
export class CKEditor {

  @Input() config;
  @Input() debounce;

  @Output() change = new EventEmitter();
  @ViewChild('host') host;

  value = '';
  instance;
  ngControl;
  renderer;
  debounceTimeout;
  zone;

  /**
   * Constructor
   */
  constructor(elementRef:ElementRef, zone:NgZone, @Optional() ngControl:NgControl){
    if (ngControl) {
      ngControl.valueAccessor = this;
      this.ngControl = ngControl;
    }
    this.zone = zone;
  }

  /**
   * On component destroy
   */
  ngOnDestroy(){
    if (this.instance) {
      this.instance.removeAllListeners();
      this.instance.destroy();
      this.instance = null;
    }
  }

  /**
   * On component view init
   */
  ngAfterViewInit(){
    // Configuration
    var config = this.config || {};
    this.ckeditorInit(config);
  }

  /**
   * Value change process
   */
  onValueChange(value){
    this.zone.run(() => {
      this.change.emit(value);
      if (this.ngControl) {
        this.ngControl.viewToModelUpdate(value);
      }
    });
  }

  /**
   * CKEditor init
   */
  ckeditorInit(config){
    if (!CKEDITOR) {
      console.error('Please include CKEditor in your page');
      return;
    }

    // CKEditor replace textarea
    this.instance = CKEDITOR.replace(this.host.nativeElement, config);

    // Set initial value
    this.instance.setData(this.value);

    // CKEditor change event
    this.instance.on('change', () => {
      let value = this.instance.getData();

      // Debounce update
      if (this.debounce) {
        if(this.debounceTimeout) clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.onValueChange(value);
          this.debounceTimeout = null;
        }, parseInt(this.debounce));

      // Live update
      }else{
        this.onValueChange(value);
      }
    });
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value){
    this.value = value;
    if (this.instance)
      this.instance.setData(value);
  }
  onChange(_){}
  onTouched(){}
  registerOnChange(fn){this.onChange = fn;}
  registerOnTouched(fn){this.onTouched = fn;}
}
