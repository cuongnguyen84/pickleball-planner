// Lấy params từ URL
const params = new URLSearchParams(window.location.search);
const distributionStr = params.get('distribution');
const numPlayers = parseInt(params.get('numPlayers'));
const selectedDistribution = distributionStr ? distributionStr.split(',').map(Number) : [];

// Biến toàn cục để lưu danh sách VĐV
let athletes = [];

// Hàm hiển thị form nhập danh sách VĐV với placeholder trên một dòng responsive
function showAthleteInputForm(numPlayers) {
    const athleteForms = document.getElementById('athleteForms');
    athleteForms.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        let formHtml = '<div class="mt-4 border p-2 rounded-md shadow-md bg-gray-50">';
        formHtml += '<div class="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">';
        formHtml += '<input type="text" class="w-full border p-2 rounded-md" id="athleteName_' + i + '" placeholder="VDV ' + (i + 1) + '">';
        formHtml += '<input type="text" class="w-full border p-2 rounded-md" id="athleteTeam_' + i + '" placeholder="Team">';
        formHtml += '<input type="number" class="w-full border p-2 rounded-md" id="athleteSeed_' + i + '" placeholder="Seed">';
        formHtml += '</div></div>';
        athleteForms.innerHTML += formHtml;
    }

    // Event cho nút "Xác nhận danh sách VĐV"
    const submitAthletes = document.getElementById('submitAthletes');
    submitAthletes.addEventListener('click', () => {
        athletes = collectAthleteData(numPlayers);
        if (athletes.length === numPlayers) {
            document.getElementById('athleteInputSection').classList.add('hidden');
            showChoiceSection();
        } else {
            alert('Vui lòng nhập họ tên cho tất cả VĐV.');
        }
    });
}

// Hàm thu thập dữ liệu VĐV (tên bắt buộc, team/seed optional)
function collectAthleteData(numPlayers) {
    const data = [];
    for (let i = 0; i < numPlayers; i++) {
        const name = document.getElementById('athleteName_' + i).value.trim();
        const team = document.getElementById('athleteTeam_' + i).value.trim();
        const seed = parseInt(document.getElementById('athleteSeed_' + i).value) || 0;
        if (name) {
            data.push({ name, team, seed });
        } else {
            return [];  // Nếu thiếu tên, trả mảng rỗng
        }
    }
    return data;
}

// Hàm hiển thị lựa chọn phân bảng
function showChoiceSection() {
    const choiceSection = document.getElementById('choiceSection');
    choiceSection.classList.remove('hidden');

    // Event cho "Phân bảng tự động"
    const autoButton = document.getElementById('autoBracket');
    autoButton.addEventListener('click', () => {
        choiceSection.classList.add('hidden');
        autoAssignBrackets();
    });

    // Event cho "Nhập bảng thủ công"
    const manualButton = document.getElementById('manualBracket');
    manualButton.addEventListener('click', () => {
        choiceSection.classList.add('hidden');
        showManualInputForm();
    });
}

// Hàm phân bảng tự động (random 100%, tuân theo selectedDistribution, phân đều hạt giống)
function autoAssignBrackets() {
    // Sắp xếp VĐV theo hạt giống giảm dần
    athletes.sort((a, b) => b.seed - a.seed);

    // Tạo các bảng rỗng với tổng seed
    const brackets = Array.from({ length: selectedDistribution.length }, (_, index) => ({
        players: [],
        teams: new Set(),
        totalSeed: 0,
        maxPlayers: selectedDistribution[index] // Giới hạn số người theo distribution
    }));

    // Phân VĐV: Luân phiên gán seed cao vào các bảng, sau đó random còn lại
    let bracketIndex = 0;
    for (let athlete of athletes) {
        let assigned = false;
        for (let attempt = 0; attempt < brackets.length; attempt++) {
            const currentIndex = (bracketIndex + attempt) % brackets.length;
            const bracket = brackets[currentIndex];
            if (bracket.players.length < bracket.maxPlayers && !bracket.teams.has(athlete.team)) {
                bracket.players.push(athlete);
                bracket.teams.add(athlete.team);
                bracket.totalSeed += athlete.seed;
                assigned = true;
                bracketIndex = (currentIndex + 1) % brackets.length; // Chuyển sang bảng tiếp theo
                break;
            }
        }
        if (!assigned) {
            // Nếu không gán được, thêm vào bảng có chỗ
            for (let bracket of brackets) {
                const bracketIndex = brackets.indexOf(bracket);
                if (bracket.players.length < bracket.maxPlayers) {
                    bracket.players.push(athlete);
                    bracket.teams.add(athlete.team);
                    bracket.totalSeed += athlete.seed;
                    break;
                }
            }
        }
    }

    // Shuffle players trong mỗi bảng để random thêm
    brackets.forEach(bracket => {
        bracket.players = shuffleArray(bracket.players);
    });

    // Hiển thị kết quả phân bảng
    displayFinalBrackets(brackets);
}

