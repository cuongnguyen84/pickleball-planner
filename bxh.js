// ----- Lấy dữ liệu -----
const brackets = JSON.parse(localStorage.getItem('bracket_brackets') || '[]');
const schedulePoints = JSON.parse(localStorage.getItem('schedule_points') || '{}'); 

// Hàm tính BXH từng bảng
function calcBXH(bracket, bracketIndex) {
    const n = bracket.players.length;
    const results = bracket.players.map((player, idx) => ({
        idx,
        name: player.name,
        team: player.team,
        seed: player.seed,
        win: 0,
        lose: 0,
        point: 0,
        scoreFor: 0,
        scoreAgainst: 0,
    }));

    // Xử lý từng trận (không có hòa)
    let matchIdx = 0;
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            let found = false, score1 = '', score2 = '';
            for (let key in schedulePoints) {
                const val = schedulePoints[key];
                if (val && val.bracketIdx === bracketIndex && (
                        (val.idx1 === i && val.idx2 === j) ||
                        (val.idx1 === j && val.idx2 === i)
                    )
                ) {
                    score1 = (val.idx1 === i) ? val.score1 : val.score2;
                    score2 = (val.idx1 === i) ? val.score2 : val.score1;
                    found = true;
                    break;
                }
            }

            if (score1 !== '' && score2 !== '') {
                const s1 = Number(score1), s2 = Number(score2);
                if (isNaN(s1) || isNaN(s2)) continue;
                results[i].scoreFor += s1;
                results[i].scoreAgainst += s2;
                results[j].scoreFor += s2;
                results[j].scoreAgainst += s1;
                if (s1 > s2) {
                    results[i].win++;
                    results[j].lose++;
                    results[i].point += 1; // Thắng 1 điểm
                } else if (s1 < s2) {
                    results[j].win++;
                    results[i].lose++;
                    results[j].point += 1;
                }
                // Hòa: không có, không cộng gì cả!
            }
            matchIdx++;
        }
    }
    // Sắp xếp theo: Điểm -> Hiệu số -> Ghi bàn
    results.sort((a, b) => b.point - a.point ||
                          (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) ||
                          b.scoreFor - a.scoreFor);
    return results;
}

function renderBXH() {
    const bxhDiv = document.getElementById('bxhResult');
    if (!brackets.length) {
        bxhDiv.innerHTML = '<div class="text-red-500 text-center py-10">Không tìm thấy dữ liệu bảng đấu!</div>';
        return;
    }
    let html = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    brackets.forEach((bracket, idx) => {
        const bxh = calcBXH(bracket, idx);
        html += `<div class="bracket-title">Bảng ${alphabet[idx] || idx + 1}</div>
        <table class="bxh-table mb-7">
          <thead>
            <tr>
              <th>Hạng</th>
              <th>VĐV</th>
              <th>Team</th>
              <th>Trận</th>
              <th>Thắng</th>
              <th>Thua</th>
              <th>Điểm</th>
              <th>+/-</th>
              <th>Ghi</th>
              <th>Thủng</th>
            </tr>
          </thead>
          <tbody>
          ${bxh.map((row, i) => `
            <tr>
              <td>${i + 1}</td>
              <td style="font-weight:600;">${row.name}</td>
              <td>${row.team || '-'}</td>
              <td>${row.win + row.lose}</td>
              <td>${row.win}</td>
              <td>${row.lose}</td>
              <td style="font-weight:bold;">${row.point}</td>
              <td>${row.scoreFor - row.scoreAgainst}</td>
              <td>${row.scoreFor}</td>
              <td>${row.scoreAgainst}</td>
            </tr>
          `).join('')}
          </tbody>
        </table>`;
    });
    bxhDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderBXH);
