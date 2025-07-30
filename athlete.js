// Lấy params từ URL
const params = new URLSearchParams(window.location.search);
const distributionStr = params.get('distribution');
const numPlayers = parseInt(params.get('numPlayers'));
const selectedDistribution = distributionStr ? distributionStr.split(',').map(Number) : [];
// Auto sinh danh sách VĐV mẫu nếu chưa có trong localStorage (chỉ để test/demo)
if (!localStorage.getItem('bracket_athletes') && numPlayers && numPlayers > 0) {
    // Bạn có thể random team/seed nếu muốn
    const possibleTeams = ["TD", "KT", "QN", ""];
    const testAthletes = [];
    for (let i = 1; i <= numPlayers; i++) {
        // Random team trong 3 team hoặc rỗng
        const team = possibleTeams[Math.floor(Math.random() * possibleTeams.length)];
        // Seed: random 0-3, 50% là 0 (không hạt giống)
        const rand = Math.random();
        let seed = 0;
        if (rand > 0.7) seed = Math.ceil(Math.random() * 3);
        testAthletes.push({
            name: `VDV ${i}`,
            team: team,
            seed: seed
        });
    }
    localStorage.setItem('bracket_athletes', JSON.stringify(testAthletes));
    localStorage.setItem('bracket_distribution', JSON.stringify(selectedDistribution));
    localStorage.setItem('bracket_numPlayers', numPlayers);
}
// Biến toàn cục để lưu danh sách VĐV
let athletes = [];

// Hàm hiển thị form nhập danh sách VĐV
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
        // Lưu dữ liệu vào localStorage
        localStorage.setItem('bracket_athletes', JSON.stringify(athletes));
        localStorage.setItem('bracket_distribution', JSON.stringify(selectedDistribution));
        localStorage.setItem('bracket_numPlayers', numPlayers);

        // Chuyển sang trang bracket.html
        window.location.href = 'bracket.html';
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

// THUẬT TOÁN PHÂN BẢNG MỚI
function autoAssignBrackets() {
    athletes.forEach(a => { a.assigned = false; });

    const brackets = selectedDistribution.map(n => ({
        players: [],
        teams: new Set(),
        count: n
    }));

    // Bước 1: Gom các VĐV theo team
    const teamGroups = {};
    athletes.forEach(a => {
        const team = a.team || 'no-team';
        if (!teamGroups[team]) teamGroups[team] = [];
        teamGroups[team].push(a);
    });

    // Bước 2: Tách các VĐV cùng team ra bảng khác nhau (nếu có thể)
    for (const [team, group] of Object.entries(teamGroups)) {
        if (group.length === 1 || team === 'no-team') continue;
        let availableBrackets = [...Array(brackets.length).keys()];
        shuffleArray(availableBrackets);

        for (let i = 0; i < group.length; i++) {
            let idx = availableBrackets[i % availableBrackets.length];
            let bracket = brackets[idx];
            if (bracket.players.length < bracket.count && !bracket.teams.has(team)) {
                bracket.players.push(group[i]);
                bracket.teams.add(team);
                group[i].assigned = true;
            } else {
                // Nếu không còn chỗ thì cứ đẩy vào bảng bất kỳ còn slot
                for (let j = 0; j < brackets.length; j++) {
                    let b = brackets[(idx + j) % brackets.length];
                    if (b.players.length < b.count) {
                        b.players.push(group[i]);
                        b.teams.add(team);
                        group[i].assigned = true;
                        break;
                    }
                }
            }
        }
    }

    // Bước 3: Phân đều/random seed vào các bảng còn trống
    let seeds = athletes.filter(a => a.seed > 0 && !a.assigned);
    shuffleArray(seeds);
    let seedBracketOrder = [...Array(brackets.length).keys()];
    shuffleArray(seedBracketOrder);
    for (let i = 0; i < seeds.length; i++) {
        let idx = seedBracketOrder[i % brackets.length];
        let bracket = brackets[idx];
        if (bracket.players.length < bracket.count) {
            bracket.players.push(seeds[i]);
            bracket.teams.add(seeds[i].team);
            seeds[i].assigned = true;
        }
    }

    // Bước 4: Random các VĐV còn lại vào các bảng còn trống
    let remaining = athletes.filter(a => !a.assigned);
    shuffleArray(remaining);
    for (let a of remaining) {
        for (let b of brackets) {
            if (b.players.length < b.count) {
                b.players.push(a);
                b.teams.add(a.team);
                a.assigned = true;
                break;
            }
        }
    }

    // Shuffle thứ tự trong từng bảng cho ngẫu nhiên
    brackets.forEach(b => shuffleArray(b.players));

    displayFinalBrackets(brackets);
}

