// Lấy dữ liệu từ localStorage
let athletes = JSON.parse(localStorage.getItem('bracket_athletes') || '[]');
const selectedDistribution = JSON.parse(localStorage.getItem('bracket_distribution') || '[]');
const numPlayers = parseInt(localStorage.getItem('bracket_numPlayers') || '0', 10);

// Hàm hiện 2 lựa chọn
function showChoiceSection() {
    const choiceSection = document.getElementById('choiceSection');
    choiceSection.classList.remove('hidden');

    document.getElementById('autoBracket').onclick = () => {
        choiceSection.classList.add('hidden');
        autoAssignBrackets();
    };

    document.getElementById('manualBracket').onclick = () => {
        choiceSection.classList.add('hidden');
        showManualInputForm();
    };
}

// THUẬT TOÁN PHÂN BẢNG MỚI (giữ nguyên như của bạn)
function autoAssignBrackets() {
    athletes.forEach(a => { a.assigned = false; });

    const brackets = selectedDistribution.map(n => ({
        players: [],
        teams: new Set(),
        count: n
    }));

    // Gom nhóm theo team
    const teamGroups = {};
    athletes.forEach(a => {
        const team = a.team || 'no-team';
        if (!teamGroups[team]) teamGroups[team] = [];
        teamGroups[team].push(a);
    });

    // Tách VĐV cùng team
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

    // Phân đều/random seed vào bảng
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

    // Random các VĐV còn lại
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

// Hàm random array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hiển thị bảng đẹp
function displayFinalBrackets(brackets) {
    const finalResult = document.getElementById('finalResult');
    let html = `<h2 class="text-2xl font-bold mb-4 text-center">Kết quả phân bảng</h2>`;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const bgColors = [
        "#e0edff", "#e8f6e8", "#fff9db", "#ffe6ef",
        "#edeaff", "#e0f6e6", "#ffedd6", "#ffe2e0"
    ];
    const total = brackets.length;
    // Nếu có nhiều hơn 4 bảng, chia thành 2 hàng: row1 hàng trên chiếm nửa (lấy trần), row2 còn lại
    let row1 = total <= 4 ? total : Math.ceil(total / 2);
    let row2 = total - row1;

    html += `<div class="flex flex-col items-center w-full gap-2">`;
    // Hàng 1
    html += `<div class="grid gap-4 w-full" style="grid-template-columns: repeat(${row1}, max-content); justify-content:center;">`;
    for (let i = 0; i < row1; i++) {
        const bracket = brackets[i];
        const color = bgColors[i % bgColors.length];
        html += `
        <div style="
            background: ${color};
            border-radius: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            border: 1.5px solid #cbd5e1;
            width: 9.5rem; min-width: 8.5rem; max-width: 10rem;
            margin: 0 auto; display: flex; flex-direction: column;">
            <div style="
                font-weight: bold; font-size: 1rem; text-align: center;
                color: #374151; background: #f4f4f6cc; padding: 0.65rem 0 0.6rem 0;
                border-bottom: 1px solid #e5e7eb;
                border-top-left-radius: 1rem; border-top-right-radius: 1rem;">
                Bảng ${alphabet[i] || (i+1)}
            </div>
            <table style="width: 100%;">
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
                        border-bottom: ${rowIdx === bracket.players.length - 1 ? 'none' : '1px solid #e5e7eb'};
                        padding: 0.6rem 0.1rem; text-align: center; font-size: 1rem; background: transparent;
                    ">${displayName}</td>
                </tr>
            `;
        });
        html += `</tbody></table></div>`;
    }
    html += `</div>`;
    // Hàng 2 nếu có
    if (row2 > 0) {
        html += `<div class="grid gap-4 w-full" style="grid-template-columns: repeat(${row2}, max-content); justify-content:center;">`;
        for (let i = row1; i < total; i++) {
            const bracket = brackets[i];
            const color = bgColors[i % bgColors.length];
            html += `
            <div style="
                background: ${color};
                border-radius: 1rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                border: 1.5px solid #cbd5e1;
                width: 9.5rem; min-width: 8.5rem; max-width: 10rem;
                margin: 0 auto; display: flex; flex-direction: column;">
                <div style="
                    font-weight: bold; font-size: 1rem; text-align: center;
                    color: #374151; background: #f4f4f6cc; padding: 0.65rem 0 0.6rem 0;
                    border-bottom: 1px solid #e5e7eb;
                    border-top-left-radius: 1rem; border-top-right-radius: 1rem;">
                    Bảng ${alphabet[i] || (i+1)}
                </div>
                <table style="width: 100%;">
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
                            border-bottom: ${rowIdx === bracket.players.length - 1 ? 'none' : '1px solid #e5e7eb'};
                            padding: 0.6rem 0.1rem; text-align: center; font-size: 1rem; background: transparent;
                        ">${displayName}</td>
                    </tr>
                `;
            });
            html += `</tbody></table></div>`;
        }
        html += `</div>`;
    }
    html += `</div>`;

    // === NÚT CHUYỂN SANG LỊCH THI ĐẤU ===
    // === NÚT CHUYỂN SANG LỊCH THI ĐẤU ===
    html += `
    <button id="gotoSchedule" class="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md">
        Tạo lịch thi đấu
    </button>
    <div style="height: 32px;"></div>
    `;


    finalResult.innerHTML = html;
    finalResult.classList.remove('hidden');

    // GẮN SỰ KIỆN CHUYỂN TRANG
    setTimeout(() => {
        const btn = document.getElementById('gotoSchedule');
        if (btn) {
            btn.onclick = () => {
                localStorage.setItem('bracket_brackets', JSON.stringify(brackets));
                window.location.href = 'schedule.html';
            };
        }
    }, 0);
}






