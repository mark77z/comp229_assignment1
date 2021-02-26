/*--------------------------------------------------------------
# app.js
# Marco Mejia
# 301082190
# 02 Feb 2021
--------------------------------------------------------------*/
(function(){

    function Start()
    {
        console.log("App Started...");

        //Find all delete buttons
        let deleteButtons = document.querySelectorAll('.btn-danger');

        //Add event to each delete button
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event) => {
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('contacts-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();