// Hàm random array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hiển thị bảng đẹp, kẻ border 4 phía, đặt tên bảng là A, B, C, ...
function displayFinalBrackets(brackets) {
    const finalResult = document.getElementById('finalResult');
    let html = `
        <h2 class="text-2xl font-bold mb-4 text-center">Kết quả phân bảng</h2>
        <div class="flex flex-row flex-wrap justify-center gap-4 w-full">
    `;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Màu nền đẹp mắt, mỗi bảng một màu
    const bgColors = [
        "#e0edff", // xanh dương nhạt
        "#e8f6e8", // xanh lá nhạt
        "#fff9db", // vàng nhạt
        "#ffe6ef", // hồng nhạt
        "#edeaff", // tím nhạt
        "#e0f6f6", // teal nhạt
        "#ffedd6", // cam nhạt
        "#ffe2e0", // đỏ nhạt
        "#f4e8ff", // violet nhạt
        "#f1ffe3"  // lime nhạt
    ];

    brackets.forEach((bracket, index) => {
        const color = bgColors[index % bgColors.length];
        html += `
        <div style="width:150px; min-width:140px;">
            <div style="
                font-weight: bold; 
                font-size: 1rem; 
                text-align: center; 
                margin-bottom: 0; 
                color: #374151; 
                background: #e5e7eb; 
                padding: 0.5rem 0; 
                border: 2px solid #374151;
                border-bottom: none;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;">
                Bảng ${alphabet[index] || (index+1)}
            </div>
            <table style="
                width: 100%; 
                background: ${color}; 
                border: 2px solid #374151; 
                border-top: none;
                border-bottom-left-radius: 0.5rem;
                border-bottom-right-radius: 0.5rem;
                border-collapse: separate;
            ">
                <tbody>
        `;
        bracket.players.forEach((player, rowIdx) => {
            let displayName = player.name;
            if (player.seed > 0 && player.team) {
                displayName += ` (${player.seed}) (${player.team})`;
            } else if (player.seed > 0) {
                displayName += ` (${player.seed})`;
            } else if (player.team) {
                displayName += ` (${player.team})`;
            }
            html += `
                <tr>
                    <td style="
                        border-top: 1px solid #888;
                        border-bottom: ${rowIdx === bracket.players.length - 1 ? 'none' : '1px solid #888'};
                        border-right: none;
                        border-left: none;
                        padding: 0.5rem;
                        text-align: center;
                        font-size: 0.95rem;
                        background: transparent;
                    ">${displayName}</td>
                </tr>
            `;
        });
        html += `
                </tbody>
            </table>
        </div>
        `;
    });

    html += "</div>";
    finalResult.innerHTML = html;
    finalResult.classList.remove('hidden');
}


