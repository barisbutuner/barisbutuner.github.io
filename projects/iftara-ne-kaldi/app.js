var countries = [], cities = [], counties = [];
var counter;
function GetTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();

    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    if(hour<10) hour = "0" + hour;
    if(minute<10) minute = "0" + minute;
    if(day<10) day = "0" + day;
    if(month<10) month = "0" + month;

    document.getElementById('current-time').innerText = hour + " : " + minute;
    document.getElementById('current-date').innerText = day + " . " + month + " . " + year;
}

function GetCountry() {
    return fetch("https://ezanvakti.herokuapp.com/ulkeler")
           .then(response => response.json())
           .then(data => {
                 countries = data;
                 var html = "";
                 var indexTürkiye = 0;
                 for(var i = 0; i<data.length; i++) {
                    html += '<option value="'+data[i].UlkeID +'">'+data[i].UlkeAdi+'</option>';
                    if(data[i].UlkeAdi=="TÜRKİYE") indexTürkiye=i;
                 }

                 document.getElementById('countries').innerHTML = html;
                 document.getElementById('countries').selectedIndex = indexTürkiye;

                 GetCity(2); // Türkiye nin Id si 2
           });
}

function GetCity(countryId) {
   return fetch("https://ezanvakti.herokuapp.com/sehirler/" + countryId)
    .then(response => response.json())
    .then(data => {
        cities = data;
        var html = "";
        var indexAnkara = 0;

        for(var i = 0; i < data.length; i++) {
            html += '<option value="' + data[i].SehirID + '">' + data[i].SehirAdi + '</option>';
            if(data[i].SehirAdi == "ANKARA") indexAnkara=i;
        }

        document.getElementById('cities').innerHTML = html;

        if(countryId == 2) {
            document.getElementById('cities').selectedIndex = indexAnkara;
            GetCounty(506); // 506 Ankara nın Id si.
        }
        else {
            document.getElementById('cities').selectedIndex = 0;
            GetCounty(data[0].SehirID);
        }
    });        
}

function GetCounty(cityId) {
    return fetch("https://ezanvakti.herokuapp.com/ilceler/"+cityId)
            .then(response => response.json())
            .then(data => {
                counties = data;
                var html = "";
                var indexPolatli = 0;

                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].IlceID + '">' + data[i].IlceAdi + '</option>';
                    if(data[i].IlceAdi =="POLATLI") indexPolatli=i;
                }

                document.getElementById('counties').innerHTML = html;

                if(cityId == 506){
                    document.getElementById('counties').selectedIndex = indexPolatli;
                }
                else {
                    document.getElementById('counties').selectedIndex = 0;
                }
            })  
}

function GetPrayerTimes(countyId){
    return fetch("https://ezanvakti.herokuapp.com/vakitler/"+countyId)
    .then(response=>response.json())
    .then(data=>{
        var currentDate= new Date();
        var day=(currentDate.getDate()<10)?
                "0"+currentDate.getDate():
                currentDate.getDate();
        var month=((currentDate.getMonth()+1)<10)?
                    "0"+(currentDate.getMonth()+1):
                    currentDate.getMonth(); 
        var year= currentDate.getFullYear();

        currentDate=day+"."+month+"."+year;
        var index=data.findIndex(d=>d.MiladiTarihKisa==currentDate);
        var currentData=data[index];
        document.getElementById("imsak").innerText="İMSAK: "+currentData.Imsak;
        document.getElementById("gunes").innerText="GÜNEŞ: "+   currentData.Gunes;
        document.getElementById("ogle").innerText="ÖĞLE: "+ currentData.Ogle;
        document.getElementById("ikindi").innerText="İKİNDİ: "+currentData.Ikindi;
        document.getElementById("aksam").innerText="AKŞAM: "+currentData.Aksam;
        document.getElementById("yatsi").innerText="YATSI: "+currentData.Yatsi;
   
        clearInterval(counter);
      counter= setInterval(function(){IftaraKalanSure(currentData.Aksam);},1000);
    });

   
}

function IftaraKalanSure(aksam){
    var now=new Date().getTime();
    var endDate=new Date();
    var h=aksam.substr(0,2);
    endDate.setHours(h);
    var m=aksam.substr(3,2);
    endDate.setMinutes(m);
    endDate.setSeconds("0");
    
    var t= endDate-now;
    if(t>0){
            var hour = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minute = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            var second = Math.floor((t % (1000 * 60)) / 1000);
   
            document.getElementById('time-left').innerText=("0" + hour).slice(-2)+":"+("0" + minute).slice(-2)+":"+("0" + second).slice(-2); 
    }
    else{
        document.getElementById('time-left').innerText="00:00:00";
    }
   
}


function ChangeCountry(){
    var country = document.getElementById('countries').value;
    GetCity(country);
}

function ChangeCity(){
    var city = document.getElementById('cities').value;
    GetCounty(city)
}

function ChangeLocation(){
    var countryInput=document.getElementById('countries');
    var country=countryInput.options[countryInput.selectedIndex].text;

    var cityInput=document.getElementById('cities');
    var city=cityInput.options[cityInput.selectedIndex].text;

    var countyInput=document.getElementById('counties');
    var county=countyInput.options[countyInput.selectedIndex].text;

    document.getElementById('country').innerText=country;
    document.getElementById('city').innerText=city;
    document.getElementById('county').innerText=county;

    GetPrayerTimes(countyInput.value);

    $('#locationModal').modal('hide');

}

setInterval(function() {
    GetTime();
},1000);

GetCountry();
GetPrayerTimes(9220);

//9220 POLATLI