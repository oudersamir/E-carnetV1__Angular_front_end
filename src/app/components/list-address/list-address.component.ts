import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from './../../models/address';
import { AddressService } from './../../services/address.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {
  formName:string;
  addresses :Address[];
  addActive:boolean =false;
  formAddress:FormGroup;
  address: Address={
    addressId:"",
    city:"",
    type:"",
    street:"",
    postal:"",
    country:""
  };


  constructor(private addressService:AddressService,
              ) { }

  ngOnInit(): void {

    this. getAllAddress();
    this.formAddress=new FormGroup({
      city:new FormControl('',Validators.required),
      street:new FormControl('',Validators.required),
      postal:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required),
      type:new FormControl('',Validators.required)

    });
  }

  get city()
  {
    return this.formAddress.get("city").value;
  }
  get street()
  {
    return this.formAddress.get("street").value;
  }
  get postal()
  {
    return this.formAddress.get("postal").value;
  }
  get country()
  {
    return this.formAddress.get("country").value;
  }
  get type()
  {
    return this.formAddress.get("type").value;
  }



  set city(city:string )
  {
    this.formAddress.get("city").setValue(city);
  }
  set postal(postal:string )
  {
    this.formAddress.get("postal").setValue(postal);
  }
  set country(country:string )
  {
    this.formAddress.get("country").setValue(country);
  }
  set type(type:string )
  {
    this.formAddress.get("type").setValue(type);
  }
  set street(street:string )
  {
    this.formAddress.get("street").setValue(street);
  }
  
  removeFormAddress(){
    this.formAddress.reset();
  }

  deleteAddress(address:Address){


    


    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.addressService.deleteAddress(address).subscribe(
    res=>{
      console.log(res)
      let pos=this.addresses.indexOf(address);
      this.addresses.splice(pos,1);
    }  
    )
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  editAddress(address:Address){
    this.address=address;
    this.formName="Edit Address";
    this.city=address.city;
    this.country=address.country;
    this.type=address.type;
    this.street=address.street;
    this.postal=address.postal;
  }


  persisteAddress(){
    if(this.address.addressId==""){
      this.addAddress();
      alert("  new address")
    }else if(this.address.addressId!="") {
      this.updateAddress();
      alert("  edit address")

    }
    this. getAllAddress();

  }

  updateAddress(){
    this.address.city=this.city;
    this.address.country=this.country;
    this.address.type=this.type;
    this.address.street=this.street;
    this.address.postal=this.postal;
    this.addressService.updateAddress(this.address).subscribe(res=>{
      this.address={
        addressId:"",
        city:"",
        type:"",
        street:"",
        postal:"",
        country:""
      };
      this.removeFormAddress();
      this.openSuccessUpdate();
    })
  }

  addAddress(){
    
      this.address.city=this.city;
      this.address.country=this.country;
      this.address.type=this.type;
      this.address.street=this.street;
      this.address.postal=this.postal;

      this.addressService.addAddress(this.address).subscribe((res:Address)=> {
        this.addresses=[res,...this.addresses];
        this.address={
          addressId:"",
          city:"",
          type:"",
          street:"",
          postal:"",
          country:""
        };
        this.removeFormAddress();
        this.openSuccessUpdate();
       });
      this.addStatus();

  
  }

  openSuccessUpdate(){
Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }




  addStatus(){
    this.addActive=!this.addActive;
    this.formName="New Address";
  }

  getAllAddress(){
    this.addresses=[];
    this.addressService.getAll().subscribe((res:Address[])=>{
    this.addresses=res;
    console.log(res)

    })
  }

}
