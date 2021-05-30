import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() status:boolean = false;

  constructor() { }

  ngOnInit(): void {
    return;
  }

  activateModal(){
    $(document).ready(function(){
      $("#exampleModalCenter").modal('show');
    });
   }

  closeModal(){
  $(document).ready(function(){
    $("#exampleModalCenter").modal('hide');
  });
 }



 modalStatus(status:boolean){
    if(status){
      this.activateModal();
      return;
    }
    this.closeModal();
 }

 ngOnChanges(changes:SimpleChanges) {
   console.log(changes.status.currentValue)
  this.modalStatus(changes.status.currentValue);

}

}
