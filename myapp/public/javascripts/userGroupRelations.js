function deleteUserGroupRelation(userGroupRelationId) {
    $.ajax({
        url: '/dashboard/userGroupRelation/' + userGroupRelationId + '/delete-json', //route
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({userGroupRelationId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+userGroupRelationId).remove(); // dollar means call to jquery // # means search for that id
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}
