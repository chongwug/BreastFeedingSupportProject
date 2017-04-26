$(function() {
    
    //$('#page-wrapper').append('<div class="col-lg-3"><div class="well well-lg service-well">\<div class="service-image"><img src="/images/es.png"></div><div><label>Patient Referral :</label><span>12345</span></br><label>referalId :</label><span></span></br><label>gender :</label><span> 111111</span></br><label>service :</label><span>1111</span></br><label>DOB :</label><span>1111</span></br><label>contactInfo :</label><span class="1111111">1111111</span></div><div class="credentials_1111111"></div><button class="btn btn-info delete-service" data-id="1111111">Action</button></div></div>');
});

$(function() { 
    var refid ="";
    $(document).on("click",".delete-service", function(){     
        refid = $(this).attr('data-id');       
        $('#deleteModal h5.modal-body-txt').html('Take action to this request: "' + refid + '" ');
        $('#deleteModal').modal('show');
        
       }); 
    
    
    $('#deleteService').click(function(event) {         
        var smart = FHIR.client({
            serviceUrl: "https://secure-api.hspconsortium.org/FHIRPit/open",
        });
        var tempRF = smart.api.search({type: 'ReferralRequest', query: {_id: refid}});
        tempRF.done(function(data){
            //console.log(data.config.url)
            
            $.getJSON(data.config.url,function(da){
                require = da.entry[0].resource
                //console.log(require.id)
                require.status = "approved"
                smart.api.update({type: require.resourceType, data: JSON.stringify(require), id: require.id}).then(function(data){
                    alert(data.status);
                    window.location.reload()
                });    
            });
        });
    });

    $('#rejectService').click(function(event) {         
        var smart = FHIR.client({
            serviceUrl: "https://secure-api.hspconsortium.org/FHIRPit/open",
        });
        var tempRF = smart.api.search({type: 'ReferralRequest', query: {_id: refid}});
        tempRF.done(function(data){
            //console.log(data.config.url)
            
            $.getJSON(data.config.url,function(da){
                require = da.entry[0].resource
                //console.log(require.id)
                require.status = "rejected"
                smart.api.update({type: require.resourceType, data: JSON.stringify(require), id: require.id}).then(function(data){
                    alert(data.status);
                    window.location.reload()
                });    
            });
        });
    });

    $('#completedService').click(function(event) {         
        var smart = FHIR.client({
            serviceUrl: "https://secure-api.hspconsortium.org/FHIRPit/open",
        });
        var tempRF = smart.api.search({type: 'ReferralRequest', query: {_id: refid}});
        tempRF.done(function(data){
            //console.log(data.config.url)
            
            $.getJSON(data.config.url,function(da){
                require = da.entry[0].resource
                //console.log(require.id)
                require.status = "completed"
                smart.api.update({type: require.resourceType, data: JSON.stringify(require), id: require.id}).then(function(data){
                    alert(data.status);
                    window.location.reload()
                });    
            });
        });
    });
});
