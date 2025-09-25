// ----------------------- Mulai Sekarang -----------------------

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('mouseenter', () => {
    startBtn.classList.remove('active');
    setTimeout(() => {
        startBtn.classList.add('hovered');
    }, 300);
});

startBtn.addEventListener('mouseleave', () => {
    startBtn.classList.remove('hovered');
});

startBtn.addEventListener('click', () => {
    startBtn.classList.add('active');
    startBtn.disabled = true;

    setTimeout(() => {
        $("#intro").addClass("d-none");
        $("#quiz").removeClass("d-none");
        loadQuestion();
    }, 500);
});


// ----------------------- Quiz Logic -----------------------

let currentQuestion = 0;
let totalScore = 0;

const quizData = [
    {
        question: "Toko kue ajaibmu butuh kue spesial untuk menarik pelanggan. Kue seperti apa yang akan kamu buat?",
        answers: ["Kue dengan dekorasi unik", "Rasa baru yang belum ada", "Harga murah dengan kualitas baik"],
        score: [2, 3, 1]
    },
    {
        question: "Saat bekerja, kamu paling senang jika...",
        answers: ["Bisa berinteraksi dengan orang banyak", "Bisa bereksperimen & berkreasi", "Ada aturan yang jelas dan rapi"],
        score: [3, 2, 1]
    }
];

function loadQuestion() {
    const q = quizData[currentQuestion];
    $("#questionText").text(q.question);
    $("#answerOptions").empty();

    q.answers.forEach((ans, idx) => {
        $("#answerOptions").append(`
            <button class="answer-btn" data-score="${q.score[idx]}">${ans}</button>
        `);
    });

    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    $("#quizProgress").css("width", progress + "%");
}

// ----------------------- Jawaban -----------------------

$(document).on("click", ".answer-btn", function () {
    totalScore += parseInt($(this).data("score"));
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        $("#quiz").addClass("d-none");
        $("#result").removeClass("d-none");
    }
});

// ----------------------- Result -----------------------

$("#seeResult").click(function () {
    $("#result").addClass("d-none");
    $("#jobResult").removeClass("d-none");

    let job = "", desc = "";

    if (totalScore <= 3) {
        job = "Administrasi Perkantoran";
        desc = "Pekerjaan yang cocok untuk kamu yang rapi dan terorganisir.";
    } else if (totalScore <= 5) {
        job = "Desain Grafis";
        desc = "Cocok untuk kamu yang kreatif dan suka berinovasi.";
    } else {
        job = "Digital Marketing";
        desc = "Pas untuk kamu yang suka interaksi dan strategi pemasaran.";
    }

    $("#jobTitle").text(job);
    $("#jobDesc").text(desc);
});

// ----------------------- Kembali ke Beranda -----------------------
$("#backHome").click(function () {
    location.reload();
});