// --- Phần phân bảng thủ công giữ nguyên ---
function showManualInputForm() {
    const manualFormSection = document.getElementById('manualFormSection');
    const manualBracketForms = document.getElementById('manualBracketForms');
    manualBracketForms.innerHTML = '';

    manualFormSection.classList.remove('hidden');

    selectedDistribution.forEach((playerCount, bracketIndex) => {
        let formHtml = '<div class="mt-4 border p-4 rounded-md">';
        formHtml += `<h3 class="font-bold">Bảng ${String.fromCharCode(65 + bracketIndex)} (${playerCount} người)</h3>`;
        for (let i = 0; i < playerCount; i++) {
            formHtml += `<select class="w-full border p-2 mt-1" id="manualPlayer_${bracketIndex}_${i}">`;
            formHtml += '<option value="">Chọn VĐV</option>';
            athletes.forEach((athlete, athIndex) => {
                let showName = athlete.name;
                if (athlete.seed > 0 && athlete.team) showName += ` (${athlete.seed}) (${athlete.team})`;
                else if (athlete.seed > 0) showName += ` (${athlete.seed})`;
                else if (athlete.team) showName += ` (${athlete.team})`;
                formHtml += `<option value="${athIndex}">${showName}</option>`;
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

function collectManualData() {
    const brackets = Array.from({ length: selectedDistribution.length }, () => ({ players: [], teams: new Set() }));
    const usedAthletes = new Set();

    for (let bracketIndex = 0; bracketIndex < selectedDistribution.length; bracketIndex++) {
        const playerCount = selectedDistribution[bracketIndex];
        for (let i = 0; i < playerCount; i++) {
            const select = document.getElementById(`manualPlayer_${bracketIndex}_${i}`);
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
    // --- XỬ LÝ BẤM NÚT TẠO DỮ LIỆU TEST NHANH ---
    const btnAutoTest = document.getElementById('autoTest');
    if (btnAutoTest) {
        btnAutoTest.addEventListener('click', () => {
    const possibleTeams = ["TD", "KT", "QN", ""];
    const testAthletes = [];

    // Danh sách seed không trùng (1-10 hoặc ít hơn)
    let seedList = [];
    if (numPlayers >= 10) {
        seedList = Array.from({ length: 10 }, (_, i) => i + 1);
    } else {
        seedList = Array.from({ length: numPlayers }, (_, i) => i + 1);
    }
    // Shuffle seedList để random ai là hạt giống
    for (let i = seedList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [seedList[i], seedList[j]] = [seedList[j], seedList[i]];
    }

    for (let i = 1; i <= numPlayers; i++) {
        const team = possibleTeams[Math.floor(Math.random() * possibleTeams.length)];
        // Hạt giống: gán từ seedList cho VĐV đầu tiên, còn lại seed = 0
        let seed = 0;
        if (seedList.length > 0) {
            seed = seedList.pop();
        }
        testAthletes.push({
            name: `VDV ${i}`,
            team: team,
            seed: seed
        });
    }
    localStorage.setItem('bracket_athletes', JSON.stringify(testAthletes));
    localStorage.setItem('bracket_distribution', JSON.stringify(selectedDistribution));
    localStorage.setItem('bracket_numPlayers', numPlayers);
    window.location.href = 'bracket.html';
});

    }
    // --- GIỮ NGUYÊN ĐOẠN AUTO REDIRECT NẾU BẠN DÙNG URL autotest ---
    if (window.location.search.includes('autotest')) {
        const testAthletes = [
            { name: "Nguyễn Văn A", team: "TD", seed: 1 },
            { name: "Trần Văn B", team: "TD", seed: 0 },
            { name: "Lê Văn C", team: "KT", seed: 2 },
            { name: "Phạm Văn D", team: "KT", seed: 0 },
            { name: "Hoàng Văn E", team: "", seed: 0 },
            { name: "Ngô Văn F", team: "", seed: 3 },
            { name: "Nguyễn Văn G", team: "TD", seed: 0 },
            { name: "Trịnh Văn H", team: "KT", seed: 0 },
            { name: "Lưu Văn I", team: "", seed: 0 },
            { name: "Đỗ Văn K", team: "TD", seed: 0 },
            { name: "VDV 11", team: "", seed: 0 },
            { name: "VDV 12", team: "", seed: 0 },
        ];
        const testDistribution = [4, 4, 4];
        localStorage.setItem('bracket_athletes', JSON.stringify(testAthletes));
        localStorage.setItem('bracket_distribution', JSON.stringify(testDistribution));
        localStorage.setItem('bracket_numPlayers', testAthletes.length);
        window.location.href = 'bracket.html';
    }
});

