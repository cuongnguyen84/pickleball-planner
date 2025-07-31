// Lấy dữ liệu từ localStorage
const brackets = JSON.parse(localStorage.getItem('bracket_brackets') || '[]'); // lưu brackets khi chia bảng xong!
const numCourts = parseInt(localStorage.getItem('bracket_numCourts'), 10);

function generateAllMatchesAndAssignCourts(brackets, numCourts) {
    // Tạo tất cả trận, lưu sân "ưu tiên" theo bảng
    let matchesWithCourt = [];
    brackets.forEach((bracket, bIdx) => {
        const matches = generateRoundRobinMatches(bracket.players);
        matches.forEach(match => {
            matchesWithCourt.push({
                ...match,
                bracket: String.fromCharCode(65 + bIdx),
                preferCourt: bIdx % numCourts // bảng A->0, B->1, ...
            });
        });
    });

    // Gán ban đầu: trận nào sân ưu tiên thì gán luôn, còn lại gán đều
    let courts = Array.from({ length: numCourts }, (_, i) => ({ court: i + 1, games: [] }));
    let remain = [];

    // Gán trận ưu tiên vào sân của bảng
    matchesWithCourt.forEach(match => {
        if (courts[match.preferCourt].games.length < Math.ceil(matchesWithCourt.length / numCourts)) {
            courts[match.preferCourt].games.push(match);
        } else {
            remain.push(match);
        }
    });

    // Gán các trận còn lại vào sân có số trận ít nhất
    remain.forEach(match => {
        courts.sort((a, b) => a.games.length - b.games.length);
        courts[0].games.push(match);
    });

    // Sắp xếp lại để sân 1,2,3,4...
    courts.sort((a, b) => a.court - b.court);
    return courts;
}




function generateRoundRobinMatches(players) {
    const matches = [];
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            matches.push({ p1: players[i], p2: players[j], score1: '', score2: '' });
        }
    }
    return matches;
}

// Hiển thị giao diện
function displaySchedule() {
    const courts = generateAllMatchesAndAssignCourts(brackets, numCourts);
    let html = ``;
    courts.forEach((court, idx) => {
        html += `
        <div class="court-card bg-white rounded-2xl shadow-md border border-slate-200 p-6">
            <div style="font-size:1.3rem;font-weight:700;color:#205cb1;text-align:center;margin-bottom:1.3rem;letter-spacing:1px;">
                Sân ${court.court}
            </div>
            ${court.games.length === 0
                ? `<div style="color:#b2b2b2;padding:28px 0;font-size:17px;text-align:center;font-style:italic;">Không có trận nào</div>`
                : court.games.map((game, idx2) => `
                <div class="court-match">
                    <span class="match-player">
                        <span class="match-bracket">${game.bracket}</span>
                        ${game.p1.name}
                    </span>
                    <input type="number" min="0" max="99" maxlength="2"
                        class="score-input"
                        id="score1_${court.court}_${idx2}" />
                    <span style="min-width:12px;text-align:center;font-weight:bold;">-</span>
                    <input type="number" min="0" max="99" maxlength="2"
                        class="score-input"
                        id="score2_${court.court}_${idx2}" />
                    <span class="match-player right">${game.p2.name}</span>
                </div>
                `).join('')}
        </div>
        `;
    });
    document.getElementById('scheduleResult').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', displaySchedule);

