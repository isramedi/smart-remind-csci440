function deleteGroup(groupId) {
    $.ajax({
        url: '/dashboard/group/' + groupId + '/delete-json', //route
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({groupId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+groupId).remove(); // dollar means call to jquery // # means search for that id
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}
