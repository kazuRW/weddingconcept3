(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-300px');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 90
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    }); 

    // ============================================================
    // LOGIKA INTEGRASI KUNCI SCROLL, ANIMASI GERBANG & MUSIK
    // ============================================================
    
    // 1. Kunci gulir halaman utama saat pertama kali dimuat
    $('body').addClass('lock-scroll');

    var bgMusic = document.getElementById('bgMusic');
    var $musicBtn = $('#musicBtn');
    var isPlaying = false;

    function playMusic() {
        if (bgMusic) {
            bgMusic.volume = 0.6;
            bgMusic.play().then(function () {
                isPlaying = true;
                $musicBtn.html('<i class="fa fa-music"></i>');
                $musicBtn.addClass('playing');
            }).catch(function (error) {
                console.log("Autoplay diblokir oleh kebijakan sistem browser:", error);
            });
        }
    }

    // TRIGGER UTAMA: Aksi Tombol Buka Undangan Diklik
    $('#openInviteBtn').on('click', function () {
        // Jalankan audio instrumen
        playMusic();

        // Picu transisi gerbang bergeser membelah (CSS transition)
        $('#coverScreen').addClass('opened');

        // Tunggu hingga animasi pintu selesai (1.5 detik), lalu lepas segel scroll
        setTimeout(function () {
            $('body').removeClass('lock-scroll');
            $('#coverScreen').hide(); // Menyingkirkan elemen sepenuhnya dari DOM tree
        }, 1500);
    });

    // KONTROL FLOATING MUSIC BUTTON (Tombol Melayang Bulat)
    $musicBtn.on('click', function () {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            $musicBtn.html('<i class="fa fa-pause"></i>');
            $musicBtn.removeClass('playing');
        } else {
            bgMusic.play();
            isPlaying = true;
            $musicBtn.html('<i class="fa fa-music"></i>');
            $musicBtn.addClass('playing');
        }
    });

    // Menangkap String Nama Tamu dari parameter URL (?tamu=Nama+Anda)
    var params = new URLSearchParams(window.location.search);
    var tamuName = params.get('tamu');
    if (tamuName) {
        $('#guestBox').text(tamuName);
    }

    // ============================================================
    // LOGIKA EFEK BUNGA RED PETAL FALL (TAMBAHAN)
    // ============================================================
    
    // Array file gambar kelopak bunga (pastikan file ada di folder gambar/)
    // ============================================================
    // LOGIKA EFEK BUNGA RED PETAL FALL (DI-UPDATE PRESISI)
    // ============================================================
    
    // Sesuaikan dengan ekstensi asli file di folder Anda (.jpg / .png)
    var petalImages = [
        'lib/gambar/petal1.png',
        'lib/gambar/petal2.png'
    ];

    var petalFallInterval;

    function createPetal() {
        // Efek dijatuhkan di dalam body/screen utama agar cakupan z-indexnya absolut
        var $petal = $('<div class="petal"></div>');
        
        // Pilih gambar kelopak secara acak
        var randomIndex = Math.floor(Math.random() * petalImages.length);
        $petal.css('background-image', 'url(' + petalImages[randomIndex] + ')');
        
        // Pengaturan acak variasi posisi, ukuran, dan kecepatan
        var randomLeft = Math.random() * 100; // Posisi kiri-kanan (0% - 100%)
        var randomSize = 20 + Math.random() * 25; // Ukuran bunga (20px - 45px)
        var randomDuration = 6 + Math.random() * 6; // Kecepatan jatuh (6 - 12 detik)
        
        $petal.css({
            'left': randomLeft + '%',
            'width': randomSize + 'px',
            'height': randomSize + 'px',
            'animation-duration': randomDuration + 's'
        });
        
        // Dimasukkan ke dalam body agar melayang di atas segalanya
        $('body').append($petal);
        
        // Bersihkan elemen dari struktur HTML setelah jatuh ke bawah demi performa laptop/HP
        setTimeout(function() {
            $petal.remove();
        }, (randomDuration + 1) * 1000);
    }

    function startPetalFall() {
        // Membuat bunga baru setiap 250 milidetik (4 kelopak per detik)
        petalFallInterval = setInterval(createPetal, 250);
    }

    function stopPetalFall() {
        clearInterval(petalFallInterval);
        // Hapus bunga yang tersisa dengan efek memudar cepat
        $('.petal').fadeOut('slow', function() {
            $(this).remove();
        });
    }

    // MULAI EFEK BUNGA BERJATUHAN saat halaman dimuat
    startPetalFall();

    // TRIGGER MEMATIKAN BUNGA: Aksi Tombol Buka Undangan Diklik
    $('#openInviteBtn').on('click', function () {
        // ... kode audio & gerbang yang ada sebelumnya ...
        
        // Matikan interval bunga saat gerbang mulai terbuka
        stopPetalFall();

        // ... setTimeout Anda sebelumnya yang melepaskan scroll & menyembunyikan cover ...
    });

})(jQuery);