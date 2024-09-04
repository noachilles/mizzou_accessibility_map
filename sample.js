/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_advanced_markers_html]
// [START maps_advanced_markers_html_snippet]

//Hide - create map
let map;
let markers = [];
let obj;

const iconBase =
"./";
const icons = {
accessDoor: {
  icon: iconBase + "accessible-door.svg",
},
library: {
  icon: iconBase + "square-solid.svg",
},
auto: {
  icon: iconBase + "auto-door.svg",
},
};

function readJSON(file, callback){
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function(){
      if (rawFile.readyState === 4 && rawFile.status == "200"){
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

function createMarkers(obj){
  for (let i = 0; i < obj.features.length; i++){
    const coords = obj.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    // Create markers
    const marker = new google.maps.Marker({
      position: latLng,
      icon: icons[obj.features[i].type].icon,
      map: map,
      type: obj.features[i].type,
    });
    markers.push(marker);
  }
}


async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const center = { lat: 38.943025, lng: -92.325633 };
  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center,
    mapId: "c1a096b777b988c9",
    // 기본 제공 UI 모두 제거
    disableDefaultUI: true,
  });
  
  new google.maps.Marker({
    position: center,
    map,
    title: "current location!",
  });

  readJSON("./accessible-door.json", function(text){
    var Data = JSON.parse(text);
    console.log(Data);
    createMarkers(Data);
  })

  readJSON("./auto-door.json", function(text){
    var Data = JSON.parse(text);
    console.log(Data);
    createMarkers(Data);
  })

  
  for (const property of properties) {
    // 여기서 개별 property 값을 확인해 숨길지 말지 판단
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(property),
      position: property.position,
      title: property.description,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, property);
    });

    // Hide - markers.push
    // markers.push(AdvancedMarkerElement);

  }

  //CheckBox
  var checkBox = document.getElementById("accessible-door");
  checkBox.addEventListener("change", function(event){
    if(checkBox.checked==true){
      console.log("true");
      showMarkers();
    }
    else{
      console.log("false");
      hideMarkers();
    }
  });

}
  
// google.maps 연동과 자체 기능 클래스 호출


// highlight를 켜고 끄는 기능
function toggleHighlight(markerView, property) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}
  
  
function buildContent(property) {
  // JS를 통해 HTML 요소를 생성하기 위해 사용하는 코드
  // Use the 'document.createElement()' method to create the element.
  const content = document.createElement("div");

  // Use the 'classList.add()' method to add one or more classes to the element.
  // 즉, property가 클래스
  content.classList.add("property");
  // 이 아래는 content에 포함하는 내용들
  // class 이름보다도 내용 값이 직접적인 영향을 미침
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-circle-info" title="info"></i>
        <span class="fa-sr-only">info</span>
        <div hidden class="${property.available}">${property.available}
        </div>
    </div>
    <div class="details">
        <div class="name">${property.name}</div>
        <div class="address">${property.address}</div>
        <div class="features">
        <div>
          <i aria-hidden="true" class="fa fa-door-open fa-lg door-open" title="door-type"></i>
            <span class="fa-sr-only">door</span>
            <span>${property.door}</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-toilet fa-lg toilet" title="toilet"></i>
            <span class="fa-sr-only">toilet</span>
            <span>${property.toilet}</span>
        </div>
        </div>
    </div>
    `;
  return content;
}

// 개별 클래스가 모여 properties를 만듦. property는 각 클래스
const properties = [
  {
    available: true,
    // above address, large, black font(In after block)
    name: "Rollins Hall",
    // In after block
    address: "1202 Rollins St, Columbia, MO",
    // over mouse description
    description: "Single family house with modern design",
    // mini block(1)
    door: 5,
    // mini block(2)
    toilet: 4.5,
    // mini block(3)
    size: 300,
    position: {
      lat: 38.94185761544342,
      lng: -92.32310441745877
    },
  },
  {
    available: true,
    address: "1000 Rollins St, Columbia, MO",
    description: "Townhouse with friendly neighbors",
    name: "Mizzou Rec",
    // type: "building",
    door: 2,
    toilet: "1(2), 2",
    size: 200,
    position: {
      lat: 38.94161469072421,      lng: -92.32618148252197,
    },
  },
  // [END maps_advanced_markers_html_snippet]
  {
    available: true,
    address: "1100 Rollins St, Columbia, MO",
    description: "Spacious warehouse great for small business",
    name: "Johnston Residence Hall",
    // type: "warehouse",
    door: 4,
    toilet: 4,
    size: 800,
    position: {
      lat: 38.94197650046236, 
      lng: -92.32442546634081,
    },
  },
  {
    available: false,
    address: "520 S 9th St, Columbia, MO",
    description: "A lovely store on busy road",
    name: "University of Missouri Libraries, Ellis Library",
    // type: "store-alt",
    door: 2,
    toilet: 1,
    size: 210,
    position: {
      lat: 38.94475723111414, 
      lng: -92.32644436026628,
    },
  },
];

//Hide - functions
// Sets the map on all markers in the array.
// 인자는 map, 기준으로 삼을 property.type, type content로 세 개
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].type == "accessDoor"){
      markers[i].setMap(map);
    }
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}
// Hide - end

initMap();

// [END maps_advanced_markers_html]

// div - property.type ver
{/* <div class="icon">
<i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
<span class="fa-sr-only">${property.type}</span>
</div> */}