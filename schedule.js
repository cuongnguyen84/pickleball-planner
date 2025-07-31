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

function displaySchedule() {
    const courts = generateAllMatchesAndAssignCourts(brackets, numCourts);
    let scores = JSON.parse(localStorage.getItem('schedule_scores') || '[]');
    let html = ``;
    courts.forEach((court, idx) => {
        html += `
        <div class="court-card bg-white rounded-2xl shadow-md border border-slate-200 p-6">
            <div style="font-size:1.3rem;font-weight:700;color:#205cb1;text-align:center;margin-bottom:1.3rem;letter-spacing:1px;">
                Sân ${court.court}
            </div>
            ${court.games.length === 0
                ? `<div style="color:#b2b2b2;padding:28px 0;font-size:17px;text-align:center;font-style:italic;">Không có trận nào</div>`
                : court.games.map((game, idx2) => {
                    // Tìm điểm đã lưu (nếu có)
                    const saved = scores.find(item =>
                        item.court == court.court && item.bracket == game.bracket &&
                        item.p1 == game.p1.name && item.p2 == game.p2.name
                    );
                    return `
                <div class="court-match">
                    <span class="match-player">
                        <span class="match-bracket">${game.bracket}</span>
                        <span style="font-size:0.98em;margin-left:3px;">${game.p1.name}</span>
                    </span>
                    <input type="number" min="0" max="99" maxlength="2"
                        class="score-input text-center"
                        id="score1_${court.court}_${idx2}" style="width:2.8em"
                        value="${saved ? saved.score1 : ''}" />
                    <span style="min-width:12px;text-align:center;font-weight:bold;">-</span>
                    <input type="number" min="0" max="99" maxlength="2"
                        class="score-input text-center"
                        id="score2_${court.court}_${idx2}" style="width:2.8em"
                        value="${saved ? saved.score2 : ''}" />
                    <span class="match-player right" style="margin-right:8px;">${game.p2.name}</span>
                    <button
                        class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-bold save-match-btn"
                        data-court="${court.court}" data-idx="${idx2}" style="min-width:62px">
                        Lưu điểm
                    </button>
                </div>
                `;
                }).join('')}
        </div>
        `;
    });
    document.getElementById('scheduleResult').innerHTML = html;

    // Sự kiện Lưu điểm
    document.querySelectorAll('.save-match-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const court = this.getAttribute('data-court');
            const idx = this.getAttribute('data-idx');
            const score1 = document.getElementById(`score1_${court}_${idx}`).value;
            const score2 = document.getElementById(`score2_${court}_${idx}`).value;

            // Lấy lại thông tin trận
            const courtsNow = generateAllMatchesAndAssignCourts(brackets, numCourts);
            const game = courtsNow.find(c => c.court == court).games[idx];

            // --- Lưu vào schedule_scores như cũ ---
            let scores = JSON.parse(localStorage.getItem('schedule_scores') || '[]');
            scores = scores.filter(item =>
                !(item.court == court && item.bracket == game.bracket && item.p1 == game.p1.name && item.p2 == game.p2.name)
            );
            scores.push({
                court, bracket: game.bracket,
                p1: game.p1.name, p2: game.p2.name,
                score1, score2
            });
            localStorage.setItem('schedule_scores', JSON.stringify(scores));

            // --- Đồng bộ dữ liệu sang schedule_points cho BXH ---
            // Tìm ra chỉ số bảng (bracketIdx) và chỉ số VĐV (idx1, idx2)
            let bracketIdx = brackets.findIndex(b => b.players.some(a => a.name === game.p1.name));
            if (bracketIdx === -1) bracketIdx = 0;
            let idx1 = brackets[bracketIdx].players.findIndex(a => a.name === game.p1.name);
            let idx2 = brackets[bracketIdx].players.findIndex(a => a.name === game.p2.name);

            let schedulePoints = JSON.parse(localStorage.getItem('schedule_points') || '{}');
            // Key dạng: `${bracketIdx}_${minIdx}_${maxIdx}`
            const key = `${bracketIdx}_${Math.min(idx1, idx2)}_${Math.max(idx1, idx2)}`;
            schedulePoints[key] = {
                bracketIdx, idx1, idx2, score1, score2
            };
            localStorage.setItem('schedule_points', JSON.stringify(schedulePoints));

            // Hiệu ứng lưu điểm
            this.innerText = "Đã lưu";
            this.classList.remove("bg-blue-600", "hover:bg-blue-700");
            this.classList.add("bg-green-600");
            setTimeout(() => {
                this.innerText = "Lưu điểm";
                this.classList.add("bg-blue-600", "hover:bg-blue-700");
                this.classList.remove("bg-green-600");
            }, 1000);
        });
    });
}



// Đảm bảo gọi sau khi DOMContentLoaded!
document.addEventListener('DOMContentLoaded', () => {
    displaySchedule();
});
