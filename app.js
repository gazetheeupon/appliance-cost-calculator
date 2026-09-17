(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  var PRESETS = [
    ["Space heater", 1500],
    ["Window AC unit", 1000],
    ["Central AC (per hour run)", 3500],
    ["Hair dryer", 1200],
    ["Microwave", 1000],
    ["Clothes dryer", 3000],
    ["Refrigerator (avg draw)", 150],
    ["Dehumidifier", 280],
    ["Box fan", 100],
    ["Desktop PC + monitor", 250],
    ["Electric water heater", 4000],
    ["TV (LED, 55in)", 100]
  ];

  function fmt(n) {
    return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calc() {
    var watts = parseFloat($("watts").value) || 0;
    var hours = parseFloat($("hours").value) || 0;
    var days = parseFloat($("days").value) || 0;
    var rateCents = parseFloat($("rate").value) || 0;
    var rate = rateCents / 100;

    var kwhPerHour = watts / 1000;
    var costPerHour = kwhPerHour * rate;
    var kwhPerDay = kwhPerHour * hours;
    var costPerMonth = kwhPerDay * days * rate;
    var costPerYear = kwhPerDay * (days * 12) * rate;
    var kwhPerMonth = kwhPerDay * days;

    $("perHour").textContent = fmt(costPerHour);
    $("perMonth").textContent = fmt(costPerMonth);
    $("perYear").textContent = fmt(costPerYear);
    $("kwhNote").textContent = kwhPerMonth > 0
      ? "That's about " + kwhPerMonth.toFixed(1) + " kWh a month at the usage you entered."
      : "";
  }

  function renderPresets() {
    var box = $("presets");
    PRESETS.forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = p[0] + " (" + p[1] + "W)";
      b.addEventListener("click", function () {
        $("watts").value = p[1];
        $("wattNote").textContent = "Typical figure for \"" + p[0] + "\" — replace with the number on your specific unit's label if you have it.";
        calc();
      });
      box.appendChild(b);
    });
  }

  function init() {
    renderPresets();
    ["watts", "hours", "days", "rate"].forEach(function (id) {
      $(id).addEventListener("input", calc);
    });
    calc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
