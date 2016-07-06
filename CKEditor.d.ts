// Imports
import {
    ElementRef,
    EventEmitter,
    NgZone
} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

/**
 * CKEditor component
 */
export declare class CKEditor implements ControlValueAccessor {

    value:String;
    instance:any;
    change:EventEmitter<any>;

    constructor(elementRef:ElementRef, zone:NgZone);
    ckeditorInit(config:any):void;
    updateValue(value:String):void;

    // ControlValueAccessor
    writeValue(value:any):void;
    onChange(_:any):void;
    registerOnChange(fn:Function):void;
    registerOnTouched(fn:Function):void;

}
