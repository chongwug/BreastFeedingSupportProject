var smart = FHIR.client({
    serviceUrl: "https://secure-api.hspconsortium.org/FHIRPit/open",
    patientId: "SMART-8888801",
    /*
    auth: {
        token: window.sessionStorage.smartAuthToken,
        type: window.sessionStorage.smartAuthType
    }
    */
});

var patient;
var tempRF = smart.api.search({type: 'ReferralRequest', query: {status: 'completed'}});


tempRF.done(function(data){
  $.getJSON(data.config.url,function(da){
      require = da.entry[1].resource
      console.log(require.id)
      require.status = "rejected";
      smart.api.update({type: require.resourceType, data: JSON.stringify(require), id: require.id}).then(function(data){
        console.log(data.status);
      });
  });
});
// Read patient


smart.patient.read().then(function(pt) {
  patient = pt;
  console.log(patient)
  patient.name[0].family[0] = "Jonesjones";
  smart.api.update({type: patient.resourceType, data: JSON.stringify(patient), id: patient.id}).then(function(data){
    console.log(data.status);
  });
});

