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
  ContentChildren,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CKButtonDirective } from './ckbutton.directive';
import { CKGroupDirective } from './ckgroup.directive';

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
      multi: true,
    },
  ],
  template: `<textarea #host></textarea>`,
})
export class CKEditorComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() config: CKEDITOR.config;
  @Input() readonly: boolean;
  @Input() debounce: string;

  @Output() change = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() editorChange = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() ready = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() blur = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() focus = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() contentDom = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() fileUploadRequest = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() fileUploadResponse = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() paste = new EventEmitter<CKEDITOR.eventInfo>();
  @Output() drop = new EventEmitter<CKEDITOR.eventInfo>();

  @ViewChild('host', { static: false }) host: ElementRef<HTMLTextAreaElement>;

  @ContentChildren(CKButtonDirective) toolbarButtons: QueryList<CKButtonDirective>;
  @ContentChildren(CKGroupDirective) toolbarGroups: QueryList<CKGroupDirective>;

  _value = '';
  instance: CKEDITOR.editor;
  debounceTimeout: number;
  private destroyed = false;

  /**
   * Constructor
   */
  constructor(private zone: NgZone) {}

  get value(): any {
    return this._value;
  }
  @Input()
  set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.readonly && this.instance) {
      this.instance.setReadOnly(changes.readonly.currentValue);
    }
  }

  /**
   * On component destroy
   */
  ngOnDestroy() {
    this.destroyed = true;
    this.zone.runOutsideAngular( () => {
      if (this.instance) {
        CKEDITOR.removeAllListeners();
        this.instance.destroy();
        this.instance = null;
      }
    });
  }

  /**
   * On component view init
   */
  ngAfterViewInit() {
    if (this.destroyed) {
      return;
    }
    this.ckeditorInit(this.config || {});
  }

  /**
   * On component view checked
   */
  ngAfterViewChecked() {
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
  ckeditorInit(config: CKEDITOR.config) {
    if (typeof CKEDITOR === 'undefined') {
      console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
    } else {
      // Check textarea exists
      if (this.instance || !this.documentContains(this.host.nativeElement)) {
        return;
      }

      if (this.readonly) {
        config.readOnly = this.readonly;
      }
      // CKEditor replace textarea
      this.instance = CKEDITOR.replace(this.host.nativeElement, config);

      // Set initial value
      this.instance.setData(this.value);

      // listen for instanceReady event
      this.instance.on('instanceReady', (evt: CKEDITOR.eventInfo) => {
        // if value has changed while instance loading
        // update instance with current component value
        if (this.instance.getData() !== this.value) {
          this.instance.setData(this.value);
        }

        // send the evt to the EventEmitter
        this.ready.emit(evt);
      });

      // CKEditor change event
      this.instance.on('change', (evt: CKEDITOR.eventInfo) => {
        this.onTouched();
        let value = this.instance.getData();

        if (this.value !== value) {
          // Debounce update
          if (this.debounce) {
            if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
            this.debounceTimeout = window.setTimeout(() => {
              this.updateValue(value);
              this.debounceTimeout = null;
            }, parseInt(this.debounce));

            // Live update
          } else {
            this.updateValue(value);
          }
        }

        // Original ckeditor event dispatch
        this.editorChange.emit(evt);
      });

      // CKEditor blur event
      this.instance.on('blur', (evt: CKEDITOR.eventInfo) => {
        this.blur.emit(evt);
      });

      // CKEditor focus event
      this.instance.on('focus', (evt: CKEDITOR.eventInfo) => {
        this.focus.emit(evt);
      });

      // CKEditor contentDom event
      this.instance.on('contentDom', (evt: CKEDITOR.eventInfo) => {
        this.contentDom.emit(evt);
      });

      // CKEditor fileUploadRequest event
      this.instance.on('fileUploadRequest', (evt: CKEDITOR.eventInfo) => {
        this.fileUploadRequest.emit(evt);
      });

      // CKEditor fileUploadResponse event
      this.instance.on('fileUploadResponse', (evt: CKEDITOR.eventInfo) => {
        this.fileUploadResponse.emit(evt);
      });

      // CKEditor paste event
      this.instance.on('paste', (evt: CKEDITOR.eventInfo) => {
        this.paste.emit(evt);
      });

      // CKEditor drop event
      this.instance.on('drop', (evt: CKEDITOR.eventInfo) => {
        this.drop.emit(evt);
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
    if (this.instance) this.instance.setData(value);
  }
  onChange(_: any) {}
  onTouched() {}
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private documentContains(node: Node) {
    return document.contains ? document.contains(node) : document.body.contains(node);
  }
}
