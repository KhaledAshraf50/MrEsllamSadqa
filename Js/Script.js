// البيانات
const remembrance = [
  "اللهم اغفر له وارحمه، وعافه واعف عنه، وأكرم نزله ووسع مدخله.",
  "اللهم اجعل ما علّمه لنا نورًا له في قبره ورفعةً في درجاته.",
  "اللهم آنسه في وحدته، واجعل قبره روضةً من رياض الجنة.",
  "اللهم اجزه عن إحسانه وصبره وطيب أثره خير الجزاء.",
  "اللهم يمن كتابه، ويسر حسابه، وثقل بالحسنات ميزانه.",
  "اللهم اسقه من حوض نبيك شربة لا يظمأ بعدها أبدًا.",
];

// تحديث قائمة الآيات بإضافة روابط MP3 (ياسر الدوسري)
const quranVerses = [
  {
    title: "الصبر",
    verse:
      "﴿ وَبَشِّرِ الصَّابِرِينَ ۝ الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ ﴾",
    source: "سورة البقرة",
    // رابط جديد ومجرب يجمع الآيتين 155 و 156
    audio: "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/002155.mp3",
  },
  {
    title: "الرحمة",
    verse:
      "﴿ رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ ﴾",
    source: "سورة غافر",
    audio: "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/040007.mp3",
  },
  {
    title: "النور",
    verse: "﴿ نُورٌ عَلَىٰ نُورٍ ۗ يَهْدِي اللَّهُ لِنُورِهِ مَن يَشَاءُ ﴾",
    source: "سورة النور",
    audio: "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/024035.mp3",
  },
];
// وظيفة تشغيل الصوت
const audioBtn = document.getElementById("play-audio-btn");
const quranPlayer = document.getElementById("quran-player");

// دالة التشغيل
function toggleAudio() {
  const currentAudio = quranVerses[activeVerse].audio;

  if (quranPlayer.src !== currentAudio) {
    quranPlayer.src = currentAudio;
  }

  if (quranPlayer.paused) {
    quranPlayer.play();
    audioBtn.innerHTML = `<i data-lucide="pause"></i> إيقاف`;
  } else {
    quranPlayer.pause();
    audioBtn.innerHTML = `<i data-lucide="volume-2"></i> استماع`;
  }
  lucide.createIcons();
}

// السحر هنا: لو خلصت آية البقرة الأولى، شغل التانية فوراً
quranPlayer.onended = () => {
  // لو إحنا في "آية الصبر" (البقرة) والآية الأولى خلصت
  if (activeVerse === 0 && quranPlayer.src.includes("002155")) {
    quranPlayer.src =
      "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/002156.mp3";
    quranPlayer.play();
  } else {
    audioBtn.innerHTML = `<i data-lucide="volume-2"></i> استماع`;
    lucide.createIcons();
  }
};
// اربط الزرار بالدالة
audioBtn.onclick = toggleAudio;

// لما الآية تخلص يرجع الزرار لشكل الاستماع
quranPlayer.onended = () => {
  audioBtn.innerHTML = `<i data-lucide="volume-2"></i> استماع`;
  lucide.createIcons();
};
// تأكد من تصفير الزرار عند انتهاء الصوت
quranPlayer.onended = () => {
  audioBtn.innerHTML = `<i data-lucide="volume-2"></i> استماع`;
  lucide.createIcons();
};

// في دالة setVerse(index) القديمة، أضف هذا السطر لإيقاف الصوت لو المستخدم غير الآية:
function setVerse(index) {
  activeVerse = index;
  quranPlayer.pause(); // إيقاف الصوت القديم
  audioBtn.innerHTML = `<i data-lucide="volume-2"></i> استماع`;
  renderQuran();
  lucide.createIcons();
}

const tasbeehPhrases = [
  "سبحان الله",
  "الحمد لله",
  "الله أكبر",
  "لا إله إلا الله",
  "أستغفر الله",
];
const deeds = [
  "قراءة الفاتحة",
  "دعاء بالرحمة",
  "استغفار",
  "صدقة جارية",
  "ذكر موقف طيب",
  "الصلاة على النبي",
];

// العداد
let count = 0;
function incrementCounter() {
  count++;
  document.getElementById("counter-num").innerText = count;

  // تغيير الجملة كل 33 تسبيحة
  const phraseIndex = Math.floor(count / 33) % tasbeehPhrases.length;
  document.getElementById("tasbeeh-phrase").innerText =
    tasbeehPhrases[phraseIndex];

  // شريط التقدم
  const progress = (count % 33) * 3.03;
  document.getElementById("progress-fill").style.width = `${progress}%`;
}

function resetCounter() {
  count = 0;
  document.getElementById("counter-num").innerText = 0;
  document.getElementById("progress-fill").style.width = "0%";
}

// القرآن
let activeVerse = 0;
function renderQuran() {
  const tabsContainer = document.getElementById("verse-tabs");
  tabsContainer.innerHTML = quranVerses
    .map(
      (v, i) => `
        <button class="tab-btn ${i === activeVerse ? "active" : ""}" onclick="setVerse(${i})">${v.title}</button>
    `,
    )
    .join("");

  document.getElementById("active-verse-text").innerText =
    quranVerses[activeVerse].verse;
  document.getElementById("active-verse-source").innerText =
    quranVerses[activeVerse].source;
}

function setVerse(index) {
  activeVerse = index;
  renderQuran();
}

// الأدعية (مع خاصية النسخ)
function renderDuas() {
  const grid = document.getElementById("dua-grid");
  grid.innerHTML = remembrance
    .map(
      (dua) => `
        <div class="dua-card">
            <p>${dua}</p>
            <button class="copy-btn" onclick="copyDua(this, '${dua}')">
                <i data-lucide="copy"></i> نسخ الدعاء
            </button>
        </div>
    `,
    )
    .join("");
  lucide.createIcons();
}

async function copyDua(btn, text) {
  await navigator.clipboard.writeText(text);
  const originalContent = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="check"></i> تم النسخ`;
  lucide.createIcons();
  setTimeout(() => {
    btn.innerHTML = originalContent;
    lucide.createIcons();
  }, 2000);
}

// الأعمال الصالحة (Toggle)
function renderDeeds() {
  const grid = document.getElementById("deeds-grid");
  grid.innerHTML = deeds
    .map(
      (deed) => `
        <button class="deed-btn" onclick="this.classList.toggle('checked')">
            ${deed}
            <span class="check-circle"></span>
        </button>
    `,
    )
    .join("");
}

// التشغيل الابتدائي
window.onload = () => {
  renderQuran();
  renderDuas();
  renderDeeds();
  lucide.createIcons(); // تفعيل الأيقونات
};
