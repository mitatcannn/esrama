const zarf = document.getElementById("zarf");
const mektup = document.getElementById("mektup");
const hayirBtn = document.getElementById("hayirBtn");
const hayirMesaji = document.getElementById("hayirMesaji");

// Zarfı aç
zarf.addEventListener("click", () => {
    if (!mektup.hidden) {
        mektup.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        return;
    }

    zarf.classList.add("aciliyor");
    zarf.disabled = true;

    window.setTimeout(() => {
        mektup.hidden = false;

        mektup.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        zarf.disabled = false;
    }, 450);
});

// Hayır butonunu kaçır
function hayirKac(event) {
    if (event) {
        event.preventDefault();
    }

    // İlk kaçışta butonu kendi alanından çıkarıp
    // ekran üzerinde serbest hareket ettir.
    if (!hayirBtn.classList.contains("kaciyor")) {
        hayirBtn.classList.add("kaciyor");
    }

    const margin = 12;
    const btnWidth = hayirBtn.offsetWidth;
    const btnHeight = hayirBtn.offsetHeight;

    const maxX = Math.max(
        margin,
        window.innerWidth - btnWidth - margin
    );

    const maxY = Math.max(
        margin,
        window.innerHeight - btnHeight - margin
    );

    const x = margin + Math.random() * (maxX - margin);
    const y = margin + Math.random() * (maxY - margin);

    hayirBtn.style.left = `${x}px`;
    hayirBtn.style.top = `${y}px`;

    hayirBtn.textContent = "Yakalayamazsın 🙈";

    hayirMesaji.hidden = false;
    hayirMesaji.textContent = "Hayır diye bir seçenek yok galiba 😂💗";
}

// Bilgisayarda fare yaklaşınca kaç
hayirBtn.addEventListener("pointerenter", hayirKac);

// Dokunmatik cihazlarda parmakla dokunmaya çalışınca kaç
hayirBtn.addEventListener("pointerdown", hayirKac);

// Klavyeyle de seçilirse kaçsın
hayirBtn.addEventListener("focus", () => {
    hayirKac();
});

// Pencere boyutu değişince butonu ekranın içinde tut
window.addEventListener("resize", () => {
    if (hayirBtn.classList.contains("kaciyor")) {
        const maxX = Math.max(
            12,
            window.innerWidth - hayirBtn.offsetWidth - 12
        );

        const maxY = Math.max(
            12,
            window.innerHeight - hayirBtn.offsetHeight - 12
        );

        const x = Math.min(parseFloat(hayirBtn.style.left) || 12, maxX);
        const y = Math.min(parseFloat(hayirBtn.style.top) || 12, maxY);

        hayirBtn.style.left = `${x}px`;
        hayirBtn.style.top = `${y}px`;
    }
});