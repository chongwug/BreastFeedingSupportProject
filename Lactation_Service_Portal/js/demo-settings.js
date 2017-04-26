function getPatientName (pt) {
  if (pt.name) {
    var names = pt.name.map(function(name) {
      return name.given.join(" ") + " " + name.family.join(" ");
    });
    return names.join(" / ")
  } else {
    return "anonymous";
  }
}

function getMedicationName (medCodings) {
  var coding = medCodings.find(function(c){
    return c.system == "http://www.nlm.nih.gov/research/umls/rxnorm";
  });

  return coding && coding.display || "Unnamed Medication(TM)"
}

function displayPatient (pt) {
  //document.getElementById('patient_name').innerHTML = getPatientName(pt);
  document.getElementById('patient_name').innerHTML = pt.id;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var med_list = document.getElementById('med_list');

/*function displayMedication (medCodings) {
  med_list.innerHTML += "<li> " + getMedicationName(medCodings) + "</li>";
}
*/
//FIND YOUR PATIENT
var demo = {
    //serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",
    serviceUrl: "https://secure-api.hspconsortium.org/FHIRPit/open",
    //patientId: "1137192"
    patientId: "SMART-8888801"
};




// Create a FHIR client (server URL, patient id in `demo`)
var smart = FHIR.client(demo),
    pt = smart.patient;
var smart = FHIR.client(demo),
    temp = smart.patient.api.search({type: 'Condition'});

//get JSON url
temp.done(function(data){
  console.log(data.config.url);

//read JSON
$.getJSON(data.config.url,function(da){
  //console.log(da.entry[2].resource.code.coding[0].code)
  console.log(da.entry[2].resource.code.coding[0].code)
});


});
// Create a patient banner by fetching + rendering demographics
smart.patient.read().then(function(pt) {
  displayPatient (pt);
});

/*
// A more advanced query: search for active Prescriptions, including med details
smart.patient.api.fetchAllWithReferences({type: "MedicationOrder"},["MedicationOrder.medicationReference"]).then(function(results, refs) {
  results.forEach(function(prescription){
    if (prescription.medicationCodeableConcept) {
      displayMedication(prescription.medicationCodeableConcept.coding);
    } else if (prescription.medicationReference) {
      var med = refs(prescription, prescription.medicationReference);
      displayMedication(med && med.code.coding || []);
    }
  });
});
*/