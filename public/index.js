// Exercise 1 : Euro-Kilometers
// Write code that generates the price for each driver from index.js file.

function get_rental(id)
{
  for(var j=0; j<rentals.length;j++)
  {
    if(id==rentals[j].id)
    {
      return rentals[j];
    }
  }
  return;
}

function get_date(id)
{
  var rental = get_rental(id);
  var returnDate = new Date(rental.returnDate);
  var pickupDate = new Date(rental.pickupDate);
  var time = 1 + (returnDate - pickupDate)/(24*3600*1000);
  return time;
}

function rentalTime(time,price)
{
  var rentaltimeResult=time*price;
  return rentaltimeResult;
}

function rentalDistance(distance,price)
{
  var rentaldistanceResult=distance*price;
  return rentaldistanceResult;
}

function updateRentalPrice()
{
  for(var j=0;j<rentals.length;j++)
  {
    if(rentals[j].carId==cars[j].id)
    {
      var timeDay=get_date(rentals[j].id);
      var rentaltimeResult=rentalTime(timeDay,cars[j].pricePerDay);
      var rentaldistanceResult=rentalDistance(rentals[j].distance,cars[j].pricePerKm);
      var rentalPrice=rentaltimeResult+rentaldistanceResult;

      rentals[j].price=rentalPrice;

      console.log(rentals[j].driver.firstName + '' + rentals[j].driver.lastName+''+'\nThe Rental Price is : '+ rentals[j].price+''+ 'euros');
    }
  }
}

// Exercise 2 : Drive more, pay less
// Adapt the rental price computation to take these new rules into account.

function discountRentalPrice()
{
  for(var j=0; j<rentals.length;j++)
  {
    var timeDay=get_date(rentals[j].id);
    var rentalDiscount;
    if(timeDay==1)
    {
      rentalDiscount=rentals[j].price;
      
      console.log(rentals[j].driver.firstName + '' + rentals[j].driver.lastName+''+'\nThe Rental Price (no discount): '+ rentalDiscount+'euros');
    }
    else if(timeDay>1 && timeDay<=4)
    {
      rentalDiscount=rentals[j].price*0.90;

      console.log(rentals[j].driver.firstName + '' + rentals[j].driver.lastName+''+'\nThe Rental Price Discount -10% is : '+ rentalDiscount+'euros');

      rentals[j].price=rentalDiscount;
    }
    else if(timeDay>4 && timeDay<=10)
    {
      rentalDiscount=rentals[j].price*0.70;

      console.log(rentals[j].driver.firstName + '' + rentals[j].driver.lastName+''+'\nThe Rental Price Discount -30% is : '+ rentalDiscount+ 'euros');

      rentals[j].price=rentalDiscount;
    }
    else if(timeDay>10)
    {
      rentalDiscount=rentals[j].price*0.50;

      console.log(rentals[j].driver.firstName + '' + rentals[j].driver.lastName+''+'\nThe Rental Price Discount -50%  is : '+ rentalDiscount+'euros');
    }
  }
}

// Exercise 3 : Give me all your money
// Compute the amount that belongs to the insurance, to the assistance and to drivy.

function giveCommission()
{
  for(var j=0; j<rentals.length;j++)
  {
    var timeDay=get_date(rentals[j].id);
    var commission = rentals[j].price*0.70;

    console.log('Commission for '+ rentals[j].driver.firstName+ ''+ rentals[j].driver.lastName + 'course is ' + commission + '.');
    var insurance = commission/2;

    console.log('Insurance for '+ rentals[j].driver.firstName+ ''+ rentals[j].driver.lastName + 'course is ' + insurance + '.');
    rentals[j].commission.insurance=insurance;

    var assistanceRoad=timeDay*1;
    console.log('Road assistance for '+ rentals[j].driver.firstName+ ''+ rentals[j].driver.lastName + 'course is ' + assistanceRoad + '.');

    rentals[j].commission.assistance=assistanceRoad;

    var drivy = commission - insurance - assistanceRoad;
    console.log('Drivy for '+ rentals[j].driver.firstName+ ''+ rentals[j].driver.lastName + 'course is ' + drivy + '.');

    rentals[j].commission.drivy=drivy;
  }
}

