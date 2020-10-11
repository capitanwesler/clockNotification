//This is the main JS for the Clock Notification

document.addEventListener("DOMContentLoaded", function() {
    //I'm just writting here the months in a array
    let months = [
        'january', 
        'february', 
        'march', 
        'april', 
        'may', 
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];

    //We handle first the day selection
    let day = document.getElementById("day");

    //Now we loop to add a option for the days
    for (let i = 1; i <= 31; i++) {
        //We first create the option element
        let option = document.createElement("option");

        //Now we set the data to each option
        option.value = i; 
        option.innerText = i;
        option.id = `day-${i}`;
        day.appendChild(option);
    }

    //Let's grab the month selection
    let month = document.getElementById("month");

    //Now we loop in the array of the months to add each month
    // into the selection
    for (const m of months) {
        //We create the element option
        let option = document.createElement("option");

        //Now we set the data to each option
        option.value = m;
        option.innerText = m.charAt(0).toUpperCase() + m.slice(1);
        option.id = m;
        month.appendChild(option);
    }


    //Let's grab the year
    let year = document.getElementById("year");

    //I only want to support to the 10 years from here
    for (let i = 2020; i <= 2030; i++) {
        //We create the element option
        let option = document.createElement("option");

        //Now we set the data to each option
        option.value = i;
        option.innerText = i;
        option.id = `year-${i}`;
        year.appendChild(option);
    }

    //We grab the button to the notifications
    let buttonNotification = document.getElementById("ask-notification");

    buttonNotification.addEventListener("click", askNotification);

    function askNotification() {
        //We are going first just to ask for notification
        //We request the permission for notification's in
        //the handle permission
        function handlePermission(permission) {
            if (!'permission' in Notification) {
                Notification.permission = permission;
            }

            //set the button to show or hidden, depending on the user
            //notification
            if (Notification.permission == "denied" || Notification.permission === "default") {
                buttonNotification.style.display = "block";
            }else {
                buttonNotification.style.display = "none";
            }
        }
        
        //Then we really request for the permission
        Notification.requestPermission()
        .then(permission => {
            handlePermission(permission);
        });
    }


    //Then we grab the button
    let buttonAlarm = document.getElementById("add-alarm");

    //Now we add a event listener for the button were clicked
    buttonAlarm.addEventListener("click", handleAlarm);
    

    function handleAlarm(e) {
        if (time.value !== "" && Notification.permission === "granted") {
            //With all the date filled, now we grab each value of
            //day, month, year and the time
            let dateTime = new Date(`${month.value} ${day.value} ${year.value} ${time.value}`);
            
            let timer = setInterval(handleTimer, 100);

            function handleTimer() {
                if (new Date() >= dateTime) {
                    let notification = new Notification("Alarm!!!");
                    clearInterval(timer);
                }
            }
            
        }else {
            alert("Please fill the time or enable the notifications !");
        }
    }

});

