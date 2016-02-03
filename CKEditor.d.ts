// Imports
import {
    ElementRef,
    EventEmitter
} from 'angular2/core';
import {NgControl, ControlValueAccessor} from 'angular2/common';

/**
 * CKEditor component
 */
export declare class CKEditor implements ControlValueAccessor {

    value:any;
    instance:any;
    change:EventEmitter;

    constructor(elementRef:ElementRef, ngControl:NgControl);
    ckeditorInit(config:any):void;
    hackUpdate():void;

    // ControlValueAccessor
    writeValue(value:any):void;
    onChange(_:any):void;
    registerOnChange(fn:Function):void;
    registerOnTouched(fn:Function):void;
    
}
