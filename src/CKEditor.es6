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
  Provider,
  forwardRef,
  Renderer
} from '@angular/core';
import {NgControl, NG_VALUE_ACCESSOR} from '@angular/forms';

// Control Value accessor provider
const CKEDITOR_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR,
  {
    useExisting: forwardRef(() => CKEditor),
    multi: true
  }
);

/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
@Component({
  selector: 'ckeditor',
  providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR],
  template: `
  <div class="ng2-ckeditor">
    <textarea #host *ngIf="!config || !config.inline"></textarea>
    <div contenteditable="true" #hostInline *ngIf="config && config.inline">
      <ng-content></ng-content>
    </div>
  </div>
  `,
})
export class CKEditor {

  @Input() config;
  @Input() debounce;

  @Output() change = new EventEmitter();
  @ViewChild('host') host;
  @ViewChild('hostInline') hostInline;

  _value = '';
  _inline = false;
  _firstWriteValue = true;

  instance;
  debounceTimeout;
  zone;

  /**
   * Constructor
   */
  constructor(elementRef:ElementRef, zone:NgZone){
    this.zone = zone;
  }

  get value(): any { return this._value; };
  @Input() set value(v) {
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
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

    // Init ckeditor instance
    this.ckeditorInit(config);
  }

  /**
   * Value update process
   */
  updateValue(value, noEmit){
    this.zone.run(() => {
      this.value = value;

      this.onChange(value);

      if(!noEmit){
        this._onTouchedCallback();
        this.change.emit(value);
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
    if(!config.inline){
      this.instance = CKEDITOR.replace(this.host.nativeElement, config);

      // Set initial value
      this.instance.setData(this.value);

    // CKEditor inline mode
    }else{
      this._inline = true;
      this.instance = CKEDITOR.inline(this.hostInline.nativeElement, config);

      // Get initial content
      let value = this.hostInline.nativeElement.innerHTML;
      this._firstWriteValue = true;

      setTimeout(() => {
        this.updateValue(value, true);
      });
    }

    // CKEditor change event
    this.instance.on('change', () => {
      this._onTouchedCallback();
      let value = this.instance.getData();

      // Debounce update
      if (this.debounce) {
        if(this.debounceTimeout) clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.updateValue(value);
          this.debounceTimeout = null;
        }, parseInt(this.debounce));

      // Live update
      }else{
        this.updateValue(value);
      }
    });
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value){
    if(this._inline && this._firstWriteValue){
      this._firstWriteValue = false;
      return;
    }

    this._value = value;
    if (this.instance)
      this.instance.setData(value);
  }
  onChange(_){}
  onTouched(){}
  registerOnChange(fn){this.onChange = fn;}
  registerOnTouched(fn){this.onTouched = fn;}
  _onChangeCallback(_){}
  _onTouchedCallback(){}
}
