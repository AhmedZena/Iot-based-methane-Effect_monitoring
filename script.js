// header section for responsive
let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar");
let navLinks = navBar.querySelectorAll("li");

// buttons on click
let resultButton = document.getElementById("resultButton");
let concButton = document.getElementById("concButton");

// sections of result and concentration
let resultSection = document.getElementsByClassName("allCharts")[0];
let concSection = document.getElementsByClassName("allCharts2")[0];

let tempOut = [];
let tempIn = [];
let humOut = [];
let humIn = [];
let methane = [];
let tempConclution = [];
let humConclution = [];
let tTime = [];
let test = 0;
let steps = [];

//function to check if test changed
function checkTest1() {
  fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=uA31Cg3iL3COD-aQnWlNju1dNHJIQZl_AHKLBWc7NETL8gh5Q_r_QztQAJpBez8cSlPddiWIL2hcz-51SwLXSd9pMIgwrFYgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKQp2px8HXpRu7Wkz03bAmKwFXyAr_ajTSXu85rSO51QFS9t3cVaP_c-gTeVLBlBW88GQqglTXqVuSUm6RNQb6jiW8vbL7K53tz9Jw9Md8uu&lib=MZBGvFvntMuh4A8jFFxMNZZ-IIMve0frE"
  )
    .then((result) => {
      var data = result.json();
      return data;
    })
    .then((data) => {
      if (data[0] == undefined) {
        console.log("there is no data yet !");
      } else {
        console.log("hi");
        var outputData1 = data.map(Object.values);

        if (outputData1.length > 12) {
          outputData1 = outputData1.slice(outputData1.length - 12);
        } else {
          outputData1 = outputData1;
        }
        console.log(test);
        console.log(outputData1[0][0]);

        if (test != outputData1[0][0] || outputData1[0][0] == "") {
          test = outputData1[0][0];
          getData();
          //   allCharts();
        }
      }
    });
}

function getData() {
  fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=uA31Cg3iL3COD-aQnWlNju1dNHJIQZl_AHKLBWc7NETL8gh5Q_r_QztQAJpBez8cSlPddiWIL2hcz-51SwLXSd9pMIgwrFYgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKQp2px8HXpRu7Wkz03bAmKwFXyAr_ajTSXu85rSO51QFS9t3cVaP_c-gTeVLBlBW88GQqglTXqVuSUm6RNQb6jiW8vbL7K53tz9Jw9Md8uu&lib=MZBGvFvntMuh4A8jFFxMNZZ-IIMve0frE"
  )
    .then((result) => {
      var data = result.json();
      return data;
    })
    .then((obj) => {
      return obj;
    })
    .then((data) => {
      //convert array of objects data to array of arrays
      var outputData1 = data.map(Object.values);

      for (var i = 0; i < 5; i++) {
        tempIn.unshift(outputData1[i][1]);
        humIn.unshift(outputData1[i][2]);
        tempOut.unshift(outputData1[i][3]);
        humOut.unshift(outputData1[i][4]);
        methane.unshift(outputData1[i][5]);
        tTime.unshift(outputData1[i][6]);
      }

      for (var i = 0; i < tTime.length; i++) {
        var date = new Date(tTime[i]);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        tTime[i] = hours + ":" + minutes + ":" + seconds + " " + ampm;
        steps.push(i + 1);
      }

      console.log("tmep inside: ");
      console.log(tempOut);
      console.log("tmep outside: ");
      console.log(tempIn);
      console.log("hum inside: ");
      console.log(humOut);
      console.log("hum outside: ");
      console.log(humIn);
      console.log("methane: ");
      console.log(methane);
      console.log("time: ");
      console.log(tTime);
      console.log("steps: ");
      console.log(steps);

      allCharts();
    });
}

hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
  navLinks.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.toggle("fa-times");
  });
});

// result button on click
resultButton.addEventListener("click", () => {
  resultSection.classList.toggle("hidden");
  concSection.classList.add("hidden");
});

// concentration button on click
concButton.addEventListener("click", () => {
  concSection.classList.toggle("hidden");
  resultSection.classList.add("hidden");
});

// charts section
async function allCharts() {
  var chart1 = new Chart("myChart1", {
    type: "line",
    data: {
      labels: steps,
      datasets: [
        {
          data: tempOut,
          label: "Temp",
          borderColor: "red",
          fill: false,
        },
      ],
    },

    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "No.of readings",
        position: "bottom",
      },

      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Temp inside",
            },
          },
        ],
      },
    },
  });

  var chart2 = new Chart("myChart2", {
    type: "line",
    data: {
      labels: steps,
      datasets: [
        {
          data: tempIn,
          borderColor: "red",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "No.of readings",
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Temp outside",
            },
          },
        ],
      },
    },
  });
  var chart3 = new Chart("myChart3", {
    type: "line",
    data: {
      labels: steps,
      datasets: [
        {
          data: humOut,
          borderColor: "green",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "No.of readings",
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Humidity inside",
            },
          },
        ],
      },
    },
  });
  var chart3 = new Chart("myChart4", {
    type: "line",
    data: {
      labels: steps,
      datasets: [
        {
          data: humIn,
          borderColor: "green",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "No.of readings",
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Humidity outside",
            },
          },
        ],
      },
    },
  });
  var chart5 = new Chart("myChart5", {
    type: "line",
    data: {
      labels: steps,
      datasets: [
        {
          data: methane,
          borderColor: "blue",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "No.of readings",
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "methane",
            },
          },
        ],
      },
    },
  });
  var chart6 = new Chart("myChart6", {
    type: "line",
    data: {
      labels: methane,
      datasets: [
        {
          data: tempOut,
          borderColor: "red",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Methane ",
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "temperature ",
            },
          },
        ],
      },
    },
  });
  var chart7 = new Chart("myChart7", {
    type: "line",
    data: {
      labels: tempOut,
      datasets: [
        {
          data: humOut,
          borderColor: "green",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "temperature ",
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Humidity ",
            },
          },
        ],
      },
    },
  });
}

// make temp1 show after 1 min
setTimeout(() => {
  checkTest1();
}, 1000);
