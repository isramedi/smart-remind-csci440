

function deleteRemind(remindId) {
    $.ajax({
        url: '/dashboard/remind/' + remindId + '/delete-json', //route
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({remindId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+remindId).remove(); // dollar means call to jquery // # means search for that id
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}
