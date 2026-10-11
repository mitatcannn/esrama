const yagmur = document.getElementById("kalp-yagmuru");
const muzik = document.getElementById("sarki");

const kalpler = [
    "💗", "💖", "💕", "❤️",
    "💘", "💞", "💝", "🌸"
];

let yagmurZamanlayici;

async function muzikBaslat() {
    if (!muzik.paused) return;

    try {
        await muzik.play();
    } catch (error) {
        // Tarayıcı otomatik oynatmayı engellediyse
        // ilk kullanıcı etkileşiminde yeniden denenecek.
    }
}

function kalpOlustur() {
    if (
        document.hidden ||
        yagmur.childElementCount >= 65
    ) {
        return;
    }

    const kalp = document.createElement("span");

    kalp.className = "kayan-kalp";
    kalp.setAttribute("aria-hidden", "true");

    kalp.textContent =
        kalpler[Math.floor(Math.random() * kalpler.length)];

    const boyut = 15 + Math.random() * 27;
    const sure = 4 + Math.random() * 5;
    const kayma = Math.random() * 180 - 90;
    const donus = Math.random() * 240 - 120;

    kalp.style.left = Math.random() * 100 + "%";
    kalp.style.fontSize = boyut + "px";
    kalp.style.opacity = String(
        0.65 + Math.random() * 0.35
    );

    kalp.style.animationDuration = sure + "s";
    kalp.style.setProperty("--kayma", kayma + "px");
    kalp.style.setProperty("--donus", donus + "deg");

    yagmur.appendChild(kalp);

    kalp.addEventListener("animationend", () => {
        kalp.remove();
    }, { once: true });
}

function yagmuruBaslat() {
    if (yagmurZamanlayici) return;

    kalpOlustur();

    yagmurZamanlayici = window.setInterval(
        kalpOlustur,
        220
    );
}

function yagmuruDurdur() {
    if (!yagmurZamanlayici) return;

    clearInterval(yagmurZamanlayici);
    yagmurZamanlayici = undefined;
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        yagmuruDurdur();
    } else {
        yagmuruBaslat();
        muzikBaslat();
    }
});

// Ekrana ilk dokunulduğunda engellenen müziği tekrar dene.
document.addEventListener("pointerdown", muzikBaslat);
document.addEventListener("keydown", muzikBaslat);

yagmuruBaslat();

// Sayfa yüklenirken otomatik oynatmayı dene.
muzikBaslat();

window.addEventListener("pagehide", yagmuruDurdur);