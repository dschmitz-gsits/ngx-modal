import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'modal-header',
  template: `
    <ng-content></ng-content>
  `
})
export class ModalHeaderComponent {}

@Component({
  selector: 'modal-content',
  template: `
    <ng-content></ng-content>
  `
})
export class ModalContentComponent {}

@Component({
  selector: 'modal-footer',
  template: `
    <ng-content></ng-content>
  `
})
export class ModalFooterComponent {}

@Component({
  selector: 'modal',
  template: `
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      #modalRoot
      (keydown.esc)="closeOnEscape ? close() : 0"
      [ngClass]="{ in: isOpened, fade: isOpened, show: isOpened }"
      [ngStyle]="{ display: isOpened ? 'block' : 'none' }"
      (mousedown)="checkClose($event)"
    >
      <div class="modal-dialog" [ngClass]="modalClass" #modalContent>
        <div class="modal-content" tabindex="0" *ngIf="isOpened">
          <div class="modal-header">
            <h4 class="modal-title" *ngIf="title">{{ title }}</h4>
            <ng-content select="modal-header"></ng-content>
            <button
              *ngIf="!hideCloseButton"
              type="button"
              class="close"
              data-dismiss="modal"
              [attr.aria-label]="cancelButtonLabel || 'Close'"
              (click)="close()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ng-content select="modal-content"></ng-content>
          </div>
          <div class="modal-footer">
            <ng-content select="modal-footer"></ng-content>
            <button
              *ngIf="cancelButtonLabel"
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
              (click)="close()"
            >
              {{ cancelButtonLabel }}
            </button>
            <button
              *ngIf="submitButtonLabel"
              type="button"
              class="btn btn-primary"
              (click)="onSubmit.emit(undefined)"
            >
              {{ submitButtonLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent implements OnDestroy {
  // -------------------------------------------------------------------------
  // Inputs
  // -------------------------------------------------------------------------

  @Input()
  public modalClass: string;

  @Input()
  public closeOnEscape = true;

  @Input()
  public closeOnOutsideClick = true;

  @Input()
  public title: string;

  @Input()
  public hideCloseButton = false;

  @Input()
  public cancelButtonLabel: string;

  @Input()
  public submitButtonLabel: string;

  // -------------------------------------------------------------------------
  // Outputs
  // -------------------------------------------------------------------------

  @Output()
  public onOpen = new EventEmitter(false);

  @Output()
  public onClose = new EventEmitter(false);

  @Output()
  public onSubmit = new EventEmitter(false);

  // -------------------------------------------------------------------------
  // Public properties
  // -------------------------------------------------------------------------

  public isOpened = false;

  // -------------------------------------------------------------------------
  // Private properties
  // -------------------------------------------------------------------------

  @ViewChild('modalRoot', { static: true })
  public modalRoot: ElementRef;

  private backdropElement: HTMLElement;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.createBackDrop();
  }

  // -------------------------------------------------------------------------
  // Lifecycle Methods
  // -------------------------------------------------------------------------

  ngOnDestroy() {
    document.body.className = document.body.className.replace(
      /modal-open\b/,
      ''
    );
    if (
      this.backdropElement &&
      this.backdropElement.parentNode === document.body
    ) {
      document.body.removeChild(this.backdropElement);
    }
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  open(...args: any[]) {
    if (this.isOpened) return;

    this.isOpened = true;
    this.onOpen.emit(args);
    this.backdropElement && document.body.appendChild(this.backdropElement);
    window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
    document.body.className += ' modal-open';
    this.cdr.detectChanges();
  }

  close(...args: any[]) {
    if (!this.isOpened) return;

    this.isOpened = false;
    this.onClose.emit(args);
    this.backdropElement && document.body.removeChild(this.backdropElement);
    document.body.className = document.body.className.replace(
      /modal-open\b/,
      ''
    );
    this.cdr.detectChanges();
  }

  checkClose(event: MouseEvent): void {
    if (
      this.closeOnOutsideClick === true &&
      this.modalRoot.nativeElement === event.target
    ) {
      this.close();
    }
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  private createBackDrop() {
    if (!document.getElementById('modal-backdrop')) {
      this.backdropElement = document.createElement('div');
      this.backdropElement.setAttribute('id', 'modal-backdrop');
      this.backdropElement.classList.add('modal-backdrop');
      this.backdropElement.classList.add('fade');
      this.backdropElement.classList.add('in');
      this.backdropElement.classList.add('show');
    }
  }
}
