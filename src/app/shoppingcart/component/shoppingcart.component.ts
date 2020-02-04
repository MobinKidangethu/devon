import { Component, OnInit } from '@angular/core';
import { ShoppingcartService} from '../service/shoppingcart.service';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})

export class ShoppingcartComponent implements OnInit {
  serverlist = []
  pageSize = 20;
  page = 1;
  searchText;
  hddlist = [];
  ramlist = [];
  storagelist = [];
  sortedStorage = [];
  selectedHddValue: any;
  selectedram = [];
  totalservers: number;
  releaseShoppingCart : Subscription;
  nameArray: any[];

  constructor(private shoppingcartService: ShoppingcartService) {
   }

  ngOnInit() {
    this.getAllServers();
  }

  getAllServers(){

    this.releaseShoppingCart=this.shoppingcartService.getServers().subscribe(data => {
      console.log("serverlist", data);
      this.serverlistfunc(data); 
      this.hddlist =  this.serverlist.filter((v,i) => this.serverlist.findIndex(item => item.hddtype == v.hddtype) === i);
      this.ramlist =  this.serverlist.filter((v,i) => this.serverlist.findIndex(item => item.rammemory == v.rammemory) === i);
      this.ramlist.sort((a, b) => parseFloat(a.rammemory) - parseFloat(b.rammemory));
      this.storagelist =  this.serverlist.filter((v,i) => this.serverlist.findIndex(item => item.storage == v.storage) === i);
      this.storagelist.sort((a, b) => parseFloat(a.storage) - parseFloat(b.storage));
      
      this.sortedStorage = [{value: +this.storagelist[3].storage, legend: '120GB'},
                            {value: +this.storagelist[4].storage, legend: '240GB'},
                            {value: +this.storagelist[5].storage, legend: '300GB'},
                            {value: +this.storagelist[6].storage, legend: '480GB'},
                            {value: +this.storagelist[7].storage, legend: '500GB'},
                            {value: +this.storagelist[8].storage, legend: '960GB'},
                            {value: +this.storagelist[0].storage*1000, legend: '1000GB'},
                            {value: +this.storagelist[1].storage*1000, legend: '2000GB'},
                            {value: +this.storagelist[2].storage*1000, legend: '3000GB'}];
                            console.log("sortedStorage", this.sortedStorage);
                            console.log("sortedStorage", this.options.stepsArray);
      
      this.options.stepsArray = this.sortedStorage;
      console.log("this.options",this.options);

    },error => {

  }, ()=> {

  });
  }

  rangeSliderMinValue: number;
  rangeSliderMaxValue: number;

  options: Options = {
    floor: 120,
    ceil: 3000,
    step: 10,
    showTicks: true,
    stepsArray: [
      {value: 120, legend: '120GB'},
      {value: 240},
      {value: 300, legend: '300GB'},
      {value: 480},
      {value: 500, legend: '500GB'},
      {value: 960},
      {value: 1000, legend: '1TB'},
      {value: 2000},
      {value: 3000, legend: '3TB'}
    ]
   }

  gethddValue(selectedHddValue){
    this.selectedHddValue = selectedHddValue;
  }

  OnCheckboxSelect(event) {
    if (event.target.checked === true) {
      this.selectedram.push({value: event.target.value, checked: event.target.checked});
      console.log('Selected Ids ', this.selectedram);
    }
    if (event.target.checked === false) {
      this.selectedram = this.selectedram.filter((item) => item.value !== event.target.value);
      

    }
    this.nameArray = this.selectedram.map(function (el) { return el.value; });
  }

  serverlistfunc(serverdata){
    this.serverlist = [];
    for (const servers of serverdata.servers){
      this.serverlist.push({
        model: servers.model,
        rammemory: servers.ram.memory,
        memory: servers.ram.memory + ' ' + servers.ram.unit,
        ramtype : servers.ram.type,
        storage: servers.hdd.memory,
        hddmemory: servers.hdd.memory + ' ' + servers.hdd.unit,
        hddcount: servers.hdd.count,
        hddtype: servers.hdd.type,
        location: servers.location,
        price: servers.price.currencySymbol + ' ' + servers.price.amountCents,
        pricecurrency : servers.price.currency
      })
    }
    console.log("serverlist", this.serverlist);
    this.totalservers = this.serverlist.length;
  }
  


  applyfilter(): void{
    var params = {
      storageMin: this.options.floor,
      storageMax: this.options.ceil,
      ram: this.nameArray,
      hdd: this.selectedHddValue
    }
  
    var query = [];
    Object.keys(params).forEach(key=>{
      if (params[key] && params[key]!=0) {
        query.push(key + "=" + params[key])
      }
    });
    
    this.releaseShoppingCart=this.shoppingcartService.getFilteredServers(query.join("&")).subscribe(data => {
      this.serverlistfunc(data);    
    });
  }

  reset(){
    
  }

  ngOnDestroy() {
    if (this.releaseShoppingCart) { this.releaseShoppingCart.unsubscribe(); }
  }
}
