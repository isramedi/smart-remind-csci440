
function deleteLead(leadId) {
    $.ajax({
        url: '/lead/' + leadId + '/delete-json', //route
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({leadId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+leadId).remove(); // dollar means call to jquery // # means search for that id
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}