// Hàm shuffle array để random
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hàm hiển thị kết quả phân bảng dưới dạng table với định dạng mới và style kẻ bảng
function displayFinalBrackets(brackets) {
    const finalResult = document.getElementById('finalResult');
    let html = '<h2 class="text-lg font-semibold">Kết quả phân bảng</h2>';
    brackets.forEach((bracket, index) => {
        html += '<div class="mt-4 border p-4 rounded-md">';
        html += '<h3 class="font-bold">Bảng ' + (index + 1) + ' (' + bracket.players.length + ' người)</h3>';
        html += '<table class="w-full table-auto border-collapse border-2 border-gray-600 mt-2">'; // Tăng border dày hơn, màu rõ
        html += '<thead><tr><th class="border-2 border-gray-600 p-2 bg-gray-200 text-center">VĐV</th></tr></thead>';
        html += '<tbody>';
        bracket.players.forEach(player => {
            const displayName = player.seed > 0 ? player.name + '(' + player.seed + ')' : player.name;
            html += '<tr><td class="border-2 border-gray-600 p-2 text-center">' + displayName + '</td></tr>'; // Căn giữa
        });
        html += '</tbody></table>';
        html += '</div>';
    });
    finalResult.innerHTML = html;
    finalResult.classList.remove('hidden');
}

// Hàm hiển thị form nhập thủ công
function showManualInputForm() {
    const manualFormSection = document.getElementById('manualFormSection');
    const manualBracketForms = document.getElementById('manualBracketForms');
    manualBracketForms.innerHTML = '';

    manualFormSection.classList.remove('hidden');

    selectedDistribution.forEach((playerCount, bracketIndex) => {
        let formHtml = '<div class="mt-4 border p-4 rounded-md">';
        formHtml += '<h3 class="font-bold">Bảng ' + (bracketIndex + 1) + ' (' + playerCount + ' người)</h3>';
        for (let i = 0; i < playerCount; i++) {
            formHtml += '<select class="w-full border p-2 mt-1" id="manualPlayer_' + bracketIndex + '_' + i + '">';
            formHtml += '<option value="">Chọn VĐV</option>';
            athletes.forEach((athlete, athIndex) => {
                formHtml += '<option value="' + athIndex + '">' + athlete.name + ' (Team: ' + athlete.team + ', Hạt giống: ' + athlete.seed + ')</option>';
            });
            formHtml += '</select>';
        }
        formHtml += '</div>';
        manualBracketForms.innerHTML += formHtml;
    });

    // Event cho "Xác nhận"
    const confirmManual = document.getElementById('confirmManual');
    confirmManual.addEventListener('click', () => {
        const brackets = collectManualData();
        if (brackets) {
            manualFormSection.classList.add('hidden');
            displayFinalBrackets(brackets);
        } else {
            alert('Vui lòng chọn đầy đủ VĐV cho tất cả bảng và không trùng.');
        }
    });
}

// Hàm thu thập dữ liệu thủ công
function collectManualData() {
    const brackets = Array.from({ length: selectedDistribution.length }, () => ({ players: [], teams: new Set() }));
    const usedAthletes = new Set();

    for (let bracketIndex = 0; bracketIndex < selectedDistribution.length; bracketIndex++) {
        const playerCount = selectedDistribution[bracketIndex];
        for (let i = 0; i < playerCount; i++) {
            const select = document.getElementById('manualPlayer_' + bracketIndex + '_' + i);
            const athIndex = parseInt(select.value);
            if (isNaN(athIndex) || usedAthletes.has(athIndex)) {
                return null;  // Thiếu hoặc trùng
            }
            const athlete = athletes[athIndex];
            brackets[bracketIndex].players.push(athlete);
            brackets[bracketIndex].teams.add(athlete.team);
            usedAthletes.add(athIndex);
        }
    }
    return brackets;
}

// Khởi tạo trang athlete.html
document.addEventListener('DOMContentLoaded', () => {
    if (selectedDistribution.length > 0) {
        showAthleteInputForm(numPlayers);
    } else {
        alert('Không tìm thấy dữ liệu phương án. Vui lòng quay lại.');
    }
});