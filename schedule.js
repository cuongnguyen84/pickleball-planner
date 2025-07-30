// Lấy dữ liệu từ localStorage
const brackets = JSON.parse(localStorage.getItem('bracket_brackets') || '[]'); // lưu brackets khi chia bảng xong!
const numCourts = parseInt(localStorage.getItem('bracket_numCourts'), 10);

function generateAllMatchesAndAssignCourts(brackets, numCourts) {
    // Tạo lịch vòng tròn từng bảng
    const allMatches = [];
    brackets.forEach((bracket, idx) => {
        const matches = generateRoundRobinMatches(bracket.players);
        allMatches.push({
            bracketIndex: idx,
            bracketName: String.fromCharCode(65 + idx), // A, B, ...
            matches: matches
        });
    });
    // Gán sân cho từng trận
    const courts = Array.from({ length: numCourts }, (_, i) => ({ court: i + 1, games: [] }));
    let matchList = [];
    // Nếu số bảng <= số sân: mỗi bảng 1 sân
    if (brackets.length <= numCourts) {
        allMatches.forEach((bm, idx) => {
            courts[idx].games = bm.matches.map(match => ({
                ...match,
                bracket: bm.bracketName
            }));
        });
    } else {
        // Số bảng > số sân: phân bổ đều các trận vào các sân
        allMatches.forEach((bm, idx) => {
            const courtIdx = idx < numCourts ? idx : idx % numCourts;
            bm.matches.forEach(match => {
                courts[courtIdx].games.push({
                    ...match,
                    bracket: bm.bracketName
                });
            });
        });
        // Sort lại để đều số trận/sân (tối ưu hóa tuỳ thích)
        courts.sort((a, b) => a.games.length - b.games.length);
    }
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
    let html = '<div class="flex flex-wrap gap-4 justify-center">';
    courts.forEach(court => {
        html += `<div class="bg-gray-50 rounded-lg shadow p-4 min-w-[220px] max-w-[250px]">
            <div class="text-lg font-bold text-blue-700 mb-2 text-center">Sân ${court.court}</div>`;
        court.games.forEach((game, idx) => {
            html += `<div class="mb-3">
                <div class="font-semibold">${game.bracket}: ${game.p1.name} vs ${game.p2.name}</div>
                <div class="flex items-center gap-2 mt-1 justify-center">
                    <input type="number" min="0" class="w-12 border rounded p-1 text-center" id="score1_${court.court}_${idx}">
                    <span class="mx-1">-</span>
                    <input type="number" min="0" class="w-12 border rounded p-1 text-center" id="score2_${court.court}_${idx}">
                </div>
            </div>`;
        });
        html += `</div>`;
    });
    html += '</div>';
    document.getElementById('scheduleResult').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', displaySchedule);
