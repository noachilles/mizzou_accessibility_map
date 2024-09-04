# mizzou_accessibility_map
KF글로벌챌린저 아카데미 개인 연구/🗺️edit mizzou accessibility map

👥**팀 구성**: 개인
🧰**stacks**: ```JavaScript``` ```HTML``` ````CSS``` ```GoogleMaps API```  

## 기획 의도
* 교내 사회적 소수자를 위한 Online Accessibility Map을 조사하던 중 필요한 UI/UX 개선 필요성을 느낌 
* GoogleMaps API를 활용해 안정적이고 빠른 접속 환경과 적은 로딩 시간을 추구하고 UI 변화를 통해 사용자 편의를 도모하고자 함  

## 제작 과정  
### GoogleMaps API 활용  
**기본 화면 설정**  
```HTML
<!DOCTYPE html>
<html>
    <head>
        <title>Simple Marker</title>
        <!-- The callback parameter is required, so we use console.debug as a noop -->
        <script defer src="./index.js">
        </script>
        <script async src="https://maps.googleapis.com/maps/api/js?key=<KEY>&callback=initMap">
        </script>
    </head>
    <body>
        <div id="map" style="height: 600px;">
        </div>
    </body>
</html>
```  
* Google Maps Platform에 결제 정보 입력 후 API키를 입력 받아 위의 <KEY> 자리에 대입해줌.  
* index.js 파일을 만들어 아래의 내용을 넣음으로써 기본 위도, 경도 정보를 설정할 수 있음  
```javascript
window.initMap = function () {
    const map = new google.maps.Map(document.getElementById("map"),{
        center: { lat: 37.5400456, lng: 126.9921017 }, zoom: 10,
    });
};
```  
<div align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcLDqz4%2Fbtsz3ech8uc%2FC8ANyyFZPNGYKWrOnZF2lk%2Fimg.png" width=80% /></div>
<div align="center">fig 1. Google Maps 기본 좌표 설정 표시 화면</div>  

**Interactive Marker 사용**  
* ```google.maps.Marker.AdvancedMarkerElement```, ```PinElement```를 Import하는 것이 중요함  
```javascript
async function initMap(){
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker",
    );
    const { Place } = await google.maps.importLibrary("places");
    const map = new Map(document.getElementById("map"),{
        mapId: "965667819ca2549a",
        center: { lat: 38.94322600085267, lng: -92.32670309743948}, 
        zoom: 18,
        minZoom: 16,
        maxZoom: 20,
        gestureHandling: "cooperative",
    });
}
```  
**개발 과정 문제 해결**  
* HTML 파일 scripts 부분이 type="module"을 이용해 브라우저 없이 local로 html 파일을 열면 정상 작동을 확인할 수 없음.  
* 따라서, VSCode의 Extension 중 'Live Server'를 이용해 확인함.

### UI 수정  
* FontAwesome의 아이콘을 사용할 수 있는 코드 작성  
```javascript
function buildContent(property) {
  const content = document.createElement("div");

  // 아래 ${property.type}이 FontAwesome의 해당 icon을 사용하게 해준다.
  content.classList.add("property");
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
        <span class="fa-sr-only">${property.type}</span>
    </div>
}
```  
* 이외 버거메뉴 사용, zoom 기능 추가 및 아이콘 사용으로 사용자 편의를 고려해 디자인된 웹사이트를 제공

## 수정 결과  
![fig1](https://github.com/user-attachments/assets/20158465-3806-42ea-bebc-cdf8522be3ad)
![fig2](https://github.com/user-attachments/assets/1663e73b-ca0b-4ad5-bab9-794bcaf25401)
<div align="center"> fig 2. 위: 기존 디지털 지도 접속 후 표시창, 아래: 제안한 디지털 지도 접속 후 표시창 (동일 배속)</div>
