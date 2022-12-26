//  localStorage.setItem("sifre", "1234");
//  localStorage.setItem("bakiye",1000);

let sifre = localStorage.getItem("sifre");

//Giriş Ekranı

$(".girisyap").click(function (e) {
    e.preventDefault();

    let girilenSifre = $(".sifreInp").val();

    //şifreleri karşılaştırdım

    if (girilenSifre == sifre) {
        $(".alert").slideUp();
        window.location.href = "islemler.html"
    }

    else {
        $(".alert").slideDown();
    }

});

//Kayıt Olma Ekranı

$(".kayitol").click(function (e) {
    e.preventDefault();
    let kayitSifre = $(".girilenSifre").val();
    let kayitSifre2 = $(".girilenSifre2").val();
    let kayitİsim = $(".girilenAd").val();
    if (kayitSifre == kayitSifre2) {
        localStorage.setItem("sifre", kayitSifre);
        $(".kayitSonuc").html(`Kayıt İşleminiz Tamamlandı ${kayitİsim} Yönlendiriliyorsunuz..`)
        setTimeout(function () {
            // yönlendirmeyi başlat
            window.location.href = "index.html";
        }, 4000);

    }

    else {
        $(".alert").slideDown();
    }
});

//bakiye
let bakiye = localStorage.getItem("bakiye")
function trCevir(){
    let paraCevir = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(bakiye);
    $(".bakiye").html(`Kullanılabilir Bakiyeniz : ${paraCevir}`);
}

trCevir();


// $(".bakiye").html(`Kullanılabilir Bakiyeniz : ${paraCevir}`);

//İşlemler



$(".islemYap").click(function (e) {
    e.preventDefault();
    let secilenIslem = $(".islemlerInp").val();
    let girilenMiktar = Number($(".girilenMiktar").val());

    //Para Çekme İşlemi
    if (secilenIslem == "Para Çek") {

        if (girilenMiktar <= bakiye) {
            //10 ve katları çekme işlemi
            if (girilenMiktar % 10 == 0) {
                bakiye = bakiye - girilenMiktar;
                trCevir();
               // $(".bakiye").html(`Para Çekilme İşlemi Tamamlandı! Kullanılabilir Bakiyeniz: ${bakiye}`);
                localStorage.setItem("bakiye", bakiye);
            }

            else {
                $(".alert").slideDown().html("Lütfen 10 TL ve katlarını deneyiniz!");
            }

        }

        else {
            $('#staticBackdrop').modal('show')
        }

    }

    //Para Yatırma İşlemi
    else if (secilenIslem == "Para Yatır") {
        bakiye = Number(bakiye);
        bakiye = bakiye + girilenMiktar;

        trCevir();
         let paraCevir = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(bakiye);


        $(".bakiye").html(`Para Yatırma İşlemi Tamamlandı! Toplam Bakiyeniz : ${paraCevir}`);
        localStorage.setItem("bakiye", bakiye);
    }

});