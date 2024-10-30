$(document).ready(function () {
  const bellSchedule = {
    A: ["Block 1", "8:24 AM - 9:31 AM"],
    B: ["Block 2", "9:36 AM - 10:43 AM"],
    C: ["Block 3", "10:48 AM - 11:55 AM"],
    D: ["Lunch", "12:00 PM - 12:35 PM"],
    E: ["Block 4", "12:41 PM - 1:48 PM"],
    F: ["Block 5", "1:53 PM - 3:00 PM"],
    G: ["Block 6", "3:05 PM - 4:00 PM"],
  };

  const url = "https://api.npoint.io/2ca9008e1634327bed54";

  function loadSchedule(day) {
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: function (data) {
        const classesForDay = getClassesForDay(data, day);
        displaySchedule(classesForDay);
      },
      error: function () {
        alert("Failed to load schedule data.");
      },
    });
  }

  function getClassesForDay(scheduleData, day) {
    return scheduleData.filter((classInfo) => classInfo.days.includes(day));
  }

  function displaySchedule(classes) {
    $("#scheduleList").empty();
    $("#noClassesMessage").hide();

    if (classes.length === 0) {
      $("#noClassesMessage").text("No classes today").show();
      return;
    }

    classes.forEach((classInfo, index) => {
      // Determine the block letter (A, B, C, ...)
      const blockKey = String.fromCharCode("A".charCodeAt(0) + index);

      // Check if the blockKey exists in bellSchedule
      if (bellSchedule[blockKey]) {
        const period = bellSchedule[blockKey][0];
        const time = bellSchedule[blockKey][1];
        $("#scheduleList").append(`
          <tr>
            <td>${period}</td>
            <td>${time}</td>
            <td>${classInfo.name}</td>
            <td>${classInfo.teacher}</td>
            <td>${classInfo.room}</td>
          </tr>
        `);
      }
    });
  }

  $("#submitDay").on("click", function () {
    const selectedDay = $("#dayInput").val();
    if (selectedDay) {
      loadSchedule(selectedDay);
    } else {
      alert("Please select a valid day (A-G).");
    }
  });
});
