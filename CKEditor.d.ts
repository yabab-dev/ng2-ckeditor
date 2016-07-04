// Imports
import {
    ElementRef,
    EventEmitter
} from '@angular/core';
import {NgControl, ControlValueAccessor} from '@angular/forms';

/**
 * CKEditor component
 */
export declare class CKEditor implements ControlValueAccessor {

    value:any;
    instance:any;
    change:EventEmitter<any>;

    constructor(elementRef:ElementRef, ngControl:NgControl);
    ckeditorInit(config:any):void;
    onValueChange(value:String):void;

    // ControlValueAccessor
    writeValue(value:any):void;
    onChange(_:any):void;
    registerOnChange(fn:Function):void;
    registerOnTouched(fn:Function):void;

}
