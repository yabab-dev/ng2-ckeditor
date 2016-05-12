// Imports
import {
    Component,
    Directive,
    Input,
    Output,
    ElementRef,
    ViewChild,
    Optional,
    OptionalMetadata,
    EventEmitter,
    Renderer
} from '@angular/core';
import {NgControl, ControlValueAccessor} from '@angular/common';

/**
 * CKEditor component
 * Usage :
 * <ckeditor [(ngModel)]="data" [config]="{...}" configFile="file.js"></ckeditor>
 */
@Component({
    selector: 'ckeditor',
    template: `<textarea #host (change)="onValueChange($event)"></textarea>`,
})
@Reflect.metadata('parameters', [null, [new OptionalMetadata()]])
export class CKEditor {

    @Input() config;
    @Input() configFile;
    @Input() ngModel;

    @Output() change = new EventEmitter();
    @ViewChild('host') host;

    value = '';
    instance;
    ngControl;
    renderer;

    /**
     * Constructor
     */
    constructor(elementRef:ElementRef, ngControl:NgControl, renderer:Renderer){
        if( ngControl ){
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
        this.renderer = renderer;
    }

    /**
     * On component destroy
     */
    ngOnDestroy(){
        if( this.instance ) {
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
        var config = {};

        // Fetch file
        if( this.configFile ){

            if( System && System.import ){
                System.import(this.configFile)
                    .then((res) => {
                        this.ckeditorInit( res.config );
                    })
            }

        // Config object
        }else{
            config = this.config || {};
            this.ckeditorInit( config );
        }
    }

    /**
     * Detect textarea value change
     */
    onValueChange(event){
        var value = this.host.nativeElement.value;
        this.change.emit( value );
        this.ngControl.viewToModelUpdate( value );
    }

    /**
     * CKEditor init
     */
    ckeditorInit( config ){

        if(!CKEDITOR){
            console.error('Please include CKEditor in your page');
            return;
        }

        // CKEditor replace textarea
        this.instance = CKEDITOR.replace( this.host.nativeElement, config );

        // Set initial value
        this.instance.setData(this.value);

        // CKEditor change event
        this.instance.on('change', () => {
            this.renderer.setElementProperty(this.host.nativeElement, 'value', this.instance.getData());
            this.renderer.invokeElementMethod(this.host.nativeElement, 'dispatchEvent', [new Event('change')]);
        });
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value){
        this.value = value;
        if( this.instance )
            this.instance.setData(value);
    }
    onChange(_){}
    onTouched(){}
    registerOnChange(fn){this.onChange = fn;}
    registerOnTouched(fn){this.onTouched = fn;}
}

/**
 * CKEditor inline Directive
 * @WIP
 */
// @Directive({
//     selector: '[ckeditorInline]',
// })
// export class CKEditorInline{
//
//     @Input('ckeditorInline') config;
//
//     instance;
//     el;
//
//     /**
//      * Constructor
//      */
//     constructor(el: ElementRef) {
//         this.el = el;
//     }
//
//     /**
//      * On component view init
//      */
//     ngAfterViewInit(){
//         var config = this.config || {};
//         //this.ckeditorInit( config );
//     }
//
//     /**
//      * On component destroy
//      */
//     ngOnDestroy(){
//         if( this.instance ) {
//             this.instance.removeAllListeners();
//             this.instance.destroy();
//             this.instance = null;
//         }
//     }
//
//     /**
//      * CKEditor init
//      */
//     ckeditorInit( config ){
//         if(!CKEDITOR){
//             console.error('Please include CKEditor in your page');
//             return;
//         }
//
//         CKEDITOR.disableAutoInline = true;
//         this.instance = CKEDITOR.inline(this.el);
//     }
//
// }