// --- PHÂN BẢNG THỦ CÔNG, KIỂM TRA TRÙNG REAL-TIME ---
function showManualInputForm() {
    const manualFormSection = document.getElementById('manualFormSection');
    const manualBracketForms = document.getElementById('manualBracketForms');
    manualBracketForms.innerHTML = '';

    manualFormSection.classList.remove('hidden');

    selectedDistribution.forEach((playerCount, bracketIndex) => {
        let formHtml = '<div class="mt-4 border p-4 rounded-md">';
        formHtml += `<h3 class="font-bold">Bảng ${String.fromCharCode(65 + bracketIndex)} (${playerCount} người)</h3>`;
        for (let i = 0; i < playerCount; i++) {
            formHtml += `<select class="w-full border-2 p-2 mt-1" id="manualPlayer_${bracketIndex}_${i}">`;
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

    // Không tạo mới, chỉ clear vùng báo lỗi
    let errorDiv = document.getElementById('manualError');
    if (errorDiv) {
        errorDiv.textContent = '';
    }

    // Bắt sự kiện change cho tất cả select
    const allSelects = manualFormSection.querySelectorAll('select');
    allSelects.forEach(select => {
        select.addEventListener('change', checkManualDuplicate);
    });

    function checkManualDuplicate() {
        const selectedValues = [];
        let hasDuplicate = false;
        // Xóa highlight cũ
        allSelects.forEach(s => {
            s.classList.remove('border-red-600', 'ring-2', 'ring-red-400');
            s.style.borderColor = "";
            s.style.boxShadow = "";
        });
        allSelects.forEach(select => {
            const val = select.value;
            if (val && selectedValues.includes(val)) {
                hasDuplicate = true;
                // Highlight tất cả select bị trùng (kết hợp inline style cho chắc chắn)
                allSelects.forEach(s => {
                    if (s.value === val) {
                        s.classList.add('border-red-600');
                        s.style.borderColor = "#dc2626"; // red-600
                        s.style.boxShadow = "0 0 0 2px #fca5a5";
                    }
                });
            }
            if (val) selectedValues.push(val);
        });
        if (errorDiv) {
            errorDiv.textContent = hasDuplicate ? 'Có VĐV bị chọn trùng, vui lòng kiểm tra lại!' : '';
        }
    }

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

// Khởi động trang:
document.addEventListener('DOMContentLoaded', () => {
    if (!athletes.length || !selectedDistribution.length) {
        document.getElementById('finalResult').innerHTML = '<p class="text-red-500">Không tìm thấy dữ liệu vận động viên hoặc phương án chia bảng.</p>';
        return;
    }
    showChoiceSection();
});
