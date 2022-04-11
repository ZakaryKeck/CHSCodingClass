window.addEventListener("load", function () {
  var loader = document.getElementsByClassName("loader");
  loader[0].style.display = "none";
  getTab();
});

function changeTab(id, tabName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(tabName).style.display = "block";

  var tabs = document.getElementsByClassName("tab");
  for (i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  document.getElementById(id).classList.add("active");
  localStorage.setItem("tab", JSON.stringify({ id: id, content: tabName }));
}

function getTab() {
  var tab = JSON.parse(localStorage.getItem("tab"));
  if (tab && tab.id && tab.content) {
    changeTab(tab.id, tab.content);
  } else {
    changeTab("Tab1", "Day1");
  }
}
