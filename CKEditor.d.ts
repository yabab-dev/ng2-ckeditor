// Imports
import {
  EventEmitter,
  NgZone
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * CKEditor component
 */
export declare class CKEditorComponent implements ControlValueAccessor {

  value:String;
  instance:any;
  change:EventEmitter<any>;
  ready:EventEmitter<any>;

  constructor(zone:NgZone);
  ckeditorInit(config:any):void;
  updateValue(value:String):void;

  // ControlValueAccessor
  writeValue(value:any):void;
  onChange(_:any):void;
  onTouched():void;
  registerOnChange(fn:Function):void;
  registerOnTouched(fn:Function):void;

}

/**
 * CKEditor module
 */
export declare class CKEditorModule {}