//Exercise 4 : The famous deductible
//Compute the new amount price if the driver subscribed to deductible option.

function optionDeductible()
{
  for(var j=0;j<rentals.length;j++)
  {
    var timeDay= get_date(rentals[j].id);
    var option_deductible=4*timeDay;
    var rentalPriceDeduitOption;

    if(rentals[j].options.deductibleReduction==true)
    {
      rentalPriceDeduitOption=rentals[j].price+ option_deductible;

      console.log(rentals[j].driver.firstName+ ''+ rentals[j].driver.lastName + '\n' +'rental price (deduit option) is : ' + rentalPriceDeduitOption+ '.');

      rentals[j].price=rentalPriceDeduitOption;
    }
    else
    {
      rentalPriceDeduitOption=rentals[j].price;

      console.log(rentals[j].driver.firstName+ ''+ rentals[j].driver.lastName + '\n' +'rental price (without deduit option) is : ' + rentalPriceDeduitOption+ '.')
    }
  }
}

function allPayment()
{
  for (var j = 0; j<actors.length;i++)
  {
    var price=0;
    var commission=0;
    var insurance=0;
    var assistance=0;
    var deductibleReduction=true;
    var day= get_date(actors[j].rentalId);

    for(var j = 0;j<rentals.length; j++)
    {
      if(actors[j].rentalId==rentals[j].id)
      {
        price = rentals[j].price;
        var commission=rentals[j].price*0.70;
        var insurance = commission/2;
        var assistanceRoad=day*1;
        var drivy = commission- insurance - assistanceRoad;

        for(var i = 0; i<actors[j].payment.length;i++)
        {
          switch(actors[j].payment[i].who)
          {
            case 'driver' : 
            actors[j].payment[i].amount=price;
            console.log('Driver Amount is :' + actors[j].payment[i].amount);
            break;

            case 'owner' : 
            actors[j].payment[i].amount=price-commission;
            console.log('Owner Amount is :' + actors[j].payment[i].amount);
            break;

            case 'insurance' : 
            actors[j].payment[i].amount=insurance;
            console.log('Insurance Amount is :' + actors[j].payment[i].amount);
            break;

            case 'assistance' : 
            actors[j].payment[i].amount=assistanceRoad;
            console.log('Assistance Amount is :' + actors[j].payment[i].amount);
            break;

            case 'drivy' :
            if(rentals[j].options.deductibleReduction==true) 
            {
              var option_deductible = 4*day;
            
            
            actors[j].payment[i].amount=price;
            console.log('Drivy Amount :' + actors[j].payment[i].amount);
            break;
          }
          else 
          {
            var optionDeductible=0;
            actors[j].payment[i].amount=drivy+optionDeductible;
            break;
          }



          }
        }
      }
    }
  }
}

// Exercise 6 : Rental modification
//Compute the debit for the driver and the credit of the car owner, insurance, assistance and drivy with the rental modification.

function updateModif()
{
  for(var j =0;j<rentalModifications.length;i++)
  {
    for(var k=0;k<rentals.length;j++)
    {
      if(rentalModifications[j].rentalId==rentals[k].id)
      {
        if(typeof rentalModifications[j].returnDate !="no defined")
        {
          rentals[k].returnDate=rentalModifications[j].returnDate;
        }
        if(typeof rentalModifications[j].pickupDate != "no defined")
        {
          rentals[k].pickupDate=rentalModifications[j].pickupDate;
        }
        if(typeof rentalModifications[j].distance != "no defined")
        {
          rentals[k].distance=rentalModifications[j].distance;
        }
        if(typeof rentalModifications[j].options != "no defined")
        {
          rentals[k].options.deductibleReduction=rentalModifications[j].options.deductibleReduction;
        }
        if(typeof rentalModifications[j].carId != "no defined")
        {
          rentals[k].carId=rentalModifications[j].carId;
        }
      }
    }
  }
}
function applyModif()
{
  console.log('Payment with modifs');
  updateRentalPrice()
  discountRentalPrice();
  optionDeductible();
  allPayment();
}
'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

updateRentalPrice();
discountRentalPrice();
giveCommission();
optionDeductible();
allPayment();
updateModif();
applyModif();

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
