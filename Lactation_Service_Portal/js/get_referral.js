function displayPatient (pt) {
  document.getElementById('patient_name').innerHTML = pt.id;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function displayReferral (status){
  //clean
  document.getElementById('page-wrapper').innerHTML="";
  // Create a FHIR client to connect to the server
  var demo = {
      //serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",
      serviceUrl: "https://secure-api.hspconsortium.org/FHIRPit/open"
      //patientId: "1137192"
  };

  var smart = FHIR.client(demo),
  //Setup var to hold search results
  pt = smart.patient,
  tempRF = smart.api.search({type: 'ReferralRequest', query: {status: status}});


  //Show Referal
    //get JSON url
  tempRF.done(function(data){
    //console.log(data.config.url);
    //read JSON
    $.getJSON(data.config.url,function(da){
      //console.log(da.total)
      if(da.total == 0){
        $('#page-wrapper').append("<div><b>No " + status + " results.</b></div>")
      }else{
        $.each(da.entry,function(i,val){ //loop
          //console.log(val.resource.id);
          var ReferralID= val.resource.id;
          //$('#referral').append("<li>" + val.resource.id + "</li>");
          //get patient id
          var ptnum = val.resource.patient.reference,
          
              hs = /[^/]*$/.exec(val.resource.supportingInformation.reference)[0];
          
          // retrieve patient information via patient id
          var demomo = jqFhir({
           //serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",
          baseUrl: "https://secure-api.hspconsortium.org/FHIRPit/open"});
          
          demomo.read({id:ptnum}).then(function(p){
             //console.log(p)
             //get patient information in detail
             var name = p.content.name[0];
             var formattedname= name.given.join(" ") + " " + name.family;
             var gender=p.content.gender
             var DOB=p.content.birthDate
             var mp=p.content.telecom[1].value
             var email=p.content.telecom[2].value
          
           //Show referral card
           $('#page-wrapper').append('<div class="col-lg-3"><div class="well well-lg service-well">\
            <div class="service-image"><img src="/images/es.png"></div>\
            <div><label>Patient Referal ID: </label><span> '+ ReferralID +'</span></br>\
                 <label>Patient Name: </label><span> '+formattedname +'</span></br>\
                 <label>Gender: </label><span> '+gender+'</span></br>\
                 <label>DOB: </label><span> '+DOB+'</span></br>\
                 <label>Tel: </label><span> '+mp+'</span></br>\
                 <label>Email: </label><span> '+email+'</span>\
            </div>\
            <div class="credentials_1111111"></div><button class="btn btn-info delete-service" data-id="' + ReferralID + '">Action</button></div></div>');
         });
        });
      }
    });//end of read JSON
  });//function tempRF end
}









