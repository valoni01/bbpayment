import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() status:boolean = false;

  constructor() { }

  ngOnInit(): void {
    return;
  }

  activateModal(){
    $(document).ready(function(){
      $("#myModal").modal('show');
    });
   }


  closeModal(){
    $("#myModal").modal('hide');
    $('.modal-backdrop').remove()
    this.status = false;
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    $(document.body).removeClass("modal-open");
    $(".modal-backdrop").remove();
    $("#myModal").modal('hide');
    $('.modal-backdrop').remove()
    this.status = false;
  }

 modalStatus(status:boolean){
    if(status){
      this.activateModal();
      return;
    }
    this.closeModal();
 }

 ngOnChanges(changes:SimpleChanges) {
  this.modalStatus(changes.status.currentValue);
}

}
