function displayPatient (pt) {
  document.getElementById('patient_name').innerHTML = pt.id;
}

//Generate Box on the website
function generateBox (ptid){
      //retrieve patient information

      //append the box to html (use your own var)
       $('#service-status').append('<div class="col-lg-3"><div class="well well-lg service-well"><div class="service-image"><img src="/images/es.png"></div><div><label>Patient Referral :</label><span> ' + data[i].name 
        + '</span></br><label>referalId :</label><span> ' + data[i].referalId 
        + '</span></br><label>gender :</label><span> ' + data[i].gender 
        + '</span></br><label>service :</label><span> ' + data[i].service 
        + '</span></br><label>DOB :</label><span> ' + data[i].dob 
        + '</span></br><label>contactInfo :</label><span class="' + data[i].contactInfo + '">' + data[i].address 
        + '</span></div><div class="credentials_'+ i 
        +'"></div><button class="btn btn-info delete-service" data-id="' + data[i].referalId +'">Action</button></div></div>');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a FHIR client (server URL, patient id in `demo`)
var demo = {
    //serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",
    serviceUrl: "https://secure-api.hspconsortium.org/FHIRPit/open",
    //patientId: "1137192"
    patientId: "SMART-8888801"
};

var smart = FHIR.client(demo),

//Setup var to hold search results
pt = smart.patient;

tempPT = smart.patient.api.search({type: 'Condition'});

tempRF = smart.api.search({type: 'ReferralRequest', query: {status: 'completed'}});



//Show Patient
  //show patient id
smart.patient.read().then(function(pt) {
  displayPatient (pt);
});
  //get JSON url
tempPT.done(function(data){
  console.log(data.config.url);
    //read JSON
    $.getJSON(data.config.url,function(da){
    console.log(da.entry[2].resource.code.coding[0].code)
    $.each(da.entry,function(i,val){
        console.log(val.resource.code.coding[0].code);
        //$('#diagnose').append("<li>" + val.resource.code.coding[0].display + ":" + val.resource.code.coding[0].code + "</li>");
      }
    );
  });
});


//Show Referal
  //get JSON url
tempRF.done(function(data){
  console.log("here");
  console.log(data.config.url);
  //read JSON
  $.getJSON(data.config.url,function(da){
    
    //console.log(da.entry[2].resource.code.coding[0].code);
    //console.log(da.entry[0].resource.id);
    $.each(da.entry,function(i,val){
      console.log(val.resource.id);
      $('#referral').append("<li><button onclick=\"update()\">" + val.resource.id + "</button></li>");
      //get patient info

      //$('#page-wrapper').append('<div class="col-lg-3"><div class="well well-lg service-well">\<div class="service-image"><img src="/images/es.png"></div><div><label>Patient Referral :</label><span>' + val.resource.id + '</span></br><label>referalId :</label><span></span></br><label>gender :</label><span> 111111</span></br><label>service :</label><span>1111</span></br><label>DOB :</label><span>1111</span></br><label>contactInfo :</label><span class="1111111">1111111</span></div><div class="credentials_1111111"></div><button class="btn btn-info delete-service" data-id="' + val.resource.id + '">Action</button></div></div>');
    });
  });
});